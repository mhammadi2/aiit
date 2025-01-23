// app/api/admin/events/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { sendEventNotification } from '@/lib/email'

// app/api/admin/events/route.ts (continued)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      imageUrl,
      selectedEmailLists,
      sendNotification,
    } = json

    // Create event with email list connections
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        startDate,
        endDate,
        imageUrl,
        userId: session.user.id,
        emailLists: {
          connect: selectedEmailLists.map((id: string) => ({ id })),
        },
      },
      include: {
        emailLists: true,
      },
    })

    if (sendNotification) {
      // Get all unique emails from selected email lists
      const emailLists = await prisma.emailList.findMany({
        where: {
          id: {
            in: selectedEmailLists,
          },
        },
      })

      const uniqueEmails = [
        ...new Set(emailLists.flatMap((list) => list.emails)),
      ]

      // Create notification record
      const notification = await prisma.eventNotification.create({
        data: {
          eventId: event.id,
          status: 'PENDING',
        },
      })

      try {
        // Send email notifications
        await sendEventNotification({
          event,
          recipients: uniqueEmails,
        })

        // Update notification status
        await prisma.eventNotification.update({
          where: { id: notification.id },
          data: {
            status: 'SENT',
            sentAt: new Date(),
          },
        })
      } catch (error) {
        // Update notification status with error
        await prisma.eventNotification.update({
          where: { id: notification.id },
          data: {
            status: 'FAILED',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        })
        throw error
      }
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

// Get all events with their notification status
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const search = searchParams.get('search') ?? ''

    const events = await prisma.event.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        emailLists: true,
        notifications: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.event.count({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
    })

    return NextResponse.json({
      data: events,
      metadata: {
        total,
        page,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

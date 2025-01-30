import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '10')
  const skip = (page - 1) * limit

  const events = await prisma.event.findMany({
    skip,
    take: limit,
    orderBy: { startDate: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  const total = await prisma.event.count()

  return NextResponse.json({
    events,
    meta: {
      total,
      page,
      limit,
      pageCount: Math.ceil(total / limit),
    },
  })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()

  const event = await prisma.event.create({
    data: {
      ...data,
      userId: session.user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return NextResponse.json(event, { status: 201 })
}

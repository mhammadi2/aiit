import { Resend } from 'resend'
import { prisma } from '@/lib/db'
import { NotificationStatus } from '@prisma/client'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEventNotifications(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      emailLists: true,
    },
  })

  if (!event) throw new Error('Event not found')

  const emails = event.emailLists.flatMap((list) => list.emails)
  const uniqueEmails = [...new Set(emails)]

  for (const email of uniqueEmails) {
    try {
      await resend.emails.send({
        from: 'noreply@yourdomain.com',
        to: email,
        subject: `New Event: ${event.title}`,
        html: `
          <h1>${event.title}</h1>
          <p>${event.description}</p>
          <p>Location: ${event.location}</p>
          <p>Date: ${event.startDate.toLocaleDateString()}</p>
        `,
      })

      await prisma.eventNotification.create({
        data: {
          eventId: event.id,
          status: NotificationStatus.SENT,
          sentAt: new Date(),
        },
      })
    } catch (error) {
      await prisma.eventNotification.create({
        data: {
          eventId: event.id,
          status: NotificationStatus.FAILED,
          error: error.message,
        },
      })
    }
  }
}

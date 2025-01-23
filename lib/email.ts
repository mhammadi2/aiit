// lib/email.ts
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import { EventNotificationEmail } from '@/emails/event-notification'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEventNotification({
  event,
  recipients,
}: {
  event: any
  recipients: string[]
}) {
  const emailHtml = render(EventNotificationEmail({ event }))

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: recipients,
    subject: `New Event: ${event.title}`,
    html: emailHtml,
  })
}

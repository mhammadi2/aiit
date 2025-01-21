import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// lib/auth.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
// import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  // Add your auth providers here
}

// lib/email.ts
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
// import { EventNotificationEmail } from '@/emails/event-notification'

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

// lib/validations/schema.ts
import * as z from 'zod'

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().optional(),
  selectedEmailLists: z.array(z.string()),
  sendNotification: z.boolean(),
})

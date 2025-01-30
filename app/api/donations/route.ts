import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()

  const donation = await prisma.donation.create({
    data: {
      ...data,
      userId: session.user.id,
      status: 'PENDING',
    },
  })

  return NextResponse.json(donation, { status: 201 })
}
// Continue with similar API routes for posts, email lists, etc.

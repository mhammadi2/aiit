import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.id !== params.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { profile: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.id !== params.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const data = await request.json()

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      name: data.name,
      profile: {
        upsert: {
          create: {
            bio: data.bio,
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatar: data.avatar,
          },
          update: {
            bio: data.bio,
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatar: data.avatar,
          },
        },
      },
    },
    include: { profile: true },
  })

  return NextResponse.json(user)
}

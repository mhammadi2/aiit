import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { amount, currency = 'usd', paymentMethod } = await req.json()

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        userId: session.user.id,
      },
    })

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount,
        currency,
        paymentMethod: 'STRIPE',
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation.id,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

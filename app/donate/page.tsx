'use client'

import { FC } from 'react'
import { DonationForm } from '@/components/donations/donation-form'

const DonatePage: FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Make a Donation</h1>
      <DonationForm />
    </div>
  )
}

export default DonatePage
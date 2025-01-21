'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export function DonationForm({ amount }: { amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation/success`,
        },
      })

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Payment failed',
          description: error.message,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <PaymentElement />
      <Button type='submit' disabled={!stripe || isLoading} className='w-full'>
        {isLoading ? 'Processing...' : `Donate $${amount}`}
      </Button>
    </form>
  )
}

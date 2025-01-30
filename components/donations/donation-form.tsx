'use client'

import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const donationSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  paymentMethod: z.enum(['STRIPE', 'PAYPAL']),
})

type DonationFormData = z.infer<typeof donationSchema>

export const DonationForm: FC = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  })

  const onSubmit = async (data: DonationFormData) => {
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to process donation')
      }

      toast({
        title: 'Success',
        description: 'Thank you for your donation!',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium mb-2'>
          Donation Amount
        </label>
        <Input
          {...register('amount', { valueAsNumber: true })}
          type='number'
          min='1'
          step='0.01'
          placeholder='Enter amount'
          error={errors.amount?.message}
        />
      </div>

      <div>
        <label className='block text-sm font-medium mb-2'>Payment Method</label>
        <Select {...register('paymentMethod')}>
          <SelectTrigger>
            <SelectValue placeholder='Select payment method' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='STRIPE'>Credit Card (Stripe)</SelectItem>
            <SelectItem value='PAYPAL'>PayPal</SelectItem>
          </SelectContent>
        </Select>
        {errors.paymentMethod && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.paymentMethod.message}
          </p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Make Donation'}
      </Button>
    </form>
  )
}

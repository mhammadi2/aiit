// components/donations/donation-history.tsx
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { formatDate, formatCurrency } from '@/lib/utils'

interface DonationHistoryProps {
  donations: {
    id: string
    amount: number
    currency: string
    status: string
    paymentMethod: string
    createdAt: Date
  }[]
}

export function DonationHistory({ donations }: DonationHistoryProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleRefund = async (donationId: string) => {
    setIsLoading(donationId)

    try {
      const response = await fetch(`/api/donations/${donationId}/refund`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Refund failed')
      }

      toast({
        title: 'Success',
        description: 'Refund initiated successfully',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Refund failed. Please try again.',
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{formatDate(donation.createdAt)}</TableCell>
            <TableCell>
              {formatCurrency(donation.amount, donation.currency)}
            </TableCell>
            <TableCell>{donation.status}</TableCell>
            <TableCell>{donation.paymentMethod}</TableCell>
            <TableCell>
              {donation.status === 'COMPLETED' && (
                <Button
                  variant='destructive'
                  size='sm'
                  disabled={isLoading === donation.id}
                  onClick={() => handleRefund(donation.id)}
                >
                  {isLoading === donation.id
                    ? 'Processing...'
                    : 'Request Refund'}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

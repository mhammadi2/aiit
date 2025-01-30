'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const EventFilters: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Your filter logic here
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Input
          placeholder='Search events...'
          defaultValue={searchParams.get('search') ?? ''}
        />
        <Select defaultValue={searchParams.get('timeframe') ?? 'upcoming'}>
          <SelectTrigger>
            <SelectValue placeholder='Time frame' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='upcoming'>Upcoming Events</SelectItem>
            <SelectItem value='past'>Past Events</SelectItem>
            <SelectItem value='all'>All Events</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue={searchParams.get('sortBy') ?? 'startDate'}>
          <SelectTrigger>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='startDate'>Date</SelectItem>
            <SelectItem value='title'>Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          className='bg-islamic-600 hover:bg-islamic-700 text-white'
        >
          Apply Filters
        </Button>
      </div>
    </form>
  )
}

// Types for your events
type Event = {
  id: string
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  imageUrl?: string | null
  user: {
    name: string | null
    profile: {
      avatar: string | null
    } | null
  }
  notifications: {
    status: 'PENDING' | 'SENT' | 'FAILED'
  }[]
  emailLists: {
    name: string
    emails: string[]
  }[]
}

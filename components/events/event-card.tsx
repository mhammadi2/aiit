import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Event } from '@/types'

interface EventCardProps {
  event: Event
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {event.imageUrl && (
        <div className='relative h-48'>
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className='object-cover'
          />
        </div>
      )}
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>{event.title}</h3>
        <p className='text-gray-600 mb-4 line-clamp-2'>{event.description}</p>
        <div className='space-y-2 text-sm text-gray-500'>
          <p>
            <span className='font-medium'>Location:</span> {event.location}
          </p>
          <p>
            <span className='font-medium'>Date:</span>{' '}
            {format(new Date(event.startDate), 'PPP')}
          </p>
          <p>
            <span className='font-medium'>Time:</span>{' '}
            {format(new Date(event.startDate), 'p')} -{' '}
            {format(new Date(event.endDate), 'p')}
          </p>
        </div>
        <div className='mt-4'>
          <Link
            href={`/events/${event.id}`}
            className='text-primary-600 hover:text-primary-700 font-medium'
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}

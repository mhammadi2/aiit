import { FC } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface UserEventsProps {
  events: Array<{
    id: string
    title: string
    startDate: Date
    location: string
  }>
}

export const UserEvents: FC<UserEventsProps> = ({ events }) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
      <h2 className='text-2xl font-bold mb-4'>Your Events</h2>
      {events.length === 0 ? (
        <p className='text-gray-500 dark:text-gray-400'>
          You haven't registered for any events yet.
        </p>
      ) : (
        <div className='space-y-4'>
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className='block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 transition-colors'
            >
              <div className='flex items-start'>
                <CalendarIcon className='h-5 w-5 text-islamic-600 mt-1' />
                <div className='ml-4'>
                  <h3 className='font-medium'>{event.title}</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {format(new Date(event.startDate), 'PPP')} at{' '}
                    {event.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

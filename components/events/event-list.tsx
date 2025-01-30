'use client'

import { FC } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface EventListProps {
  events: Array<{
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
  }>
}

export const EventList: FC<EventListProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-islamic-600 dark:text-islamic-400'>
          No events found
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
        >
          <div className='md:flex'>
            {/* Event Image */}
            <div className='md:w-1/3 relative'>
              {event.imageUrl ? (
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={400}
                  height={300}
                  className='h-48 w-full object-cover md:h-full'
                />
              ) : (
                <div className='h-48 md:h-full w-full bg-islamic-100 dark:bg-islamic-800 flex items-center justify-center'>
                  <CalendarDaysIcon className='h-12 w-12 text-islamic-500' />
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className='p-6 md:w-2/3'>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold text-islamic-800 dark:text-white'>
                  {event.title}
                </h3>
                <span className='text-sm text-islamic-600 dark:text-islamic-400'>
                  {format(new Date(event.startDate), 'MMM d, yyyy')}
                </span>
              </div>

              <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>
                {event.description}
              </p>

              <div className='space-y-2'>
                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                  <MapPinIcon className='h-4 w-4 mr-2' />
                  <span>{event.location}</span>
                </div>
                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                  <UserIcon className='h-4 w-4 mr-2' />
                  <span>Organized by {event.user.name || 'Anonymous'}</span>
                </div>
              </div>

              <div className='mt-4 flex justify-between items-center'>
                <div className='flex space-x-2'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-islamic-100 text-islamic-800 dark:bg-islamic-800 dark:text-islamic-100'>
                    {format(new Date(event.startDate), 'h:mm a')} -{' '}
                    {format(new Date(event.endDate), 'h:mm a')}
                  </span>
                </div>
                <button className='text-islamic-600 hover:text-islamic-700 dark:text-islamic-400 dark:hover:text-islamic-300 text-sm font-medium'>
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

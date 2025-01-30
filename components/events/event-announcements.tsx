'use client'

import { FC } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

interface EventAnnouncementsProps {
  events: Array<{
    id: string
    title: string
    description: string
    startDate: Date
    imageUrl?: string | null
    location: string
    user: {
      name: string | null
      profile: {
        avatar: string | null
      } | null
    }
  }>
}

export const EventAnnouncements: FC<EventAnnouncementsProps> = ({ events }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className='group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
        >
          {/* Event Image */}
          <div className='relative h-48 w-full'>
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            ) : (
              <div className='h-full w-full bg-islamic-100 dark:bg-islamic-800' />
            )}
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          </div>

          {/* Event Content */}
          <div className='absolute inset-0 p-4 flex flex-col justify-end text-white'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-islamic-100'>
                {format(new Date(event.startDate), 'EEEE, MMMM d')}
              </p>
              <h3 className='text-lg font-semibold line-clamp-2'>
                {event.title}
              </h3>
              <p className='text-sm text-gray-200 line-clamp-2'>
                {event.description}
              </p>
            </div>

            {/* Location and Organizer */}
            <div className='mt-4 pt-2 border-t border-white/20 flex justify-between items-center'>
              <span className='text-xs text-gray-200'>{event.location}</span>
              <div className='flex items-center space-x-2'>
                {event.user.profile?.avatar && (
                  <Image
                    src={event.user.profile.avatar}
                    alt={event.user.name || 'Organizer'}
                    width={20}
                    height={20}
                    className='rounded-full'
                  />
                )}
                <span className='text-xs text-gray-200'>{event.user.name}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <button className='bg-islamic-600 hover:bg-islamic-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
                RSVP Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

import { FC } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { EventList } from '@/components/events/event-list'
import { EventAnnouncements } from '@/components/events/event-announcements'
import { EventFilters } from '@/components/events/event-filters'
import { CalendarIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Events | Islamic Center',
  description: 'Browse upcoming events and programs at the Islamic Center',
}

interface EventsPageProps {
  searchParams: {
    search?: string
    sortBy?: string
    timeframe?: 'upcoming' | 'past' | 'all'
  }
}

const EventsPage: FC<EventsPageProps> = async ({
  searchParams: rawSearchParams,
}) => {
  const searchParams = await Promise.resolve(rawSearchParams)
  const search = searchParams.search
  const sortBy = searchParams.sortBy || 'startDate'
  const timeframe = searchParams.timeframe || 'upcoming'

  // Get upcoming featured events
  const upcomingEvents = await prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      startDate: 'asc',
    },
    take: 3,
    include: {
      user: {
        select: {
          name: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      notifications: {
        select: {
          status: true,
        },
      },
      emailLists: {
        select: {
          name: true,
          emails: true,
        },
      },
    },
  })

  // Get all events with filters
  const timeframeFilter = {
    upcoming: { startDate: { gte: new Date() } },
    past: { endDate: { lt: new Date() } },
    all: {},
  }[timeframe]

  const where = {
    AND: [
      search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
              { location: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {},
      timeframeFilter,
    ],
  }

  const allEvents = await prisma.event.findMany({
    where,
    orderBy: {
      [sortBy]: sortBy === 'title' ? 'asc' : 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      notifications: {
        select: {
          status: true,
        },
      },
      emailLists: {
        select: {
          name: true,
          emails: true,
        },
      },
    },
  })

  return (
    <div className='relative min-h-screen'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-islamic-pattern opacity-5' />

      {/* Content */}
      <div className='relative'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-islamic-600 to-islamic-700 text-white'>
          <div className='container mx-auto px-4 py-16'>
            <div className='flex items-center space-x-4 mb-4'>
              <CalendarIcon className='h-8 w-8' />
              <h1 className='text-4xl font-heading font-bold'>
                Events & Programs
              </h1>
            </div>
            <p className='text-islamic-100 max-w-2xl'>
              Join us for regular prayers, educational programs, and community
              events at the Islamic Center.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className='container mx-auto px-4 py-12'>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <section className='mb-16'>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-2xl font-heading font-semibold text-islamic-800 dark:text-islamic-100'>
                  Upcoming Events
                </h2>
                <span className='text-sm text-islamic-600 dark:text-islamic-400'>
                  Next {upcomingEvents.length} events
                </span>
              </div>
              <EventAnnouncements events={upcomingEvents} />
            </section>
          )}

          {/* All Events */}
          <section>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='text-2xl font-heading font-semibold text-islamic-800 dark:text-islamic-100'>
                Browse Events
              </h2>
            </div>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
              <EventFilters />
              <div className='mt-8'>
                <EventList events={allEvents} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default EventsPage

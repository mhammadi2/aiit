'use client'

import { useSession } from 'next-auth/react'
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EventsPage() {
  const { data: session } = useSession()

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Join Our
                <span className='block text-emerald-300'>Islamic Events</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Connect with your community through our diverse range of Islamic
                events, lectures, and gatherings.
              </p>
              <Button size='lg' className='bg-emerald-500 hover:bg-emerald-600'>
                View Calendar
              </Button>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/events-hero.jpg'
                  alt='Islamic Events'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Featured Events
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Don't miss our upcoming special events and gatherings
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {featuredEvents.map((event) => (
              <div
                key={event.title}
                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
              >
                <div className='relative h-64'>
                  <img
                    src={event.image}
                    alt={event.title}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full'>
                    Featured
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                    {event.title}
                  </h3>
                  <div className='space-y-3 mb-4'>
                    <div className='flex items-center text-gray-600'>
                      <CalendarDays className='w-5 h-5 mr-2 text-emerald-600' />
                      {event.date}
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <MapPin className='w-5 h-5 mr-2 text-emerald-600' />
                      {event.location}
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <Clock className='w-5 h-5 mr-2 text-emerald-600' />
                      {event.time}
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <Users className='w-5 h-5 mr-2 text-emerald-600' />
                      {event.capacity}
                    </div>
                  </div>
                  <p className='text-gray-600 mb-6'>{event.description}</p>
                  <div className='flex gap-4'>
                    <Button className='bg-emerald-500 hover:bg-emerald-600'>
                      Register Now
                    </Button>
                    <Button
                      variant='outline'
                      className='text-emerald-600 border-emerald-600 hover:bg-emerald-50'
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Upcoming Events
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Browse our calendar of upcoming events
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6'>
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300'
              >
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                  <div className='w-full md:w-48 h-48 rounded-lg overflow-hidden'>
                    <img
                      src={event.image}
                      alt={event.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 space-y-4'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                      {event.title}
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='flex items-center text-gray-600'>
                        <CalendarDays className='w-5 h-5 mr-2 text-emerald-600' />
                        {event.date}
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <MapPin className='w-5 h-5 mr-2 text-emerald-600' />
                        {event.location}
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Clock className='w-5 h-5 mr-2 text-emerald-600' />
                        {event.time}
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Users className='w-5 h-5 mr-2 text-emerald-600' />
                        {event.capacity}
                      </div>
                    </div>
                    <p className='text-gray-600'>{event.description}</p>
                  </div>
                  <div className='flex md:flex-col gap-4'>
                    <Button className='bg-emerald-500 hover:bg-emerald-600'>
                      Register
                    </Button>
                    <Button
                      variant='outline'
                      className='text-emerald-600 border-emerald-600 hover:bg-emerald-50'
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Calendar Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Events Calendar
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Plan ahead with our monthly events calendar
            </p>
          </div>

          {/* Calendar Component would go here */}
          <div className='bg-white rounded-xl shadow-sm p-8'>
            {/* Add your calendar component here */}
            <div className='text-center text-gray-600'>
              Calendar component to be implemented
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const featuredEvents = [
  {
    title: 'Annual Islamic Conference 2024',
    date: 'March 15-17, 2024',
    location: 'Grand Mosque Conference Center',
    time: '9:00 AM - 5:00 PM',
    capacity: '500 Attendees',
    description:
      'Join us for our annual Islamic conference featuring renowned scholars and speakers from around the world.',
    image: '/images/events/conference.jpg',
  },
  {
    title: 'Ramadan Night of Power',
    date: 'March 23, 2024',
    location: 'Central Masjid',
    time: '10:00 PM - 2:00 AM',
    capacity: '300 Attendees',
    description:
      'Special night prayer program during the blessed nights of Ramadan with Quran recitation and lectures.',
    image: '/images/events/ramadan.jpg',
  },
]

const upcomingEvents = [
  {
    title: 'Weekly Quran Study Circle',
    date: 'Every Sunday',
    location: 'Learning Center - Room 101',
    time: '10:00 AM - 12:00 PM',
    capacity: '50 Attendees',
    description:
      'Join our weekly Quran study circle to learn and understand the meanings of the Holy Quran.',
    image: '/images/events/quran-study.jpg',
  },
  {
    title: 'Youth Islamic Workshop',
    date: 'March 25, 2024',
    location: 'Community Center',
    time: '2:00 PM - 5:00 PM',
    capacity: '100 Attendees',
    description:
      'Interactive workshop designed specifically for Muslim youth to address contemporary challenges.',
    image: '/images/events/youth-workshop.jpg',
  },
  {
    title: 'Sisters Monthly Gathering',
    date: 'First Saturday of Every Month',
    location: 'Sisters Prayer Hall',
    time: '11:00 AM - 1:00 PM',
    capacity: '75 Attendees',
    description:
      'Monthly gathering for sisters to discuss Islamic topics and build community connections.',
    image: '/images/events/sisters-gathering.jpg',
  },
]

// app/page.tsx
'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  BookOpen,
  Book,
  Users,
  GraduationCap,
  Calendar,
  Award,
  BookOpenCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Explore the Beauty of
                <span className='block text-emerald-300'>Islamic Learning</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Join our comprehensive Islamic education platform, where
                traditional wisdom meets modern learning methods.
              </p>
              <div className='flex gap-4'>
                {isAuthenticated ? (
                  <Button
                    size='lg'
                    className='bg-emerald-500 hover:bg-emerald-600'
                  >
                    <Link href='/courses'>Explore Courses</Link>
                  </Button>
                ) : (
                  <Button
                    size='lg'
                    className='bg-emerald-500 hover:bg-emerald-600'
                  >
                    <Link href='/auth/signin'>Get Started</Link>
                  </Button>
                )}
                <Button
                  size='lg'
                  variant='outline'
                  className='text-white border-white hover:bg-white/10'
                >
                  <Link href='/about'>Learn More</Link>
                </Button>
              </div>
              {isAuthenticated && (
                <p className='text-emerald-200 text-lg'>
                  Welcome back, {session.user.name}!
                </p>
              )}
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/islamic-art.png'
                  alt='Islamic Geometric Pattern'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Why Choose Our Institute
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Discover the unique features that make our learning experience
              special
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
              >
                <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6'>
                  <feature.icon className='w-6 h-6 text-emerald-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Featured Programs
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Select from our carefully designed Islamic studies programs
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {programs.map((program) => (
              <div
                key={program.title}
                className='border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300'
              >
                <div className='relative h-48'>
                  <img
                    src={program.image}
                    alt={program.title}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {program.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{program.description}</p>
                  <div className='flex justify-between items-center'>
                    <span className='text-emerald-600 font-semibold'>
                      {program.duration}
                    </span>
                    <Button
                      variant='outline'
                      className='text-emerald-600 border-emerald-600 hover:bg-emerald-50'
                    >
                      <Link
                        href={
                          isAuthenticated
                            ? `/programs/${program.id}`
                            : '/auth/signin'
                        }
                      >
                        {isAuthenticated ? 'View Details' : 'Sign in to Enroll'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-emerald-900 text-white py-20'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-3xl font-bold mb-8'>
            Start Your Learning Journey Today
          </h2>
          <p className='text-emerald-100 text-lg mb-8 max-w-2xl mx-auto'>
            Join thousands of students worldwide in discovering the depths of
            Islamic knowledge through our comprehensive programs.
          </p>
          <Button
            size='lg'
            className='bg-white text-emerald-900 hover:bg-emerald-50'
          >
            <Link href={isAuthenticated ? '/courses' : '/auth/signin'}>
              {isAuthenticated ? 'Browse All Courses' : 'Begin Your Journey'}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    icon: BookOpenCheck,
    title: 'Authentic Knowledge',
    description:
      'Learn from verified sources and qualified scholars with authentic chains of narration.',
  },
  {
    icon: Book,
    title: 'Comprehensive Curriculum',
    description:
      'Structured learning covering Quran, Hadith, Fiqh, and Islamic History.',
  },
  {
    icon: Users,
    title: 'Expert Teachers',
    description:
      'Learn from qualified scholars with extensive experience in Islamic education.',
  },
  {
    icon: GraduationCap,
    title: 'Certified Programs',
    description:
      'Earn recognized certificates upon completion of our structured programs.',
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description:
      'Choose from various time slots that fit your schedule and learning pace.',
  },
  {
    icon: Award,
    title: 'Quality Standards',
    description:
      'Experience high educational standards with regular assessments and feedback.',
  },
]

const programs = [
  {
    id: 'quran-memorization',
    title: 'Quran Memorization',
    description: 'Complete Hifz program with tajweed and tafsir understanding.',
    duration: '3-4 Years',
    image: '/images/quran-program.jpg',
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies Diploma',
    description: 'Comprehensive study of Islamic sciences and Arabic language.',
    duration: '2 Years',
    image: '/images/islamic-studies.jpg',
  },
  {
    id: 'arabic-language',
    title: 'Arabic Language',
    description: 'Master Arabic through our intensive language program.',
    duration: '1 Year',
    image: '/images/arabic-program.jpg',
  },
]

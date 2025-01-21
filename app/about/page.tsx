'use client'

import { useSession } from 'next-auth/react'
import {
  BookOpen,
  Users,
  Heart,
  Star,
  Target,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const { data: session } = useSession()

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Our Journey of
                <span className='block text-emerald-300'>Islamic Education</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Dedicated to spreading authentic Islamic knowledge through modern
                educational methods while preserving traditional values.
              </p>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/mosque-interior.jpg'
                  alt='Mosque Interior'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Our Mission & Vision
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Guiding principles that drive our educational journey
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6'>
                <Target className='w-6 h-6 text-emerald-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Our Mission
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                To provide accessible, authentic Islamic education that combines
                traditional wisdom with modern teaching methods, enabling Muslims
                worldwide to understand and practice their faith confidently.
              </p>
            </div>
            <div className='bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
              <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6'>
                <Globe className='w-6 h-6 text-emerald-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Our Vision
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                To become the leading global platform for Islamic education,
                fostering a community of knowledgeable Muslims who embody Islamic
                values in the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>Our Core Values</h2>
            <p className='mt-4 text-lg text-gray-600'>
              The principles that guide our educational approach
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {values.map((value) => (
              <div
                key={value.title}
                className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300'
              >
                <div className='w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6'>
                  <value.icon className='w-6 h-6 text-emerald-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>Our Team</h2>
            <p className='mt-4 text-lg text-gray-600'>
              Meet the dedicated scholars and educators behind our mission
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {team.map((member) => (
              <div
                key={member.name}
                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
              >
                <div className='relative h-48'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                    {member.name}
                  </h3>
                  <p className='text-emerald-600 mb-2'>{member.role}</p>
                  <p className='text-sm text-gray-600'>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const values = [
  {
    title: 'Authentic Knowledge',
    description: 'Committed to teaching authentic Islamic knowledge from reliable sources.',
    icon: BookOpen,
  },
  {
    title: 'Community Focus',
    description: 'Building a supportive global community of learners and educators.',
    icon: Users,
  },
  {
    title: 'Excellence',
    description: 'Striving for excellence in education and service delivery.',
    icon: Star,
  },
]

const team = [
  {
    name: 'Dr. Ahmad Khan',
    role: 'Director of Education',
    description: 'PhD in Islamic Studies with 20 years of teaching experience.',
    image: '/images/team/director.jpg',
  },
  {
    name: 'Ustadha Sarah Ahmed',
    role: 'Head of Curriculum',
    description: 'Expert in Islamic curriculum development and teaching methodology.',
    image: '/images/team/curriculum-head.jpg',
  },
  {
    name: 'Sheikh Mohammed Ali',
    role: 'Senior Scholar',
    description: 'Graduate of Al-Azhar University with expertise in Fiqh and Hadith.',
    image: '/images/team/scholar.jpg',
  },
  {
    name: 'Dr. Aisha Rahman',
    role: 'Community Director',
    description: 'Specialized in Islamic community development and education.',
    image: '/images/team/community.jpg',
  },
]

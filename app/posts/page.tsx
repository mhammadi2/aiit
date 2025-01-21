'use client'

import { useSession } from 'next-auth/react'
import {
  BookOpen,
  Clock,
  User,
  Tag,
  ChevronRight,
  Search,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function BlogPage() {
  const { data: session } = useSession()

  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white'>
        <div className='container mx-auto px-6 py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <h1 className='text-5xl font-bold leading-tight'>
                Islamic Knowledge
                <span className='block text-emerald-300'>& Insights</span>
              </h1>
              <p className='text-xl text-emerald-100'>
                Explore our collection of articles, insights, and teachings from
                qualified Islamic scholars and educators.
              </p>
              <div className='relative'>
                <Input
                  type='search'
                  placeholder='Search articles...'
                  className='w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-12'
                />
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5' />
              </div>
            </div>
            <div className='hidden md:block'>
              <div className='relative'>
                <div className='absolute inset-0 bg-emerald-500 rounded-full opacity-20 blur-3xl'></div>
                <img
                  src='/images/blog-hero.jpg'
                  alt='Islamic Knowledge'
                  className='relative z-10 rounded-lg shadow-xl'
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Featured Articles
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Discover our most impactful and insightful content
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {featuredPosts.map((post) => (
              <div
                key={post.title}
                className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
              >
                <div className='relative h-48'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full'>
                    Featured
                  </div>
                </div>
                <div className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='flex items-center text-sm text-gray-600'>
                      <Clock className='w-4 h-4 mr-1' />
                      {post.date}
                    </div>
                    <div className='flex items-center text-sm text-gray-600'>
                      <User className='w-4 h-4 mr-1' />
                      {post.author}
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {post.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{post.excerpt}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className='px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm'
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant='ghost'
                      className='text-emerald-600 hover:text-emerald-700'
                    >
                      Read More <ChevronRight className='w-4 h-4 ml-1' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className='py-20'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Sidebar */}
            <div className='lg:col-span-1 space-y-6'>
              <div className='bg-white rounded-xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold mb-4'>Categories</h3>
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className='flex items-center justify-between w-full px-4 py-2 text-left rounded-lg hover:bg-emerald-50'
                    >
                      <span className='text-gray-600'>{category.name}</span>
                      <span className='text-sm text-gray-400'>
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-sm p-6'>
                <h3 className='text-lg font-semibold mb-4'>Popular Tags</h3>
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm cursor-pointer hover:bg-emerald-200'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className='lg:col-span-3 space-y-8'>
              {posts.map((post) => (
                <div
                  key={post.title}
                  className='bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300'
                >
                  <div className='flex flex-col md:flex-row'>
                    <div className='md:w-64 h-48 md:h-auto'>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='p-6 flex-1'>
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='flex items-center text-sm text-gray-600'>
                          <Clock className='w-4 h-4 mr-1' />
                          {post.date}
                        </div>
                        <div className='flex items-center text-sm text-gray-600'>
                          <User className='w-4 h-4 mr-1' />
                          {post.author}
                        </div>
                      </div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {post.title}
                      </h3>
                      <p className='text-gray-600 mb-4'>{post.excerpt}</p>
                      <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                          {post.categories.map((category) => (
                            <span
                              key={category}
                              className='px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm'
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant='ghost'
                          className='text-emerald-600 hover:text-emerald-700'
                        >
                          Read More <ChevronRight className='w-4 h-4 ml-1' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className='flex justify-center gap-2 mt-12'>
                <Button
                  variant='outline'
                  className='text-emerald-600 border-emerald-600'
                >
                  Previous
                </Button>
                <Button className='bg-emerald-500 hover:bg-emerald-600'>
                  1
                </Button>
                <Button
                  variant='outline'
                  className='text-emerald-600 border-emerald-600'
                >
                  2
                </Button>
                <Button
                  variant='outline'
                  className='text-emerald-600 border-emerald-600'
                >
                  3
                </Button>
                <Button
                  variant='outline'
                  className='text-emerald-600 border-emerald-600'
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const featuredPosts = [
  {
    title: 'Understanding the Importance of Tawheed',
    excerpt:
      'Explore the fundamental concept of Islamic monotheism and its significance in our daily lives.',
    date: 'March 1, 2024',
    author: 'Dr. Ahmad Khan',
    image: '/images/blog/tawheed.jpg',
    categories: ['Aqeedah', 'Featured'],
  },
  {
    title: 'The Ethics of Islamic Business Practices',
    excerpt:
      'Learn about the Islamic principles governing business transactions and ethical commerce.',
    date: 'February 28, 2024',
    author: 'Sheikh Mohammed Ali',
    image: '/images/blog/business.jpg',
    categories: ['Fiqh', 'Business'],
  },
  {
    title: 'Raising Muslim Children in Modern Times',
    excerpt:
      'Practical guidance for Muslim parents navigating contemporary challenges in child-rearing.',
    date: 'February 25, 2024',
    author: 'Ustadha Sarah Ahmed',
    image: '/images/blog/parenting.jpg',
    categories: ['Family', 'Education'],
  },
]

const posts = [
  // Add more regular posts here
  {
    title: 'The Significance of Dhikr in Daily Life',
    excerpt:
      'Discover the spiritual and practical benefits of remembering Allah throughout your day.',
    date: 'February 20, 2024',
    author: 'Sheikh Abdullah',
    image: '/images/blog/dhikr.jpg',
    categories: ['Spirituality'],
  },
  // Add more posts...
]

const categories = [
  { name: 'Aqeedah', count: 15 },
  { name: 'Fiqh', count: 23 },
  { name: 'Hadith', count: 18 },
  { name: 'Tafsir', count: 12 },
  { name: 'Islamic History', count: 9 },
  { name: 'Family', count: 14 },
  { name: 'Spirituality', count: 20 },
]

const tags = [
  'Ramadan',
  'Prayer',
  'Quran',
  'Seerah',
  'Marriage',
  'Education',
  'Zakat',
  'Hajj',
  'Fasting',
  'Dawah',
]

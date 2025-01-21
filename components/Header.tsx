'use client'

import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Post', path: '/post' },
    { name: 'AI Chatbot', path: '/chatbot' },
    { name: 'Donate', path: '/donate' },
  ]

  return (
    <header className='bg-white shadow-md'>
      <nav className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div className='text-2xl font-bold'>
            <Link href='/' className='text-blue-600'>
              Logo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-6'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className='text-gray-600 hover:text-blue-600 transition-colors duration-300'
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMenuOpen ? (
                <path d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 space-y-4'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className='block text-gray-600 hover:text-blue-600 transition-colors duration-300'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

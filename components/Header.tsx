'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Post', path: '/post' },
    { name: 'AI Chatbot', path: '/chatbot' },
    { name: 'Donate', path: '/donate' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast({
        title: 'Signed out successfully',
        description: 'Come back soon!',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      })
    }
  }

  const AuthButtons = () => {
    if (status === 'loading') {
      return <div className='h-9 w-9 animate-pulse rounded-full bg-gray-200' />
    }

    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
              <div className='flex h-full w-full items-center justify-center rounded-full bg-blue-100'>
                <span className='text-sm font-medium text-blue-700'>
                  {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <div className='flex items-center justify-start gap-2 p-2'>
              <div className='flex flex-col space-y-1 leading-none'>
                {session.user?.name && (
                  <p className='font-medium'>{session.user.name}</p>
                )}
                {session.user?.email && (
                  <p className='text-sm text-gray-500'>{session.user.email}</p>
                )}
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link
                href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className='w-full'
              >
                {session.user?.role === 'ADMIN'
                  ? 'Admin Dashboard'
                  : 'Dashboard'}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/profile' className='w-full'>
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-600' onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <div className='flex space-x-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='text-blue-600 border-blue-600'>
              Sign In
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuItem
              onClick={() => signIn('credentials', { role: 'USER' })}
            >
              Sign in as User
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signIn('credentials', { role: 'ADMIN' })}
            >
              Sign in as Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href='/auth/signup'>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
            Sign Up
          </Button>
        </Link>
      </div>
    )
  }

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
          <div className='hidden md:flex items-center space-x-6'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className='text-gray-600 hover:text-blue-600 transition-colors duration-300'
              >
                {item.name}
              </Link>
            ))}
            <AuthButtons />
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
            <div className='pt-4 border-t'>
              <AuthButtons />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

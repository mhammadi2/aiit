import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  HomeIcon,
  CalendarIcon,
  UserCircleIcon,
  BookmarkIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Events', href: '/dashboard/events', icon: CalendarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: BookmarkIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
]

export const DashboardSidebar: FC = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className='hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'>
      <div className='flex-1 flex flex-col min-h-0'>
        {/* Sidebar Header */}
        <div className='flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700'>
          <Link href='/dashboard' className='flex items-center space-x-2'>
            {/* You can add your logo here */}
            <span className='text-xl font-bold text-islamic-600 dark:text-islamic-400'>
              Islamic Center
            </span>
          </Link>
        </div>

        {/* User Info */}
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='h-8 w-8 rounded-full bg-islamic-500 flex items-center justify-center'>
                <span className='text-white font-medium'>
                  {session?.user?.name?.[0] || 'U'}
                </span>
              </div>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>
                {session?.user?.name || 'User'}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-2 py-4 space-y-1'>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-islamic-50 text-islamic-600 dark:bg-islamic-900 dark:text-islamic-200'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
              >
                <item.icon
                  className={`${
                    isActive
                      ? 'text-islamic-500'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  } mr-3 flex-shrink-0 h-5 w-5`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className='flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700'>
        <button
          onClick={() => signOut()}
          className='group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 w-full transition-colors duration-150'
        >
          <ArrowLeftOnRectangleIcon className='mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300' />
          Sign Out
        </button>
      </div>
    </div>
  )
}

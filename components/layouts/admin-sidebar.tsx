import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarIcon },
  { name: 'Posts', href: '/admin/posts', icon: DocumentTextIcon },
]

export const AdminSidebar: FC = () => {
  const pathname = usePathname()

  return (
    <div className='hidden md:flex md:flex-shrink-0'>
      <div className='flex flex-col w-64'>
        <div className='flex flex-col h-0 flex-1 bg-islamic-800 dark:bg-gray-800'>
          <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <span className='text-white text-xl font-bold'>
                Admin Dashboard
              </span>
            </div>
            <nav className='mt-5 flex-1 px-2 space-y-1'>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-islamic-900 text-white'
                        : 'text-islamic-100 hover:bg-islamic-700'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-islamic-100' : 'text-islamic-300'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

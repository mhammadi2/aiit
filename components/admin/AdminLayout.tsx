'use client'

import Link from 'next/link'
import { useState } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Donations', path: '/admin/donations', icon: '💰' },
    { name: 'Events', path: '/admin/events', icon: '📅' },
    { name: 'Posts', path: '/admin/posts', icon: '📝' },
  ]

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen ${
          isSidebarOpen ? '' : 'hidden'
        }`}
      >
        <div className='p-4'>
          <h2 className='text-2xl font-bold'>Admin Panel</h2>
        </div>
        <nav className='mt-8'>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className='flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              <span className='mr-3'>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white shadow'>
          <div className='px-4 py-4 flex justify-between items-center'>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='text-gray-500 focus:outline-none'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </header>

        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

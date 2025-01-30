import { FC, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <AdminSidebar />
      <main className='flex-1 overflow-auto'>
        <div className='container mx-auto px-6 py-8'>{children}</div>
      </main>
    </div>
  )
}

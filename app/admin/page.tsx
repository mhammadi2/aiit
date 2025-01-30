import { AdminLayout } from '@/components/layouts/admin-layout'
import { Card } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import {
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

export default async function AdminDashboardPage() {
  // Get counts for dashboard
  const [userCount, eventCount, postCount, donationTotal] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.post.count(),
    prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'COMPLETED',
      },
    }),
  ])

  const stats = [
    { name: 'Total Users', value: userCount, icon: UsersIcon },
    { name: 'Total Events', value: eventCount, icon: CalendarIcon },
    { name: 'Total Posts', value: postCount, icon: DocumentTextIcon },
    {
      name: 'Total Donations',
      value: `$${(donationTotal._sum.amount || 0).toLocaleString()}`,
      icon: CurrencyDollarIcon,
    },
  ]

  return (
    <AdminLayout>
      <h1 className='text-3xl font-bold mb-8'>Dashboard Overview</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat) => (
          <Card key={stat.name} className='p-6'>
            <div className='flex items-center'>
              <div className='p-3 rounded-full bg-islamic-100 dark:bg-islamic-800'>
                <stat.icon className='h-6 w-6 text-islamic-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {stat.name}
                </p>
                <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  )
}

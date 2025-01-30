import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { UserProfile } from '@/components/dashboard/user-profile'
import { UserEvents } from '@/components/dashboard/user-events'
import { UserPosts } from '@/components/dashboard/user-posts'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
      events: {
        take: 5,
        orderBy: { startDate: 'desc' },
      },
      posts: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <UserProfile user={user} />
        <div className='space-y-6'>
          <UserEvents events={user.events} />
          <UserPosts posts={user.posts} />
        </div>
      </div>
    </DashboardLayout>
  )
}

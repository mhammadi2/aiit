import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'

export default async function AdminDashboard() {
  const stats = await prisma.$transaction([
    prisma.user.count(),
    prisma.donation.count(),
    prisma.event.count(),
    prisma.post.count(),
  ])

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-10'>Admin Dashboard</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{stats[0]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{stats[1]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{stats[2]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>{stats[3]}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

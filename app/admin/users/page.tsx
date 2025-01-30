import { AdminLayout } from '@/components/layouts/admin-layout'
import { UserTable } from '@/components/admin/user-table'
import { prisma } from '@/lib/prisma'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  })

  return (
    <AdminLayout>
      <h1 className='text-3xl font-bold mb-8'>User Management</h1>
      <UserTable users={users} />
    </AdminLayout>
  )
}

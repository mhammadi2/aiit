// components/admin/dashboard/events-dashboard.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/components/admin/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export function EventsDashboard({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter()
  const [events, setEvents] = useState(initialEvents)

  const columns = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => format(new Date(row.getValue('startDate')), 'PPP'),
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'notifications',
      header: 'Notification Status',
      cell: ({ row }) => {
        const notifications = row.original.notifications
        const lastNotification = notifications[0]

        if (!lastNotification) return null

        return (
          <Badge
            variant={
              lastNotification.status === 'SENT'
                ? 'success'
                : lastNotification.status === 'FAILED'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {lastNotification.status}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className='flex space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => router.push(`/admin/events/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              router.push(`/admin/events/${row.original.id}/notifications`)
            }
          >
            Notifications
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardDescription>
          Manage your events and their notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <Button onClick={() => router.push('/admin/events/new')}>
            Create New Event
          </Button>
        </div>
        <DataTable columns={columns} data={events} />
      </CardContent>
    </Card>
  )
}

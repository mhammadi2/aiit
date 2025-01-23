// app/admin/layout.tsx
import { AdminHeader } from '@/components/admin/header'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex'>
      <AdminSidebar />
      <div className='flex-1'>
        <AdminHeader />
        <main className='p-6'>{children}</main>
      </div>
    </div>
  )
}

// app/admin/page.tsx
import { AdminDashboard } from '@/components/admin/dashboard/overview'

export default async function AdminPage() {
  // Fetch dashboard data here
  const dashboardData = await fetchDashboardData()

  return <AdminDashboard data={dashboardData} />
}

// app/admin/events/page.tsx
import { EventsDashboard } from '@/components/admin/dashboard/events-dashboard'

export default async function EventsPage() {
  // Fetch events data
  const events = await fetchEvents()

  return <EventsDashboard initialEvents={events} />
}

// app/admin/events/new/page.tsx
import { EventForm } from '@/components/admin/events/event-form'
import { fetchEmailLists } from '@/lib/data'

export default async function NewEventPage() {
  const emailLists = await fetchEmailLists()

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Create New Event</h1>
      <EventForm emailLists={emailLists} />
    </div>
  )
}

// app/admin/events/[id]/page.tsx
import { EventForm } from '@/components/admin/events/event-form'
import { fetchEvent, fetchEmailLists } from '@/lib/data'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const [event, emailLists] = await Promise.all([
    fetchEvent(params.id),
    fetchEmailLists(),
  ])

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Edit Event</h1>
      <EventForm event={event} emailLists={emailLists} />
    </div>
  )
}

// app/admin/events/[id]/notifications/page.tsx
import { NotificationsList } from '@/components/admin/events/notifications-list'
import { fetchEventNotifications } from '@/lib/data'

export default async function EventNotificationsPage({
  params,
}: {
  params: { id: string }
}) {
  const notifications = await fetchEventNotifications(params.id)

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Event Notifications</h1>
      <NotificationsList notifications={notifications} />
    </div>
  )
}

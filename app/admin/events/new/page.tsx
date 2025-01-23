import { EventForm } from '@/components/admin/events/event-form'
import { fetchEmailLists } from '@/lib/data'

export default async function NewEventPage() {
  const emailLists = await fetchEmailLists()
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Notifications</h1>
      <NotificationsList notifications={notifications} />
    </div>
  )
}
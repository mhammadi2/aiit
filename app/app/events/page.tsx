import { CalendarDays, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EventsPage() {
  const events = [
    {
      title: 'Islamic Conference 2024',
      date: 'March 15-17, 2024',
      location: 'Grand Mosque Conference Center',
      time: '9:00 AM - 5:00 PM',
      description:
        'Join us for our annual Islamic conference featuring renowned scholars and speakers.',
      image: '/images/events/conference.jpg',
    },
    // Add more events...
  ]

  return (
    <div className='container py-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Upcoming Events</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        {events.map((event, index) => (
          <Card key={index} className='overflow-hidden'>
            <CardHeader className='relative h-48'>
              <img
                src={event.image}
                alt={event.title}
                className='absolute inset-0 w-full h-full object-cover'
              />
            </CardHeader>
            <CardContent className='p-6'>
              <CardTitle className='mb-4'>{event.title}</CardTitle>
              <div className='space-y-2 mb-4'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <CalendarDays className='w-4 h-4' />
                  {event.date}
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <MapPin className='w-4 h-4' />
                  {event.location}
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Clock className='w-4 h-4' />
                  {event.time}
                </div>
              </div>
              <p className='text-muted-foreground mb-4'>{event.description}</p>
              <Button>Register Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

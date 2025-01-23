// components/admin/events/event-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useToast } from '@/components/ui/use-toast'
import { eventSchema } from '@/lib/validations/schema'
import { ImageUpload } from '@/components/shared/image-upload'

interface EmailList {
  id: string
  name: string
  description?: string
}

export function EventForm({ emailLists }: { emailLists: EmailList[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      imageUrl: '',
      selectedEmailLists: [],
      sendNotification: true,
    },
  })

  async function onSubmit(data: any) {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create event')

      toast({
        title: 'Success',
        description: 'Event created successfully',
      })

      router.push('/admin/events')
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < form.watch('startDate') ||
                        date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange('')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='selectedEmailLists'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Lists</FormLabel>
              <div className='space-y-2'>
                {emailLists.map((list) => (
                  <div key={list.id} className='flex items-center space-x-2'>
                    <Checkbox
                      checked={field.value.includes(list.id)}
                      onCheckedChange={(checked) => {
                        const value = checked
                          ? [...field.value, list.id]
                          : field.value.filter((id: string) => id !== list.id)
                        field.onChange(value)
                      }}
                    />
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {list.name}
                      {list.description && (
                        <p className='text-sm text-muted-foreground'>
                          {list.description}
                        </p>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sendNotification'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Send email notifications</FormLabel>
                <p className='text-sm text-muted-foreground'>
                  Notify selected email lists about this event
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Event'}
        </Button>
      </form>
    </Form>
  )
}

// // components/events/event-form.tsx
// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'
// import { Calendar } from '@/components/ui/calendar'
// import { Button } from '@/components/ui/button'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { useToast } from '@/components/ui/use-toast'
// import { eventSchema } from '@/lib/validations/schema'
// import type { z } from 'zod'

// type EventFormValues = z.infer<typeof eventSchema>

// export function EventForm({ event }: { event?: EventFormValues }) {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(false)

//   const form = useForm<EventFormValues>({
//     resolver: zodResolver(eventSchema),
//     defaultValues: event || {
//       title: '',
//       description: '',
//       location: '',
//       startDate: new Date(),
//       endDate: new Date(),
//     },
//   })

//   async function onSubmit(data: EventFormValues) {
//     setIsLoading(true)

//     try {
//       const response = await fetch('/api/events', {
//         method: event ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         throw new Error('Something went wrong')
//       }

//       toast({
//         title: 'Success',
//         description: `Event ${event ? 'updated' : 'created'} successfully`,
//       })

//       router.push('/events')
//       router.refresh()
//     } catch (error) {
//       toast({
//         variant: 'destructive',
//         title: 'Error',
//         description: 'Something went wrong. Please try again.',
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
//         <FormField
//           control={form.control}
//           name='title'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* Add other form fields */}
//         <Button type='submit' disabled={isLoading}>
//           {isLoading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
//         </Button>
//       </form>
//     </Form>
//   )
// }

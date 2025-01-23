import * as z from 'zod'

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().optional(),
  selectedEmailLists: z.array(z.string()),
  sendNotification: z.boolean(),
})

// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

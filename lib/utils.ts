import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventDate(date: Date) {
  return format(new Date(date), 'EEEE, MMMM d, yyyy')
}

export function formatEventTime(date: Date) {
  return format(new Date(date), 'h:mm a')
}

// types/index.ts
export interface Profile {
  id: string
  userId: string
  avatar?: string | null
  bio?: string | null
  phoneNumber?: string | null
  address?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name?: string | null
  email: string
  role: 'USER' | 'ADMIN'
  profile?: Profile | null
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  imageUrl?: string | null
  userId: string
  user: User
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string | null
  authorId: string
  author: User
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Donation {
  id: string
  amount: number
  userId: string
  user: User
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  paymentMethod: 'STRIPE' | 'PAYPAL'
  transactionId?: string | null
  refundStatus: 'NONE' | 'PENDING' | 'COMPLETED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
}

export interface EmailList {
  id: string
  name: string
  description?: string | null
  emails: string[]
  events: Event[]
  createdAt: Date
  updatedAt: Date
}

export interface EventNotification {
  id: string
  eventId: string
  event: Event
  status: 'PENDING' | 'SENT' | 'FAILED'
  sentAt?: Date | null
  error?: string | null
  createdAt: Date
  updatedAt: Date
}

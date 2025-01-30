import { Role } from "@prisma/client"

export interface User {
  id: string
  name?: string | null
  email: string
  role: Role
  profile?: Profile
  createdAt: Date
  updatedAt: Date
}

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

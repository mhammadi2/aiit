export type Role = 'USER' | 'ADMIN'

export interface UserSession {
  id: string
  name: string | null
  email: string
  role: Role
}
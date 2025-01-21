import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'USER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User {
    role?: 'USER' | 'ADMIN'
  }
}

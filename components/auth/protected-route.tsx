'use client'

import { FC, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: Array<'USER' | 'ADMIN'>
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ['USER', 'ADMIN'],
}) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/auth/signin')
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect('/')
  }

  return <>{children}</>
}

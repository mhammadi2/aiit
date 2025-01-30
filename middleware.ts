import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')

  // Handle auth pages (signin, signup)
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Handle admin pages and API routes
  if (isAdminPage || isApiRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (token.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    return NextResponse.next()
  }

  // Handle protected routes
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/auth/:path*',
  ],
}

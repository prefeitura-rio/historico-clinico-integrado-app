import { NextRequest, NextResponse } from 'next/server'
import { NO_ACCESS_COOKIE } from '@/lib/api'

export function middleware(request: NextRequest) {
  console.log('Middleware executando para:', request.nextUrl.pathname)

  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/no-access') {
    console.log('Deleting cookie:', NO_ACCESS_COOKIE)
    response.cookies.delete(NO_ACCESS_COOKIE)
  }

  return response
}

export const config = {
  matcher: ['/no-access'],
}
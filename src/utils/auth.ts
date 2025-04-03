import { cookies } from 'next/headers'

import { ACCESS_TOKEN_COOKIE, NO_ACCESS_COOKIE } from '@/lib/api'

export async function hasAccessToken() {
  const cookieStore = await cookies()
  return !!cookieStore.get(ACCESS_TOKEN_COOKIE)?.value
}

export async function hasNoAccess() {
  const cookieStore = await cookies()
  // If the cookie exists, it means the user has no access.
  return !!cookieStore.get(NO_ACCESS_COOKIE)?.value
}

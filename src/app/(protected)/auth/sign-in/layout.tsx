import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import {
  hasAccessToken,
  hasNoAccess,
} from '@/utils/auth'

import { NO_ACCESS_COOKIE } from '@/lib/api'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()

  const isRestricted = await hasNoAccess()
  if (isRestricted) {
    // ✅ Deleta o cookie antes de redirecionar
    cookieStore.delete(NO_ACCESS_COOKIE)
    redirect('/no-access')
  }

  const isAuthenticaded = await hasAccessToken()
  if (isAuthenticaded) {
    redirect('/')
  }

  return <div className="min-w-[1100px]">{children}</div>
}
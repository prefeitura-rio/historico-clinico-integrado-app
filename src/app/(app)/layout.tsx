'use server'

import { redirect } from 'next/navigation'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { hasAccessToken } from '@/utils/auth'
import LogoutTimeOut from '@/utils/logout-timeout'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticaded = await hasAccessToken()

  if (!isAuthenticaded) {
    console.error('App Layout: User is not authenticated')
    redirect('/auth/sign-in')
  }

  return (
    <div>
      <CustomQueryClientProvider>
        <LogoutTimeOut />
        {children}
      </CustomQueryClientProvider>
    </div>
  )
}
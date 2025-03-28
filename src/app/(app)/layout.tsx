'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { hasAccessToken } from '@/utils/auth'
import LogoutTimeOut from '@/utils/logout-timeout'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticaded = await hasAccessToken()

  const pathname = headers().get('x-next-url') || '[desconhecido]'
  console.log('App Layout: Rota atual é', pathname)

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
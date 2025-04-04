'use server'

import { redirect } from 'next/navigation'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { hasAccessToken } from '@/utils/auth'
import LogoutTimeOut from '@/utils/logout-timeout'
import FeedbackButton from '@/components/custom-ui/feedback-button'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticaded = await hasAccessToken()

  if (!isAuthenticaded) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      <CustomQueryClientProvider>
        <LogoutTimeOut />
        <FeedbackButton />
        {children}
      </CustomQueryClientProvider>
    </div>
  )
}
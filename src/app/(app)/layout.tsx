import { redirect } from 'next/navigation'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { isAuthenticated } from '@/utils/auth'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px]">
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </div>
  )
}

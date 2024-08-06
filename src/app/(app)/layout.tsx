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
    <div className="flex min-h-screen">
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </div>
  )
}

import { redirect } from 'next/navigation'

import { hasAccessToken, hasNoAccess } from '@/utils/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticaded = await hasAccessToken()
  const isRestricted = await hasNoAccess()

  if (isRestricted) {
    console.error('SignIn Layout: User has no access')
    redirect('/no-access')
  }

  if (isAuthenticaded) {
    console.error('SignIn Layout: User is authenticated')
    redirect('/')
  }
  return <div className="min-w-[1100px]">{children}</div>
}

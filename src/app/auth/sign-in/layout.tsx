import { redirect } from 'next/navigation'

import { hasAccessToken } from '@/utils/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticaded = await hasAccessToken()

  if (isAuthenticaded) {
    console.error('SignIn Layout: User is authenticated')
    redirect('/')
  }
  return <div className="min-w-[1100px]">{children}</div>
}

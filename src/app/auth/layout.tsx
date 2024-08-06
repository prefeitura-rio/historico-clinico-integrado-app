import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils/auth'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return <div>{children}</div>
}

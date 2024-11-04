import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return <div className="min-w-[1100px]">{children}</div>
}

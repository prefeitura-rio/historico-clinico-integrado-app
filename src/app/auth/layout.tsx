import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/utils/auth'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Login',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return <div className="min-w-[1100px]">{children}</div>
}

import { redirect, usePathname } from 'next/navigation';

import { hasAccessToken } from '@/utils/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const isAuthenticaded = await hasAccessToken()

  // Added to avoid redirecting to the home page when the user is redirected from the SSO
  const isPublicPath = pathname?.startsWith('/auth/sso/callback');

  if (isAuthenticaded && !isPublicPath) {
    redirect('/')
  }
  return <div className="min-w-[1100px]">{children}</div>
}

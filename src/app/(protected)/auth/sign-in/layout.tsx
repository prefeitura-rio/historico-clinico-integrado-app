import { redirect } from 'next/navigation'

import { 
  hasAccessToken, 
  hasNoAccess,
} from '@/utils/auth'
import { NO_ACCESS_COOKIE } from '@/lib/api';
import { deleteCookie } from 'cookies-next';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const isRestricted = await hasNoAccess()
  console.error('isRestricted', isRestricted);
  if (isRestricted) {
    deleteCookie(NO_ACCESS_COOKIE)
    redirect('/no-access')
  }
  
  const isAuthenticaded = await hasAccessToken()
  if (isAuthenticaded) {
    redirect('/')
  }
  return <div className="min-w-[1100px]">{children}</div>
}

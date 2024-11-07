'use client'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { queryClient } from '@/lib/react-query'
import { logout } from '@/utils/logout'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  useEffect(() => {
    // Function to decode the JWT and get the expiration time
    const token = getCookie('token')
    const tokenExpiry = getCookie('tokenExpirationDate')

    if (token && tokenExpiry) {
      const timeRemaining = Date.parse(tokenExpiry) - Date.now()
      if (timeRemaining > 0) {
        const timeout = setTimeout(() => {
          queryClient.clear()
          logout()
          clearTimeout(timeout)
        }, timeRemaining)

        return () => clearTimeout(timeout)
      } else {
        queryClient.clear()
        logout()
      }
    } else {
      router.push('/auth/sign-in')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </div>
  )
}

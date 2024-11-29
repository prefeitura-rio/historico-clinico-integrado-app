'use client'

import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { env } from '@/env/client'
import { CustomQueryClientProvider } from '@/hooks/query-client-provider'
import { queryClient } from '@/lib/react-query'
import { getCaptchaToken } from '@/utils/get-captcha'
import { logout } from '@/utils/logout'
import { verifyCaptchaToken } from '@/utils/verify-captcha'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  useEffect(() => {
    function setLogoutTimeout() {
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
    }

    const interval = setInterval(
      () => {
        getCaptchaToken(
          'periodicValidation',
          env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
        ).then((token) =>
          verifyCaptchaToken(token).then((tokenValidation) =>
            console.log({ tokenValidation }),
          ),
        )
      },
      1000 * 60 * 5,
    ) // 5 minutes

    setLogoutTimeout()

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
    </div>
  )
}

'use client'

import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
  GRANT_ERROR_TOAST_COOKIE_KEY,
} from '@/lib/api'
import { queryClient } from '@/lib/react-query'
import { logout } from '@/utils/logout'

export default function LogoutTimeOut() {
  const router = useRouter()

  useEffect(() => {
    async function setLogoutTimeout() {
      toast.dismiss('expired_token') // Fecha o toast de token expirado

      const token = await getCookie(ACCESS_TOKEN_COOKIE)
      const tokenExpiry = await getCookie(ACCESS_TOKEN_EXPIRATION_DATE_COOKIE)

      if (token && tokenExpiry) {
        const timeRemaining = Date.parse(tokenExpiry) - Date.now()
        if (timeRemaining > 0) {
          // Faz logout imediatamente após o tempo de expiração do token
          const timeout = setTimeout(() => {
            setCookie(
              GRANT_ERROR_TOAST_COOKIE_KEY,
              'Sua sessão expirou. Por favor, faça login novamente.',
            )
            queryClient.clear()
            logout()
            clearTimeout(timeout)
          }, timeRemaining)

          return () => clearTimeout(timeout)
        } else {
          setCookie(
            GRANT_ERROR_TOAST_COOKIE_KEY,
            'Sua sessão expirou. Por favor, faça login novamente.',
          )
          queryClient.clear()
          logout()
        }
      } else {
        queryClient.clear()
        logout()
        router.push('/auth/sign-in')
      }
    }

    setLogoutTimeout()
  }, [router])

  return null
}

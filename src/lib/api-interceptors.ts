import { deleteCookie, getCookie } from 'cookies-next'
import { CookiesFn } from 'cookies-next/lib/types'

import { isGrantError, isTooManyRequests } from '@/utils/error-handlers'

import { api as _api } from './api'

export const api = _api

api.interceptors.request.use(async (config) => {
  // Try to get token from cookies
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }
  const token = getCookie('token', { cookies: cookieStore })

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isGrantError(error)) {
      deleteCookie('token')
      if (typeof window !== 'undefined' && window.location) {
        const currentPath = window.location.pathname
        if (currentPath !== '/auth/sign-in') {
          window.location.href = '/auth/sign-in'
        }
      }
    }
    if (isTooManyRequests(error)) {
      localStorage.setItem('showToast', 'true')
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

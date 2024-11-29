'use server'

import { api } from '@/lib/api-interceptors'

interface is2FAActiveRequest {
  username: string
  password: string
}

export async function is2FAActive({ username, password }: is2FAActiveRequest) {
  const response = await api.post<boolean>('/auth/2fa/is-2fa-active/', {
    username,
    password,
  })

  return response.data
}

'use server'

import { api } from '@/lib/api'

interface is2FAActiveRequest {
  username: string
  password: string
}

export async function is2FAActive({ username, password }: is2FAActiveRequest) {
  const response = await api.post<boolean>('/auth/totp/is-2fa-active/', {
    username,
    password,
  })

  return response.data
}

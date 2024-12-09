'use server'

import { api } from '@/lib/api-interceptors'

interface SignInRequest {
  username: string
  password: string
}

export async function sendTokenToUserEmail({
  username,
  password,
}: SignInRequest) {
  const response = await api.post(
    '/auth/email/generate-code/',
    {
      username,
      password,
    },
    // {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // },
  )

  return response.data
}

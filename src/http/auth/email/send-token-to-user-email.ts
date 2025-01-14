'use server'

import { api } from '@/lib/api'

interface SignInRequest {
  username: string
  password: string
}

interface SendTokenToUserEmailResponse {
  message: string
  email: string
}
export async function sendTokenToUserEmail({
  username,
  password,
}: SignInRequest) {
  const response = await api.post<SendTokenToUserEmailResponse>(
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

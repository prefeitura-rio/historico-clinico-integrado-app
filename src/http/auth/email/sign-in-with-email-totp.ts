'use server'

import { api } from '@/lib/api'

interface SignInRequest {
  username: string
  password: string
  totp: string
}

export interface SignInResponse {
  access_token: string
  token_type: string
  token_expire_minutes: number
}

export async function signInWithEmailTOTP({
  username,
  password,
  totp,
}: SignInRequest) {
  const response = await api.post<SignInResponse>(
    '/auth/email/login/',
    {
      username,
      password,
      code: totp,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    tokenExpireMinutes: response.data.token_expire_minutes,
  }
}

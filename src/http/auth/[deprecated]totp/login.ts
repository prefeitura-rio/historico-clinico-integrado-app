'use server'

import { api } from '@/lib/api'

interface SignInRequest {
  username: string
  password: string
  totp: string
}

export interface SignInResponse {
  accessToken: string
  tokenType: string
}

export interface SignInBackendResponse {
  access_token: string
  token_type: string
  token_expire_minutes: number
}

export async function signInWith2FA({
  username,
  password,
  totp,
}: SignInRequest) {
  const response = await api.post<SignInBackendResponse>('/auth/totp/login/', {
    username,
    password,
    code: totp,
  })

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    tokenExpireMinutes: response.data.token_expire_minutes,
  }

  return data
}

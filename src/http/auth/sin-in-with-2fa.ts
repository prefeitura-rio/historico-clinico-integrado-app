import { api } from '@/lib/api'

interface SignInRequest {
  username: string
  password: string
  otp: string
}

export interface SignInResponse {
  accessToken: string
  tokenType: string
}

export interface SignInBackendResponse {
  access_token: string
  token_type: string
}

export async function signInWith2FA({
  username,
  password,
  otp,
}: SignInRequest) {
  const response = await api.post<SignInBackendResponse>('/auth/2fa/login/', {
    username,
    password,
    totp_code: otp,
  })

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
  }

  return data
}

'use server'

import { api } from '@/lib/api-interceptors'

interface GenerateQrCodeRequest {
  username: string
  password: string
}

export async function generateQrCode({
  username,
  password,
}: GenerateQrCodeRequest) {
  const response = await api.post<Blob>(
    '/auth/totp/generate-qrcode/',
    {
      username,
      password,
    },
    {
      responseType: 'blob',
    },
  )

  return response.data
}

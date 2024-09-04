import { api } from '@/lib/api'

interface GenerateQrCodeRequest {
  username: string
  password: string
}

export async function generateQrCode({
  username,
  password,
}: GenerateQrCodeRequest) {
  const response = await api.post(
    '/auth/2fa/generate-qrcode/',
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

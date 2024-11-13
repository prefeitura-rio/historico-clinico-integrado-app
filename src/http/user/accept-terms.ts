import { api } from '@/lib/api-interceptors'

export async function acceptTerms() {
  const response = await api.post('/frontend/user/accept-terms/')
  return response.data
}

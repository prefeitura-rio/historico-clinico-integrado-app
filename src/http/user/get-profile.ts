import { api } from '@/lib/api-interceptors'
import type { User } from '@/models/entities'

export async function getProfile() {
  const response = await api.get<User>('/frontend/user')
  return response.data
}

import { api } from '@/lib/api'
import type { User } from '@/models/entities'

export async function getProfile() {
  const response = await api.get<User>('/frontend/user')
  return response.data
}

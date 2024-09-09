import { api } from '@/lib/api'

export async function getPatientFilterTags() {
  const response = await api.get<string[]>('/frontend/patient/filter_tags')
  return response.data
}

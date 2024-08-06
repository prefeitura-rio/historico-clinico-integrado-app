import { api } from '@/lib/api'
import type { Encounter } from '@/models/entities'

export async function getPatientEncounters(cpf: string) {
  const response = await api.get<Encounter[]>(
    `/frontend/patient/encounters/${cpf}`,
  )
  return response.data
}

'use server'

import { api } from '@/lib/api-interceptors'
import type { Summary } from '@/models/entities'

export async function getPatientSummary(cpf: string) {
  const response = await api.get<Summary>(`/frontend/patient/summary/${cpf}`)
  return response.data
}

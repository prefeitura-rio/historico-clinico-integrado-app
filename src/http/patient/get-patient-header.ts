'use server'

import { api } from '@/lib/api-interceptors'
import type { Header } from '@/models/entities'

export async function getPatientHeader(cpf: string) {
  const response = await api.get<Header>(`/frontend/patient/header/${cpf}`)
  return response.data
}

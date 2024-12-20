import { api } from '@/lib/api-interceptors'
import type { PatientSearchRow } from '@/models/entities'

export type SearchPatientProps = {
  cpf?: string
  cns?: string
  name?: string
}

export async function searchPatient(input: SearchPatientProps) {
  const searchObject = Object.entries(input).find(([, value]) => value)

  const response = await api.get<PatientSearchRow[]>(
    `/frontend/patient/search?${searchObject?.[0]}=${searchObject?.[1]}`,
  )

  return response.data
}

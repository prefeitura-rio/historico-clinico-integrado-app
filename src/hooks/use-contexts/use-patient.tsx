import { useContext } from 'react'

import { PatientContext } from '@/contexts/patient-context'

export function usePatient() {
  const patientContext = useContext(PatientContext)
  return patientContext
}

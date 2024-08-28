import { useQuery } from '@tanstack/react-query'

import { getPatientEncounters } from '@/http/patient/get-patient-encounters'

interface UsePatientEncountersProps {
  cpf: string
}

export function usePatientEncounters({ cpf }: UsePatientEncountersProps) {
  return useQuery({
    queryKey: ['patient', 'encounters', cpf],
    queryFn: () => getPatientEncounters(cpf),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

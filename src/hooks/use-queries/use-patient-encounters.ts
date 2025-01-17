import { useQuery } from '@tanstack/react-query'

import { getPatientEncounters } from '@/http/patient/get-patient-encounters'
import { isTooManyRequests } from '@/utils/error-handlers'

interface UsePatientEncountersProps {
  cpf: string
}

export function usePatientEncounters({ cpf }: UsePatientEncountersProps) {
  return useQuery({
    queryKey: ['patient', 'encounters', cpf],
    queryFn: () => getPatientEncounters(cpf),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (failureCount >= 2 || isTooManyRequests(error)) {
        return false
      }
      return true
    },
  })
}

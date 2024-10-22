import { useQuery } from '@tanstack/react-query'

import { getPatientSummary } from '@/http/patient/get-patient-summary'
import { isNotFoundError } from '@/utils/error-handlers'

interface usePatientSummaryProps {
  cpf: string
}

export function usePatientSummary({ cpf }: usePatientSummaryProps) {
  return useQuery({
    queryKey: ['patient', 'summary', cpf],
    queryFn: () => getPatientSummary(cpf),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (failureCount >= 2 || isNotFoundError(error)) {
        return false
      }
      return false
    },
  })
}

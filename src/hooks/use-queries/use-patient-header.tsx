import { useQuery } from '@tanstack/react-query'

import { getPatientHeader } from '@/http/patient/get-patient-header'
import {
  isForbiddenError,
  isNotFoundError,
  isTooManyRequests,
} from '@/utils/error-handlers'

interface UsePatientHeaderProps {
  cpf: string
}

export function usePatientHeader({ cpf }: UsePatientHeaderProps) {
  return useQuery({
    queryKey: ['patient', 'header', cpf],
    queryFn: () => getPatientHeader(cpf),
    retry(failureCount, error) {
      if (
        failureCount >= 2 ||
        isNotFoundError(error) ||
        isForbiddenError(error) ||
        isTooManyRequests(error)
      ) {
        return false
      }
      return false
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

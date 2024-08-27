import { useQuery } from '@tanstack/react-query'

import { getPatientHeader } from '@/http/patient/get-patient-header'
import { isNotFoundError } from '@/utils/error-handlers'

interface UsePatientHeaderProps {
  cpf: string
}

export function usePatientHeader({ cpf }: UsePatientHeaderProps) {
  return useQuery({
    queryKey: ['patient', 'header', cpf],
    queryFn: () => getPatientHeader(cpf),
    retry(failureCount, error) {
      return !isNotFoundError(error) && failureCount < 2
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

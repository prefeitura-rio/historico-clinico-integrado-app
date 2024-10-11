import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getPatientHeader } from '@/http/patient/get-patient-header'
import { isForbiddenError, isNotFoundError } from '@/utils/error-handlers'

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
        isForbiddenError(error)
      ) {
        return false
      }

      toast.error(
        'Um erro inesperado ocorreu durante o carregamento dos dados básicos do paciente! Se o erro persistir, por favor, contate um administrador do sistema.',
        {
          duration: Infinity,
          closeButton: true,
        },
      )
      return false
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

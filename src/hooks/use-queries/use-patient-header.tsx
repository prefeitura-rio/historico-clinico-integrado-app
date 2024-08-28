import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

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
      if (!isNotFoundError(error) && failureCount < 2) {
        return true
      }
      toast.error(
        'Um erro inexperado ocorreu durante o carregamento dos dados básicos do paciente! Se o erro persistir, por favor, contate um administrador do sistema.',
        {
          duration: Infinity,
        },
      )
      return false
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

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

      toast.error(
        'Um erro inesperado ocorreu durante o carregamento dos dados de medicamentos e alergias do paciente! Se o erro persistir, por favor, contate um administrador do sistema.',
        {
          duration: Infinity,
          closeButton: true,
        },
      )
      return false
    },
  })
}

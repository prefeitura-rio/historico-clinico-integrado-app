import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

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
    retry(failureCount) {
      if (failureCount < 2) {
        return true
      }
      toast.error(
        'Um erro inexperado ocorreu durante o carregamento dos dados do histórico clínico do paciente! Se o erro persistir, por favor, contate um administrador do sistema.',
        {
          duration: Infinity,
        },
      )
      return false
    },
  })
}

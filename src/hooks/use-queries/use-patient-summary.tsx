import { useQuery } from '@tanstack/react-query'

import { getPatientSummary } from '@/http/patient/get-patient-summary'

interface usePatientSummaryProps {
  cpf: string
}

export function usePatientSummary({ cpf }: usePatientSummaryProps) {
  return useQuery({
    queryKey: ['patient', 'summary', cpf],
    queryFn: () => getPatientSummary(cpf),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

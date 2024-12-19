'use client'

import { useSearchParams } from 'next/navigation'

type MonitoredPlatesQueryKey = ['patient', 'search', searchParam?: string]

export interface FormattedSearchParams {
  cpf?: string
  cns?: string
  name?: string
}
interface UseMonitoredPlatesSearchParamsReturn {
  searchParams: URLSearchParams
  formattedSearchParams: FormattedSearchParams
  queryKey: MonitoredPlatesQueryKey
}

export function usePatientSearchParams(): UseMonitoredPlatesSearchParamsReturn {
  const searchParams = useSearchParams()

  const cpf = searchParams.get('cpf') || undefined
  const cns = searchParams.get('cns') || undefined
  const name = searchParams.get('name') || undefined

  return {
    searchParams,
    formattedSearchParams: {
      cpf,
      cns,
      name,
    },
    queryKey: ['patient', 'search', cpf || cns || name],
  }
}

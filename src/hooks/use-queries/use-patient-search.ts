'use client'

import { useQuery } from '@tanstack/react-query'

import {
  searchPatient,
  type SearchPatientProps,
} from '@/http/patient/search-patient'
import {
  isForbiddenError,
  isNotFoundError,
  isTooManyRequests,
} from '@/utils/error-handlers'

export function usePatientSearch(input: SearchPatientProps) {
  return useQuery({
    queryKey: ['patient', 'search', input],
    queryFn: () => searchPatient(input),
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
    enabled: !!input.cns || !!input.name,
  })
}

import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/http/user/get-profile'

export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (failureCount < 2) {
        return true
      }
      return false
    },
  })
}

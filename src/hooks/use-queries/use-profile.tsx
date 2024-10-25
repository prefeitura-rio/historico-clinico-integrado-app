import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/http/user/get-user'

export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
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

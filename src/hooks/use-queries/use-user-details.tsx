import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/http/user/get-user'

export function useUserDetails() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

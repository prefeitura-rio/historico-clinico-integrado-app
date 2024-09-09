import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getUser } from '@/http/user/get-user'

export function useUserDetails() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (failureCount < 2) {
        return true
      }
      toast.error(
        'Um erro inesperado ocorreu durante o carregamento dos dados do usuário logado! Se o erro persistir, por favor, contate um administrador do sistema.',
        {
          duration: Infinity,
          closeButton: true,
        },
      )
      return false
    },
  })
}

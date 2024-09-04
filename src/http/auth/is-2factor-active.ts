import { api } from '@/lib/api'

interface Is2FactorActiveRequest {
  username: string
  password: string
}

export async function is2FactorActive({
  username,
  password,
}: Is2FactorActiveRequest) {
  const response = await api.post<boolean>('/auth/2fa/is-2fa-active/', {
    username,
    password,
  })

  return response.data
}

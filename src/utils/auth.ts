import { cookies } from 'next/headers'

export function isAuthenticated() {
  const token = cookies().get('token')?.value
  const tokenExpirationDate = cookies().get('tokenExpirationDate')?.value

  if (!token || !tokenExpirationDate) return false

  const timeRemaining = Date.parse(tokenExpirationDate) - Date.now()

  if (timeRemaining <= 0) return false

  return true
}

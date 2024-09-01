'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  cookies().delete('token')
  cookies().delete('tokenExpirationDate')
  redirect('/auth/sign-in')
}

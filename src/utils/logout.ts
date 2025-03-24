'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getEnv } from '@/env/server'
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRATION_DATE_COOKIE,
} from '@/lib/api'

export async function logout() {
  const cookieStore = await cookies();
  const env = await getEnv();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(ACCESS_TOKEN_EXPIRATION_DATE_COOKIE);
  
  console.log('Logout in the service:', `${env.NEXT_PUBLIC_URL_PROVIDER}/logout?post_logout_redirect_uri=${env.NEXT_PUBLIC_URL_SERVICE}auth/sign-in`)

  redirect(`${env.NEXT_PUBLIC_URL_PROVIDER}/logout?post_logout_redirect_uri=${env.NEXT_PUBLIC_URL_SERVICE}auth/sign-in`)
}

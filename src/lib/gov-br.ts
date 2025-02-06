import axios from 'axios'

import { env } from '@/env/client'

export const COOKIES_PREFIX = '@ed-rio:gov-br:'
export const STATE_COOKIE = `${COOKIES_PREFIX}state`
export const CODE_VERIFIER_COOKIE = `${COOKIES_PREFIX}code_verifier`

export const apiGovBr = axios.create({
  baseURL: env.NEXT_PUBLIC_URL_PROVIDER,
})
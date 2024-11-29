'use server'

import { getEnv } from '@/env/server'

type CaptchaData =
  | {
      success: true
      challeng_ts: string
      hostname: string
      score: number
      action: string
    }
  | {
      success: false
      'error-codes': string[]
    }

export async function verifyCaptchaToken(token: string) {
  const env = await getEnv()

  const url = new URL('https://www.google.com/recaptcha/api/siteverify')
  url.searchParams.append('secret', env.CAPTCHA_V3_SECRET_KEY)
  url.searchParams.append('response', token)

  const res = await fetch(url, { method: 'POST' })
  const captchaData: CaptchaData = await res.json()

  if (!res.ok) return null
  return captchaData
}

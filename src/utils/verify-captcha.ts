'use server'

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
  const secretKey = process.env.CAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('no seret key found')
  }
  const url = new URL('https://www.google.com/recaptcha/api/siteverify')
  url.searchParams.append('secret', secretKey)
  url.searchParams.append('response', token)

  const res = await fetch(url, { method: 'POST' })
  const captchaData: CaptchaData = await res.json()

  if (!res.ok) return null
  return captchaData
}

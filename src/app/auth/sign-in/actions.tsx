'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { twoFactorSignIn } from '@/http/auth/two-factor-sign-in'
import { genericErrorMessage, isGrantError } from '@/utils/error-handlers'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
  otp: z.string().min(6, { message: 'Campo obrigatório' }).max(6),
})

type SignIn = z.infer<typeof signInSchema>

export async function signInAction(data: SignIn) {
  const result = signInSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { username, password, otp } = result.data

  try {
    const { accessToken } = await twoFactorSignIn({
      username,
      password,
      otp,
    })

    const expirationTime = Date.now() + 1000 * 60 * 30 // 30 min from now

    cookies().set('token', accessToken, {
      path: '/',
      expires: new Date(expirationTime),
    })

    cookies().set('tokenExpirationDate', new Date(expirationTime).toISOString())

    redirect('/')
  } catch (err) {
    const errorMessage = isGrantError(err)
      ? 'Token inválido'
      : genericErrorMessage
    return {
      success: false,
      message: errorMessage,
      errors: null,
    }
  }
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
  const captchaData = await res.json()
  return captchaData
}

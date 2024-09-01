'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { signIn } from '@/http/auth/sign-in'
import { genericErrorMessage, isGrantError } from '@/utils/error-handlers'

const signInSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
})

export async function signInAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { username, password } = result.data

  try {
    const { access_token: accessToken } = await signIn({
      username,
      password,
    })

    const expirationTime = Date.now() + 1000 * 60 * 30 // 30 min from now

    cookies().set('token', accessToken, {
      path: '/',
      expires: new Date(expirationTime),
    })

    cookies().set('tokenExpirationDate', new Date(expirationTime).toISOString())

    return { success: true, message: null, errors: null }
  } catch (err) {
    const errorMessage = isGrantError(err)
      ? 'Credenciais inválidas'
      : genericErrorMessage

    return {
      success: false,
      message: errorMessage,
      errors: null,
    }
  }
}

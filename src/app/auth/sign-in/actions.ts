'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import type { FormState } from '@/hooks/use-form-state'
import { is2FAActive } from '@/http/auth/is-2fa-active'
import { signInWith2FA } from '@/http/auth/sin-in-with-2fa'
import { isApiError } from '@/lib/api'
import { genericErrorMessage, isGrantError } from '@/utils/error-handlers'
import { verifyCaptchaToken } from '@/utils/verify-captcha'

const simpleSignInFormSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
  token: z.string(),
})

export type SimpleSignInForm = z.infer<typeof simpleSignInFormSchema>

const signInWith2FAFormSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
  otp: z
    .string()
    .min(6, { message: 'Campo obrigatório.' })
    .max(6, { message: 'Campo inválido' }),
  token: z.string(),
})

export type SignInWith2FAForm = z.infer<typeof signInWith2FAFormSchema>

export async function is2FaActiveAction(data: FormData): Promise<FormState> {
  const result = simpleSignInFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      errors,
    }
  }

  const { username, password, token } = result.data
  try {
    const isHuman = await verifyCaptchaToken(token)
    if (!isHuman || isHuman.success === false) {
      return {
        success: false,
        message: {
          title: 'Falha na verificação!',
          description:
            'Nosso sitema detectou uma atividade incomum que sugere que você pode ser um robô. Se você acredita que isso é um erro, tente novamente ou entre em contato com um administrador do sistema para obter ajuda.',
        },
      }
    }

    const isActive = await is2FAActive({
      username,
      password,
    })

    return {
      success: true,
      data: isActive,
    }
  } catch (err) {
    // Log error
    if (isApiError(err)) {
      const data = err.response?.config.data
        .replace(/(?<=username=).*?(?=&)/, '[REDACTED]')
        .replace(/(?<=password=).*/, '[REDACTED]')

      const copy = {
        ...err,
        response: {
          ...err.response,
          config: {
            ...err.response?.config,
            data,
          },
        },
      }

      console.error(copy)
    } else {
      console.error(err)
    }

    const errorMessage = isGrantError(err)
      ? 'Credenciais inválidas'
      : genericErrorMessage

    return {
      success: false,
      message: {
        title: errorMessage,
        description: null,
      },
    }
  }
}

export async function signInWith2FAAction(data: FormData): Promise<FormState> {
  const result = signInWith2FAFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, errors }
  }

  const { username, password, otp, token } = result.data

  try {
    const isHuman = await verifyCaptchaToken(token)
    if (!isHuman || isHuman.success === false) {
      return {
        success: false,
        message: {
          title: 'Falha na verificação!',
          description:
            'Nosso sitema detectou uma atividade incomum que sugere que você pode ser um robô. Se você acredita que isso é um erro, tente novamente ou entre em contato com um administrador do sistema para obter ajuda.',
        },
      }
    }

    const { accessToken, tokenExpireMinutes } = await signInWith2FA({
      username,
      password,
      otp,
    })

    const expirationTime = Date.now() + 1000 * 60 * tokenExpireMinutes // In miliseconds

    cookies().set('token', accessToken, {
      path: '/',
      expires: new Date(expirationTime),
    })

    cookies().set('tokenExpirationDate', new Date(expirationTime).toISOString())

    return {
      success: true,
      data: null,
    }
  } catch (err) {
    console.error(err)

    const errorMessage = isGrantError(err)
      ? 'Credenciais inválidas'
      : genericErrorMessage

    return {
      success: false,
      message: {
        title: errorMessage,
        description: null,
      },
    }
  }
}

'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import type { FormState } from '@/hooks/use-form-state'
import { sendTokenToUserEmail } from '@/http/auth/email/send-token-to-user-email'
import { signInWithEmailTOTP } from '@/http/auth/email/sign-in-with-email-totp'
import { isApiError } from '@/lib/api'
import {
  genericErrorMessage,
  getAPIErrorType,
  isGrantError,
} from '@/utils/error-handlers'
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
  totp: z
    .string()
    .min(6, { message: 'Campo obrigatório.' })
    .max(6, { message: 'Campo inválido' }),
  token: z.string(),
})

export type SignInWith2FAForm = z.infer<typeof signInWith2FAFormSchema>

function treatError(err: unknown) {
  // Log error
  if (isApiError(err)) {
    const data = err.response?.config.data
      .replace(/(?<="username":").*?(?=")/, '[REDACTED]')
      .replace(/(?<="password":").*?(?=")/, '[REDACTED]')
      .replace(/(?<="totp_code":").*?(?=")/, '[REDACTED]')
      .replace(/(?<=username=).*?(?=&)/, '[REDACTED]')
      .replace(/(?<=password=).*?(?=&)/, '[REDACTED]')
      .replace(/(?<=password=).*?/, '[REDACTED]')
      .replace(/(?<=code=).*?(?=)/, '[REDACTED]')
      .replace(/(?<=code=).*?/, '[REDACTED]')

    const copy = {
      ...err,
      config: {
        ...err.config,
        data,
      },
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

  let message = {
    title: genericErrorMessage,
    description: null as string | null,
  }

  const errorType = getAPIErrorType(err as Error)

  if (isGrantError(err)) {
    if (errorType === 'bad_credentials' || errorType === 'user_not_found') {
      message = {
        title: 'Credenciais inválidas',
        description: null,
      }
    }

    if (errorType === 'inactive_employee') {
      message = {
        title: 'Acesso restrito!',
        description:
          'Você não possui permissão para acessar o Histórico Clínico Integrado. Procure seu gestor e peça para informar à Subsecretaria a qual você está vinculado(a).',
      }
    }

    if (errorType === 'bad_otp') {
      message = {
        title: 'Código inválido!',
        description: null,
      }
    }
  }

  return {
    success: false,
    message,
  }
}

export async function sendTOTPEmail(data: FormData): Promise<FormState> {
  const result = simpleSignInFormSchema.safeParse(Object.fromEntries(data))
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      errors,
    } as FormState
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
      } as FormState
    }

    const { email, message } = await sendTokenToUserEmail({
      username,
      password,
    })

    return {
      success: true,
      data: {
        message,
        email,
      },
    } as FormState
  } catch (err) {
    return treatError(err) as FormState
  }
}

export async function login(data: FormData): Promise<FormState> {
  const result = signInWith2FAFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, errors } as FormState
  }

  const { username, password, totp, token } = result.data

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
      } as FormState
    }

    const { accessToken, tokenExpireMinutes } = await signInWithEmailTOTP({
      username,
      password,
      totp,
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
    } as FormState
  } catch (err) {
    const response = treatError(err)

    return {
      success: response.success,
      message: {
        title: response.message.description
          ? `${response.message.title} ${response.message.description}`
          : response.message.title,
      },
    } as FormState
  }
}

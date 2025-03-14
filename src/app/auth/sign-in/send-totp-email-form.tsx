'use client'

import { AlertTriangle } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { env } from '@/env/client'
import { useFormState } from '@/hooks/use-form-state'
import { GENERIC_ERROR_MESSAGE } from '@/utils/error-handlers'
import { getCaptchaToken } from '@/utils/get-captcha'

import { sendTOTPEmail } from './actions'
import { TOTPEmailDialog } from './components/totp-email-dialog'
import { signInWithGovBr } from './components/gov-br-login'
import GovBrSignInButton from '@/components/custom-ui/gov-br-signin'

export function IsActiveForm() {
  const [openTOTPEmailDialog, setOpenTOTPEmailDialog] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [formData, setFormData] = useState<FormData>()
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [response, handleSubmit, isPending] = useFormState(
    sendTOTPEmail,
    (data) => {
      setEmail(data.email)
      setOpenTOTPEmailDialog(true)
    },
  )

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setFormData(data)

    try {
      const token = await getCaptchaToken(
        'userCredentialsFormSubmission',
        env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
      )
      if (!token) throw new Error('Não foi possível gerar o token captcha.')

      data.append('token', token)
      await handleSubmit(data)
    } catch (error) {
      console.error({ error })
      toast.error(GENERIC_ERROR_MESSAGE)
    }
  }

  useEffect(() => {
    if (response.success === false && 'errors' in response) {
      if (response.errors?.username) {
        usernameInputRef.current?.focus()
      } else if (response.errors?.password) {
        passwordInputRef.current?.focus()
      }
    }
  }, [response])

  return (
    <div>
      <div className="w-full">
        <GovBrSignInButton
          onClick={() => signInWithGovBr()}
        />
      </div>
    </div>
  )
}

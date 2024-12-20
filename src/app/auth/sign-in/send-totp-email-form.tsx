'use client'

import { AlertTriangle } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { env } from '@/env/client'
import { useFormState } from '@/hooks/use-form-state'
import { genericErrorMessage } from '@/utils/error-handlers'
import { getCaptchaToken } from '@/utils/get-captcha'

import { sendTOTPEmail } from './actions'
import { TOTPEmailDialog } from './components/totp-email-dialog'

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
      toast.error(genericErrorMessage)
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
      <form className="relative space-y-2" onSubmit={handleOnSubmit}>
        <Input
          ref={usernameInputRef}
          name="username"
          placeholder="123.456.789-00"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isPending}
        />

        <Input
          ref={passwordInputRef}
          name="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />

        <Button type="submit" size="sm" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : 'Entrar'}
        </Button>

        <div className="relative">
          {response.success === false &&
            'message' in response &&
            response.message && (
              <Alert
                variant="destructive"
                className="absolute w-full" // TODO: Fix this positioning
              >
                <AlertTriangle className="size-4" />
                <AlertTitle>{response.message.title}</AlertTitle>
                <AlertDescription>
                  {response.message.description}
                </AlertDescription>
              </Alert>
            )}
        </div>
      </form>

      {openTOTPEmailDialog && (
        <TOTPEmailDialog
          open={openTOTPEmailDialog}
          onOpenChange={setOpenTOTPEmailDialog}
          formData={formData}
          email={email}
        />
      )}
    </div>
  )
}

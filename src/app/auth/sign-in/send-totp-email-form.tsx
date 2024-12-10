'use client'

import { AlertTriangle } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'sonner'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { env } from '@/env/client'
import useRecaptcha from '@/hooks/others/recaptcha'
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
  const { captchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha()
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
      data.append(
        'captchaToken',
        env.NEXT_PUBLIC_HCI_API_URL.includes('staging')
          ? captchaToken
          : 'dummy',
      )
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
      } else if (response.errors?.captchaToken) {
        //
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
        />

        <Input
          ref={passwordInputRef}
          name="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" size="sm" className="w-full">
          {isPending ? <Spinner /> : 'Entrar'}
        </Button>

        {env.NEXT_PUBLIC_HCI_API_URL.includes('staging') && (
          <div className="relative flex h-[74px] flex-col items-center justify-center pt-[60px]">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={env.NEXT_PUBLIC_CAPTCHA_V2_SITE_KEY}
              onChange={handleRecaptcha}
              className="z-50 flex justify-center"
            />

            {response.success === false &&
              'errors' in response &&
              response.errors?.captchaToken && (
                <div className="absolute -bottom-14 flex justify-center">
                  <span className="text-xs text-destructive">
                    {response.errors.captchaToken[0]}
                  </span>
                </div>
              )}
          </div>
        )}

        <div className="relative">
          {response.success === false &&
            'message' in response &&
            response.message && (
              <Alert
                variant="destructive"
                className="absolute -bottom-28 w-full"
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

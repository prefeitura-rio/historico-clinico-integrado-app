'use client'

import { AlertTriangle } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'
import { genericErrorMessage } from '@/utils/error-handlers'
import { getCaptchaToken } from '@/utils/get-captcha'

import { is2FaActiveAction } from './actions'
import { OTPDialog } from './components/otp-dialog'
import { QRCodeDialog } from './components/qr-code-dialog'

export function IsActiveForm() {
  const [openQRCodeDialog, setOpenQRCodeDialog] = useState(false)
  const [openOTPDialog, setOpenOTPDialog] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formData, setFormData] = useState<FormData>()

  const [response, handleSubmit, isPending] = useFormState(
    is2FaActiveAction,
    (isActive: boolean) => {
      if (isActive === true) {
        setOpenOTPDialog(true)
      } else {
        setOpenQRCodeDialog(true)
      }
    },
  )

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setFormData(data)

    try {
      const token = await getCaptchaToken()
      if (!token) throw new Error('Não foi possível gerar o token captcha.')

      data.append('token', token)
      await handleSubmit(data)
    } catch {
      toast.error(genericErrorMessage, {
        duration: 15000,
        closeButton: true,
      })
    }
  }

  return (
    <div>
      <form className="relative space-y-2" onSubmit={handleOnSubmit}>
        <Input
          name="username"
          placeholder="Insira seu CPF"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {response.success === false &&
          'errors' in response &&
          response.errors?.username && (
            <span className="ml-2 text-xs text-destructive">
              {response.errors.username[0]}
            </span>
          )}

        <Input
          name="password"
          type="password"
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {response.success === false &&
          'errors' in response &&
          response.errors?.username && (
            <span className="ml-2 text-xs text-destructive">
              {response.errors.password[0]}
            </span>
          )}
        <Button type="submit" size="sm" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : 'Login'}
        </Button>

        {response.success === false &&
          'message' in response &&
          response.message && (
            <Alert
              variant="destructive"
              className="absolute top-[8.25rem] w-full"
            >
              <AlertTriangle className="size-4" />
              <AlertTitle>{response.message.title}</AlertTitle>
              <AlertDescription>
                {response.message.description}
              </AlertDescription>
            </Alert>
          )}
      </form>

      {openQRCodeDialog && (
        <QRCodeDialog
          open={openQRCodeDialog}
          onOpenChange={setOpenQRCodeDialog}
          formData={formData}
        />
      )}
      {openOTPDialog && (
        <OTPDialog
          open={openOTPDialog}
          onOpenChange={setOpenOTPDialog}
          formData={formData}
        />
      )}
    </div>
  )
}

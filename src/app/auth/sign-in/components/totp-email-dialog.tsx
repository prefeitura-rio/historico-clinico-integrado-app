'use client'

import { redirect } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

import { InputOTP } from '@/components/custom-ui/input-otp'
import { Spinner } from '@/components/custom-ui/spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { env } from '@/env/client'
import { useFormState } from '@/hooks/use-form-state'
import { genericErrorMessage } from '@/utils/error-handlers'
import { getCaptchaToken } from '@/utils/get-captcha'

import { login } from '../actions'

interface OTPDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  formData: FormData | undefined
}

export function TOTPEmailDialog({
  open,
  onOpenChange,
  formData,
}: OTPDialogProps) {
  const [otp, setOtp] = useState('')
  const [response, handleSubmit, isPending] = useFormState(login, () => {
    redirect('/')
  })

  async function handleOnSubmit() {
    try {
      const token = await getCaptchaToken(
        'userOtpFormSubmission',
        env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
      )

      if (!token) throw new Error('Não foi possível gerar o token captcha.')
      if (formData) {
        formData.set('token', token)

        if (formData.get('totp')) {
          formData.append('totp', otp)
        } else {
          formData.set('totp', otp)
        }

        await handleSubmit(formData)
      }
    } catch {
      toast.error(genericErrorMessage)
    }
  }

  async function handleOpenChange(open: boolean) {
    onOpenChange(open)
    if (!open) setOtp('')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-screen-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Autenticação de 2 Fatores (2FA)</AlertDialogTitle>
          <AlertDialogDescription>
            Insira o código de verificação enviado para o seu e-mail.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
              <Label>Código de Autenticação</Label>
              <InputOTP
                name="otp"
                value={otp}
                onChange={setOtp}
                onSubmit={handleOnSubmit}
              />
              {response.success === false &&
                'errors' in response &&
                response.errors?.otp && (
                  <span className="ml-2 text-xs text-destructive">
                    {response.errors.otp[0]}
                  </span>
                )}
              {response.success === false &&
                'message' in response &&
                response.message && (
                  <span className="ml-2 text-xs text-destructive">
                    {response.message.title}
                  </span>
                )}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault()
              handleOnSubmit()
            }}
          >
            {isPending ? <Spinner /> : 'Enviar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

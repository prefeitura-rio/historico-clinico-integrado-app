'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { InputOTP } from '@/components/custom-ui/input-otp'
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
import { Spinner } from '@/components/ui/spinner'
import { getEnv } from '@/env/server'
import { useFormState } from '@/hooks/use-form-state'
import { generateQrCode } from '@/http/auth/[deprecated]totp/generate-qrcode'
import { GENERIC_ERROR_MESSAGE } from '@/utils/error-handlers'
import { getCaptchaToken } from '@/utils/get-captcha'

import { login } from '../actions'

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  formData?: FormData
}

export function QRCodeDialog({
  open,
  onOpenChange,
  formData,
}: QRCodeDialogProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [otp, setOtp] = useState('')

  const [response, handleSubmit, isPending] = useFormState(login, () => {
    redirect('/')
  })

  async function handleOnSubmit() {
    try {
      const env = await getEnv()
      const token = await getCaptchaToken(
        'userQrCodeOtpFormSubmission',
        env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
      )

      if (!token) throw new Error('Não foi possível gerar o token captcha.')
      if (formData) {
        formData.set('token', token)
        formData.append('otp', otp)

        await handleSubmit(formData)
      }
    } catch {
      toast.error(GENERIC_ERROR_MESSAGE)
    }
  }

  async function handleOpenChange(open: boolean) {
    onOpenChange(open)
    if (!open) {
      setImageSrc(null)
      setOtp('')
    }
  }

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const imageBlob = await generateQrCode({
          username: formData?.get('username')?.toString() || '',
          password: formData?.get('password')?.toString() || '',
        })
        const imageUrl = URL.createObjectURL(imageBlob)
        setImageSrc(imageUrl)
        return () => URL.revokeObjectURL(imageUrl)
      } catch (err) {
        toast.error(
          'Erro ao carregar QR code. Se o erro persistir, por favor, contate um administrador do sistema.',
        )
        console.error(err)
      }
    }
    if (open) {
      fetchQRCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-screen-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Habilite a Autenticação de 2 Fatores (2FA)
          </AlertDialogTitle>
          <AlertDialogDescription>
            A 2FA aumenta a segurança da sua conta. Siga estes 2 passos rápidos
            para ativar!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center gap-10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              height={240}
              width={240}
              className="border-2"
              alt="QR code para autenticação de 2 fatores"
            />
          ) : (
            <div className="flex size-60 shrink-0 items-center justify-center">
              <Spinner className="size-10 text-typography-ice-blue-500" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-bold">
              Use um Aplicativo Autenticador para habilitar a Autenticação de 2
              Fatores
            </h4>
            <div className="text-sm">
              <p>
                <span className="font-bold">Passo 1:</span> Escaneie o QR Code
                com o seu aplicativo autenticador.
              </p>
              <p>
                <span className="font-bold">Passo 2:</span> Insira o código
                gerado pelo seu aplicativo abaixo.
              </p>
            </div>
            <div>
              <InputOTP name="otp" value={otp} onChange={setOtp} />
              {response.success === false &&
                'errors' in response &&
                response.errors?.otp && (
                  <span className="ml-2 text-xs text-destructive">
                    {response.errors.otp[0]}
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

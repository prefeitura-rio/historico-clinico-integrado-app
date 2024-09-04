'use client'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

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

// import { twoFactorSignIn } from '@/http/auth/two-factor-sign-in'
import { signInAction } from './actions'

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  username: string
  password: string
}

export function TOTPCodeDialog({
  open,
  onOpenChange,
  username,
  password,
}: QRCodeDialogProps) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit() {
    setIsLoading(true)
    const { success, message, errors } = await signInAction({
      username,
      password,
      otp,
    })

    if (errors) {
      setError(errors.otp?.at(0) || '')
    }
    if (message) {
      setError(message)
    }

    if (success) {
      router.push('/')
    }

    setIsLoading(false)
  }

  async function handleOpenChange(open: boolean) {
    onOpenChange(open)
    if (!open) {
      setError('')
      setIsLoading(false)
      setOtp('')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Autenticação de 2 Fatores (2FA)</AlertDialogTitle>
          <AlertDialogDescription>
            Você já habilitou a autenticação de 2 fatores. Abra o seu aplicativo
            autenticador para ver o código de autenticação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center gap-2">
              <Label>Código de Autenticação</Label>
              <InputOTP value={otp} onChange={setOtp} />
              {error && (
                <span className="text-xs text-destructive">{error}</span>
              )}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            {isLoading ? <Spinner /> : 'Enviar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

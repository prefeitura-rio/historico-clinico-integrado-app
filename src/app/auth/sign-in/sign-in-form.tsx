'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { is2FactorActive } from '@/http/auth/is-2factor-active'
import { genericErrorMessage, isGrantError } from '@/utils/error-handlers'

import { QRCodeDialog } from './qrcode-dialog'
import { TOTPCodeDialog } from './totp-code-dialog'

const simpleLoginFormSchema = z.object({
  username: z.string().min(1, { message: 'Campo obrigatório' }),
  password: z.string().min(1, { message: 'Campo obrigatório' }),
})

type SimpleLoginForm = z.infer<typeof simpleLoginFormSchema>

export function SignInForm() {
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null)
  const [openQRCodeDialog, setOpenQRCodeDialog] = useState(false)
  const [openTOTPCodeDialog, setOpenTOTPCodeDialog] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SimpleLoginForm>({
    resolver: zodResolver(simpleLoginFormSchema),
  })

  async function onSubmit(props: SimpleLoginForm) {
    try {
      const is2FaActive = await is2FactorActive({
        username: props.username,
        password: props.password,
      })

      if (is2FaActive) setOpenTOTPCodeDialog(true)
      else setOpenQRCodeDialog(true)

      setFormErrorMessage(null)
    } catch (err) {
      const errorMessage = isGrantError(err)
        ? 'Credenciais inválidas'
        : genericErrorMessage

      setFormErrorMessage(errorMessage)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-2">
        <Input {...register('username')} placeholder="Insira seu CPF" />
        {errors?.username && (
          <span className="ml-2 text-xs text-rose-600">
            {errors.username.message}
          </span>
        )}

        <Input
          {...register('password')}
          type="password"
          placeholder="Insira sua senha"
        />
        {errors?.password && (
          <span className="ml-2 text-xs text-rose-600">
            {errors.password.message}
          </span>
        )}
        <Button
          type="submit"
          size="sm"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Login'}
        </Button>

        {formErrorMessage && (
          <Alert
            variant="destructive"
            className="absolute top-[8.25rem] w-full"
          >
            <AlertTriangle className="size-4" />
            <AlertTitle>{formErrorMessage}</AlertTitle>
          </Alert>
        )}
      </form>

      <QRCodeDialog
        open={openQRCodeDialog}
        onOpenChange={setOpenQRCodeDialog}
        username={getValues('username')}
        password={getValues('password')}
      />

      <TOTPCodeDialog
        open={openTOTPCodeDialog}
        onOpenChange={setOpenTOTPCodeDialog}
        username={getValues('username')}
        password={getValues('password')}
      />
    </div>
  )
}

'use client'

import { AlertTriangle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'

import { signInAction } from './actions'

export function SignInForm() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInAction,
    () => {
      redirect('/')
    },
  )

  return (
    <form onSubmit={handleSubmit} className="relative space-y-2">
      <Input name="username" placeholder="Insira seu CPF" />
      {errors?.username && (
        <span className="ml-2 text-xs text-rose-600">{errors.username[0]}</span>
      )}

      <Input name="password" type="password" placeholder="Insira sua senha" />
      {errors?.password && (
        <span className="ml-2 text-xs text-rose-600">{errors.password[0]}</span>
      )}
      <Button type="submit" size="sm" className="w-full" disabled={isPending}>
        {isPending ? <Spinner /> : 'Login'}
      </Button>

      {success === false && message && (
        <Alert
          variant="destructive"
          className="absolute bottom-[-3.875rem] w-full"
        >
          <AlertTriangle className="size-4" />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
    </form>
  )
}

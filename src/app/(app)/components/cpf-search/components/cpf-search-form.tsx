'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Spinner } from '@/components/custom-ui/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPatientHeader } from '@/http/patient/get-patient-header'
import { getUser } from '@/http/user/get-user'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'
import { isForbiddenError, isNotFoundError } from '@/utils/error-handlers'
import { cpfRegex } from '@/utils/regex'
import { formatCPF } from '@/utils/string-formatters'
import { validateCPF } from '@/utils/validate-cpf'

const formSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => cpfRegex.test(value), {
      message: 'CPF Inválido',
    })
    .superRefine((arg, ctx) => {
      const isFormatCorrect = cpfRegex.test(arg)
      // TODO: const isMathCorrect =

      if (!isFormatCorrect || !validateCPF(arg)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CPF Inválido',
        })
      }
    }),
})

type FormType = z.infer<typeof formSchema>

export function CPFSearchForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(props: FormType) {
    const cpf = props.cpf.replaceAll(/[.-]/g, '')

    const patientHeaderPromise = queryClient.fetchQuery({
      queryKey: ['patient', 'header', cpf],
      queryFn: () => getPatientHeader(cpf),
      retry(failureCount, error) {
        if (
          failureCount >= 2 ||
          isNotFoundError(error) ||
          isForbiddenError(error)
        ) {
          return false
        }

        toast.error(
          'Um erro inesperado ocorreu durante o carregamento dos dados básicos do paciente! Se o erro persistir, por favor, contate um administrador do sistema.',
          {
            duration: Infinity,
            closeButton: true,
          },
        )
        return false
      },
      staleTime: Infinity,
    })

    const userProfilePromise = queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: getUser,
      staleTime: Infinity,
      retry(failureCount) {
        if (failureCount < 2) {
          return true
        }
        toast.error(
          'Um erro inesperado ocorreu durante o carregamento dos dados do usuário logado! Se o erro persistir, por favor, contate um administrador do sistema.',
          {
            duration: Infinity,
            closeButton: true,
          },
        )
        return false
      },
    })

    await Promise.all([patientHeaderPromise, userProfilePromise])

    router.push(`/${cpf}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('w-full space-y-2', errors?.cpf ? '' : 'pb-12')}
    >
      <Input
        {...register('cpf')}
        placeholder="Insira o CPF do paciente"
        onChange={(e) => {
          const formattedCPF = formatCPF(e.target.value)
          setValue('cpf', formattedCPF)
        }}
      />

      <Button
        type="submit"
        size="sm"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Pesquisar'}
      </Button>

      {errors?.cpf && (
        <div className="w-full rounded-md bg-destructive px-4 py-2 text-center">
          <span className="text-white">CPF inválido</span>
        </div>
      )}
    </form>
  )
}

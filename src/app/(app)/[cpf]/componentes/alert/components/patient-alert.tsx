'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { isApiError } from '@/lib/api'
import type { Encounter } from '@/models/entities'
import {
  genericErrorMessage,
  isForbiddenError,
  isNotFoundError,
  isTooManyRequests,
} from '@/utils/error-handlers'

interface PatientAlertProps {
  headerError: Error | null
  isHeaderLoading: boolean
  encounters: Encounter[] | undefined
}
export function PatientAlert({
  encounters,
  headerError,
  isHeaderLoading,
}: PatientAlertProps) {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const [alertContent, setAlertContent] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    if (!isHeaderLoading) {
      if (isNotFoundError(headerError)) {
        setAlertContent({
          title: 'Nenhum registro encontrado',
          description:
            'Não possuímos registros clínicos relativos a este CPF no Histórico Clínico Integrado.',
        })
        setOpen(true)
      } else if (isApiError(headerError) && isForbiddenError(headerError)) {
        setAlertContent({
          title: 'Sem permissão',
          description:
            'Você não possui permissão para visualizar o Histórico Clínico deste paciente. Tente outro paciente.',
        })
        setOpen(true)
      } else if (!!encounters && encounters.length === 0) {
        setAlertContent({
          title: 'Histórico vazio',
          description:
            'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
        })
        setOpen(true)
      } else if (isTooManyRequests(headerError)) {
        // Do nothing
      } else {
        setAlertContent({
          title: 'Erro inesperado',
          description: genericErrorMessage,
        })
      }
    }
  }, [encounters, headerError, isHeaderLoading])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertContent.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.push('/')}>
            Voltar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

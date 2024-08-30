'use client'
import { useParams, useRouter } from 'next/navigation'
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
import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { isApiError } from '@/lib/api'
import { isForbiddenError, isNotFoundError } from '@/utils/error-handlers'

export function PatientAlert() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [alertContent, setAlertContent] = useState({
    title: '',
    description: '',
  })

  const { error: headerError, isLoading: isHeaderLoading } = usePatientHeader({
    cpf,
  })
  const { data: encounters } = usePatientEncounters({ cpf })

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
        if (headerError.response?.data?.detail === 'Menor de Idade') {
          setAlertContent({
            title: 'Paciente menor de idade',
            description:
              'Os dados de pacientes menores de idade ainda não estão sendo exibidos no Histórico Clínico Integrado.',
          })
        } else {
          setAlertContent({
            title: 'Histórico vazio',
            description:
              'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
          })
        }
        setOpen(true)
      } else if (!!encounters && encounters.length === 0) {
        setAlertContent({
          title: 'Histórico vazio',
          description:
            'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
        })
        setOpen(true)
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

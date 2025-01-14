'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { isApiError } from '@/lib/api'
import {
  genericErrorMessage,
  getAPIErrorType,
  isForbiddenError,
  isNotFoundError,
  isTooManyRequests,
} from '@/utils/error-handlers'
import { getAge } from '@/utils/get-age'

import { PatientAlertSkeleton } from './skeleton'

interface PatientAlertProps {
  cpf: string
  setOpen: (open: boolean) => void
}
export function PatientAlert({ cpf, setOpen }: PatientAlertProps) {
  const router = useRouter()
  const { data: profile, isPending: isProfilePending } = useProfile()
  const {
    data: header,
    error: headerError,
    isPending: isHeaderPending,
  } = usePatientHeader({ cpf })
  const { data: encounters, isPending: isEncountersPending } =
    usePatientEncounters({ cpf })
  const [alertContent, setAlertContent] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    if (isHeaderPending || isEncountersPending || isProfilePending) return

    if (headerError) {
      const type = getAPIErrorType(headerError)

      if (isApiError(headerError) && isNotFoundError(headerError)) {
        if (type === 'CONFLICTED_REGISTER') {
          setAlertContent({
            title: 'Divergências cadastrais',
            description:
              'Este CPF possui divergências cadastrais, por isso, não será exibido. Para obter mais informações, consulte diretamente o Prontuário Eletrônico.',
          })
        } else if (type === 'NOT_FOUND') {
          setAlertContent({
            title: 'Nenhum registro encontrado',
            description:
              'Não possuímos registros clínicos relativos a este CPF no Histórico Clínico Integrado.',
          })
        }
      } else if (isApiError(headerError) && isForbiddenError(headerError)) {
        setAlertContent({
          title: 'Sem permissão',
          description:
            'Você não possui permissão para visualizar o Histórico Clínico deste paciente. Tente outro paciente.',
        })
      } else if (isTooManyRequests(headerError)) {
        // Do nothing
      } else {
        setAlertContent({
          title: 'Erro inesperado',
          description: genericErrorMessage,
        })
      }
    } else if (encounters && encounters.length === 0) {
      setAlertContent({
        title: 'Histórico vazio',
        description:
          'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
      })
    }
  }, [
    isProfilePending,
    encounters,
    headerError,
    isEncountersPending,
    isHeaderPending,
    setOpen,
  ])

  if (isProfilePending || isHeaderPending || isEncountersPending) {
    return <PatientAlertSkeleton />
  }

  if (headerError || (encounters && encounters.length === 0)) {
    return (
      <>
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
      </>
    )
  }

  return (
    <>
      <AlertDialogHeader>
        {header && header.birth_date && getAge(header.birth_date) < 18 ? (
          <>
            <AlertDialogTitle>Paciente menor de idade</AlertDialogTitle>
            <AlertDialogDescription className="text-justify">
              Prezado(a) Sr.(a){' '}
              <span className="font-bold">{profile?.name}</span>, você{' '}
              <span className="font-bold">PRECISA</span> acessar esse Histórico
              Clínico? Os dados a seguir são sensíveis e pertencem a um(a)
              paciente <span className="font-bold">MENOR DE IDADE</span>. É de
              sua responsabilidade garantir o sigilo sobre essas informações.
              Este ambiente é <span className="font-bold">MONITORADO</span>, e o
              uso indevido ou compartilhamento não autorizado poderá resultar em
              sanções legais.
            </AlertDialogDescription>
          </>
        ) : (
          <>
            <AlertDialogTitle>Dados sigilosos!</AlertDialogTitle>
            <AlertDialogDescription className="text-justify">
              Prezado(a) Sr.(a){' '}
              <span className="font-bold">{profile?.name}</span>, você{' '}
              <span className="font-bold">PRECISA</span> acessar esse Histórico
              Clínico? Os dados a seguir são sensíveis. É de sua
              responsabilidade garantir o sigilo sobre essas informações. Este
              ambiente é <span className="font-bold">MONITORADO</span>, e o uso
              indevido ou compartilhamento não autorizado poderá resultar em
              sanções legais.
            </AlertDialogDescription>
          </>
        )}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => router.push('/')}
          disabled={isHeaderPending || isEncountersPending}
        >
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => setOpen(false)}
          disabled={isHeaderPending || isEncountersPending}
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  )
}

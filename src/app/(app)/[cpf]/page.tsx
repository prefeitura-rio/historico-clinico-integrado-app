'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
import { Skeleton } from '@/components/ui/skeleton'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { cpfRegex } from '@/utils/regex'
import { validateCPF } from '@/utils/validate-cpf'

import { Episodes } from './componentes/episodes'
import { Footer } from './componentes/footer'
import { Header } from './componentes/header'
import { PatientDetails } from './componentes/patient-details'

interface PatientProps {
  params: {
    cpf: string
  }
}

export default function Patient({ params: { cpf } }: PatientProps) {
  const router = useRouter()

  if (!cpfRegex.test(cpf) || !validateCPF(cpf)) {
    router.push('/')
  }

  const [showData, setShowData] = useState(false)
  const { data, isLoading } = useProfile()

  return (
    <main className="min-w-screen-2xl">
      <AlertDialog open={!showData}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dados sigilosos!</AlertDialogTitle>
            {isLoading ? (
              <>
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[80%]" />
              </>
            ) : (
              <AlertDialogDescription className="text-justify">
                Prezado(a) Sr.(a){' '}
                <span className="font-bold">{data?.name}</span>, você{' '}
                <span className="font-bold">PRECISA</span> acessar esse
                Histórico Clínico? Os dados a seguir são sensíveis. É de sua
                responsabilidade garantir o sigilo sobre essas informações. Este
                ambiente é <span className="font-bold">MONITORADO</span>, e o
                uso indevido ou compartilhamento não autorizado poderá resultar
                em sanções legais.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => router.push('/')}
              disabled={isLoading}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setShowData(true)}
              disabled={isLoading}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {showData && (
        <>
          <Header cpf={cpf} />
          <PatientDetails />
          <Episodes />
          <Footer />
        </>
      )}
    </main>
  )
}

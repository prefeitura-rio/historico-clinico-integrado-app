'se client'
import { useRouter } from 'next/navigation'

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
import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { getAge } from '@/utils/get-age'

import { PatientAlert } from './components/patient-alert'

interface ResultAlertProps {
  cpf: string
  open: boolean
  setOpen: (open: boolean) => void
}

export function ResultAlert({ cpf, open, setOpen }: ResultAlertProps) {
  const router = useRouter()
  const { data: profile } = useProfile()
  const {
    data: header,
    error: headerError,
    isLoading: isHeaderLoading,
  } = usePatientHeader({
    cpf,
  })
  const { data: encounters } = usePatientEncounters({ cpf })

  return (
    <AlertDialog open={open}>
      {!headerError && (!encounters || encounters?.length > 0) ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            {profile && header && encounters ? (
              !header.birth_date || getAge(new Date(header.birth_date)) > 18 ? (
                <>
                  <AlertDialogTitle>Dados sigilosos!</AlertDialogTitle>
                  <AlertDialogDescription className="text-justify">
                    Prezado(a) Sr.(a){' '}
                    <span className="font-bold">{profile?.name}</span>, você{' '}
                    <span className="font-bold">PRECISA</span> acessar esse
                    Histórico Clínico? Os dados a seguir são sensíveis. É de sua
                    responsabilidade garantir o sigilo sobre essas informações.
                    Este ambiente é{' '}
                    <span className="font-bold">MONITORADO</span>, e o uso
                    indevido ou compartilhamento não autorizado poderá resultar
                    em sanções legais.
                  </AlertDialogDescription>
                </>
              ) : (
                <>
                  <AlertDialogTitle>Paciente menor de idade</AlertDialogTitle>
                  <AlertDialogDescription className="text-justify">
                    Prezado(a) Sr.(a){' '}
                    <span className="font-bold">{profile?.name}</span>, você{' '}
                    <span className="font-bold">PRECISA</span> acessar esse
                    Histórico Clínico? Os dados a seguir são sensíveis e
                    pertencem a um(a) paciente{' '}
                    <span className="font-bold">MENOR DE IDADE</span>. É de sua
                    responsabilidade garantir o sigilo sobre essas informações.
                    Este ambiente é{' '}
                    <span className="font-bold">MONITORADO</span>, e o uso
                    indevido ou compartilhamento não autorizado poderá resultar
                    em sanções legais.
                  </AlertDialogDescription>
                </>
              )
            ) : (
              <>
                <AlertDialogTitle className="sr-only">
                  Dados sigilosos!
                </AlertDialogTitle>
                <AlertDialogDescription className="sr-only">
                  Carregando...
                </AlertDialogDescription>
                <Skeleton className="h-7 w-36" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[80%]" />
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => router.push('/')}
              disabled={!header || !profile}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => setOpen(false)}
              disabled={!header || !profile}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <PatientAlert
          encounters={encounters}
          headerError={headerError}
          isHeaderLoading={isHeaderLoading}
        />
        // <span>2</span>
      )}
    </AlertDialog>
  )
}

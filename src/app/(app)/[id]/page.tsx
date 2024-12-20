'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import { usePatientSearch } from '@/hooks/use-queries/use-patient-search'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { cnsRegex, cpfRegex } from '@/utils/regex'
import { validateCPF } from '@/utils/validate-cpf'

import { Episodes } from './componentes/episodes'
import { Footer } from './componentes/footer'
import { Header } from './componentes/header'
import { PatientAlert } from './componentes/patient-alert'
import { PatientAlertSkeleton } from './componentes/patient-alert/skeleton'
import { PatientDetails } from './componentes/patient-details'

interface PatientProps {
  params: {
    id: string
  }
}

export default function Patient({ params: { id } }: PatientProps) {
  const router = useRouter()
  const { data: profile } = useProfile()

  const isCPF = cpfRegex.test(id) && validateCPF(id)
  const isCNS = cnsRegex.test(id)

  if (!isCPF && !isCNS) {
    router.push('/')
  }

  const { data: patients, isLoading: isPatientsLoading } = usePatientSearch(
    isCNS ? { cns: id } : { cpf: id },
  )
  const patient = patients?.at(0)
  const cpf = isCPF ? id : patient?.cpf

  const [openAlert, setOpenAlert] = useState(true)

  useEffect(() => {
    if (profile && !profile.is_use_terms_accepted) {
      router.push('/')
    }
  }, [profile, router])

  return (
    <main className="min-w-screen-2xl">
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          {/* 
            // Etapa 1: Buscando Pacientes... (se id=CPF, pula direto para a etapa 2)
              // Loading:
                // <PatientAlertSkeleton />
              // Erro: (Botão voltar)
                // Nenhum registro encontrado
                // Erro inesperado
            // Etapa 2: Buscando Paciente...
              // Loading:
                // <PatientAlertSkeleton />
              // Erro: (Botão voltar)
                // Nenhum registro encontrado
                // Divergências cadastrais
                // Sem permissão
                // Histórico vazio
                // Erro inesperado
              // Sucesso: (Botão continuar)
                // Paciente menor de idade
                // Dados sigilosos
            */}
          {isPatientsLoading && <PatientAlertSkeleton />}
          {!isPatientsLoading && cpf && (
            <PatientAlert cpf={cpf} setOpen={setOpenAlert} />
          )}
        </AlertDialogContent>
      </AlertDialog>
      {!openAlert && cpf && (
        <>
          <Header cpf={cpf} />
          <PatientDetails cpf={cpf} />
          <Episodes cpf={cpf} />
          <Footer />
        </>
      )}
    </main>
  )
}

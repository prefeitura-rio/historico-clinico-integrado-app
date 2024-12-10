'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useProfile } from '@/hooks/use-queries/use-profile'
import { cpfRegex } from '@/utils/regex'
import { validateCPF } from '@/utils/validate-cpf'

import { ResultAlert } from './componentes/alert'
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
  const { data: profile } = useProfile()

  if (!cpfRegex.test(cpf) || !validateCPF(cpf)) {
    router.push('/')
  }

  const [openAlert, setOpenAlert] = useState(true)

  useEffect(() => {
    if (profile && !profile.is_use_terms_accepted) {
      router.push('/')
    }
  }, [profile, router])

  return (
    <main className="min-w-screen-2xl">
      <ResultAlert cpf={cpf} open={openAlert} setOpen={setOpenAlert} />
      {!openAlert && (
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

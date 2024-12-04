'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
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
  const { data: header } = usePatientHeader({ cpf })

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
          <Header
            deceased={header?.deceased || false}
            family_clinic={
              header?.family_clinic as {
                cnes: string
                name: string
                phone: string
              }
            }
            family_health_team={
              header?.family_health_team as {
                ine_code: string
                name: string
                phone: string
              }
            }
            medical_responsible={header?.medical_responsible}
            nursing_responsible={header?.nursing_responsible}
            profile={profile}
            isLoading={!header}
            registration_name={header?.registration_name || ''}
            social_name={header?.social_name}
            validated={header?.validated || false}
            birth_date={header?.birth_date}
            cns={header?.cns}
            cpf={header?.cpf}
            phone={header?.phone}
            gender={header?.gender}
            race={header?.race}
          />
          <PatientDetails />
          <Episodes />
          <Footer />
        </>
      )}
    </main>
  )
}

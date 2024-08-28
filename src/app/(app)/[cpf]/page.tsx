import { redirect } from 'next/navigation'

import { cpfRegex } from '@/utils/regex'

import { Header } from './componentes/header'
import { MedicalTeam } from './componentes/medical-team'
import { PatientDetails } from './componentes/patient-details'
import { Tabs } from './componentes/tabs'
import { Timeline } from './componentes/timeline'

interface PatientProps {
  params: {
    cpf: string
  }
}

export default function Patient({ params: { cpf } }: PatientProps) {
  if (!cpfRegex.test(cpf)) {
    redirect('/')
  }

  return (
    <main className="w-full pb-48">
      <Header />
      <MedicalTeam />
      <PatientDetails />
      <Tabs />
      <Timeline />
    </main>
  )
}

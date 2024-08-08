import { Header } from './componentes/header'
import { MedicalTeam } from './componentes/medical-team'
import { PatientDetails } from './componentes/patient-details'
import { Tabs } from './componentes/tabs'
import { Timeline } from './componentes/tabs/components/timeline'

export default function Patient() {
  return (
    <main className="w-full">
      <Header />
      <MedicalTeam />
      <PatientDetails />
      <Tabs />
      <Timeline />
    </main>
  )
}

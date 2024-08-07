import { Header } from './componentes/header'
import { MedicalTeam } from './componentes/medical-team'
import { PatientDetails } from './componentes/patient-details'

export default function Patient() {
  return (
    <main className="w-full">
      <Header />
      <MedicalTeam />
      <PatientDetails />
    </main>
  )
}

import { BasicInfo } from './components/basic-info'
import { MedicationsAndAlergies } from './components/basic-info/medications-and-alergies'
import { PatientAlert } from './components/patient-alert'

export function PatientDetails() {
  return (
    <div className="my-10 flex justify-between gap-3 px-24">
      <BasicInfo />
      <MedicationsAndAlergies />
      <PatientAlert />
    </div>
  )
}

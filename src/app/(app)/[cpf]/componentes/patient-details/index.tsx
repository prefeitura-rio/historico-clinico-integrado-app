import { BasicDetails } from './components/basic-details'
import { MedicationsAndAlergies } from './components/medications-and-alergies'
import { PatientAlert } from './components/patient-alert'

export function PatientDetails() {
  return (
    <div className="my-10 flex justify-between px-24">
      <BasicDetails />
      <MedicationsAndAlergies />
      <PatientAlert />
    </div>
  )
}

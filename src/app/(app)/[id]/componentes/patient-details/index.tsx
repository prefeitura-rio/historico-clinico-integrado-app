import { BasicInfo } from './components/basic-info'
import { MedicationsAndAlergies } from './components/medications-and-alergies'

export function PatientDetails({ cpf }: { cpf: string }) {
  return (
    <div className="my-10 flex justify-between gap-3 px-24">
      <BasicInfo cpf={cpf} />
      <MedicationsAndAlergies cpf={cpf} />
    </div>
  )
}

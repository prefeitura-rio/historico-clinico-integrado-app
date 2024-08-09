'use client'
import { useQuery } from '@tanstack/react-query'
import { Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import alergiesIcon from '@/assets/alergies-icon.svg'
import medsIcon from '@/assets/covid_vaccine-protection-medicine-pill.svg'
import { CustomPopover } from '@/components/custom-ui/custom-popover'
import { ExpandableSecretButton } from '@/components/custom-ui/expandable-secret-button.'
import { Separator } from '@/components/ui/separator'
import { getPatientHeader } from '@/http/patient/get-patient-header'
import { getPatientSummary } from '@/http/patient/get-patient-summary'
import { getAge } from '@/utils/get-age'

export function PatientDetails() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data: header } = useQuery({
    queryKey: ['patient', 'header', cpf],
    queryFn: () => getPatientHeader(cpf),
  })

  const { data: summary } = useQuery({
    queryKey: ['patient', 'summary', cpf],
    queryFn: () => getPatientSummary(cpf),
  })

  return (
    <div className="my-10 flex justify-between px-24">
      <div>
        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Nome social
          </span>
          <span className="block text-[2rem] font-medium leading-8 text-typography-dark-blue">
            {header?.social_name || header?.registration_name}
          </span>
        </div>

        <div className="mt-2 space-y-1">
          <span className="text-typography-ice-blue-500 block text-sm leading-3.5">
            nome de registro
          </span>
          <span className="text-typography-ice-blue-500 block text-xl font-medium leading-5">
            {header?.registration_name}
          </span>
        </div>

        <div className="mt-4 flex gap-5">
          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Idade
            </span>
            <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
              {header?.birth_date ? getAge(new Date(header?.birth_date)) : ''}
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Sexo
            </span>
            <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
              {header?.gender}
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Raça
            </span>
            <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
              {header?.race}
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              CPF
            </span>
            <ExpandableSecretButton
              text={header?.cpf || cpf}
              totalWidth="w-[12rem]"
            />
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Telefone
            </span>
            <ExpandableSecretButton
              text={header?.phone || ''}
              totalWidth="w-[13rem]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end">
        <div className="flex">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image src={medsIcon} alt="" />
              <div>
                <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
                  Medicamentos
                </span>
                <span className="block text-[0,6875rem] leading-3 text-typography-dark-blue">
                  de uso contínuo
                </span>
              </div>
            </div>

            <ul className="space-y-1 text-sm text-typography-blue-gray-200">
              {summary?.continuous_use_medications
                ?.slice(0, 2)
                .map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <CustomPopover
              svg={medsIcon}
              title="Medicamentos de uso contínuo"
              size="sm"
              className="mr-20"
              list={[
                'Losartana potássica',
                'Enalapril maleato',
                'Besilato de anlodipino',
                'Captopril',
                'Clonazepam',
                'Enalapril',
              ]}
            />
          </div>

          <Separator orientation="vertical" className="mx-9" />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src={alergiesIcon} alt="" />
              <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
                Alergias
              </span>
            </div>

            <ul className="space-y-1 text-sm text-typography-blue-gray-200">
              {summary?.allergies
                ?.slice(0, 2)
                .map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            <CustomPopover
              svg={alergiesIcon}
              title="Alergias"
              size="sm"
              className="mr-20"
              list={summary?.allergies || []}
            />
          </div>

          <Separator orientation="vertical" className="mx-9" />

          <div>
            <div className="relative space-y-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="size-5 text-typography-light-gray" />
                <span className="block text-sm font-medium leading-3.5 text-typography-light-gray">
                  Doenças Crônicas
                </span>
              </div>

              <ul className="space-y-1 text-sm text-typography-light-gray">
                <li className="blur-[2px]">Hipertensão arterial</li>
                <li className="blur-[2px]">Depressão</li>
              </ul>

              <div className="group absolute -top-3 flex h-full w-full shrink-0 items-center justify-center bg-transparent opacity-90 transition-colors duration-500 hover:bg-background">
                <span className="text-sm font-medium text-typography-blue-gray-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Em breve!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import alergiesIcon from '@/assets/alergies-icon.svg'
import medsIcon from '@/assets/covid_vaccine-protection-medicine-pill.svg'
import { SummaryPopover } from '@/components/custom-ui/summary-popover'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { usePatientSummary } from '@/hooks/use-queries/use-patient-summary'

export function MedicationsAndAlergies() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data: summary, isLoading: isSummaryLoading } = usePatientSummary({
    cpf,
  })

  // For testing:
  // const isSummaryLoading = false
  // const summary = {
  //   continuous_use_medications: ['Med1', 'Med2', 'Med3'],
  //   allergies: ['Alg1', 'Alg2', 'Alg3', 'Alg4'],
  // }

  return (
    <div className="flex flex-col justify-end">
      <div className="flex">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Image src={medsIcon} alt="" />
            <div>
              <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
                Medicamentos
              </span>
              <span className="block text-[0.6875rem] leading-3 text-typography-dark-blue">
                de uso contínuo
              </span>
            </div>
          </div>

          <ul className="space-y-1 text-sm text-typography-blue-gray-200">
            {isSummaryLoading ? (
              <>
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-28" />
              </>
            ) : (
              summary?.continuous_use_medications
                ?.slice(0, 3)
                .map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>

          {!isSummaryLoading &&
            summary?.continuous_use_medications &&
            (summary?.continuous_use_medications.length > 0 ? (
              <span className="text-xs leading-5 text-typography-blue-gray-200">
                * Prescritos nos últimos 12 meses
              </span>
            ) : (
              <div className="flex max-w-48">
                <span className="text-justify text-xs text-typography-blue-gray-200">
                  Não há registro de medicamentos de uso contínuo para este
                  paciente no último ano.
                </span>
              </div>
            ))}

          <SummaryPopover
            svg={medsIcon}
            title="Medicamentos de uso contínuo"
            list={summary?.continuous_use_medications || []}
            disabled={
              isSummaryLoading ||
              !summary?.continuous_use_medications ||
              summary.continuous_use_medications.length <= 3
            }
          />
        </div>

        <Separator orientation="vertical" className="mx-9" />

        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src={alergiesIcon} alt="" />
              <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
                Alergias
              </span>
            </div>

            <ul className="space-y-1 text-sm text-typography-blue-gray-200">
              {isSummaryLoading ? (
                <>
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-3.5 w-20" />
                </>
              ) : (
                summary?.allergies
                  ?.slice(0, 3)
                  .map((item, index) => <li key={index}>{item}</li>)
              )}
            </ul>

            {!isSummaryLoading && summary?.allergies.length === 0 && (
              <div className="flex max-w-40">
                <span className="text-justify text-xs text-typography-blue-gray-200">
                  Não há registro de alergias para este paciente.
                </span>
              </div>
            )}
          </div>

          <SummaryPopover
            svg={alergiesIcon}
            title="Alergias"
            list={summary?.allergies || []}
            disabled={
              isSummaryLoading ||
              !summary?.allergies ||
              summary.allergies.length <= 3
            }
          />
        </div>

        <Separator orientation="vertical" className="mx-9" />

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
  )
}

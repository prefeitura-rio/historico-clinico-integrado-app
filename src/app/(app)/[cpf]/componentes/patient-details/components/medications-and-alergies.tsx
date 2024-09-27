'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import alergiesIcon from '@/assets/alergies-icon.svg'
import medsIcon from '@/assets/covid_vaccine-protection-medicine-pill.svg'
import { SummaryPopover } from '@/components/custom-ui/summary-popover'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { usePatientSummary } from '@/hooks/use-queries/use-patient-summary'

export function MedicationsAndAlergies() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data: summary, isLoading: isSummaryLoading } = usePatientSummary({
    cpf,
  })

  return (
    <div className="flex h-full gap-3">
      <Card className="w-[248px] rounded-xl">
        <CardHeader className="pb-[18px]">
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
        </CardHeader>
        <CardContent className="space-y-[18px]">
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
            summary?.continuous_use_medications.length === 0 && (
              <span className="text-sm text-typography-blue-gray-200">
                Não há registro de medicamentos de uso contínuo para este
                paciente no último ano.
              </span>
            )}

          {summary?.continuous_use_medications &&
            (summary.continuous_use_medications.length > 3 ? (
              <SummaryPopover
                title="Medicamentos de uso contínuo"
                list={summary?.continuous_use_medications || []}
              />
            ) : (
              <span className="block text-xs leading-5 text-typography-blue-gray-200">
                * Prescritos nos últimos 12 meses
              </span>
            ))}
        </CardContent>
      </Card>

      <Card className="w-[248px] rounded-xl">
        <CardHeader className="pb-[18px]">
          <div className="flex items-center gap-2">
            <Image src={alergiesIcon} alt="" />
            <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
              Alergias
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-[18px]">
          <ul className="space-y-1 text-sm text-typography-blue-gray-200">
            {isSummaryLoading ? (
              <>
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3.5 w-28" />
              </>
            ) : (
              summary?.allergies
                ?.slice(0, 3)
                .map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>

          {!isSummaryLoading && summary?.allergies.length === 0 && (
            <span className="text-sm text-typography-blue-gray-200">
              Não há registro de alergias para este paciente.
            </span>
          )}

          {summary?.allergies && summary.allergies.length > 3 && (
            <SummaryPopover title="Alergias" list={summary?.allergies || []} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { Minus, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import alergiesIcon from '@/assets/alergies-icon.svg'
import medsIcon from '@/assets/covid_vaccine-protection-medicine-pill.svg'
import { ExpandableSecretButton } from '@/components/custom-ui/expandable-secret-button.'
import { Skeleton as CustomSkeleton } from '@/components/custom-ui/skeleton'
import { SummaryPopover } from '@/components/custom-ui/summary-popover'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { usePatientSummary } from '@/hooks/use-queries/use-patient-summary'
import { isNoContentError, isNotFoundError } from '@/utils/error-handlers'
import { formatCPF } from '@/utils/fomart-cpf'
import { getAge } from '@/utils/get-age'
import { formatPhone } from '@/utils/string-formatters'

export function PatientDetails() {
  const params = useParams()
  const cpf = params?.cpf.toString()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [alertContent, setAlertContent] = useState({
    title: '',
    description: '',
  })

  const {
    data: header,
    isLoading: headerIsLoading,
    error,
  } = usePatientHeader({ cpf })

  const { data: summary, isLoading } = usePatientSummary({
    cpf,
  })
  // const summary: Summary = {
  //   continuous_use_medications: [],
  //   allergies: [],
  // }
  // const isLoading = false
  const { data: encounters } = usePatientEncounters({ cpf })

  useEffect(() => {
    if (isNotFoundError(error)) {
      setAlertContent({
        title: 'Nenhum registro encontrado',
        description:
          'Não possuímos registros clínicos relativos a este CPF no Histórico Clínico Integrado.',
      })
      setOpen(true)
    } else if (isNoContentError(error)) {
      // TODO: If Paciente menor de idade
      setAlertContent({
        title: 'Paciente menor de idade',
        description:
          'Os dados de pacientes menores de idade ainda não estão sendo exibidos no Histórico Clínico Integrado.',
      })
      // TODO: ELSE:
      setAlertContent({
        title: 'Histórico vazio',
        description:
          'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
      })
      setOpen(true)
    } else if (!!encounters && encounters.length === 0) {
      setAlertContent({
        title: 'Histórico vazio',
        description:
          'Este CPF ainda não possui dados no Histórico Clínico Integrado.',
      })
      setOpen(true)
    }
  }, [encounters, error])

  return (
    <div className="my-10 flex justify-between px-24">
      <div>
        <div className="space-y-1">
          <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
            Nome {!headerIsLoading && header?.social_name ? 'social' : ''}
          </span>
          <CustomSkeleton
            className="mt-1 h-8 w-96"
            isLoading={headerIsLoading}
            isEmpty={
              !headerIsLoading &&
              !header?.social_name &&
              !header?.registration_name
            }
            render={
              <span className="block text-[2rem] font-medium leading-8 text-typography-dark-blue">
                {header?.social_name || header?.registration_name}
              </span>
            }
          />
        </div>

        {!headerIsLoading && header?.social_name && (
          <div className="mt-2 space-y-1">
            <span className="block text-sm leading-3.5 text-typography-ice-blue-500">
              nome de registro
            </span>
            <span className="block text-xl font-medium leading-5 text-typography-ice-blue-500">
              {header?.registration_name ? (
                header.registration_name
              ) : (
                <Minus className={'size-5'} />
              )}
            </span>
          </div>
        )}

        <div className="mt-4 flex gap-5">
          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Idade
            </span>
            <CustomSkeleton
              className="h-5 w-9"
              isLoading={headerIsLoading}
              isEmpty={!headerIsLoading && !header?.birth_date}
              render={
                <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                  {header?.birth_date && getAge(new Date(header.birth_date))}
                </span>
              }
            />
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Sexo
            </span>
            <CustomSkeleton
              className="h-5 w-9"
              isLoading={headerIsLoading}
              isEmpty={!headerIsLoading && !header?.gender}
              render={
                <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                  {header?.gender}
                </span>
              }
            />
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Raça
            </span>

            <CustomSkeleton
              className="h-5 w-9"
              isLoading={headerIsLoading}
              isEmpty={!headerIsLoading && !header?.race}
              render={
                <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
                  {header?.race}
                </span>
              }
            />
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              CPF
            </span>
            <CustomSkeleton
              className="h-6 w-9"
              isLoading={headerIsLoading}
              isEmpty={!headerIsLoading && !header?.birth_date}
              render={
                <ExpandableSecretButton
                  text={formatCPF(cpf)}
                  totalWidth="w-[12rem]"
                />
              }
            />
          </div>

          <div className="space-y-1">
            <span className="block text-sm leading-3.5 text-typography-blue-gray-200">
              Telefone
            </span>
            <CustomSkeleton
              className="h-6 w-9"
              isLoading={headerIsLoading}
              isEmpty={!headerIsLoading && !header?.phone}
              render={
                <ExpandableSecretButton
                  text={formatPhone(header?.phone || '')}
                  totalWidth="w-[13rem]"
                />
              }
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
                <span className="block text-[0.6875rem] leading-3 text-typography-dark-blue">
                  de uso contínuo
                </span>
              </div>
            </div>

            <ul className="space-y-1 text-sm text-typography-blue-gray-200">
              {isLoading ? (
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

            <span className="text-xs leading-5 text-typography-blue-gray-200">
              * Prescritos nos últimos 12 meses
            </span>

            <SummaryPopover
              svg={medsIcon}
              title="Medicamentos de uso contínuo"
              list={summary?.continuous_use_medications || []}
              disabled={
                isLoading ||
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
                {isLoading ? (
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
            </div>

            <SummaryPopover
              svg={alergiesIcon}
              title="Alergias"
              list={summary?.allergies || []}
              disabled={
                isLoading ||
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/')}>
              Voltar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

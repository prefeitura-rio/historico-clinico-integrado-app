'use client'
import { Phone } from 'lucide-react'
import { useParams } from 'next/navigation'

import Whatsapp from '@/assets/whatsapp.svg'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
import { MedicalTeamPopover } from '@/components/custom-ui/medical-team-popover'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { usePatientHeader } from '@/hooks/use-queries/use-patient-header'
import { useUserDetails } from '@/hooks/use-queries/use-user-details'
import { cn } from '@/lib/utils'
import { formatPhone } from '@/utils/string-formatters'
import { whatsAppRedirect } from '@/utils/whatsapp-redirect'

export function MedicalTeam() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data: header, isLoading: isHeaderLoading } = usePatientHeader({ cpf })
  // const { isLoading: isHeaderLoading } = usePatientHeader({ cpf })
  const { data: user, isLoading: isUserLoading } = useUserDetails()

  const doctorList = header?.medical_responsible?.filter((item) => item.name)
  const nurseList = header?.nursing_responsible?.filter((item) => item.name)

  const threshold = 4

  const doctorListTreated =
    doctorList && doctorList?.length <= threshold ? doctorList : []
  const nurseListTreated =
    nurseList && nurseList?.length <= threshold ? nurseList : []

  const doctorTitle = doctorListTreated?.find((item) => item.name)?.name
  const nurseTitle = nurseListTreated?.find((item) => item.name)?.name

  const expandableButtons = [
    {
      icon: Phone,
      text: header?.family_clinic.phone
        ? formatPhone(header?.family_clinic.phone)
        : 'Não possui',
      className: 'hover:w-[12.3625rem]',
      disabled: !header?.family_clinic.name || isHeaderLoading,
      title: header?.family_clinic.name,
      emptyTitle: 'Não há UAP',
      subtitle: 'Unidade de Atenção Primária',
    },
    {
      svg: Whatsapp,
      text: header?.family_health_team.phone
        ? formatPhone(header.family_health_team.phone)
        : 'Não possui',
      className: 'hover:w-[12.3625rem]',
      disabled:
        !header?.family_health_team.name || isUserLoading || isHeaderLoading,
      title: header?.family_health_team.name,
      emptyTitle: 'Não existe vínculo',
      subtitle: 'Equipe de Saúde da Família',
      onClick: () => {
        if (header?.family_health_team.phone) {
          whatsAppRedirect({
            userName: user?.name || '',
            CBO: user?.role || '',
            patientName: header?.social_name || header?.registration_name || '',
            phoneNumber: header.family_health_team.phone,
          })
        }
      },
    },
  ]

  const popoverButtons = [
    {
      list: doctorListTreated,
      title: doctorTitle,
      subtitle: 'Médico(a) de referência',
      disabled: doctorListTreated.length < 2,
    },
    {
      list: nurseListTreated,
      title: nurseTitle,
      subtitle: 'Enfermeiro(a) de referência',
      disabled: nurseListTreated.length < 2,
    },
  ]

  return (
    <div className="z-50 mx-24 mt-10">
      <div className="flex h-14 justify-between">
        {expandableButtons.map((item, index) => (
          <div key={index} className="flex gap-3">
            <ExpandableButton
              Icon={item.icon}
              svg={item.svg}
              text={item.text}
              className={item.className}
              copy
              disabled={item.disabled}
              onClick={item.onClick}
            />
            <div className="flex flex-col">
              {isHeaderLoading ? (
                <Skeleton className="mt-2 h-3.5 w-40" />
              ) : (
                <span
                  className={cn(
                    'block pt-2 text-sm leading-[0.875rem]',
                    item.title
                      ? 'text-typography-dark-blue'
                      : 'text-typography-dark-blue/50',
                  )}
                >
                  {item.title || item.emptyTitle}
                </span>
              )}
              <span className="block text-sm text-typography-blue-gray-200">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}

        {popoverButtons.map((item, index) => (
          <div key={index} className="flex">
            <div key={index} className="flex gap-3">
              <MedicalTeamPopover
                list={item.list?.map((item) => item.name) || []}
                title={item.subtitle || ''}
                disabled={item.disabled}
              />
              <div className="flex flex-col">
                {isHeaderLoading ? (
                  <Skeleton className="mt-2 h-3.5 w-40" />
                ) : (
                  <span
                    className={cn(
                      'block pt-2 text-sm leading-[0.875rem]',
                      item.title
                        ? 'text-typography-dark-blue'
                        : 'text-typography-dark-blue/50',
                    )}
                  >
                    {item.title || 'Não possui'}
                  </span>
                )}
                <span className="block text-sm text-typography-blue-gray-200">
                  {item.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="mt-7" />
    </div>
  )
}

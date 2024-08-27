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
  const { data: user, isLoading: isUserLoading } = useUserDetails()

  const expandableButtons = [
    {
      icon: Phone,
      text: formatPhone(header?.family_clinic.phone || ''),
      className: 'hover:w-[12.0625rem]',
      title: header?.family_clinic.name,
      subtitle: 'Unidade de Atenção Primária',
      copy: true,
      emptyText: 'A unidade não possui telefone',
    },
    {
      svg: Whatsapp,
      text: formatPhone(header?.family_health_team.phone || ''),
      className: 'hover:w-[12.0625rem]',
      title: header?.family_health_team.name,
      subtitle: 'Equipe de Saúde da Família',
      onClick: () => {
        if (header?.family_health_team.phone) {
          whatsAppRedirect({
            userName: user?.name || '',
            CBO: user?.role || '',
            patientName: header?.social_name || header?.registration_name || '',
            phoneNumber: header?.family_health_team.phone || '',
          })
        }
      },
      disabled: isUserLoading,
      copy: true,
      emptyText: 'A equipe não possui WhatsApp',
    },
  ]

  const popoverButtons = [
    {
      type: 'popover',
      list: header?.medical_responsible,
      title: header?.medical_responsible?.at(0)?.name,
      subtitle: 'Médico(a) de referências',
    },
    {
      type: 'popover',
      list: header?.nursing_responsible,
      title: header?.nursing_responsible?.at(0)?.name,
      subtitle: 'Enfermeiro(a) de referências',
    },
  ]

  return (
    <div className="z-50 mx-24 mt-10">
      <div className="flex h-14 justify-between">
        {expandableButtons.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex gap-3">
              <ExpandableButton
                Icon={item.icon}
                svg={item.svg}
                text={item.text || ''}
                className={item?.className}
                onClick={item.onClick}
                copy={!!item?.copy}
                disabled={item.disabled || !item.text}
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
                    {item.title || item.emptyText}
                  </span>
                )}

                <span className="block text-sm text-typography-blue-gray-200">
                  {item.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
        {popoverButtons.map((item, index) => (
          <div key={index} className="flex">
            <div key={index} className="flex gap-3">
              <MedicalTeamPopover
                list={item.list?.map((item) => item.name) || []}
                title={item.subtitle || ''}
                disabled={isHeaderLoading}
              />
              <div className="flex flex-col">
                {isHeaderLoading ? (
                  <Skeleton className="mt-2 h-3.5 w-40" />
                ) : (
                  <span className="block pt-2 text-sm leading-[0.875rem] text-typography-dark-blue">
                    {item.title}
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

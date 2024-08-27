'use client'
import { useQuery } from '@tanstack/react-query'
import { Phone } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Whatsapp from '@/assets/whatsapp.svg'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
import { MedicalTeamPopover } from '@/components/custom-ui/medical-team-popover'
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
import { getPatientHeader } from '@/http/patient/get-patient-header'
import { cn } from '@/lib/utils'
import { isNotFoundError } from '@/utils/error-handlers'
import { formatPhone } from '@/utils/string-formatters'
import { whatsAppRedirect } from '@/utils/whatsapp-redirect'

export function MedicalTeam() {
  const params = useParams()
  const cpf = params?.cpf.toString()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { data, error } = useQuery({
    queryKey: ['patient', 'header', cpf],
    queryFn: () => getPatientHeader(cpf),
    retry(failureCount, error) {
      return !isNotFoundError(error) && failureCount < 2
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setOpen(isNotFoundError(error))
  }, [error])

  const expandableButtons = [
    {
      icon: Phone,
      text: formatPhone(data?.family_clinic.phone || ''),
      className: 'hover:w-[12.0625rem]',
      title: data?.family_clinic.name,
      subtitle: 'Unidade de Atenção Primária',
      copy: true,
      emptyText: 'A unidade não possui telefone',
    },
    {
      svg: Whatsapp,
      text: formatPhone(data?.family_health_team.phone || ''),
      className: 'hover:w-[12.0625rem]',
      title: data?.family_health_team.name,
      subtitle: 'Equipe de Saúde da Família',
      onClick: () => {
        if (data?.family_health_team.phone) {
          whatsAppRedirect({
            phoneNumber: data?.family_health_team.phone || '',
            patientName: data?.social_name || data?.registration_name || '',
            CBO: data?.family_health_team.name || '',
          })
        }
      },
      copy: true,
      emptyText: 'A equipe não possui WhatsApp',
    },
  ]

  const popoverButtons = [
    {
      type: 'popover',
      list: data?.medical_responsible,
      title: data?.medical_responsible?.at(0)?.name,
      subtitle: 'Médico(a) de referências',
    },
    {
      type: 'popover',
      list: data?.nursing_responsible,
      title: data?.nursing_responsible?.at(0)?.name,
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
                disabled={!item.text}
              />
              <div className="flex flex-col">
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
              />
              <div className="flex flex-col">
                <span className="block pt-2 text-sm leading-[0.875rem] text-typography-dark-blue">
                  {item.title}
                </span>
                <span className="block text-sm text-typography-blue-gray-200">
                  {item.subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="mt-7" />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>CPF não encontrado!</AlertDialogTitle>
            <AlertDialogDescription>
              O CPF informado não possui histórico clínico ou dados cadastrados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/')}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

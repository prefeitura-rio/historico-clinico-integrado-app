'use client'
import { useQuery } from '@tanstack/react-query'
import { Phone, Plus, User } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Whatsapp from '@/assets/whatsapp.svg'
import { CustomPopover } from '@/components/custom-ui/custom-popover'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
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

  const cards = [
    {
      type: 'expandable',
      icon: Phone,
      text: formatPhone(data?.family_clinic.phone || ''),
      className: 'hover:w-[11.5625rem]',
      title: data?.family_clinic.name,
      subtitle: 'Unidade de Atenção Primária',
      copy: true,
    },
    {
      type: 'expandable',
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
    },
    {
      type: 'popover',
      icon: Plus,
      list: data?.medical_responsible,
      className: 'hover:w-[11.4375rem]',
      title: data?.medical_responsible?.at(0)?.name,
      subtitle: 'Médico(a) de referências',
    },
    {
      type: 'popover',
      icon: Plus,
      list: data?.nursing_responsible,
      className: 'hover:w-[11.4375rem]',
      title: data?.nursing_responsible?.at(0)?.name,
      subtitle: 'Enfermeiro(a) de referências',
    },
  ]

  return (
    <div className="z-50 mx-24 mt-10">
      <div className="flex">
        {cards.map((item, index) => {
          if (item.type === 'expandable') {
            return (
              <div key={index} className="flex">
                <div className="flex gap-3">
                  <ExpandableButton
                    Icon={item.icon}
                    svg={item.svg}
                    text={item.text || ''}
                    className={item.className}
                    onClick={item.onClick}
                    copy={!!item?.copy}
                  />
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm leading-[0.875rem] text-typography-dark-blue">
                      {item.title}
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                {index < cards.length - 1 && (
                  <Separator className="mx-6" orientation="vertical" />
                )}
              </div>
            )
          } else {
            return (
              <div key={index} className="flex">
                <div key={index} className="flex gap-3">
                  <CustomPopover
                    list={item.list?.map((item) => item.name) || []}
                    size="lg"
                    title={item.subtitle || ''}
                    Icon={User}
                  />
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm leading-[0.875rem] text-typography-dark-blue">
                      {item.title}
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                {index < cards.length - 1 && (
                  <Separator className="mx-6" orientation="vertical" />
                )}
              </div>
            )
          }
        })}
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

'use client'
import { PopoverContent } from '@radix-ui/react-popover'
import { useQuery } from '@tanstack/react-query'
import { Phone, Plus, User, X } from 'lucide-react'
import { useParams } from 'next/navigation'

import Whatsapp from '@/assets/whatsapp.svg'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { getPatientHeader } from '@/http/patient/get-patient-header'

export function MedicalTeam() {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const { data } = useQuery({
    queryKey: ['patient', cpf],
    queryFn: () => getPatientHeader(cpf),
  })

  const cards = [
    {
      type: 'expandable',
      icon: Phone,
      text: data?.family_clinic.phone,
      className: 'hover:w-[11.5625rem]',
      title: data?.family_clinic.name,
      subtitle: 'Unidade de Atenção Primária',
    },
    {
      type: 'expandable',
      svg: Whatsapp,
      text: data?.family_health_team.phone,
      className: 'hover:w-[12.0625rem]',
      title: data?.family_health_team.name,
      subtitle: 'Equipe de Saúde da Família',
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
    <div className="mx-24 mt-10">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="size-7 shrink-0 text-typography-dark-blue" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" sideOffset={12}>
                      <Card className="relative">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-3 top-3 flex size-6 items-center justify-center"
                        >
                          <X className="size-3 text-typography-dark-blue" />
                        </Button>
                        <CardHeader className="p-9">
                          <CardTitle className="flex items-center gap-2">
                            <User className="size-9 text-typography-dark-blue" />
                            <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                              {item.subtitle}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-9 pt-0">
                          <ul>
                            {item.list?.map((person, index) => (
                              <li
                                key={index}
                                className="text-start text-sm text-typography-blue-gray-200"
                              >
                                {person.name}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>
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
    </div>
  )
}

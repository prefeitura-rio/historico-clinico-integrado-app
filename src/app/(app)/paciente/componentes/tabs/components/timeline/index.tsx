import { format } from 'date-fns'
import { Filter, MapPin, User } from 'lucide-react'
import Image from 'next/image'

import ArrowDownRight from '@/assets/arrow-down-right.svg'
import ArrowUpRight from '@/assets/arrow-up-right.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TimelineProps {
  className?: string
}
const today = new Date()
const toDate = new Date()
toDate.setHours(today.getHours() + 2)
toDate.setMinutes(today.getMinutes() - 30)

const data = [
  {
    title: 'Tempor qui in dolore irure tempor est.',
    fromDate: today,
    toDate,
    description: `Culpa duis sunt exercitation Lorem aute Lorem veniam. Voluptate do aliquip consectetur cupidatat. Ipsum deserunt dolor sit cillum fugiat cillum est magna nostrud.Ad elit elit sunt non Lorem magna in.Eu duis fugiat sint anim aliqua anim.Incididunt elit cupidatat velit nostrud Lorem ex amet aute sit magna.Dolor quis nulla duis dolor veniam aliquip.

    Aute dolor exercitation enim fugiat sint culpa sit.Aliquip voluptate ea nulla pariatur consectetur est officia nulla.Incididunt elit magna reprehenderit quis exercitation laborum cupidatat deserunt aute incididunt irure sint do ipsum.`,
    type: 'Consulta',
    subtype: 'Emergência',
    location: 'UPA 24h Magalhães Bastos',
    CIDs: 'Texto texto texto',
    responsable: 'Roberta dos Santos - Médico(a)',
  },
  {
    title: 'Tempor qui in dolore irure tempor est.',
    fromDate: today,
    toDate,
    description: `Culpa duis sunt exercitation Lorem aute Lorem veniam. Voluptate do aliquip consectetur cupidatat. Ipsum deserunt dolor sit cillum fugiat cillum est magna nostrud.Ad elit elit sunt non Lorem magna in.Eu duis fugiat sint anim aliqua anim.Incididunt elit cupidatat velit nostrud Lorem ex amet aute sit magna.Dolor quis nulla duis dolor veniam aliquip.

    Aute dolor exercitation enim fugiat sint culpa sit.Aliquip voluptate ea nulla pariatur consectetur est officia nulla.Incididunt elit magna reprehenderit quis exercitation laborum cupidatat deserunt aute incididunt irure sint do ipsum.`,
    type: 'Consulta',
    subtype: 'Emergência',
    location: 'UPA 24h Magalhães Bastos',
    CIDs: 'Texto texto texto',
    responsable: 'Roberta dos Santos - Médico(a)',
  },
  {
    title: 'Tempor qui in dolore irure tempor est.',
    fromDate: today,
    toDate,
    description: `Culpa duis sunt exercitation Lorem aute Lorem veniam. Voluptate do aliquip consectetur cupidatat. Ipsum deserunt dolor sit cillum fugiat cillum est magna nostrud.Ad elit elit sunt non Lorem magna in.Eu duis fugiat sint anim aliqua anim.Incididunt elit cupidatat velit nostrud Lorem ex amet aute sit magna.Dolor quis nulla duis dolor veniam aliquip.

    Aute dolor exercitation enim fugiat sint culpa sit.Aliquip voluptate ea nulla pariatur consectetur est officia nulla.Incididunt elit magna reprehenderit quis exercitation laborum cupidatat deserunt aute incididunt irure sint do ipsum.`,
    type: 'Consulta',
    subtype: 'Emergência',
    location: 'UPA 24h Magalhães Bastos',
    CIDs: 'Texto texto texto',
    responsable: 'Roberta dos Santos - Médico(a)',
  },
]

export function Timeline({ className }: TimelineProps) {
  return (
    <div className={cn(className)}>
      <div className="my-[2.125rem] flex items-center justify-between px-24">
        <h3 className="text-base font-medium leading-4 text-typography-blue-gray-700">
          Histórico de consultas
        </h3>
        <Button variant="outline" size="icon">
          <Filter className="size-6 text-typography-dark-blue" />
        </Button>
      </div>
      <div className="pt-10">
        {data.map((item, index) => (
          <div key={index} className="flex h-full gap-16 px-24">
            <div className="flex justify-end gap-4">
              <div className="space-y-6 pt-0.5">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-4 text-primary">
                    {format(item.fromDate, 'dd.MM.y')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={ArrowUpRight}
                      className="size-4"
                      alt="Entrada"
                    />
                    <span className="text-sm text-typography-blue-gray-200">
                      {format(item.fromDate, 'HH:mm')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-4 text-primary">
                    {format(item.toDate, 'dd.MM.y')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={ArrowDownRight}
                      className="size-4"
                      alt="Entrada"
                    />
                    <span className="text-sm text-typography-blue-gray-200">
                      {format(item.toDate, 'HH:mm')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex h-full flex-col items-center px-2">
                <div className="z-10 flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-typography-dark-blue/20">
                  <div className="size-[0.6125rem] rounded-full bg-typography-dark-blue" />
                </div>

                <div className="border-typography-ice-blue-300 -mt-2 h-48 w-0 rounded-lg border-[1px]" />
                <div className="border-typography-ice-blue-300 h-full w-0 border-spacing-2 rounded-lg border-[1px] border-dashed" />
              </div>
            </div>

            <div className="pb-14">
              <Card className="-mt-10 grid grid-cols-1">
                <div className="col-span-5 grid grid-cols-7 p-[2.25rem]">
                  <div className="col-span-2 flex gap-2">
                    <MapPin className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                        Local
                      </span>
                      <span className="block text-sm text-typography-blue-gray-200">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Tipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Subtipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtype}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      CIDs ativos
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.CIDs}
                    </span>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                        Responsável pelo atendimento
                      </span>
                      <span className="block text-sm text-typography-blue-gray-200">
                        {item.responsable}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-t-2 p-8">
                  <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                  <div>
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      {item.title}
                    </span>
                    <p className="block text-sm text-typography-blue-gray-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

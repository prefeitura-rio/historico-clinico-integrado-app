import { format } from 'date-fns'
import { MapPin, User } from 'lucide-react'
import Image from 'next/image'

import ArrowDownRight from '@/assets/arrow-down-right.svg'
import ArrowUpRight from '@/assets/arrow-up-right.svg'
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
    <div className={cn(className, 'mt-10 space-y-4')}>
      <h3>Histórico de ocorrências:</h3>
      <div className="pt-10">
        {data.map((item, index) => (
          <div key={index} className="flex h-full">
            <div className="flex w-[40rem] justify-end gap-4 px-4">
              <div className="space-y-6">
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
                <div className="bg-typography-ice-blue z-10 h-6 w-6 shrink-0 rounded-full opacity-50"></div>
                <div className="z-20 mt-[-1.125rem] h-3 w-3 shrink-0 rounded-full bg-primary" />

                <div className="border-typography-ice-blue -mt-1 h-[60%] w-0 border-[2px]" />
                <div className="border-typography-ice-blue h-full w-0 border-[2px] border-dashed" />
              </div>
            </div>

            <div className="pb-14">
              <Card className="-mt-10 grid grid-cols-1">
                <div className="col-span-5 grid grid-cols-7 p-8">
                  <div className="col-span-2 flex gap-2">
                    <MapPin className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
                        Local
                      </span>
                      <span className="block text-sm text-typography-blue-gray-200">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
                      Tipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
                      Subtipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtype}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
                      CIDs ativos
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.CIDs}
                    </span>
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
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
                    <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
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

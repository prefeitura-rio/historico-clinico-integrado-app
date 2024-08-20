import { MapPin, User } from 'lucide-react'
import { Fragment } from 'react'

import { Card } from '@/components/ui/card'
import type { Encounter } from '@/models/entities'

interface TimelineCardProps {
  item: Encounter
}

export function TimelineCard({ item }: TimelineCardProps) {
  return (
    <div className="w-full pb-14">
      <Card className="-mt-10 grid grid-cols-1 transition-colors duration-300 hover:bg-gray-300">
        <div className="col-span-5 grid grid-cols-8 p-[2.25rem]">
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

          <div className="col-span-2 flex gap-2">
            <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                Responsável pelo atendimento
              </span>
              <span className="block text-sm text-typography-blue-gray-200">
                {item.responsible?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t-2 p-8">
          <div>
            <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
              CIDs ativos
            </span>
            {item.active_cids.map((cid, index) => (
              <span
                key={index}
                className="block text-sm text-typography-blue-gray-200"
              >
                - {cid}
              </span>
            ))}
          </div>

          <div>
            <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
              Motivo do atendimento
            </span>
            <p className="block text-sm text-typography-blue-gray-200">
              {item.clinical_motivation?.split(/\r\n|\n/).map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              )) || ''}
            </p>
          </div>

          <div>
            <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
              Desfecho do episódio
            </span>
            <p className="block text-sm text-typography-blue-gray-200">
              {item.clinical_outcome?.split(/\r\n|\n/).map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              )) || ''}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

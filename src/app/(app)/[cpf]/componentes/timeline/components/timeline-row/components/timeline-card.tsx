import { Info, MapPin, User } from 'lucide-react'
import { Fragment } from 'react'

import { Accordion } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Encounter } from '@/models/entities'

import { DescriptionSection } from './description-section'

interface TimelineCardProps {
  item: Encounter
}

export function TimelineCard({ item }: TimelineCardProps) {
  return (
    <div className="w-full pb-14">
      <Card className="-mt-10 grid grid-cols-1 transition-colors duration-300 hover:bg-gray-300">
        <div className="col-span-5 grid grid-cols-7 gap-2 p-[2.25rem]">
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

          <div className="col-span-2 flex flex-col">
            <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
              Subtipo
            </span>
            <span className="block text-sm text-typography-blue-gray-200">
              {item.subtype}
            </span>
          </div>

          {item.type !== 'Exame' && (
            <div className="col-span-2 flex gap-2">
              <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-sm font-medium leading-3.5 text-typography-dark-blue">
                    Responsável pelo atendimento
                  </span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {item.type === 'Internação'
                        ? 'Este é o(a) responsável por indicar a internação'
                        : 'Este é o(a) responsável por preencher o Motivo do atendimento'}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="block text-sm text-typography-blue-gray-200">
                  {item.responsible?.name}
                </span>
              </div>
            </div>
          )}
        </div>

        <Accordion type="multiple" className="space-y-6 border-t-2 p-8">
          {item.exhibition_type === 'default' && (
            <>
              <DescriptionSection
                title="CIDs ativos"
                description={item.active_cids}
                initialState={false}
              />

              <DescriptionSection
                title="Motivo do atendimento"
                description={item.clinical_motivation}
                initialState={false}
              />

              <DescriptionSection
                title="Desfecho do episódio"
                description={item.clinical_outcome}
                initialState={false}
              />
            </>
          )}
          {item.exhibition_type === 'clinical_exam' && (
            <>
              {!!item.clinical_exams.find(
                (item) => item.type === 'Laboratório',
              ) && (
                <DescriptionSection
                  title="Descrição dos exames laboratoriais"
                  description={item.clinical_exams
                    .filter((item) => item.type === 'Laboratório')
                    .map((item) => item.description)}
                  initialState={false}
                />
              )}
              {!!item.clinical_exams.find((item) => item.type === 'Imagem') && (
                <DescriptionSection
                  title="Descrição dos exames de imagem"
                  description={item.clinical_exams
                    .filter((item) => item.type === 'Imagem')
                    .map((item) => item.description)}
                  initialState={false}
                />
              )}
            </>
          )}
        </Accordion>
      </Card>
    </div>
  )
}

import { FileText, Info, MapPin, User } from 'lucide-react'
import { Fragment } from 'react'

import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

import { DescriptionSection } from './components/description-section'

interface TimelineCardProps {
  item: Encounter
}

export function TimelineCard({ item }: TimelineCardProps) {
  return (
    <div className="w-full pb-14">
      <Card className="-mt-10 gap-2 transition-colors duration-300 hover:bg-gray-300">
        <div className="p-[2.25rem]">
          <div
            className={cn(
              'grid grid-cols-7 gap-2',
              item.active_cids_summarized.length > 0 ? 'h-14' : '',
            )}
          >
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

            {item.type !== 'Exame' && item.responsible && (
              <div className="col-span-2 flex gap-2">
                <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                <div className="flex flex-col">
                  <span className="flex items-center gap-0.5 whitespace-nowrap text-sm font-medium leading-3.5 text-typography-dark-blue">
                    Responsável pelo atendimento
                    {item.type === 'Internação' && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-3" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {/* {item.type === 'Internação'
                          ? 'Este é o(a) responsável por indicar a internação'
                          : 'Este é o(a) responsável por preencher o Motivo do atendimento'} */}
                          Este é o(a) responsável por indicar a internação
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </span>
                  <span className="block text-sm text-typography-blue-gray-200">
                    {`${item.responsible?.name} - ${item.responsible?.role}`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {item.active_cids_summarized.length > 0 && (
            <div className="col-span-2 flex gap-2">
              <FileText className="h-6 w-6 shrink-0 text-typography-dark-blue" />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                  Resumo das condições
                </span>
                <span className="block text-sm text-typography-blue-gray-200">
                  {item.active_cids_summarized.join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t-2 p-6">
          {item.exhibition_type === 'default' && (
            <>
              <DescriptionSection
                title="CIDs ativos e não especificados"
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
        </div>
      </Card>
    </div>
  )
}

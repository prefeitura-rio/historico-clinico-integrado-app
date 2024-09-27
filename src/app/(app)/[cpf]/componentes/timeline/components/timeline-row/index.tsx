import { ChevronDown } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

import { InfoBox } from '../../../patient-details/components/basic-info/components/info-box'
import { HeaderInfo } from './components/card-header/header-info'
import { EntryDate } from './components/dates/entry-date'
import { ExitDate } from './components/dates/exit-date'

interface TimelineRowProps {
  item: Encounter
}

const SectionContainer = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => (
  <div
    className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
    onClick={(e) => e.stopPropagation()}
  >
    <span className="text-sm font-medium text-typography-dark-blue">
      {title}
    </span>
    <span className="text-sm text-typography-blue-gray-200">
      {children || 'Não há registro de informações'}
    </span>
  </div>
)

export function TimelineRow({ item }: TimelineRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const collapisableRef = useRef<HTMLDivElement>(null)
  const episodeRef = useRef<HTMLDivElement>(null)

  const responsible = item.responsible
    ? `${item.responsible.name} - ${item.responsible.role}`
    : 'Não há informação'

  const procedures = item.procedures.filter(
    (procedure) => procedure.description || procedure.notes,
  )

  return (
    <div className="flex">
      <div className={`relative ${episodeRef.current?.clientHeight} w-0`}>
        <div className="absolute -left-[52px] top-0 flex h-full flex-col items-center pt-10">
          <div className="flex size-5 items-center justify-center rounded-full bg-typography-dark-blue/20">
            <div className="size-2.5 rounded-full bg-typography-dark-blue" />
          </div>
          <div className="-z-10 -mt-2.5 h-full w-0.5 rounded-full bg-typography-ice-blue-300" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3" ref={episodeRef}>
        {/* Dates */}
        <div className="flex items-end gap-3">
          <EntryDate date={item.entry_datetime} />
          <ExitDate date={item.exit_datetime} deceased={item.deceased} />
          {item.deceased && <InfoBox className="bg-rose-700/20">Óbito</InfoBox>}
        </div>

        {/* Main Card */}
        <Card
          className="relative cursor-pointer p-9 hover:bg-accent"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn(
              'absolute right-6 top-6 size-6 transition-all duration-300',
              isOpen ? 'rotate-180' : '',
            )}
          />

          {/* Header */}
          <div className="flex gap-3">
            <HeaderInfo title="Local" value={item.location} />
            <HeaderInfo title="Tipo" value={item.type} />
            <HeaderInfo title="Subtipo" value={item.subtype} />
            <HeaderInfo
              title="Responsável pelo atendimento"
              value={responsible}
            />
          </div>

          {/* Sections */}
          <div className="mt-3 flex flex-col gap-2">
            {/* Non Collapisable Content */}
            <SectionContainer title="Resumo das condições">
              {item.active_cids_summarized.join(', ')}
            </SectionContainer>

            {/* Collapisable Content */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                height: isOpen
                  ? collapisableRef.current?.getBoundingClientRect().height
                  : 0,
              }}
            >
              <div ref={collapisableRef}>
                <div className="flex shrink-0 flex-col gap-2">
                  <SectionContainer title="CIDs">
                    <span className="flex flex-col gap-1.5">
                      {item.active_cids.map((cid, index) => (
                        <span
                          key={index}
                          className="text-sm text-typography-blue-gray-200"
                        >
                          {cid}
                        </span>
                      ))}
                    </span>
                  </SectionContainer>

                  {procedures.length > 0 && (
                    <SectionContainer title="Procedimentos Clínicos">
                      {procedures.map((p) => p.description).join(', ')}
                    </SectionContainer>
                  )}

                  <SectionContainer title="Motivo do atendimento">
                    <HTMLWrapper>
                      {item.clinical_motivation ||
                        'Não há registro de informações'}
                    </HTMLWrapper>
                  </SectionContainer>

                  <SectionContainer title="Desfecho do episódio">
                    <HTMLWrapper>
                      {item.clinical_outcome ||
                        'Não há registro de informações'}
                    </HTMLWrapper>
                  </SectionContainer>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

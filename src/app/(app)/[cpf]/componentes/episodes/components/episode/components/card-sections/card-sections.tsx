import { useRef } from 'react'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import type { Encounter } from '@/models/entities'

import { CardSection } from './components/card-section'

interface CardSectionsProps {
  item: Encounter
  isOpen: boolean
}

export function CardSections({ item, isOpen }: CardSectionsProps) {
  const collapisableRef = useRef<HTMLDivElement>(null)

  const procedures = item.procedures.filter(
    (procedure) => procedure.description || procedure.notes,
  )

  return (
    <div className="mt-3 flex flex-col gap-2">
      {/* Non Collapisable Content */}
      <CardSection title="Resumo das condições">
        {item.active_cids_summarized.join(', ')}
      </CardSection>

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
            <CardSection title="CIDs">
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
            </CardSection>

            {procedures.length > 0 && (
              <CardSection title="Procedimentos Clínicos">
                {procedures.map((p) => p.description).join(', ')}
              </CardSection>
            )}

            <CardSection title="Motivo do atendimento">
              <HTMLWrapper>
                {item.clinical_motivation || 'Não há registro de informações'}
              </HTMLWrapper>
            </CardSection>

            <CardSection title="Desfecho do episódio">
              <HTMLWrapper>
                {item.clinical_outcome || 'Não há registro de informações'}
              </HTMLWrapper>
            </CardSection>
          </div>
        </div>
      </div>
    </div>
  )
}

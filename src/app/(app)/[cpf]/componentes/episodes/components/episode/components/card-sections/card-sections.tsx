import { useRef } from 'react'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

import { CardSection } from './components/card-section'

interface CardSectionsProps {
  item: Encounter
  isOpen: boolean
}

enum CidStatus {
  RESOLVIDO = 'Resolvido',
  'NAO ESPECIFICADO' = 'Não especificado',
  ATIVO = 'Ativo',
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
        {item.cids_summarized.join(', ')}
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
            <div
              className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium text-typography-dark-blue">
                CIDs
              </span>
              <div className="flex flex-col gap-1.5">
                {item.cids.length > 0 ? (
                  item.cids.map((cid, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-typography-blue-gray-200">
                        {cid.description}
                      </span>
                      <div
                        className={cn(
                          'rounded-lg border px-2 py-1',
                          cid.status === 'RESOLVIDO'
                            ? 'bg-light-green'
                            : cid.status === 'NAO ESPECIFICADO'
                              ? 'bg-sky-blue'
                              : cid.status === 'ATIVO'
                                ? 'bg-light-yellow'
                                : 'bg-rose-700/20',
                        )}
                      >
                        {cid.status && (
                          <span className="text-xs leading-3 text-muted-foreground">
                            {CidStatus[cid.status as keyof typeof CidStatus]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-typography-blue-gray-200">
                    Não há registro de informações
                  </span>
                )}
              </div>
            </div>

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

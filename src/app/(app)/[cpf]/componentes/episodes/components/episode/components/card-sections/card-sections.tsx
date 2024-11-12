import { useRef } from 'react'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import type { Encounter } from '@/models/entities'

import { CardCIDSection } from './components/card-cid-section'
import { CardListSection } from './components/card-list-section'
import { CardTextSection } from './components/card-text-section'

interface CardSectionsProps {
  item: Encounter
  isOpen: boolean
}

export function CardSections({ item, isOpen }: CardSectionsProps) {
  const collapisableRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mt-3 flex flex-col gap-2">
      {/* Non Collapisable Content */}
      {item.exhibition_type !== 'clinical_exam' && (
        <CardTextSection title="Resumo das condições">
          {item.cids_summarized.join(', ')}
        </CardTextSection>
      )}

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
            {item.exhibition_type === 'clinical_exam' ? (
              <>
                {item.clinical_exams.find(
                  (item) => item.type === 'Laboratório',
                ) && (
                  <CardListSection
                    title="Descrição dos exames laboratoriais"
                    items={item.clinical_exams
                      .filter((item) => item.type === 'Laboratório')
                      .map((item) => item.description)}
                  />
                )}

                {item.clinical_exams.find((item) => item.type === 'Imagem') && (
                  <CardListSection
                    title="Descrição dos exames de imagem"
                    items={item.clinical_exams
                      .filter((item) => item.type === 'Imagem')
                      .map((item) => item.description)}
                  />
                )}
              </>
            ) : (
              <>
                <CardCIDSection cids={item.cids} />

                {item.procedures && (
                  <CardTextSection title="Procedimentos Clínicos">
                    <HTMLWrapper>{item.procedures}</HTMLWrapper>
                  </CardTextSection>
                )}

                {item.provider === 'vitacare' && (
                  <CardTextSection title="Medicamentos prescritos">
                    <HTMLWrapper>
                      {item.prescription || 'Não há registro de informações'}
                    </HTMLWrapper>
                  </CardTextSection>
                )}

                {item.provider === 'vitai' && (
                  <CardTextSection
                    title="Medicamentos administrados"
                    tooltip="Os medicamentos abaixo foram prescritos para administração."
                  >
                    <HTMLWrapper>
                      {item.prescription || 'Não há registro de informações'}
                    </HTMLWrapper>
                  </CardTextSection>
                )}

                <CardTextSection title="Motivo do atendimento">
                  <HTMLWrapper>
                    {item.clinical_motivation ||
                      'Não há registro de informações'}
                  </HTMLWrapper>
                </CardTextSection>

                <CardTextSection title="Desfecho do episódio">
                  <HTMLWrapper>
                    {item.clinical_outcome || 'Não há registro de informações'}
                  </HTMLWrapper>
                </CardTextSection>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

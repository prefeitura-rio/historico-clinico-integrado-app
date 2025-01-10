import { formatDate } from 'date-fns'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import { cn } from '@/lib/utils'

interface CardCIDSectionProps {
  medicines: {
    name: string
    date: string
  }[]
}

export function CardAdministeredMedicinesSection({
  medicines,
}: CardCIDSectionProps) {
  const groups = Object.groupBy(medicines, ({ date }) => date)

  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-typography-dark-blue">
        Medicamentos administrados
      </span>

      {medicines.length === 0 && (
        <span className="text-sm text-typography-blue-gray-200">
          Não há registro de informações
        </span>
      )}

      {Object.entries(groups).map((group, index) => (
        <div key={index}>
          <div className="mt-4 flex items-center gap-2">
            {/* <span className="text-xs font-semibold leading-3 text-typography-blue-gray-200">
              Data de registro
            </span> */}
            <div
              className={cn(
                'flex h-10 w-48 items-center justify-between rounded-lg border bg-card px-2',
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
                  {formatDate(group[0], 'dd.MM.y')}
                </span>
                <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
                  {formatDate(group[0], 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            {group[1]?.map((item, index) => (
              <span
                key={index}
                className="text-sm text-typography-blue-gray-200"
              >
                <HTMLWrapper>{item.name}</HTMLWrapper>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

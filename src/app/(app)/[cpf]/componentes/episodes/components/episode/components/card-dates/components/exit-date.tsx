import { format } from 'date-fns'
import Image from 'next/image'

import ArrowDownRight from '@/assets/arrow-down-right.svg'

interface ExitDateProps {
  date: string | null
  deceased: boolean
}

export function ExitDate({ date, deceased }: ExitDateProps) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold leading-3 text-typography-blue-gray-200">
        {date ? (deceased ? 'Óbito' : 'Saída') : ''}
      </span>
      {date ? (
        <div className="flex h-10 w-48 justify-between rounded-lg border bg-card px-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
              {format(date, 'dd.MM.y')}
            </span>
            <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
              {format(date, 'HH:mm')}
            </span>
          </div>
          <div className="flex h-full items-center">
            <Image src={ArrowDownRight} className="size-4" alt="Entrada" />
          </div>
        </div>
      ) : (
        <div className="flex h-10 w-48 items-center justify-center rounded-lg border bg-accent">
          <span className="text-sm font-medium leading-3.5 text-typography-blue-gray-200">
            em andamento
          </span>
        </div>
      )}
    </div>
  )
}

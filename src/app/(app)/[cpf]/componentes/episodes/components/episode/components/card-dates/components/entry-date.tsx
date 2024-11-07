import { format } from 'date-fns'
import Image from 'next/image'

import ArrowUpRight from '@/assets/arrow-up-right.svg'
import { cn } from '@/lib/utils'

interface EntryDateProps {
  provider: string
  date: string
}

export function EntryDate({ date, provider }: EntryDateProps) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold leading-3 text-typography-blue-gray-200">
        {provider === 'vitacare' ? 'Data de atendimento' : 'Entrada'}
      </span>
      <div
        className={cn(
          'flex h-10 w-48 items-center justify-between rounded-lg border bg-card px-2',
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
            {format(date, 'dd.MM.y')}
          </span>
          {provider !== 'vitacare' && (
            <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
              {format(date, 'HH:mm')}
            </span>
          )}
        </div>
        {provider !== 'vitacare' && (
          <div className="flex h-full items-center">
            <Image src={ArrowUpRight} className="size-4" alt="Entrada" />
          </div>
        )}
      </div>
    </div>
  )
}

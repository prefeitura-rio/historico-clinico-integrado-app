import { format } from 'date-fns'
import Image from 'next/image'

import ArrowDownRight from '@/assets/arrow-down-right.svg'
import ArrowUpRight from '@/assets/arrow-up-right.svg'
import type { Encounter } from '@/models/entities'

interface TimelineAxisProps {
  item: Encounter
}

export function TimelineAxis({ item }: TimelineAxisProps) {
  return (
    <div className="flex w-40 justify-end gap-4">
      <div className="space-y-6 pt-0.5">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold leading-4 text-primary">
            {format(item.entry_datetime, 'dd.MM.y')}
          </span>
          <div className="flex items-center gap-2">
            <Image src={ArrowUpRight} className="size-4" alt="Entrada" />
            <span className="text-sm text-typography-blue-gray-200">
              {format(item.entry_datetime, 'HH:mm')}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold leading-4 text-primary">
            {format(item.exit_datetime, 'dd.MM.y')}
          </span>
          <div className="flex items-center gap-2">
            <Image src={ArrowDownRight} className="size-4" alt="Entrada" />
            <span className="text-sm text-typography-blue-gray-200">
              {format(item.exit_datetime, 'HH:mm')}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex h-full flex-col items-center px-2">
        <div className="z-10 flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-typography-dark-blue/20">
          <div className="size-[0.6125rem] rounded-full bg-typography-dark-blue" />
        </div>

        <div className="-mt-2 h-48 w-0 rounded-lg border-[1px] border-typography-ice-blue-300" />
        <div className="h-full w-0 border-spacing-2 rounded-lg border-[1px] border-dashed border-typography-ice-blue-300" />
      </div>
    </div>
  )
}

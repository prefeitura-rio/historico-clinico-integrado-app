import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CardSectionProps {
  children: ReactNode
  title: string
  tooltip?: string
}

export function CardTextSection({
  children,
  title,
  tooltip,
}: CardSectionProps) {
  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-typography-dark-blue">
          {title}
        </span>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-3.5 shrink-0 text-typography-blue-gray-200" />
            </TooltipTrigger>
            <TooltipContent align="start">
              <span className="text-sm text-typography-blue-gray-200">
                {tooltip || 'Não há registro de informações'}
              </span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <span className="text-sm text-typography-blue-gray-200">
        {children || 'Não há registro de informações'}
      </span>
    </div>
  )
}

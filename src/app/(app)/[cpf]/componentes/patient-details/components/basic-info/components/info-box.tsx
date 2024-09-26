import { Minus } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface InfoBoxProps {
  children?: ReactNode
  className?: string
}

export function InfoBox({ children, className }: InfoBoxProps) {
  return (
    <div
      className={cn(
        'flex h-10 items-center justify-center rounded-lg border px-3 py-2',
        className,
      )}
    >
      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
        {children ?? <Minus className="size-3.5 text-typography-dark-blue" />}
      </span>
    </div>
  )
}

import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatPhone } from '@/utils/string-formatters'

interface HeaderPopoverNameListProps {
  title: string
  subtitle: string
  phone: string
  icon: ReactNode
  onClick?: () => void
}
export function HeaderPopoverPhone({
  title,
  subtitle,
  phone,
  icon,
  onClick,
}: HeaderPopoverNameListProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            'text-sm font-medium leading-3.5',
            title.includes('Não há') || title.includes('Não existe')
              ? 'text-typography-dark-blue/50'
              : 'text-typography-dark-blue',
          )}
        >
          {title}
        </span>
        <span className="text-xs leading-5 text-typography-blue-gray-200">
          {subtitle}
        </span>
      </div>
      <Button
        variant="outline"
        className="flex gap-2.5 px-3 text-typography-blue-gray-200"
        onClick={() => {
          if (phone) {
            navigator.clipboard.writeText(phone)
          }
          onClick?.()
        }}
      >
        {icon}
        <span>{formatPhone(phone)}</span>
      </Button>
    </div>
  )
}

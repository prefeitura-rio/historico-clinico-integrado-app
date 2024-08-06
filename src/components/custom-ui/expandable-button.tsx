import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface ExpandlableButtonProps {
  Icon: LucideIcon
  text: string
  className: string
}

export function ExpandlableButton({
  Icon,
  text,
  className,
}: ExpandlableButtonProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'group relative flex items-center justify-start gap-2.5 overflow-hidden px-3.5 transition-all duration-500',
        className,
      )}
    >
      <Icon className="inline-block size-6 shrink-0 text-primary" />
      <span className="group inline-block text-base text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {text}
      </span>
    </Button>
  )
}

import { type ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface HeaderPopoverProps {
  children: ReactNode
  icon: ReactNode
  title: string
  disabled: boolean
}

export function HeaderPopover({
  children,
  icon,
  title,
  disabled,
}: HeaderPopoverProps) {
  const [mouseOver, setMouseOver] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
            size="icon"
            variant="outline"
            disabled={disabled}
          >
            {icon}
          </Button>
        </PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </Popover>
      <div className="flex h-3.5 w-[3.25rem] flex-col items-center overflow-visible">
        <span
          className={cn(
            'text-nowrap text-center text-sm font-medium leading-3.5 text-typography-blue-gray-200 opacity-0 transition-opacity duration-300',
            mouseOver ? 'opacity-100' : '',
          )}
        >
          {title}
        </span>
      </div>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface ExpandableButtonProps {
  Icon?: LucideIcon
  svg?: StaticImageData
  text: string
  className: string
}

export function ExpandableButton({
  Icon,
  svg,
  text,
  className,
}: ExpandableButtonProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'group relative flex shrink-0 items-center justify-start gap-3 overflow-hidden px-3.5 transition-all duration-500',
        // 'group relative flex w-auto max-w-[3.5rem] shrink-0 items-center justify-start gap-3 overflow-hidden px-3.5 transition-all duration-500 ease-in-out hover:max-w-[48rem]',
        className,
      )}
    >
      {Icon ? (
        <Icon className="inline-block size-6 shrink-0 text-typography-dark-blue" />
      ) : (
        !!svg && (
          <Image
            src={svg}
            alt=""
            className="inline-block size-6 shrink-0 text-typography-dark-blue"
          />
        )
      )}
      <span className="group inline-block shrink-0 text-base text-muted-foreground opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        {text}
      </span>
    </Button>
  )
}

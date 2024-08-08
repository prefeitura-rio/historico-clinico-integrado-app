'use client'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface ExpandableSecretButtonProps {
  text: string
  totalWidth: string
}

export function ExpandableSecretButton({
  text,
  totalWidth,
}: ExpandableSecretButtonProps) {
  const [show, setShow] = useState(false)

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'group relative flex h-auto shrink-0 items-center justify-start gap-3 overflow-hidden p-0 transition-all duration-300 hover:bg-transparent',
        show ? totalWidth : '',
      )}
      onClick={() => setShow(!show)}
    >
      {show ? (
        <Eye className="inline-block size-6 shrink-0 text-typography-dark-blue transition-all duration-300 ease-out group-hover:opacity-50" />
      ) : (
        <EyeOff className="inline-block size-6 shrink-0 text-typography-dark-blue transition-all duration-300 ease-out group-hover:opacity-50" />
      )}
      <span
        className={cn(
          'inline-block shrink-0 text-xl font-medium leading-5 text-muted-foreground text-typography-dark-blue opacity-0 transition-opacity duration-300 ease-in-out',
          show ? 'opacity-100' : '',
        )}
      >
        {text}
      </span>
    </Button>
  )
}

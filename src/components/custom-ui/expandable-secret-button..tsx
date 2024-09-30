'use client'
import { Eye, EyeOff } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface ExpandableSecretButtonProps {
  children: ReactNode
  disabled?: boolean
}

export function ExpandableSecretButton({
  children,
  disabled = false,
}: ExpandableSecretButtonProps) {
  const [show, setShow] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  return (
    <Button
      variant="outline"
      className={cn(
        'group relative flex h-10 shrink-0 items-center justify-start gap-3 overflow-hidden px-3 py-2 transition-all duration-300',
      )}
      onClick={() => setShow(!show)}
      style={{
        width: show ? `calc(${textRef.current?.clientWidth}px + 4rem)` : '3rem',
      }}
      disabled={disabled}
    >
      {show ? (
        <Eye className="inline-block size-6 shrink-0 text-typography-dark-blue transition-all duration-300" />
      ) : (
        <EyeOff className="inline-block size-6 shrink-0 text-typography-dark-blue transition-all duration-300" />
      )}
      <span
        ref={textRef}
        className={cn(
          'inline-block shrink-0 text-sm font-medium leading-3.5 text-muted-foreground text-typography-dark-blue opacity-0 transition-opacity duration-300 ease-in-out',
          show ? 'opacity-100' : '',
        )}
      >
        {children}
      </span>
    </Button>
  )
}

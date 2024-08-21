'use client'

import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, type ButtonProps } from '../ui/button'

interface ExpandableButtonProps extends ButtonProps {
  Icon?: LucideIcon
  svg?: StaticImageData
  text: string
  className: string
  copy?: boolean
}

export function ExpandableButton({
  Icon,
  svg,
  text,
  className,
  copy = false,
  ...rest
}: ExpandableButtonProps) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => {
        setClicked(false)
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [clicked])

  return (
    <Button
      {...rest}
      size="icon"
      variant="outline"
      className={cn(
        'group relative flex shrink-0 items-center justify-start gap-3 overflow-hidden px-3.5 transition-all duration-500',
        className,
      )}
      onMouseLeave={() => setClicked(false)}
      onClick={() => {
        if (copy && text) {
          setClicked(true)
          navigator.clipboard.writeText(text)
        }
      }}
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
      <div
        className={cn(
          'in absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-200 transition-opacity',
          clicked ? 'opacity-100' : 'opacity-0 duration-1000 ease-out',
        )}
      >
        <span className="text-typography-blue-gray-200">copiado!</span>
      </div>
    </Button>
  )
}

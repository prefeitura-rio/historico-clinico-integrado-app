import { type LucideIcon, Plus, X } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface CustomPopoverProps {
  size: 'sm' | 'lg'
  Icon?: LucideIcon
  svg?: StaticImageData
  title: string
  list: string[]
  className?: string
}

export function CustomPopover({
  size,
  Icon,
  list,
  title,
  svg,
  className,
}: CustomPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {size === 'sm' ? (
          <Button
            variant="outline"
            size="icon"
            className="flex size-6 items-center justify-center"
          >
            <Plus className="size-3" />
          </Button>
        ) : (
          size === 'lg' && (
            <Button variant="outline" size="icon" className="">
              <Plus className="size-5" />
            </Button>
          )
        )}
      </PopoverTrigger>
      <PopoverContent
        align={size === 'lg' ? 'start' : 'center'}
        sideOffset={12}
        className={cn(
          'max-w-screen-2xl border-0 bg-transparent p-0',
          className,
        )}
      >
        <Card className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-3 flex size-6 items-center justify-center"
          >
            <X className="size-3 text-typography-dark-blue" />
          </Button>
          <CardHeader className="p-9">
            <CardTitle className="flex items-center gap-2">
              {Icon ? (
                <Icon className="size-9 shrink-0 text-typography-dark-blue" />
              ) : (
                svg && <Image src={svg} alt="" />
              )}
              <span className="whitespace-nowrap text-sm font-medium leading-3.5 text-typography-dark-blue">
                {title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-9 pt-0">
            <ul>
              {list?.map((item, index) => (
                <li
                  key={index}
                  className="text-start text-sm text-typography-blue-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

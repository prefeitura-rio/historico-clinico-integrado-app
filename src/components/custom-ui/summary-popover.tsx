import { ChevronRight, type LucideIcon, X } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface CustomPopoverProps {
  Icon?: LucideIcon
  svg?: StaticImageData
  title: string
  list: string[]
}

export function SummaryPopover({ Icon, list, title, svg }: CustomPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex size-6 items-center justify-center"
        >
          <ChevronRight
            className={cn(
              'size-3 transition-all duration-100',
              open ? 'rotate-90' : '',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={12}
        className="mr-20 max-w-screen-2xl border-0 bg-transparent p-0"
      >
        <Card className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-3 flex size-6 items-center justify-center"
            onClick={() => setOpen(false)}
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

            <span className="text-xs leading-5 text-typography-blue-gray-200">
              * Prescritos nos últimos 12 meses
            </span>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

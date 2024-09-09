import { ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import userPlus from '@/assets/user-plus.svg'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface MedicalTeamPopoverProps {
  title: string
  list: string[]
  disabled?: boolean
}

export function MedicalTeamPopover({
  title,
  list,
  disabled = false,
}: MedicalTeamPopoverProps) {
  const [isOpen, setOpen] = useState(false)

  function onOpenChange(open: boolean) {
    if (list.length < 2) return

    if (open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            list.length <= 1 ? 'hover:cursor-default hover:bg-inherit' : '',
          )}
          disabled={disabled}
        >
          {list.length > 1 ? (
            <ChevronRight
              className={cn(
                'size-5 transition-all duration-100',
                isOpen ? 'rotate-90' : '',
              )}
            />
          ) : (
            <Image
              src={userPlus}
              alt=""
              className="size-6 text-typography-dark-blue"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={12}
        className={'max-w-screen-2xl border-0 bg-transparent p-0'}
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
              <Image
                src={userPlus}
                alt=""
                className="size-9 shrink-0 text-typography-dark-blue"
              />
              <span className="whitespace-nowrap text-sm font-medium leading-3.5 text-typography-dark-blue">
                {title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-9 pt-0">
            <ul>
              {list.slice(0, 4).map((item, index) => (
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

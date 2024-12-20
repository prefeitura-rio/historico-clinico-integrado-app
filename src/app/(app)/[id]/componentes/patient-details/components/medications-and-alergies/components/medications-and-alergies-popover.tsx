import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface CustomPopoverProps {
  title: string
  list: string[]
}

export function MedicationsAndAlergiesPopover({
  list,
  title,
}: CustomPopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="size-8 p-0">
          <Plus className="size-3.5 text-typography-dark-blue" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={32}
        className="-ml-12 max-w-screen-2xl border-0 bg-transparent p-0"
      >
        <Card className="rounded-xl p-6">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="whitespace-nowrap p-0 text-sm font-medium leading-3.5 text-typography-dark-blue">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            <ul className="space-y-1">
              {list?.map((item, index) => (
                <li
                  key={index}
                  className="rounded-lg border px-2 py-1.5 text-start text-xs leading-5 text-typography-blue-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
            {title === 'Medicamentos de uso contínuo' && (
              <span className="block text-xs leading-5 text-typography-blue-gray-200">
                * Prescritos nos últimos 12 meses
              </span>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

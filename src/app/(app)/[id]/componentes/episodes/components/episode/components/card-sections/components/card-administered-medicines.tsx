import { formatDate } from 'date-fns'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface CardCIDSectionProps {
  medicines: {
    name: string
    date: string
  }[]
}

export function CardAdministeredMedicinesSection({
  medicines,
}: CardCIDSectionProps) {
  const groups = Object.groupBy(medicines, ({ date }) => date)
  const mostRecent = Object.entries(groups).at(0)

  return (
    <div
      className="flex cursor-default flex-col gap-3 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-typography-dark-blue">
        Medicamentos administrados
      </span>

      {medicines.length === 0 && (
        <span className="text-sm text-typography-blue-gray-200">
          Não há registro de informações
        </span>
      )}

      {mostRecent && (
        <div>
          <div className="mt-4 flex items-center gap-2">
            <div
              className={cn(
                'flex h-10 items-center justify-between rounded-lg border bg-card px-2',
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
                  {formatDate(mostRecent[0], 'dd.MM.y')}
                </span>
                <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
                  {formatDate(mostRecent[0], 'HH:mm')}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            {mostRecent[1]?.map((item, index) => (
              <span
                key={index}
                className="text-sm text-typography-blue-gray-200"
              >
                <HTMLWrapper>{item.name}</HTMLWrapper>
              </span>
            ))}
          </div>
        </div>
      )}

      {Object.entries(groups).length > 1 && (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-typography-blue-gray-200"
              >
                Todos os medicamentos administrados
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-medium leading-3.5 text-typography-dark-blue">
                  Todos os medicamentos administrados
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-4">
                {Object.entries(groups).map(([data, items], index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex flex-col justify-between gap-1 rounded-lg border bg-card p-2.5',
                        )}
                      >
                        <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
                          {formatDate(data, 'dd.MM.y')}
                        </span>
                        <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
                          {formatDate(data, 'HH:mm')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      {items?.map((item, index) => (
                        <span
                          key={index}
                          className="text-sm text-typography-blue-gray-200"
                        >
                          <HTMLWrapper>{item.name}</HTMLWrapper>
                        </span>
                      ))}
                    </div>
                    {index !== Object.entries(groups).length - 1 && (
                      <Separator className="mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

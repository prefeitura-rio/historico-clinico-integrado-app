import { formatDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Filter, Info, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'

import { HTMLWrapper } from '@/components/custom-ui/html-wrapper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
  })
  const groups = useMemo(
    () => Object.groupBy(medicines, ({ date }) => date),
    [medicines],
  )
  const mostRecent = useMemo(() => Object.entries(groups).at(0), [groups])

  const data = useMemo(() => Object.entries(groups), [groups])
  const filteredData = useMemo(() => {
    // If only one date is selected, filter the data to show only the selected date
    if (date?.from && !date?.to) {
      const from = date.from

      return data.filter((item) => {
        const cur = new Date(item[0])
        cur.setHours(0, 0, 0, 0)

        return cur.getTime() === from.getTime()
      })
    }
    // If a range of dates is selected, filter the data to show only the dates in the range
    else if (date?.from && date?.to) {
      const from = date.from
      const to = date.to

      return data.filter((item) => {
        const cur = new Date(item[0])
        cur.setHours(0, 0, 0, 0)

        return cur.getTime() >= from.getTime() && cur.getTime() <= to.getTime()
      })
    } else return data
  }, [data, date?.from, date?.to])

  return (
    <div
      className="flex cursor-default flex-col gap-3 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Section Title */}
      <span className="text-sm font-medium text-typography-dark-blue">
        Medicamentos administrados
      </span>

      {/* Section Content (if no items) */}
      {medicines.length === 0 && (
        <span className="text-sm text-typography-blue-gray-200">
          Não há registro de informações
        </span>
      )}

      {/* Section Content (first item) */}
      {mostRecent && (
        <div>
          <div className="mt-4 flex items-center gap-2">
            <div
              className={cn(
                'flex h-10 items-center gap-1.5 rounded-lg border bg-card px-2',
              )}
            >
              <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
                {mostRecent[0] && !isNaN(new Date(mostRecent[0]).getTime()) 
                  ? formatDate(mostRecent[0], 'dd.MM.y') 
                  : <p></p>}
              </span>
              <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
                {mostRecent[0] && !isNaN(new Date(mostRecent[0]).getTime()) 
                  ? formatDate(mostRecent[0], 'HH:mm') 
                  : <p>Desconhecido</p> }
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-3.5 shrink-0 text-typography-blue-gray-200" />
                </TooltipTrigger>
                <TooltipContent
                  className="z-50 max-w-96"
                  align="start"
                  avoidCollisions
                  side="top"
                >
                  <span className="text-sm text-typography-blue-gray-200">
                    <span className="font-bold">Data de registro: </span> a data
                    exibida refere-se ao momento em que o medicamento foi
                    registrado no sistema, podendo não corresponder ao horário
                    exato da administração ao paciente.
                  </span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <ul className="mt-3 flex list-inside list-decimal flex-col gap-1">
            {mostRecent[1]?.map((item, index) => (
              <li key={index} className="text-sm text-typography-blue-gray-200">
                <HTMLWrapper>{item.name}</HTMLWrapper>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dialog (all items) */}
      {data.length > 1 && (
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

            <DialogContent
              closeButton={false}
              className="flex h-[80%] max-w-[80%] flex-col items-start overflow-y-scroll"
            >
              {/* Close Dialog Button */}
              <DialogClose asChild>
                <Button
                  className="absolute right-2 top-4 size-auto border p-2.5"
                  variant="secondary"
                  size="icon"
                >
                  <X className="size-4 text-typography-dark-blue" />
                </Button>
              </DialogClose>

              {/* Date Filter Popover */}
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    className="absolute right-14 top-4 size-auto p-2.5"
                    variant="outline"
                    size="icon"
                  >
                    <Filter className="size-4 text-typography-dark-blue" />
                    <span className="sr-only">Filtro</span>
                    {date?.from && (
                      <div className="absolute right-1.5 top-1.5 size-1 rounded-full bg-typography-dark-blue" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-center">
                  <div className="flex w-full items-center justify-between rounded-lg border px-2 py-1 text-sm">
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <span className="cursor-default">
                          {formatDate(date.from, 'dd MMM, y', {
                            locale: ptBR,
                          })}{' '}
                          -{' '}
                          {formatDate(date.to, 'dd MMM, y', {
                            locale: ptBR,
                          })}
                        </span>
                      ) : (
                        formatDate(date.from, 'dd MMM, y', {
                          locale: ptBR,
                        })
                      )
                    ) : (
                      <span className="cursor-default text-muted-foreground">
                        Selecione uma data
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9"
                      onClick={() => setDate(undefined)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                  <Calendar
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>

              <DialogHeader>
                <DialogTitle className="font-medium leading-3.5 text-typography-dark-blue">
                  Todos os medicamentos administrados
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 flex w-full flex-col gap-4">
                {filteredData.map(([data, items], index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex items-center gap-1.5 rounded-lg border bg-card p-2.5',
                        )}
                      >
                        <span className="text-sm font-semibold leading-3.5 text-typography-dark-blue">
                          {data && !isNaN(new Date(data).getTime()) 
                          ? formatDate(data, 'dd.MM.y') 
                          : <p>Desconhecido</p> }
                        </span>
                        <span className="text-sm leading-3.5 text-typography-blue-gray-200/90">
                          {data && !isNaN(new Date(data).getTime()) 
                          ? formatDate(data, 'HH:mm') 
                          : <p>Desconhecido</p> }
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="size-3.5 shrink-0 text-typography-blue-gray-200" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="max-w-96"
                            avoidCollisions
                            side="right"
                          >
                            <span className="text-sm text-typography-blue-gray-200">
                              <span className="font-bold">
                                Data de registro:{' '}
                              </span>{' '}
                              a data exibida refere-se ao momento em que o
                              medicamento foi registrado no sistema, podendo não
                              corresponder ao horário exato da administração ao
                              paciente.
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <ul className="mt-3 flex list-inside list-decimal flex-col gap-1">
                      {items?.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-typography-blue-gray-200"
                        >
                          <HTMLWrapper>{item.name}</HTMLWrapper>
                        </li>
                      ))}
                    </ul>
                    {index !== Object.entries(groups).length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <span className="text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </span>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

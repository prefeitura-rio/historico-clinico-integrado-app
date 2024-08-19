'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Filter, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'

import ArrowDownRight from '@/assets/arrow-down-right.svg'
import ArrowUpRight from '@/assets/arrow-up-right.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { getPatientEncounters } from '@/http/patient/get-patient-encounters'
import { getPatientFilterTags } from '@/http/patient/get-patient-filter-tags'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

interface TimelineProps {
  className?: string
}
const today = new Date()
const toDate = new Date()
toDate.setHours(today.getHours() + 2)
toDate.setMinutes(today.getMinutes() - 30)

export function Timeline({ className }: TimelineProps) {
  const params = useParams()
  const cpf = params?.cpf.toString()
  const [filteredData, setFilteredData] = useState<Encounter[]>()
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    {},
  )

  const { data: encounters } = useQuery({
    queryKey: ['patient', 'encounters', cpf],
    queryFn: () =>
      getPatientEncounters(cpf).then((data) => {
        setFilteredData(data)
        return data
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const { data: filterTags } = useQuery({
    queryKey: ['patient', 'filter-tags'],
    queryFn: () =>
      getPatientFilterTags().then((data) => {
        let newFilter: Record<string, boolean> = {}
        data.forEach((filter) => {
          newFilter = {
            ...newFilter,
            [filter]: false,
          }
        })
        setActiveFilters(newFilter)
        return data
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  function handleCheckboxChange(filter: string) {
    const newFilters = {
      ...activeFilters,
      [filter]: !activeFilters[filter],
    }
    setActiveFilters(newFilters)
    if (encounters) {
      const newData = Object.values(newFilters).find((item) => !!item)
        ? encounters.filter((item) =>
            item.filter_tags.some((tag) => newFilters[tag]),
          )
        : encounters
      setFilteredData(newData)
    }
  }

  return (
    <div className={cn(className)}>
      <div className="my-[2.125rem] flex items-center justify-between px-24">
        <h3 className="text-base font-medium leading-4 text-typography-blue-gray-700">
          Histórico clínico
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="size-6 text-typography-dark-blue" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            side="bottom"
            className="text-typography-dark-blue"
          >
            <div className="flex items-center gap-3">
              <MapPin className="size-5" />
              <span>Local</span>
            </div>
            <Separator className="my-3" />
            <div className="space-y-2">
              {!filterTags && (
                <div className="flex h-full w-full items-center justify-center">
                  <Spinner />
                </div>
              )}
              {filterTags?.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    id={tag}
                    className="group size-4"
                    checked={activeFilters[tag]}
                    onCheckedChange={() => handleCheckboxChange(tag)}
                    disabled={tag === 'CAPS'}
                  />
                  <Label
                    htmlFor={tag}
                    className={cn(
                      'cursor-pointer text-sm leading-normal text-typography-blue-gray-200',
                      tag === 'CAPS' ? 'cursor-default' : '',
                    )}
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="pt-10">
        {filteredData?.map((item, index) => (
          <div key={index} className="flex h-full gap-16 px-24">
            <div className="flex justify-end gap-4">
              <div className="space-y-6 pt-0.5">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-4 text-primary">
                    {format(item.entry_datetime, 'dd.MM.y')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={ArrowUpRight}
                      className="size-4"
                      alt="Entrada"
                    />
                    <span className="text-sm text-typography-blue-gray-200">
                      {format(item.entry_datetime, 'HH:mm')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold leading-4 text-primary">
                    {format(item.exit_datetime, 'dd.MM.y')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={ArrowDownRight}
                      className="size-4"
                      alt="Entrada"
                    />
                    <span className="text-sm text-typography-blue-gray-200">
                      {format(item.exit_datetime, 'HH:mm')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex h-full flex-col items-center px-2">
                <div className="z-10 flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-typography-dark-blue/20">
                  <div className="size-[0.6125rem] rounded-full bg-typography-dark-blue" />
                </div>

                <div className="-mt-2 h-48 w-0 rounded-lg border-[1px] border-typography-ice-blue-300" />
                <div className="h-full w-0 border-spacing-2 rounded-lg border-[1px] border-dashed border-typography-ice-blue-300" />
              </div>
            </div>

            <div className="w-full pb-14">
              <Card className="-mt-10 grid grid-cols-1 transition-colors duration-300 hover:bg-gray-300">
                <div className="col-span-5 grid grid-cols-8 p-[2.25rem]">
                  <div className="col-span-2 flex gap-2">
                    <MapPin className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                        Local
                      </span>
                      <span className="block text-sm text-typography-blue-gray-200">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Tipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Subtipo
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtype}
                    </span>
                  </div>

                  <div className="col-span-2 flex gap-2">
                    <User className="h-6 w-6 shrink-0 text-typography-dark-blue" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                        Responsável pelo atendimento
                      </span>
                      <span className="block text-sm text-typography-blue-gray-200">
                        {item.responsible?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t-2 p-8">
                  <div>
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      CIDs ativos
                    </span>
                    {item.active_cids.map((cid, index) => (
                      <span
                        key={index}
                        className="block text-sm text-typography-blue-gray-200"
                      >
                        - {cid}
                      </span>
                    ))}
                  </div>

                  <div>
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Motivo do atendimento
                    </span>
                    <p className="block text-sm text-typography-blue-gray-200">
                      {item.clinical_motivation
                        ?.split(/\r\n|\n/)
                        .map((line, index) => (
                          <Fragment key={index}>
                            {line}
                            <br />
                          </Fragment>
                        )) || ''}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
                      Desfecho do episódio
                    </span>
                    <p className="block text-sm text-typography-blue-gray-200">
                      {item.clinical_outcome?.replace(/\r\n/g, '<br>') || ''}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

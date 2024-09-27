'use client'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

import { Episode } from './components/episode'
import { Filter } from './components/filter'

interface TimelineProps {
  className?: string
}
const today = new Date()
const toDate = new Date()
toDate.setHours(today.getHours() + 2)
toDate.setMinutes(today.getMinutes() - 30)

export function Episodes({ className }: TimelineProps) {
  const [filteredData, setFilteredData] = useState<Encounter[]>()
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    {},
  )

  return (
    <div className={cn(className)}>
      <div className="my-[2.125rem] flex items-center justify-between gap-3 px-24">
        <div className="rounded-lg border bg-accent px-3 py-4">
          <h3 className="text-sm font-medium leading-3.5 text-typography-dark-blue">
            Histórico clínico
          </h3>
        </div>
        <Filter
          setFilteredData={setFilteredData}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
      </div>
      <div className="flex w-full flex-col gap-16 px-24 pt-10">
        {filteredData ? (
          filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <>
                <Episode key={index} item={item} />
                {index < filteredData.length - 1 &&
                  new Date(item.entry_datetime).getFullYear() >
                    new Date(
                      filteredData[index + 1].entry_datetime,
                    ).getFullYear() && (
                    <div className="relative">
                      <div className="absolute -left-[70px] flex h-7 items-center justify-center rounded-lg border bg-card px-2.5">
                        <span className="text-sm text-typography-blue-gray-200">
                          {new Date(
                            filteredData[index + 1].entry_datetime,
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  )}
              </>
            ))
          ) : (
            <div className="flex justify-center">
              <Alert className="w-96">
                <CircleAlert className="h-4 w-4" />
                <AlertTitle>Nenhum resultado encontrado!</AlertTitle>
                <AlertDescription>
                  Esse paciente não possui histórico clínico nesse(s) tipo(s) de
                  unidade(s).
                </AlertDescription>
              </Alert>
            </div>
          )
        ) : (
          <div className="flex w-full items-center justify-center">
            <Spinner size="xl" className="text-typography-blue-gray-200" />
          </div>
        )}
      </div>
    </div>
  )
}

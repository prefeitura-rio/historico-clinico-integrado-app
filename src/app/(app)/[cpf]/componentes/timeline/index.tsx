'use client'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'

import { Spinner } from '@/components/custom-ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

import { EncountersFilter } from './components/filter'
import { TimelineRow } from './components/timeline-row'

interface TimelineProps {
  className?: string
}
const today = new Date()
const toDate = new Date()
toDate.setHours(today.getHours() + 2)
toDate.setMinutes(today.getMinutes() - 30)

export function Timeline({ className }: TimelineProps) {
  const [filteredData, setFilteredData] = useState<Encounter[]>()
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    {},
  )

  return (
    <div className={cn(className)}>
      <div className="my-[2.125rem] flex items-center justify-between px-24">
        <h3 className="text-base font-medium leading-4 text-typography-blue-gray-700">
          Histórico clínico
        </h3>
        <EncountersFilter
          setFilteredData={setFilteredData}
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
      </div>
      <div className="w-full pt-10">
        {filteredData ? (
          filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TimelineRow key={index} item={item} />
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

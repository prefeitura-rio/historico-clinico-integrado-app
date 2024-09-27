import { Filter as FilterIcon, MapPin, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import { Spinner } from '@/components/custom-ui/spinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'
import { compareDates } from '@/utils/compare-dates'

interface EncoutnersFilterProps {
  setFilteredData: Dispatch<SetStateAction<Encounter[] | undefined>>
  setActiveFilters: Dispatch<SetStateAction<Record<string, boolean>>>
  activeFilters: Record<string, boolean>
}

export function EncountersFilter({
  setFilteredData,
  setActiveFilters,
  activeFilters,
}: EncoutnersFilterProps) {
  const params = useParams()
  const cpf = params?.cpf.toString()

  const [filterOptions, setFilterOptions] = useState<string[] | undefined>()

  const { data: encounters } = usePatientEncounters({ cpf })

  useEffect(() => {
    if (encounters) {
      const sortedData = encounters.sort((a, b) =>
        compareDates(b.entry_datetime, a.entry_datetime),
      )
      setFilteredData?.(sortedData)

      const tags = Array.from(
        new Set(encounters.flatMap((encounter) => encounter.filter_tags)),
      )
      setFilterOptions(tags)

      let newFilter: Record<string, boolean> = {}
      tags.forEach((filter) => {
        newFilter = {
          ...newFilter,
          [filter]: false,
        }
      })
      setActiveFilters(newFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounters])

  function handleCheckboxChange(filter: string) {
    setActiveFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [filter]: !prevFilters[filter],
      }

      if (encounters) {
        const newData = Object.values(newFilters).find((item) => !!item)
          ? encounters.filter((item) =>
              item.filter_tags.some((tag) => newFilters[tag]),
            )
          : encounters
        setFilteredData(newData)
      }

      return newFilters
    })
  }

  useEffect(() => {
    if (encounters) {
      const sortedData = encounters.sort((a, b) =>
        compareDates(b.entry_datetime, a.entry_datetime),
      )
      setFilteredData(sortedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-3">
        {Object.entries(activeFilters).map(
          ([key, value], index) =>
            value && (
              <div
                key={index}
                className="flex items-center gap-1.5 rounded-lg border bg-accent px-3 py-2"
              >
                <span className="text-sm font-medium leading-4 text-typography-dark-blue">
                  {key}
                </span>
                <Button
                  variant="ghost"
                  className="size-3.5 p-0"
                  onClick={() => handleCheckboxChange(key)}
                >
                  <X className="size-3.5 shrink-0 text-typography-dark-blue" />
                </Button>
              </div>
            ),
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <FilterIcon className="size-6 text-typography-dark-blue" />
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
            {!filterOptions && (
              <div className="flex h-full w-full items-center justify-center">
                <Spinner />
              </div>
            )}
            {filterOptions?.map((tag, index) => (
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
  )
}

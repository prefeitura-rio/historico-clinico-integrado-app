import { useQuery } from '@tanstack/react-query'
import { Filter as FilterIcon, MapPin } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

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
import { getPatientEncounters } from '@/http/patient/get-patient-encounters'
import { getPatientFilterTags } from '@/http/patient/get-patient-filter-tags'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'

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

  useEffect(() => {
    if (encounters) {
      setFilteredData(encounters)
    }
  }, [])

  return (
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
  )
}

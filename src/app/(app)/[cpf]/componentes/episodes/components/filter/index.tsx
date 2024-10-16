import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import { usePatientEncounters } from '@/hooks/use-queries/use-patient-encounters'
import type { Encounter } from '@/models/entities'
import { compareDates } from '@/utils/compare-dates'

import { ActiveFilters } from './components/active-filters'
import { FilterPopover } from './components/filter-popover'

interface EncoutnersFilterProps {
  setFilteredData: Dispatch<SetStateAction<Encounter[] | undefined>>
  setActiveFilters: Dispatch<SetStateAction<Record<string, boolean>>>
  activeFilters: Record<string, boolean>
}

export function Filter({
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
      <ActiveFilters
        activeFilters={activeFilters}
        handleCheckboxChange={handleCheckboxChange}
      />
      <FilterPopover
        handleCheckboxChange={handleCheckboxChange}
        activeFilters={activeFilters}
        filterOptions={filterOptions}
      />
    </div>
  )
}

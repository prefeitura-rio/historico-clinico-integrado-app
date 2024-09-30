import { FilterIcon, MapPin } from 'lucide-react'

import { Spinner } from '@/components/custom-ui/spinner'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { FilterCheckbox } from './components/filter-checkbox'

interface FilterPopoverProps {
  filterOptions: string[] | undefined
  activeFilters: Record<string, boolean>
  handleCheckboxChange: (tag: string) => void
}

export function FilterPopover({
  filterOptions,
  activeFilters,
  handleCheckboxChange,
}: FilterPopoverProps) {
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
          {!filterOptions && (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          )}
          {filterOptions?.map((tag, index) => (
            <FilterCheckbox
              key={index}
              tag={tag}
              activeFilters={activeFilters}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

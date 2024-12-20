import { ActiveFilterTag } from './components/active-filter-tag'

interface ActiveFiltersProps {
  activeFilters: Record<string, boolean>
  handleCheckboxChange: (tag: string) => void
}
export function ActiveFilters({
  activeFilters,
  handleCheckboxChange,
}: ActiveFiltersProps) {
  return (
    <div className="flex gap-3">
      {Object.entries(activeFilters).map(
        ([key, value], index) =>
          value && (
            <ActiveFilterTag
              key={index}
              handleCheckboxChange={handleCheckboxChange}
              tag={key}
            />
          ),
      )}
    </div>
  )
}

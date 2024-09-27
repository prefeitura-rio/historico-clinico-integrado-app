import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FilterCheckboxProps {
  tag: string
  handleCheckboxChange: (tag: string) => void
  activeFilters: Record<string, boolean>
}

export function FilterCheckbox({
  handleCheckboxChange,
  tag,
  activeFilters,
}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
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
  )
}

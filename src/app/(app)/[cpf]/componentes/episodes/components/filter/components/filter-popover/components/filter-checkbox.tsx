import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useMetadata } from '@/hooks/use-queries/metadata/use-metadata'
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
  const { data: metadata } = useMetadata()

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
        {metadata?.filterTagDictionary?.[tag] ?? tag}
      </Label>
    </div>
  )
}

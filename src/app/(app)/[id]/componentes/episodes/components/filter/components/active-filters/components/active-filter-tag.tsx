import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMetadata } from '@/hooks/use-queries/metadata/use-metadata'

interface ActiveFilterTagProps {
  handleCheckboxChange: (tag: string) => void
  tag: string
}

export function ActiveFilterTag({
  handleCheckboxChange,
  tag,
}: ActiveFilterTagProps) {
  const { data: metadata } = useMetadata()

  return (
    <div className="flex items-center gap-1.5 rounded-lg border bg-accent px-3 py-2">
      <span className="text-sm font-medium leading-4 text-typography-dark-blue">
        {metadata?.filterTagDictionary?.[tag] ?? tag}
      </span>
      <Button
        variant="ghost"
        className="size-3.5 p-0"
        onClick={() => handleCheckboxChange(tag)}
      >
        <X className="size-3.5 shrink-0 text-typography-dark-blue" />
      </Button>
    </div>
  )
}

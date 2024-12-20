import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderButtonProps {
  icon: React.ReactNode
  title: string
  onClick: () => void
}
export function HeaderButton({ icon, title, onClick }: HeaderButtonProps) {
  const [mouseOver, setMouseOver] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        size="icon"
        variant="outline"
        onClick={onClick}
      >
        {icon}
      </Button>
      <div className="flex h-3.5 w-[3.25rem] flex-col items-center overflow-visible">
        <span
          className={cn(
            'text-nowrap text-center text-sm font-medium leading-3.5 text-typography-blue-gray-200 opacity-0 transition-opacity duration-300',
            mouseOver ? 'opacity-100' : '',
          )}
        >
          {title}
        </span>
      </div>
    </div>
  )
}

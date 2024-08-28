import { ChevronUp } from 'lucide-react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DescriptionSectionProps {
  title: string
  description: string | null | undefined | string[]
  initialState: boolean
}

export function DescriptionSection({
  title,
  description,
  initialState,
}: DescriptionSectionProps) {
  const [open, setOpen] = useState(initialState)

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
          {title}
        </span>
        {description && (
          <Button
            variant="ghost"
            size="icon"
            className="size-6 p-0"
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronUp
              className={cn(
                'size-6 shrink-0 text-typography-dark-blue transition-all duration-300',
                open ? '-rotate-180' : '',
              )}
            />
          </Button>
        )}
      </div>
      {description ? (
        Array.isArray(description) ? (
          <div
            className={cn(
              'grid transition-all duration-300',
              open ? 'grid-rows-1' : 'grid-rows-[0]',
            )}
          >
            {description.map((item, index) => (
              <span
                key={index}
                className={cn(
                  'block text-sm text-typography-blue-gray-200',
                  open ? '' : 'opacity-0',
                )}
              >
                - {item}
              </span>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              'grid transition-all duration-300',
              open ? 'grid-rows-1' : 'grid-rows-[0]',
            )}
          >
            <p
              className={cn(
                'block text-sm text-typography-blue-gray-200',
                open ? '' : 'opacity-0',
              )}
            >
              {description.split(/\r\n|\n/).map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              )) || ''}
            </p>
          </div>
        )
      ) : (
        <span className="text-sm text-typography-blue-gray-200">
          Não há informações para este campo neste episódio assistencial.
        </span>
      )}
    </div>
  )
}

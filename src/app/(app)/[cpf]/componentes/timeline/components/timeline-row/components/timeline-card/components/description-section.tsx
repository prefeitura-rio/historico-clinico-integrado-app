import { ChevronDown } from 'lucide-react'
import { Fragment } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface DescriptionSectionProps {
  title: string
  description: string | null | undefined | string[]
  initialState: boolean
}

export function DescriptionSection({
  title,
  description,
}: DescriptionSectionProps) {
  const isArray = Array.isArray(description)
  const isEmpty = !description || (isArray && description.length === 0)

  return isEmpty ? (
    <div className="space-y-1">
      <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
        {title}
      </span>
      <span className="block text-sm text-typography-blue-gray-200">
        Não há informações para este campo neste episódio assistencial.
      </span>
    </div>
  ) : (
    <Collapsible className="space-y-1">
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-md">
        <span className="text-sm font-medium leading-3.5 text-typography-dark-blue group-hover:underline">
          {title}
        </span>
        <ChevronDown className="size-5 shrink-0 transition-all duration-300 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        {isArray ? (
          description.map((item, index) => (
            <span
              key={index}
              className={cn('block text-sm text-typography-blue-gray-200')}
            >
              - {item}
            </span>
          ))
        ) : (
          <p className={cn('block text-sm text-typography-blue-gray-200')}>
            {description.split(/\r\n|\n/).map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            )) || ''}
          </p>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

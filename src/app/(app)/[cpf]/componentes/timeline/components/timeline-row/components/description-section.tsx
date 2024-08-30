import { Fragment } from 'react'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="flex justify-between">
        <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        {description ? (
          Array.isArray(description) ? (
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
          )
        ) : (
          <span className="text-sm text-typography-blue-gray-200">
            Não há informações para este campo neste episódio assistencial.
          </span>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

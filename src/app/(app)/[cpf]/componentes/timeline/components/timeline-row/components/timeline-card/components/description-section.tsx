import { ChevronDown } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const textRef = useRef<HTMLParagraphElement>(null)
  const isArray = Array.isArray(description)
  const isEmpty = !description || (isArray && description.length === 0)
  const threshold = 24
  const isOneLine = height <= threshold

  useEffect(() => {
    if (textRef.current) {
      setHeight(textRef.current.clientHeight)
      if (textRef.current.clientHeight <= threshold) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
  }, [])

  function handleOnOpenChange(open: boolean) {
    if (!isOneLine) {
      setIsOpen(open)
    }
  }

  if (isEmpty) {
    return (
      <div className="space-y-2 p-2">
        <span className="block text-sm font-medium leading-3.5 text-typography-dark-blue">
          {title}
        </span>
        <span className="block text-sm text-typography-blue-gray-200">
          Não há informações para este campo neste episódio assistencial.
        </span>
      </div>
    )
  }

  const ContentComponent = () => {
    if (isArray) {
      return description.map((item, index) => (
        <>
          <span key={index}> - {item} </span>
          <br />
        </>
      ))
    }

    return (
      description.split(/\r\n|\n/).map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      )) || ''
    )
  }

  return (
    <Collapsible
      defaultOpen={false}
      open={isOpen}
      onOpenChange={handleOnOpenChange}
      className={cn(
        "group relative rounded-md p-2 hover:bg-gray-50 data-[state='open']:bg-gray-50",
        isOneLine ? 'bg-gray-50' : '',
      )}
    >
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-md',
          isOneLine ? 'cursor-default' : '',
        )}
      >
        <span
          className={cn(
            'text-sm font-medium leading-3.5 text-typography-dark-blue',
            isOneLine ? '' : 'group-hover:underline',
          )}
        >
          {title}
        </span>
        {!isOneLine && (
          <ChevronDown className="size-5 shrink-0 transition-all duration-300 group-data-[state=open]:rotate-180" />
        )}
      </CollapsibleTrigger>
      <div className="z-40 my-1">
        <div>
          <p className="-mb-1 block h-5 overflow-hidden text-sm text-typography-blue-gray-200 group-data-[state='closed']:line-clamp-1">
            <ContentComponent />
          </p>
        </div>
      </div>
      <CollapsibleContent className="CollapsibleContent">
        <div className="">
          <p className="-mt-5 block text-sm text-typography-blue-gray-200">
            <ContentComponent />
          </p>
        </div>
      </CollapsibleContent>
      <div className="absolute -z-50 opacity-0">
        <span className="text-xl text-destructive">{height}</span>
        <p ref={textRef} className="">
          <ContentComponent />
        </p>
      </div>
    </Collapsible>
  )
}

import { Minus } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Skeleton as RawSkeleton } from '../ui/skeleton'

interface SkeletonProps {
  className: string
  isLoading: boolean
  render: ReactNode
  isEmpty: boolean
  renderIfEmpty?: ReactNode
}

export function Skeleton({
  className,
  isLoading,
  render,
  isEmpty,
  renderIfEmpty,
}: SkeletonProps) {
  if (isLoading) {
    return <RawSkeleton className={className} />
  }
  if (isEmpty) {
    if (renderIfEmpty) {
      return renderIfEmpty
    }

    return (
      <div className={className}>
        <Minus
          className={cn(
            'size-6 text-typography-dark-blue',
            className,
            'm-0 w-auto p-0',
          )}
        />
      </div>
    )
  }

  return render
}

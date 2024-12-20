import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'size-4',
      lg: 'size-6',
      xl: 'size-9',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
}

export function Spinner({ className, size }: SpinnerProps) {
  return <Loader2 className={cn(spinnerVariants({ size, className }))} />
}

import type { ReactNode } from 'react'

interface CardSectionProps {
  children: ReactNode
  title: string
}

export function CardTextSection({ children, title }: CardSectionProps) {
  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-typography-dark-blue">
        {title}
      </span>
      <span className="text-sm text-typography-blue-gray-200">
        {children || 'Não há registro de informações'}
      </span>
    </div>
  )
}

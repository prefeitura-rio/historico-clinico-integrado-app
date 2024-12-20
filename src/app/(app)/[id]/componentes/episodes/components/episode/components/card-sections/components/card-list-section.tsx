interface CardCIDSectionProps {
  title: string
  items: string[]
}

export function CardListSection({ title, items }: CardCIDSectionProps) {
  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-typography-dark-blue">
        {title}
      </span>
      <div className="flex flex-col gap-1.5">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-typography-blue-gray-200">
                {item}
              </span>
            </div>
          ))
        ) : (
          <span className="text-sm text-typography-blue-gray-200">
            Não há registro de informações
          </span>
        )}
      </div>
    </div>
  )
}

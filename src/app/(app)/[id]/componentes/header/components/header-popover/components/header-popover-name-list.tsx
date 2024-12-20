interface HeaderPopoverNameListProps {
  title: string
  nameList: string[]
}

const threshold = 4

export function HeaderPopoverNameList({
  title,
  nameList,
}: HeaderPopoverNameListProps) {
  return (
    <div className="space-y-6">
      <span className="text-sm font-medium leading-3.5 text-typography-dark-blue">
        {title}
      </span>
      <div className="flex flex-col gap-1 text-xs leading-5 text-typography-blue-gray-200">
        {nameList.length <= threshold ? (
          nameList.map((name, index) => <span key={index}>{name}</span>)
        ) : (
          <span className="text-typography-blue-gray-200/70">
            Não possui vínculo
          </span>
        )}
      </div>
    </div>
  )
}

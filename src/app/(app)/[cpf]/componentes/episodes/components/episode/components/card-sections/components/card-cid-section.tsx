import { cn } from '@/lib/utils'

enum CidStatus {
  RESOLVIDO = 'Resolvido',
  'NAO ESPECIFICADO' = 'Não especificado',
  ATIVO = 'Ativo',
}

interface CardCIDSectionProps {
  cids: {
    description: string
    status: string | null
  }[]
}

export function CardCIDSection({ cids }: CardCIDSectionProps) {
  return (
    <div
      className="flex cursor-default flex-col gap-2 rounded-lg border bg-card px-6 py-3"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-typography-dark-blue">
        CIDs
      </span>
      <div className="flex flex-col gap-1.5">
        {cids.length > 0 ? (
          cids.map((cid, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-typography-blue-gray-200">
                {cid.description}
              </span>
              <div
                className={cn(
                  'rounded-lg border px-2 py-1',
                  cid.status === 'RESOLVIDO'
                    ? 'bg-light-green'
                    : cid.status === 'NAO ESPECIFICADO'
                      ? 'bg-sky-blue'
                      : cid.status === 'ATIVO'
                        ? 'bg-light-yellow'
                        : 'bg-rose-700/20',
                )}
              >
                {cid.status && (
                  <span className="text-xs leading-3 text-muted-foreground">
                    {CidStatus[cid.status as keyof typeof CidStatus]}
                  </span>
                )}
              </div>
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

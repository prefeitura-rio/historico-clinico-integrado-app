import type { Encounter } from '@/models/entities'

import { HeaderInfo } from './components/header-info'

interface CardHeaderProps {
  item: Encounter
}

export function CardHeader({ item }: CardHeaderProps) {
  const responsible = item.responsible
    ? `${item.responsible.name} - ${item.responsible.role}`
    : 'Não há informação'

  return (
    <div className="flex gap-3">
      <HeaderInfo title="Local" value={item.location} />
      <HeaderInfo title="Tipo" value={item.type} />
      <HeaderInfo title="Subtipo" value={item.subtype} />
      <HeaderInfo title="Responsável pelo atendimento" value={responsible} />
    </div>
  )
}

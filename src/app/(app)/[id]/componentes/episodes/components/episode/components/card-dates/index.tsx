import { InfoBox } from '@/app/(app)/[id]/componentes/patient-details/components/basic-info/components/info-box'
import type { Encounter } from '@/models/entities'

import { EntryDate } from './components/entry-date'
import { ExitDate } from './components/exit-date'

interface CardDatesProps {
  item: Encounter
}
export function CardDates({ item }: CardDatesProps) {
  return (
    <div className="flex items-end gap-3">
      <EntryDate date={item.entry_datetime} provider={item.provider} />
      <ExitDate
        date={item.exit_datetime}
        deceased={item.deceased}
        provider={item.provider}
      />
      {item.deceased && <InfoBox className="bg-rose-700/20">Óbito</InfoBox>}
    </div>
  )
}

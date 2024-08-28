import type { Encounter } from '@/models/entities'

import { TimelineAxis } from './components/timeline-axis'
import { TimelineCard } from './components/timeline-card'

interface TimelineRowProps {
  item: Encounter
}

export function TimelineRow({ item }: TimelineRowProps) {
  return (
    <div className="flex h-full gap-16 px-24">
      <TimelineAxis item={item} />
      <TimelineCard item={item} />
    </div>
  )
}

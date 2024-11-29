import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'

import { Card } from '@/components/ui/card'
import { env } from '@/env/client'
import { cn } from '@/lib/utils'
import type { Encounter } from '@/models/entities'
import { getCaptchaToken } from '@/utils/get-captcha'
import { verifyCaptchaToken } from '@/utils/verify-captcha'

import { CardDates } from './components/card-dates'
import { CardHeader } from './components/card-header'
import { CardSections } from './components/card-sections/card-sections'

export function EpisodeCard(item: Encounter) {
  const [isOpen, setIsOpen] = useState(false)
  const episodeRef = useRef<HTMLDivElement>(null)

  function handleCardClick() {
    setIsOpen((prev) => {
      // If the user is opening the card, get captcha token and validate it
      if (!prev) {
        getCaptchaToken(
          'openEpisode',
          env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
        ).then((token) =>
          verifyCaptchaToken(token).then((recaptchaValidationResponse) =>
            console.log({ recaptchaValidationResponse }),
          ),
        )
      }
      return !prev
    })
  }

  return (
    <div className="flex">
      <div className={`relative ${episodeRef.current?.clientHeight} w-0`}>
        <div className="absolute -left-[52px] top-0 flex h-full flex-col items-center pt-10">
          <div className="flex size-5 items-center justify-center rounded-full bg-typography-dark-blue/20">
            <div className="size-2.5 rounded-full bg-typography-dark-blue" />
          </div>
          <div className="-z-10 -mt-2.5 h-full w-0.5 rounded-full bg-typography-ice-blue-300" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3" ref={episodeRef}>
        {/* Dates */}
        <CardDates item={item} />

        {/* Main Card */}
        <Card
          className="relative cursor-pointer p-9 hover:bg-accent"
          onClick={handleCardClick}
        >
          <ChevronDown
            className={cn(
              'absolute right-6 top-6 size-6 transition-all duration-300',
              isOpen ? 'rotate-180' : '',
            )}
          />

          {/* Header */}
          <CardHeader item={item} />

          {/* Sections */}
          <CardSections item={item} isOpen={isOpen} />
        </Card>
      </div>
    </div>
  )
}

import { PopoverContent } from '@radix-ui/react-popover'
import { Phone, Plus, User, X } from 'lucide-react'

import Whatsapp from '@/assets/whatsapp.svg'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

const cards = [
  {
    type: 'expandable',
    icon: Phone,
    text: '(21) 3833-8794',
    className: 'hover:w-[11.5625rem]',
    title: 'CF Adolpho Rocco',
    subtitle: 'Unidade de Atenção Primária',
  },
  {
    type: 'expandable',
    svg: Whatsapp,
    text: '(21) 99532-7044',
    className: 'hover:w-[12.0625rem]',
    title: 'Equipe Roxo',
    subtitle: 'Equipe de Saúde da Família',
  },
  {
    type: 'popover',
    icon: Plus,
    list: [
      'Ana Oliveira',
      'Helena Almeida Araujo',
      'Gabriel Santos',
      'Mariana Ferreira Lemos',
      'Bruno Souza',
      'Rafael Lima',
    ],
    className: 'hover:w-[11.4375rem]',
    title: 'Roberta dos Santos',
    subtitle: 'Médico(a) de referências',
  },
  {
    type: 'popover',
    icon: Plus,
    list: [
      'Mariana Ferreira Lemos',
      'Bruno Souza',
      'Ana Oliveira',
      'Rafael Lima',
      'Helena ALmeida Araujo',
      'Gabriel Santos',
    ],
    className: 'hover:w-[11.4375rem]',
    title: 'Pedro da Nobraga',
    subtitle: 'Enfermeiro(a) de referências',
  },
]

export function MedicalTeam() {
  return (
    <div className="mx-24 mt-10">
      <div className="flex">
        {cards.map((item, index) => {
          if (item.type === 'expandable') {
            return (
              <div key={index} className="flex">
                <div className="flex gap-3">
                  <ExpandableButton
                    Icon={item.icon}
                    svg={item.svg}
                    text={item.text || ''}
                    className={item.className}
                  />
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm leading-[0.875rem] text-typography-dark-blue">
                      {item.title}
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                {index < cards.length - 1 && (
                  <Separator className="mx-6" orientation="vertical" />
                )}
              </div>
            )
          } else {
            return (
              <div key={index} className="flex">
                <div key={index} className="flex gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="size-7 shrink-0 text-typography-dark-blue" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" sideOffset={12}>
                      <Card className="relative">
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-3 top-3 flex size-6 items-center justify-center"
                        >
                          <X className="size-3 text-typography-dark-blue" />
                        </Button>
                        <CardHeader className="p-9">
                          <CardTitle className="flex items-center gap-2">
                            <User className="size-9 text-typography-dark-blue" />
                            <span className="leading-3.5 text-sm font-medium text-typography-dark-blue">
                              {item.subtitle}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-9 pt-0">
                          <ul>
                            {item.list?.map((name, index) => (
                              <li
                                key={index}
                                className="text-start text-sm text-typography-blue-gray-200"
                              >
                                {name}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm leading-[0.875rem] text-typography-dark-blue">
                      {item.title}
                    </span>
                    <span className="block text-sm text-typography-blue-gray-200">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                {index < cards.length - 1 && (
                  <Separator className="mx-6" orientation="vertical" />
                )}
              </div>
            )
          }
        })}
      </div>
      <Separator orientation="horizontal" className="mt-7" />
    </div>
  )
}

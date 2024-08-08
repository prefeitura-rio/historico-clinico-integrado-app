'use client'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { Views } from './components/views'

export function Tabs() {
  const [view, setView] = useState<Views>(Views.EXAMES_LABORATORIAIS)

  return (
    <div className="mt-7">
      <div className="flex h-10 w-full items-end gap-12 px-24">
        {Object.entries(Views).map((item, index) => (
          <div key={index}>
            <Button
              variant="ghost"
              onClick={() => setView(item[1])}
              className={cn(
                'group mb-4 h-4 p-0 transition-all duration-300 hover:bg-transparent',
              )}
            >
              <span
                className={cn(
                  'transition-all duration-300',
                  item[1] === view
                    ? 'text-typography-blue-gray-700 text-base font-medium leading-4'
                    : 'text-typography-blue-gray-200',
                  'group-hover:text-typography-blue-gray-700 group-hover:text-base group-hover:font-medium group-hover:leading-4',
                )}
              >
                {item[1]}
              </span>
            </Button>
            <div
              className={cn(
                'h-0.5 w-full rounded-t-sm transition-all duration-300',
                item[1] === view ? 'bg-typography-blue' : 'bg-transparent',
              )}
            ></div>
          </div>
        ))}
      </div>
      <div className="select-none bg-gray-200 px-24 pb-14 pt-12">
        <div className="flex items-center justify-between rounded-lg border-2 bg-white px-8 py-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.10),_0px_4px_6px_-4px_rgba(0,0,0,0.10)] blur-[2px]">
          <div>
            <span className="text-typography-light-gray block text-sm font-semibold leading-4">
              Hemoglobina Glicada (HbA1c)
            </span>
            <span className="text-typography-light-gray block text-sm opacity-90">
              Segunda-feira, 12 de abril, 2024 às 10:36
            </span>
          </div>
          <div className="rounded-lg border-2 px-3 py-1">
            <span className="text-typography-light-gray text-sm font-medium leading-6">
              Resultado completo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

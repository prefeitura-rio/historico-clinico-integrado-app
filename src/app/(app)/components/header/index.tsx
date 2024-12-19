import Image from 'next/image'

import logoPrefeituraSaude from '@/assets/logo-prefeitura-saude.png'

import { LogoutButton } from './components/logout-button'

export function Header() {
  return (
    <div className="relative flex h-32 w-full items-center justify-between gap-3 p-6">
      <div className="flex items-center gap-12">
        <Image
          src={logoPrefeituraSaude}
          alt="Prefeitura do Rio de Janeiro"
          className="h-16 w-auto"
        />
        <div className="">
          <span className="block text-xl font-medium leading-5 text-typography-dark-blue">
            Histórico Clínico Integrado
          </span>
        </div>
      </div>

      <div className="flex h-full items-center py-6">
        <LogoutButton />
      </div>
    </div>
  )
}

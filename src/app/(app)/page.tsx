import type { Metadata } from 'next'
import Image from 'next/image'

import logoPrefeituraSaude from '@/assets/logo-prefeitura-saude.png'

import { CPFSearch } from './components/cpf-search'
import { ErrorToast } from './components/error-toast/error-toast'
import { LogoutButton } from './components/logout-button'
import { UserNotice } from './components/user-notice/user-notice'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Buscar por CPF',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-2xl">
      <div className="flex h-screen w-full min-w-screen-sm flex-col items-center justify-center gap-4">
        {/* Header */}
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

        {/* Main */}
        <div className="relative flex h-screen w-full min-w-screen-sm flex-col items-center justify-center gap-10">
          <CPFSearch />
          <UserNotice />
          <ErrorToast />
        </div>
      </div>
    </div>
  )
}

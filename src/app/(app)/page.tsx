import type { Metadata } from 'next'

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
      <div className="relative flex h-screen w-full min-w-screen-sm flex-col items-center justify-center gap-10">
        <CPFSearch />
        <UserNotice />
        <ErrorToast />
      </div>
      <LogoutButton />
    </div>
  )
}

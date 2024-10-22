import type { Metadata } from 'next'

import { CPFSearch } from './components/cpf-search'
import { UserNotice } from './components/cpf-search/components/user-notice'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Buscar por CPF',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function Home() {
  return (
    <div className="relative flex h-screen w-full min-w-screen-sm flex-col items-center justify-center gap-10">
      <CPFSearch />
      <UserNotice />
    </div>
  )
}

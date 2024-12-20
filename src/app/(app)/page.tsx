import type { Metadata } from 'next'
import { Suspense } from 'react'

import { CPFSearch } from './components/cpf-search'
import { ResultTable } from './components/cpf-search/components/result-table'
import { StatementOfResponsability } from './components/cpf-search/components/statement-of-responsibility'
import { ErrorToast } from './components/error-toast/error-toast'
import { Header } from './components/header'
import { UserNotice } from './components/user-notice'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Buscar por CPF',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function Home() {
  return (
    <div className="mx-auto flex h-dvh max-h-dvh min-w-screen-sm max-w-screen-2xl flex-col">
      <Header />

      <Suspense>
        <div className="relative flex w-full min-w-screen-sm flex-grow flex-col p-6">
          <CPFSearch />
          <div className="mt-6 flex flex-grow flex-col overflow-hidden">
            <div className="flex-grow overflow-y-auto">
              <ResultTable />
              <UserNotice />
            </div>
          </div>
          <ErrorToast />
          <StatementOfResponsability />
        </div>
      </Suspense>
    </div>
  )
}

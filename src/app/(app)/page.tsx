import type { Metadata } from 'next'

import { CPFSearch } from './components/cpf-search'
import { ResultTable } from './components/cpf-search/components/result-table'
import { ErrorToast } from './components/error-toast/error-toast'
import { Header } from './components/header'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Buscar por CPF',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function Home() {
  return (
    <div className="mx-auto flex h-dvh max-h-dvh min-w-screen-sm max-w-screen-2xl flex-col">
      <Header />

      <div className="relativeflex w-full min-w-screen-sm flex-grow flex-col p-6">
        <CPFSearch />
        <div className="mt-6 flex flex-grow flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto">
            <ResultTable />
          </div>
        </div>
        <ErrorToast />
      </div>
    </div>
  )
}

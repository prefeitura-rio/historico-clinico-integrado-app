import { CPFSearchForm } from './components/cpf-search-form'

export function CPFSearch() {
  return (
    <main className="mx-auto flex h-screen w-full max-w-[36.4375rem] flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3 p-6">
        <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
          Buscar por CPF
        </h2>
        <span className="text-center text-typography-blue-gray-200">
          Insira o CPF do paciente para realizar a busca
        </span>
      </div>
      <CPFSearchForm />
    </main>
  )
}

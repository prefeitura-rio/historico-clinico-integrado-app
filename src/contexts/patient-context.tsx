import { createContext, type ReactNode, useState } from 'react'

interface PatientContextProps {
  cpf: string | null
  setCpf: (cpf: string | null) => void
}

export const PatientContext = createContext({} as PatientContextProps)

interface PatientContextProviderProps {
  children: ReactNode
}
export function PatientContextProvider({
  children,
}: PatientContextProviderProps) {
  const [cpf, setCpf] = useState<string | null>(null)

  return (
    <PatientContext.Provider value={{ cpf, setCpf }}>
      {children}
    </PatientContext.Provider>
  )
}

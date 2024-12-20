import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Paciente',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function PacienteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full">{children}</div>
}

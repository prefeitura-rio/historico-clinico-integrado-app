'use client'

import { Card } from '@/components/ui/card'
import { usePatientSearchParams } from '@/hooks/use-search-params/use-patient-search-params'

export function UserNotice() {
  const { formattedSearchParams } = usePatientSearchParams()
  if (
    formattedSearchParams.cpf ||
    formattedSearchParams.cns ||
    formattedSearchParams.name
  ) {
    return null
  }

  return (
    <Card className="mx-auto max-w-[36.4375rem] translate-y-10 border-typography-blue-gray-200 bg-dark-gray bg-opacity-[0.08] p-6 text-xs leading-5 text-typography-blue-gray-200">
      <p>
        O Histórico Clínico Integrado (HCI) atualmente contempla 82% das
        unidades de saúde da rede municipal - as que possuem Prontuários
        Eletrônicos Vitacare e Vitai (TIMED). São elas:
      </p>
      <ul className="list-disc pl-6">
        <li>todas as Clínicas da Família (CF)</li>
        <li>todos os Centros Municipais de Saúde (CMS)</li>
        <li>todas as Policlínicas</li>
        <li>todas as Unidades de Pronto Atendimento (UPAs)</li>
        <li>
          os Centros de Emergência Regionais (CER), à exceção de CER Ilha e
          Santa Cruz
        </li>
        <li>o Centro Carioca do Olho (CCO)</li>
        <li>
          10 Hospitais Municipais: Ronaldo Gazolla, Barata Ribeiro, Rocha Faria,
          Jesus, Francisco da Silva Telles, Miguel Couto, Albert Schweitzer,
          Piedade, Lourenco Jorge, Souza Aguiar
        </li>
        <li>Maternidade da Rocinha</li>
      </ul>
    </Card>
  )
}

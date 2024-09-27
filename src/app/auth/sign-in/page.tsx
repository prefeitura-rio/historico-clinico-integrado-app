import Image from 'next/image'

import logo from '@/assets/logo-rio-prefeitura.png'

import { IsActiveForm } from './is-active-form'

export default function SignIn() {
  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="relative flex flex-col items-center justify-center bg-primary p-16">
        <Image
          src={logo}
          alt="Prefeitura do Rio de Janeiro"
          className="h-20 w-auto"
        />
        <div className="absolute-x-center bottom-0 w-full p-16 text-sm text-primary-foreground">
          <span className="block">Aviso ao usuário:</span>
          <span className="block">
            O Histórico Clínico Integrado (HCI) atualmente contempla 82% das
            unidades de saúde da rede municipal - as que possuem Prontuários
            Eletrônicos Vitacare e Vitai (TIMED).
          </span>
          <span className="block">São elas:</span>
          <ul className="list-outside list-disc pl-6">
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
              10 Hospitais Municipais: Ronaldo Gazolla, Barata Ribeiro, Rocha
              Faria, Jesus, Francisco da Silva Telles, Miguel Couto, Albert
              Schweitzer, Piedade, Lourenco Jorge, Souza Aguiar
            </li>
            <li>Maternidade da Rocinha</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-[36.4375rem]">
          <div className="flex flex-col items-center gap-3 p-6">
            <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
              Acesse sua conta
            </h2>
            <span className="text-center text-typography-blue-gray-200">
              Digite seu CPF e senha para entrar na sua conta
            </span>
          </div>
          <IsActiveForm />
        </div>
      </div>
    </div>
  )
}

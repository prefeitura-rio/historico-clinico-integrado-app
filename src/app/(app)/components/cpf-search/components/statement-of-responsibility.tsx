'use client'

import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Spinner } from '@/components/custom-ui/spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useProfile } from '@/hooks/use-queries/use-profile'
import { acceptTerms } from '@/http/user/accept-terms'
import { queryClient } from '@/lib/react-query'
import type { User } from '@/models/entities'

export function StatementOfResponsability() {
  const { data: profile } = useProfile()
  const [isOpen, setIsOpen] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)

  useEffect(() => {
    if (profile && !profile.is_use_terms_accepted) {
      setIsOpen(true)
    }
  }, [profile])

  const { mutateAsync: acceptTermsFn, isPending: isLoading } = useMutation({
    mutationFn: acceptTerms,
    retry: 3,
  })

  async function handleContinue() {
    if (isAgreed) {
      try {
        const result = await acceptTermsFn()
        if (result.type === 'success') {
          // Update cache
          const cached = queryClient.getQueryData<User>(['user'])
          if (cached) {
            queryClient.setQueryData<User>(['user'], {
              ...cached,
              is_use_terms_accepted: true,
            })
          }
          setIsOpen(false)
        } else {
          toast.error(
            'Um erro inesperado ocorreu. Recarregue a página e tente novamente.',
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>TERMO DE RESPONSABILIDADE - HCI</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, revise cuidadosamente o documento a seguir. Você deve
            aceitar estes termos para continuar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="custom-scrollbar h-60 space-y-2 overflow-y-auto rounded-md bg-secondary p-4 font-serif text-xs leading-tight">
            <p className="text-center font-bold">
              SECRETARIA MUNICIPAL DE SAÚDE DO RIO DE JANEIRO
            </p>
            <p className="text-center font-bold">TERMO DE RESPONSABILIDADE</p>
            <p className="text-center font-bold">
              HISTÓRICO CLÍNICO INTEGRADO - HCI
            </p>
            <p>
              Pelo presente instrumento, DECLARO , sob pena das sanções cabíveis
              nos termos do Decreto Rio nº 53700 de 08 de dezembro de 2023 e do
              Estatuto dos Funcionários Públicos do Poder Executivo do Município
              do Rio de Janeiro ou do art. 482 “g” da CLT, Lei nº 94 de 17 de
              Março de 1979, Lei De Propriedade Intelectual, Lei nº 9.279/1996 e
              Lei Geral de Proteção de Dados nº 13.709/2018, que assumo a
              responsabilidade por:
            </p>
            <ul className="list-inside space-y-2">
              <li>
                I. Tratar o(s) ativo(s) de informação como patrimônio da
                Secretaria Municipal de Saúde do Rio de Janeiro;
              </li>
              <li>
                II. Utilizar as informações em qualquer suporte sob minha
                custódia, exclusivamente, no interesse do serviço da Secretaria
                Municipal de Saúde do Rio de Janeiro;
              </li>
              <li>
                III. Contribuir para assegurar a disponibilidade, a integridade,
                a confidencialidade e a autenticidade das informações, conforme
                descrito no Decreto Rio nº 53.700, de 8 de dezembro de 2023, nos
                termos da Resolução CVL Nº 216, de 15 de dezembro de 2023 sobre
                a Política de Segurança da Informação;
              </li>
              <li>
                IV. Utilizar as credenciais, as contas de acesso e os ativos de
                informação em conformidade com a legislação vigente e normas
                específicas da Secretaria Municipal de Saúde do Rio de Janeiro;
              </li>
              <li>
                V. Responder, perante a Secretaria Municipal de Saúde do Rio de
                Janeiro, pelo uso indevido das minhas credenciais ou contas de
                acesso e dos ativos de informação, podendo também responder
                civil e criminalmente por esses atos;
              </li>
              <li>
                VI. Acessar o{' '}
                <span className="font-bold">
                  Histórico Clínico Integrado – HCI
                </span>
                , somente com autorização (usuário/senha), por necessidade de
                serviço ou por determinação expressa de superior hierárquico,
                realizando as tarefas e operações em estrita observância aos
                procedimentos, normas e disposições contidas no Termo de Uso,
                Política de Privacidade, Aviso de Privacidade do HCI e na
                Política de Controle de Acesso do HCI;
              </li>
              <li>
                VII. Não revelar, fora do âmbito profissional, fato ou
                informação de qualquer natureza de que tenha conhecimento por
                força de minhas atribuições, salvo em decorrência de decisão
                competente na esfera legal ou judicial, bem como de autoridade
                superior;
              </li>
              <li>
                VIII. Os usuários do Histórico Clínico Integrado (HCI), em
                exercício de cargo, emprego ou função pública, não podem
                compartilhar credenciais de acesso ou informações do sistema com
                contratantes, organizações da sociedade civil ou empresas
                públicas, sendo o uso restrito às suas funções na Secretaria
                Municipal de Saúde.
              </li>
              <li>
                IX. Não discutir perante terceiros, usar, divulgar, revelar,
                ceder a qualquer título ou dispor das informações, no território
                brasileiro ou no exterior, para nenhuma pessoa, física ou
                jurídica, e para nenhuma outra finalidade que não seja
                exclusivamente relacionada à prestação de assistência à saúde
                com os dados do HCI cumprindo-lhe adotar cautelas e precauções
                adequadas no sentido de impedir o uso indevido por qualquer
                pessoa que, por qualquer razão, tenha acesso a elas;
              </li>
              <li>
                X. Manter a necessária cautela quando da exibição de dados em
                tela, impressora ou na gravação em meios eletrônicos, a fim de
                evitar que deles venham a tomar ciência pessoas não autorizadas;
              </li>
              <li>
                XI. Não me ausentar da estação de trabalho sem encerrar a sessão
                de uso do navegador (browser), bloquear estação de trabalho,
                garantindo assim a impossibilidade de acesso indevido por
                terceiros;
              </li>
              <li>
                XII. Não revelar minha senha de acesso ao HCI a ninguém e tomar
                o máximo de cuidado para que ela permaneça somente de meu
                conhecimento;
              </li>
              <li>
                XIII. Responder em todas as instâncias, pelas consequências das
                ações ou omissões de minha parte que possam pôr em risco ou
                comprometer a exclusividade de conhecimento de minha senha ou
                das transações a que tenha acesso.
              </li>
              <li>
                XIV. Comunicar à Secretaria Municipal de Saúde do Rio de
                Janeiro, de imediato, de forma expressa e antes de qualquer
                divulgação, caso tenha que revelar qualquer uma das informações,
                por determinação judicial ou ordem de atendimento obrigatório
                determinado por órgão competente, ou caso ocorra algum acesso
                não autorizado com o uso da minha senha pessoal.
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agree"
              checked={isAgreed}
              onCheckedChange={(e) => setIsAgreed(e === true)}
            />
            <label
              htmlFor="agree"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Li, entendi e concordo com este termo de responsabilidade.
            </label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction disabled={!isAgreed} onClick={handleContinue}>
            {isLoading ? <Spinner /> : 'Aceito e Concordo em Continuar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

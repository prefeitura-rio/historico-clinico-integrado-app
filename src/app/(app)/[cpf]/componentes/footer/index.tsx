import NextLink from 'next/link'
import type { ReactNode } from 'react'

const Link = ({ children, href }: { children: ReactNode; href: string }) => (
  <NextLink
    href={href}
    target="_blank"
    className="font-medium text-typography-dark-blue underline-offset-4 hover:underline hover:opacity-50"
  >
    {children}
  </NextLink>
)

export function Footer() {
  return (
    <div className="mt-16 flex justify-between border-t p-20">
      <div className="max-w-[700px]">
        <p className="text-sm text-typography-blue-gray-200">
          Desenvolvido pela{' '}
          <span className="font-medium text-typography-dark-blue">
            Diretoria de Inovação e Tecnologia
          </span>{' '}
          da{' '}
          <Link href="https://saude.prefeitura.rio/">
            Secretaria Municipal de Saúde
          </Link>{' '}
          em parceria com o{' '}
          <Link href="https://www.dados.rio/">Escritório de Dados</Link> da{' '}
          <Link href="https://prefeitura.rio/">
            Prefeitura da Cidade do Rio de Janeiro
          </Link>
        </p>
      </div>
      <div>
        <span className="text-sm text-typography-blue-gray-200">
          <Link href="https://saude.prefeitura.rio/wp-content/uploads/sites/47/2024/11/Aviso-de-privacidade-Historico-Clinico-Integrado.pdf">
            Política de Privacidade
          </Link>{' '}
          e{' '}
          <Link href="https://saude.prefeitura.rio/wp-content/uploads/sites/47/2024/11/Termo-de-Uso-Historico-Clinico-Integrado.pdf">
            Termo de Uso
          </Link>
        </span>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'

// import logo from '@/assets/logo-rio-prefeitura.png'
import logo from '@/assets/logo_saude-vertical_branco-brasao-azul.png'
import logoHci from '@/assets/azul_assinatura.svg'

import { IsActiveForm } from './send-totp-email-form'

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado | Login',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function SignIn() {
  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-primary p-16">
        <Image
          src={logo}
          alt="Prefeitura do Rio de Janeiro"
          className="h-auto w-36"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-[36.4375rem]">
          <div className="flex flex-col items-center gap-3 p-6">
            <Image
              src={logoHci}
              alt="Histórico Clínico Integrado"
              className="h-auto w-60"
            />
          </div>
          <IsActiveForm />
        </div>
      </div>
    </div>
  )
}

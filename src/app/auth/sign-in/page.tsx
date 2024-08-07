import Image from 'next/image'

import logo from '@/assets/logo-rio-prefeitura.png'

import { SignInForm } from './sign-in-form'

export default function SignIn() {
  return (
    <div className="grid h-screen w-full grid-cols-2">
      <div className="flex items-center justify-center bg-primary p-16">
        <Image
          src={logo}
          alt="Prefeitura do Rio de Janeiro"
          className="h-20 w-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-[36.4375rem]">
          <div className="flex flex-col items-center gap-3 p-6">
            <h2 className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
              Acesse sua conta
            </h2>
            <span className="text-typography-blue-gray-200 text-center">
              Digite seu CPF e senha para entrar na sua conta
            </span>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

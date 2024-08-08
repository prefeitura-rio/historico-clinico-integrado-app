'use client'
import { Search, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import logoPrefeitura from '@/assets/logo-prefeitura-azul.png'
import { ExpandableButton } from '@/components/custom-ui/expandable-button'
import { queryClient } from '@/lib/react-query'
import { logout } from '@/utils/logout'

export function Header() {
  const router = useRouter()

  function clearCPF() {
    router.push('/')
  }

  function logOut() {
    queryClient.clear()
    logout()
    // router.push('/auth/sign-in')
  }

  return (
    <div className="mx-24 mt-[4.5rem] flex h-14 items-center justify-between">
      <div className="flex items-center gap-12">
        <Image
          src={logoPrefeitura}
          alt="Prefeitura do Rio de Janeiro"
          className="h-14 w-auto"
        />
        <div className="">
          <span className="block text-lg font-medium text-typography-blue-gray-900">
            Histórico Clínico Integrado
          </span>
          <span className="block text-sm text-typography-blue-gray-900 opacity-50">
            Secretaria Municipal de Saúde
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <ExpandableButton
          Icon={User}
          text="Logout"
          className="hover:w-[7.375rem]"
          onClick={logOut}
        />
        <ExpandableButton
          Icon={Search}
          text="Buscar CPF"
          className="hover:w-[9.5rem]"
          onClick={clearCPF}
        />
      </div>
    </div>
  )
}

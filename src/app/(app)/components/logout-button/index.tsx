'use client'

import Image from 'next/image'

import logoutIcon from '@/assets/logout.svg'
import { queryClient } from '@/lib/react-query'
import { logout } from '@/utils/logout'

import { HeaderButton } from '../../[cpf]/componentes/header/components/header-button'

export function LogoutButton() {
  function logOut() {
    queryClient.clear()
    logout()
  }
  return (
    <div className="absolute right-2 top-2">
      <HeaderButton
        title="Logout"
        icon={<Image src={logoutIcon} alt="" />}
        onClick={logOut}
      />
    </div>
  )
}

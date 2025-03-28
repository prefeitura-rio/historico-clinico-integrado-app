'use client'

import { signInWithGovBr } from './components/gov-br-login'
import GovBrSignInButton from '@/components/custom-ui/gov-br-signin'

export function IsActiveForm() {
  return (
    <div>
      <div className="w-full">
        <GovBrSignInButton
          onClick={() => signInWithGovBr()}
        />
      </div>
    </div>
  )
}

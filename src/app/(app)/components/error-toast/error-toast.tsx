'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export function ErrorToast() {
  useEffect(() => {
    const showToast = localStorage.getItem('showToast')
    if (showToast === 'true') {
      localStorage.removeItem('showToast')
      toast.error(
        'Você atingiu o limite de consultas de CPF por minuto. Aguarde alguns segundos e tente novamente.',
        {
          duration: Infinity,
          closeButton: true,
        },
      )
    }
  }, [])

  return null
}

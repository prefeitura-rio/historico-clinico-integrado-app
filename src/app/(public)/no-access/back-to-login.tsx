'use client'

// Create a button to redirect to the login page
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function BackToLogin() {
    const router = useRouter();
    
    return <Button onClick={() => router.push('/auth/sign-in')}>Voltar para o login</Button>
}
'use client'

// Create a button to redirect to the login page
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function BackToLogin() {
    const router = useRouter();
    
    return <Button onClick={() => router.push('/login')}>Voltar para o login</Button>
}
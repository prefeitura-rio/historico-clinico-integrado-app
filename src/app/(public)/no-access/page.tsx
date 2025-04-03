import type { Metadata } from 'next'
import logo from '@/assets/logo_saude-vertical_branco-brasao-azul.png'
import Image from 'next/image'
import { BackToLogin } from './back-to-login'

export const metadata: Metadata = {
    title: 'Histórico Clínico Integrado | Sem Acesso',
    description: 'Prefeitura do Rio de Janeiro',
}

export default function NoAccess() {
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
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center p-16 gap-4">
                            <p className="text-center text-2xl font-semibold leading-6 tracking-tight text-primary">
                                Seu acesso foi negado
                            </p>
                            <p className="text-sm text-typography-blue-gray-200">
                                Nem todos os profissionais de saúde têm acesso a este sistema.
                                Se você acredita que deveria ter acesso,
                                entre em contato com o seu gestor de unidade.
                            </p>
                        </div>
                        <BackToLogin />
                    </div>
                </div>
            </div>
        </div>
    )
}

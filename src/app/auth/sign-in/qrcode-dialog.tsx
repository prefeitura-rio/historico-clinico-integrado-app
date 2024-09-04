'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { InputOTP } from '@/components/custom-ui/input-otp'
import { Spinner } from '@/components/custom-ui/spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { generateQrCode } from '@/http/auth/generate-qrcode'

// import { twoFactorSignIn } from '@/http/auth/two-factor-sign-in'
import { signInAction } from './actions'

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  username: string
  password: string
}

export function QRCodeDialog({
  open,
  onOpenChange,
  username,
  password,
}: QRCodeDialogProps) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit() {
    setIsLoading(true)
    const { success, message, errors } = await signInAction({
      username,
      password,
      otp,
    })

    if (errors) {
      setError(errors.otp?.at(0) || '')
    }
    if (message) {
      setError(message)
    }

    if (success) {
      router.push('/')
    }

    setIsLoading(false)
  }

  async function handleOpenChange(open: boolean) {
    onOpenChange(open)
    if (!open) {
      setImageSrc(null)
      setError('')
      setIsLoading(false)
      setOtp('')
    }
  }

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const imageBlob = await generateQrCode({
          username,
          password,
        })
        const imageUrl = URL.createObjectURL(imageBlob)
        setImageSrc(imageUrl)
      } catch (err) {
        toast.error('Erro ao carregar QR code.', { closeButton: true })
        console.error(err)
      }
    }
    if (open) {
      fetchQRCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-screen-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Habilite a Autenticação de 2 Fatores (2FA)
          </AlertDialogTitle>
          <AlertDialogDescription>
            A 2FA aumenta a segurança da sua conta. Siga estes 2 passos rápidos
            para ativar!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center gap-10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              height={240}
              width={240}
              className="border-2"
              alt="QR code para autenticação de 2 fatores"
            />
          ) : (
            <div className="flex size-60 shrink-0 items-center justify-center">
              <Spinner className="size-10 text-typography-ice-blue-500" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-bold">
              Use um Aplicativo Autenticador para habilitar a Autenticação de 2
              Fatores
            </h4>
            <div className="text-sm">
              <p>
                <span className="font-bold">Passo 1:</span> Escaneie o QR Code
                com o seu aplicativo autenticador.
              </p>
              <p>
                <span className="font-bold">Passo 2:</span> Insira o código
                gerado pelo seu aplicativo abaixo.
              </p>
            </div>
            <div>
              <InputOTP value={otp} onChange={setOtp} />
              {error && (
                <span className="text-xs text-destructive">{error}</span>
              )}
            </div>
          </div>
        </div>
        {/* <div>
          <dl>
            <dt className="font-semibold">1. Baixe um App Autenticador</dt>
            <dd className="text-sm">
              <span>Instale um dos apps abaixo</span>
              <ul className="ml-8 list-inside list-disc">
                <li className="font-semibold">Google Authenticator</li>
                <ul className="ml-8 list-inside list-disc">
                  <li>
                    <Button asChild variant="link" className="h-3.5 p-0">
                      <Link href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt">
                        Android
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="h-3.5 p-0">
                      <Link href="https://apps.apple.com/br/app/google-authenticator/id388497605">
                        iOS
                      </Link>
                    </Button>
                  </li>
                </ul>
                <li className="font-semibold">Microsoft Authenticator</li>
                <ul className="ml-8 list-inside list-disc">
                  <li>
                    <Button asChild variant="link" className="h-3.5 p-0">
                      <Link href="https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=pt">
                        Android
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="h-3.5 p-0">
                      <Link href="https://apps.apple.com/br/app/microsoft-authenticator/id983156458">
                        iOS
                      </Link>
                    </Button>
                  </li>
                </ul>
              </ul>
            </dd>
            <dt className="font-semibold">2. Ative a 2FA na Sua Conta</dt>
            <dd className="text-sm">
              <span>
                Siga o exemplo do Google (o processo é parecido em outros
                serviços):
              </span>
              <ol className="ml-8 list-inside list-decimal">
                <li>
                  {' '}
                  <span className="font-bold">Entre na sua conta Google</span>.
                </li>
                <li>
                  Vá em <span className="font-bold">Segurança</span> {'>'}{' '}
                  <span className="font-bold">Verificação em duas etapas</span>.
                </li>
                <li>
                  Clique em <span className="">Começar</span>.
                </li>
                <li>
                  Escolha{' '}
                  <span className="font-bold">Aplicativo Autenticador</span>.
                </li>
                <li>
                  <span className="font-bold">Escaneie o QR Code</span> com o
                  app autenticador.
                  <div className="-ml-8 flex justify-center">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        height={240}
                        width={240}
                        alt="QR code para autenticação de 2 fatores"
                      />
                    ) : (
                      <Skeleton className="size-60" />
                    )}
                  </div>
                </li>
                <li>
                  Insira o{' '}
                  <span className="font-bold">código de 6 dígitos</span> gerado
                  pelo app.
                  <div>
                    <InputOTP value={otp} onChange={setOtp} />
                    {error && (
                      <span className="text-xs text-destructive">{error}</span>
                    )}
                  </div>
                </li>
              </ol>
            </dd>
          </dl>
          <p className="mt-2">
            Pronto! A partir de agora, você vai precisar do app para fazer
            login, além da sua senha.
          </p>
        </div> */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            {isLoading ? <Spinner /> : 'Enviar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

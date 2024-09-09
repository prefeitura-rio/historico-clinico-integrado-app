import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { config } from '@/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Histórico Clínico Integrado',
  description: 'Prefeitura do Rio de Janeiro',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${config.captchaSiteKey}`}
        />
        <TooltipProvider delayDuration={400}>
          <Toaster duration={4000} />
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}

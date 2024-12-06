import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

import Home from '@/app/(app)/page'
import { Toaster } from '@/components/ui/sonner'
import type { User } from '@/models/entities'

const meta: Meta<typeof Home> = {
  component: Home,
  title: 'Páginas/Busca por CPF',
  decorators: [
    (Story) => {
      const queryClient = new QueryClient()
      return (
        <QueryClientProvider client={queryClient}>
          <Toaster duration={15000} closeButton />
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof Home>

const defaultData: User = {
  cpf: '12345678900',
  name: 'John Doe',
  email: 'john.doe@example.com',
  is_use_terms_accepted: true,
  role: 'Desenvolvedor',
  username: 'johndoe',
}

const termsNotAcceptedData: User = {
  cpf: '12345678900',
  name: 'John Doe',
  email: 'john.doe@example.com',
  is_use_terms_accepted: false,
  role: 'Desenvolvedor',
  username: 'johndoe',
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://staging.api.hci.dados.rio/frontend/user',
          async () => {
            return HttpResponse.json(defaultData)
          },
        ),
        http.post(
          'https://staging.api.hci.dados.rio/frontend/user/accept-terms/',
          async () => {
            return HttpResponse.json({ type: 'success' })
          },
        ),
      ],
    },
  },
}

export const ResponsabilityTermsSuccess: Story = {
  name: 'Termos de responsabilidade aceitos com sucesso',
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://staging.api.hci.dados.rio/frontend/user',
          async () => {
            return HttpResponse.json(termsNotAcceptedData)
          },
        ),
        http.post(
          'https://staging.api.hci.dados.rio/frontend/user/accept-terms/',
          async () => {
            return HttpResponse.json({ type: 'success' })
          },
        ),
      ],
    },
  },
}

export const ResponsabilityTermsError: Story = {
  name: 'Erro ao aceitar termos de responsabilidade',
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://staging.api.hci.dados.rio/frontend/user',
          async () => {
            return HttpResponse.json(termsNotAcceptedData)
          },
        ),
        http.post(
          'https://staging.api.hci.dados.rio/frontend/user/accept-terms/',
          async () => {
            return HttpResponse.json({ type: 'failed' })
          },
        ),
      ],
    },
  },
}

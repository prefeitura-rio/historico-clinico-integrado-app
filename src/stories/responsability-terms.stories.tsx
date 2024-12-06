import type { Meta, StoryObj } from '@storybook/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

import { StatementOfResponsability } from '@/app/(app)/components/cpf-search/components/statement-of-responsibility'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/react-query'
import type { User } from '@/models/entities'
// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof StatementOfResponsability> = {
  component: StatementOfResponsability,
  title: 'Componentes/Termos de Responsabilidade',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Toaster duration={15000} closeButton />
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StatementOfResponsability>

const TestData: User = {
  cpf: '12345678900',
  name: 'John Doe',
  email: 'john.doe@example.com',
  is_use_terms_accepted: false,
  role: 'Desenvolvedor',
  username: 'johndoe',
}

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://staging.api.hci.dados.rio/frontend/user',
          async () => {
            return HttpResponse.json(TestData)
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

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://staging.api.hci.dados.rio/frontend/user',
          async () => {
            return HttpResponse.json(TestData)
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

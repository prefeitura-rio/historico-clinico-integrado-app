import type { Meta, StoryObj } from '@storybook/react'

import { UserNotice } from '@/app/(app)/components/user-notice/user-notice'

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof UserNotice> = {
  component: UserNotice,
  title: 'Componentes/Aviso ao usuário',
}

export default meta
type Story = StoryObj<typeof UserNotice>

export const FirstStory: Story = {
  argTypes: {},
  args: {},
}

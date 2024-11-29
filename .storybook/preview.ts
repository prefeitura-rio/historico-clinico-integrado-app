import '../src/app/globals.css'

import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Light', value: '#f8f8f8' },
      ],
      default: 'Light'
    },
    docs: {
      theme: themes.dark,
    },
  },
}

export default preview

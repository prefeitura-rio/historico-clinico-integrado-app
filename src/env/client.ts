import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_HCI_API_URL: z.string(),
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: z.string(),
})
const _env = clientEnvSchema.safeParse({
  NEXT_PUBLIC_HCI_API_URL: process.env.NEXT_PUBLIC_HCI_API_URL,
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data

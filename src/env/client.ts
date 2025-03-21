import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_HCI_API_URL: z.string(),
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: z.string(),
  NEXT_PUBLIC_URL_PROVIDER: z.string(),
})

const _env = clientEnvSchema.safeParse({
  NEXT_PUBLIC_HCI_API_URL: process.env.NEXT_PUBLIC_HCI_API_URL,
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
  NEXT_PUBLIC_URL_PROVIDER: process.env.NEXT_PUBLIC_URL_PROVIDER,
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!' + JSON.stringify(_env.error))

  throw new Error('Invalid environment variables!: ' + JSON.stringify(_env.error))
}

export const env = _env.data

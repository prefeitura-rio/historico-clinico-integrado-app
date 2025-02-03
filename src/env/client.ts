import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_HCI_API_URL: z.string(),
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: z.string(),
  URL_PROVIDER: z.string(),
  URL_SERVICE: z.string(),
  REDIRECT_PATH: z.string(),
  SCOPES: z.string(),
  CLIENT_ID: z.string(),
  SECRET: z.string(),
})

const _env = clientEnvSchema.safeParse({
  NEXT_PUBLIC_HCI_API_URL: process.env.NEXT_PUBLIC_HCI_API_URL,
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY,
  URL_PROVIDER: process.env.URL_PROVIDER,
  URL_SERVICE: process.env.URL_SERVICE,
  REDIRECT_PATH: process.env.REDIRECT_PATH,
  SCOPES: process.env.SCOPES,
  CLIENT_ID: process.env.CLIENT_ID,
  SECRET: process.env.SECRET
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env)

  throw new Error('Invalid environment variables!: ' + JSON.stringify(_env))
}

export const env = _env.data

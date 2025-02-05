import { z } from 'zod'

const serverEnvSchema = z.object({
  NEXT_PUBLIC_HCI_API_URL: z.string(),
  NEXT_PUBLIC_CAPTCHA_V3_SITE_KEY: z.string(),
  CAPTCHA_V3_SECRET_KEY: z.string(),
  GOOGGLE_ANALYTICS_ID: z.string(),
  GOOGLE_TAG_MANAGER_ID: z.string(),
  HOTJAR_ID: z.string(),
  NEXT_PUBLIC_URL_PROVIDER: z.string(),
  NEXT_PUBLIC_REDIRECT_PATH: z.string(),
  NEXT_PUBLIC_SCOPES: z.string(),
  CLIENT_ID: z.string(),
  SECRET: z.string(),
})

export async function getEnv() {
  const _env = serverEnvSchema.safeParse(process.env)

  if (_env.success === false) {
    console.error('❌ Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables!')
  }

  return _env.data
}

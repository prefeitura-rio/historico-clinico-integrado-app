import { config } from '@/config'

export async function getCaptchaToken() {
  return new Promise<string>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = config.captchaSiteKey
      const token = await grecaptcha.execute(siteKey, {
        action: 'SubmitSignInForm',
      })
      resolve(token)
    })
  })
}

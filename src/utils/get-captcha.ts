export async function getCaptchaToken(action: string, siteKey: string) {
  return new Promise<string>((resolve) => {
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(siteKey, {
        action,
      })
      resolve(token)
    })
  })
}

export async function getCaptchaToken(siteKey: string) {
  return new Promise<string>((resolve) => {
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(siteKey, {
        action: 'SubmitSignInForm',
      })
      resolve(token)
    })
  })
}

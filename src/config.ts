// This function will validate and return the environment variables
const getConfig = () => {
  const apiUrl = process.env.NEXT_PUBLIC_HCI_API_URL
  const captchaSiteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_HCI_API_URL is not set')
  }
  if (!captchaSiteKey) {
    throw new Error('NEXT_PUBLIC_CAPTCHA_SITE_KEY is not set')
  }

  // Trim any trailing slash from the API URL
  const trimmedApiUrl = apiUrl.replace(/\/+$/, '')

  return {
    apiUrl: trimmedApiUrl,
    captchaSiteKey,
  }
}

export const config = getConfig()

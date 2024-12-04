import axios from 'axios'

import { env } from '@/env/client'

export const isApiError = axios.isAxiosError

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_HCI_API_URL,
})

import axios from 'axios'

export const isApiError = axios.isAxiosError

export const api = axios.create({
  baseURL: 'https://staging.api.hci.dados.rio',
})

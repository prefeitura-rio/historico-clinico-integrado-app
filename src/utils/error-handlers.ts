import { isAxiosError } from 'axios'

export const GENERIC_ERROR_MESSAGE =
  'Um erro inesperado ocorreu! Se o erro persistir, por favor, contate um administrador do sistema.'

export function getAPIErrorType(error: Error | null) {
  return isAxiosError(error) ? (error.response?.data?.type as string) : null
}

export function getAPIErrorMessage(error: unknown) {
  return isAxiosError(error) ? error.response?.data?.message : null
}

export function isGrantError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 401
}

export function isNotFoundError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 404
}

export function isForbiddenError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 403
}

export function isPermittionDeniedError(error: unknown) {
  return (
    isAxiosError(error) &&
    error.response?.status === 403 &&
    error.response.data?.type === 'PERMITION_DENIED'
  )
}

export function isDataRestrictedError(error: unknown) {
  return (
    isAxiosError(error) &&
    error.response?.status === 403 &&
    error.response.data?.type === 'DATA_RESTRICTED'
  )
}

export function isTooManyRequests(error: unknown) {
  return isAxiosError(error) && error.response?.status === 429
}

export function isValidationError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 422
}

export function isConflictError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 409
}

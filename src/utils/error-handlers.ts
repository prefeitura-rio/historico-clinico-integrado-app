import { isApiError } from '@/lib/api'

export function getAPIErrorType(error: unknown) {
  return isApiError(error) ? error.response?.data?.type : null
}

export function getAPIErrorMessage(error: unknown) {
  return isApiError(error) ? error.response?.data?.message : null
}

export function isGrantError(error: unknown) {
  return isApiError(error) && error.response?.status === 401
}

export function isNotFoundError(error: unknown) {
  return isApiError(error) && error.response?.status === 404
}

export function isForbiddenError(error: unknown) {
  return isApiError(error) && error.response?.status === 403
}

export function isPermittionDeniedError(error: unknown) {
  return (
    isApiError(error) &&
    error.response?.status === 403 &&
    error.response.data?.type === 'PERMITION_DENIED'
  )
}

export function isDataRestrictedError(error: unknown) {
  return (
    isApiError(error) &&
    error.response?.status === 403 &&
    error.response.data?.type === 'DATA_RESTRICTED'
  )
}

export function isTooManyRequests(error: unknown) {
  return isApiError(error) && error.response?.status === 429
}

export const genericErrorMessage =
  'Um erro inesperado ocorreu! Se o erro persistir, por favor, contate um administrador do sistema.'

export function isValidationError(error: unknown) {
  return isApiError(error) && error.response?.status === 422
}

export function isConflictError(error: unknown) {
  return isApiError(error) && error.response?.status === 409
}

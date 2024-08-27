import { isApiError } from '@/lib/api'

export function isGrantError(error: unknown) {
  return isApiError(error) && error.response?.status === 401
}

export function isNotFoundError(error: unknown) {
  return isApiError(error) && error.response?.status === 404
}

export function isNoContentError(error: unknown) {
  return isApiError(error) && error.response?.status === 204
}

export const genericErrorMessage =
  'Um erro inexperado ocorreu! Se o erro persistir, por favor, contate um administrador do sistema.'

export function isValidationError(error: unknown) {
  return isApiError(error) && error.response?.status === 422
}

export function isConflictError(error: unknown) {
  return isApiError(error) && error.response?.status === 409
}

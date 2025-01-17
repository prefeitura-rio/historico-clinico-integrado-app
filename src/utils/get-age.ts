import { parseISO } from 'date-fns'

export function getAge(_date: Date | string) {
  const date = typeof _date === 'string' ? new Date(parseISO(_date)) : _date
  const today = new Date()
  const birthDate = new Date(date)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

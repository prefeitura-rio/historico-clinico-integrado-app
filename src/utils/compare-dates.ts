export function compareDates(a: string | Date, b: string | Date) {
  const A = new Date(a)
  const B = new Date(b)

  const diff = A.getTime() - B.getTime()

  if (diff < 0) return -1
  if (diff > 0) return 1
  return 0
}

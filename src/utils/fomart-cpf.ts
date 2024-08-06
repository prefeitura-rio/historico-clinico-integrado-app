export function formatCPF(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, '')

  // Format the string with dots and dash
  let formattedValue = numericValue

  if (numericValue.length > 3) {
    formattedValue = numericValue.slice(0, 3) + '.' + numericValue.slice(3)
  }
  if (numericValue.length > 6) {
    formattedValue = formattedValue.slice(0, 7) + '.' + numericValue.slice(6)
  }
  if (numericValue.length > 9) {
    formattedValue = formattedValue.slice(0, 11) + '-' + numericValue.slice(9)
  }
  if (numericValue.length > 11) {
    formattedValue = formattedValue.slice(0, 14)
  }

  return formattedValue
}

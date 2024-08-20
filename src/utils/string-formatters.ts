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

export function formatPhone(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, '')

  const isCel = value.length === 9 || value.length === 11
  const isTel = value.length === 8 || value.length === 10
  const hasDDD = value.length === 10 || value.length === 11

  if (!isCel && !isTel) return value

  const ddd = hasDDD ? `(${value.slice(0, 2)}) ` : ''
  const celDigit = isCel
    ? hasDDD
      ? numericValue.charAt(2) + ' '
      : numericValue.charAt(0) + ' '
    : ''
  const middleDigits =
    isCel && hasDDD
      ? numericValue.slice(3, 7)
      : isCel && !hasDDD
        ? numericValue.slice(1, 5)
        : !isCel && hasDDD
          ? numericValue.slice(2, 6)
          : numericValue.slice(0, 4)
  const last4Digits = value.slice(-4)

  return ddd + celDigit + middleDigits + '-' + last4Digits
}

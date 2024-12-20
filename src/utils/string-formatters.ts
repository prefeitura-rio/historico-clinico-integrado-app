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

  const isCel = numericValue.length === 9 || numericValue.length === 11
  const isTel = numericValue.length === 8 || numericValue.length === 10
  const hasDDD = numericValue.length === 10 || numericValue.length === 11

  if (!isCel && !isTel) return value

  const ddd = hasDDD ? `(${numericValue.slice(0, 2)}) ` : ''
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
  const last4Digits = numericValue.slice(-4)

  return ddd + celDigit + middleDigits + '-' + last4Digits
}

export function formatCNS(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replaceAll(/\D/g, '').replaceAll(' ', '')

  // Format the string with dots and dash
  let formattedValue = numericValue

  if (numericValue.length > 3) {
    formattedValue = numericValue.slice(0, 3) + ' ' + numericValue.slice(3)
  }
  if (numericValue.length > 7) {
    formattedValue = formattedValue.slice(0, 8) + ' ' + numericValue.slice(7)
  }
  if (numericValue.length > 11) {
    formattedValue = formattedValue.slice(0, 13) + ' ' + numericValue.slice(11)
  }
  if (numericValue.length > 15) {
    formattedValue = formattedValue.slice(0, 18)
  }

  return formattedValue
}

export function capitalize(value: string | undefined | null) {
  if (!value) return value
  const words = value.split(' ')
  return words
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(' ')
}

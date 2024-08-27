interface WhatsAppRedirectProps {
  patientName: string
  CBO: string
  phoneNumber: string
  userName: string
}

export function whatsAppRedirect({
  patientName,
  CBO,
  phoneNumber,
  userName,
}: WhatsAppRedirectProps) {
  // Remove any non-numeric characters
  const numericValue = phoneNumber.replace(/\D/g, '')

  const hasDDD = numericValue.length === 10 || numericValue.length === 11
  const ddd = hasDDD ? numericValue.slice(0, 2) : '21'
  const number = hasDDD ? numericValue.slice(2) : numericValue

  const phone = '+55' + ddd + number

  const message = `Olá. Eu sou ${userName} (${CBO}) da Secretaria Municipal de Saúde do Rio de Janeiro, e gostaria de falar sobre o(a) paciente ${patientName}.`

  const encodedMessage = encodeURIComponent(message)

  const whatsappLink = 'https://wa.me/' + phone + '/?text=' + encodedMessage

  window.open(whatsappLink, '_blank')
}

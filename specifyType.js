const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

export default function specifyType(data) {
  if (data.match(linkRegex)) return 'link'

  if (data.includes('mailto:') || data.includes('MAILTO:')) return 'email'
  if (data.match(emailRegex)) return 'email'

  if (data.includes('tel:') || data.includes('TEL:')) return 'phone'
  if (data.match(phoneRegex)) return 'phone'


  if (data.includes('smsto:') || data.includes('SMSTO:')) return 'sms'

  return 'string'
}

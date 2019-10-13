function hexToB64 (hex: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(hex, 'hex').toString('base64')
  }
  if (typeof btoa !== 'undefined') {
    return btoa(hex.match(/\w{2}/g).map((a) => String.fromCharCode(parseInt(a, 16))).join(''));
  }
  throw new Error('Neither Buffer nor btoa are available')
}

function b64ToHex (b64: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64').toString('hex')
  }
  if (typeof atob !== 'undefined') {
    return [...atob(b64)].map((a) => a.charCodeAt(0).toString(16).padStart(2, '0')).join('')
  }
  throw new Error('Neither Buffer nor atob are available')
}

export function uuidHexToB64u (uuid: string): string {
  const b64 = hexToB64(uuid.replace(/-/g, ''))
  return b64.substring(0, 22).replace(/\+/g, '-').replace(/\//g, '_')
}

export function uuidB64uToHex (b64u: string): string {
  const hex = b64ToHex(b64u.replace(/-/g, '+').replace(/_/g, '/') + '==')
  const [, ...splitted] = hex.match(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/)
  return splitted.join('-')
}

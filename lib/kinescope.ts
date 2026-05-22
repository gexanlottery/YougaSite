import { createHmac } from 'crypto'

export function generateViewerToken(kinescopeId: string): string {
  const secret = process.env.KINESCOPE_SECRET_KEY
  if (!secret) return ''

  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    sub: kinescopeId,
    exp: Math.floor(Date.now() / 1000) + 4 * 3600,
  })).toString('base64url')

  const sig = createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${sig}`
}

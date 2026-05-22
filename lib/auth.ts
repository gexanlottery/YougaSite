import { cookies } from 'next/headers'
import { prisma } from './prisma'

const SESSION_COOKIE = 'yoga_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export interface SessionUser {
  id: string
  email?: string | null
  name?: string | null
  role: 'USER' | 'ADMIN'
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const sessionData = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionData) return null

  try {
    const decoded = Buffer.from(sessionData, 'base64').toString('utf-8')
    const { userId, expires } = JSON.parse(decoded)

    if (Date.now() > expires) return null

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true }
    })

    return user as SessionUser | null
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()
  if (!session) {
    const { redirect } = await import('next/navigation')
    redirect('/login')
  }
  return session!
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth()
  if (session.role !== 'ADMIN') {
    const { redirect } = await import('next/navigation')
    redirect('/')
  }
  return session
}

'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../prisma'

const SESSION_COOKIE = 'yoga_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000

const LoginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(1, { message: 'Введите пароль' }),
})

const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'Имя минимум 2 символа' }),
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(8, { message: 'Пароль минимум 8 символов' }),
})

function createSessionToken(userId: string): string {
  const data = JSON.stringify({ userId, expires: Date.now() + SESSION_DURATION })
  return Buffer.from(data).toString('base64')
}

async function setSessionCookie(userId: string) {
  const token = createSessionToken(userId)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
}

export type ActionState = {
  errors?: Record<string, string[]>
  message?: string
} | undefined

export async function loginAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = LoginSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.passwordHash) {
    return { message: 'Неверный email или пароль' }
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return { message: 'Неверный email или пароль' }
  }

  await setSessionCookie(user.id)
  redirect(user.role === 'ADMIN' ? '/admin' : '/cabinet')
}

export async function registerAction(
  _state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = RegisterSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { name, email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { errors: { email: ['Пользователь с таким email уже существует'] } }
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  })

  await setSessionCookie(user.id)
  redirect('/cabinet')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('yoga_session')
  redirect('/')
}

import { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Создайте аккаунт на сайте Йога с Кристиной Андреевой',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-5 sm:mb-6">
            <div className="w-9 h-9 rounded-full bg-honey-400 flex items-center justify-center text-white font-display font-bold text-sm">КА</div>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-2">Регистрация</h1>
          <p className="text-ink-muted text-sm sm:text-base">Создайте аккаунт и начните практиковать</p>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-8">
          <RegisterForm />
          <p className="text-center text-sm text-ink-muted mt-5 sm:mt-6">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-honey-600 hover:underline font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

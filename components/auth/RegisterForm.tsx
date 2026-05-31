'use client'
import { useActionState } from 'react'
import { registerAction } from '@/lib/actions/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, undefined)
  return (
    <form action={action} className="space-y-4">
      {state?.message && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{state.message}</div>
      )}
      <Input id="name" name="name" type="text" label="Имя" placeholder="Ваше имя" autoComplete="name" error={state?.errors?.name?.[0]} required />
      <Input id="email" name="email" type="email" label="Email" placeholder="your@email.ru" autoComplete="email" error={state?.errors?.email?.[0]} required />
      <Input id="password" name="password" type="password" label="Пароль" placeholder="Минимум 8 символов" autoComplete="new-password" error={state?.errors?.password?.[0]} required />
      <p className="text-xs text-ink-muted">
        Регистрируясь, вы соглашаетесь с{' '}
        <a href="/legal/terms" className="text-honey-600 hover:underline">условиями</a>{' '}и{' '}
        <a href="/privacy" className="text-honey-600 hover:underline">политикой конфиденциальности</a>
      </p>
      <Button type="submit" className="w-full" loading={isPending}>Создать аккаунт</Button>
    </form>
  )
}

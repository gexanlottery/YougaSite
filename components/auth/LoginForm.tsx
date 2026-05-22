'use client'

import { useActionState } from 'react'
import { loginAction } from '@/lib/actions/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, undefined)

  return (
    <form action={action} className="space-y-4">
      {state?.message && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {state.message}
        </div>
      )}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="your@email.ru"
        autoComplete="email"
        error={state?.errors?.email?.[0]}
        required
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        autoComplete="current-password"
        error={state?.errors?.password?.[0]}
        required
      />
      <Button type="submit" className="w-full" loading={isPending}>
        Войти
      </Button>
    </form>
  )
}

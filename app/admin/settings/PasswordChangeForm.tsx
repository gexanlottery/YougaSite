'use client'

import { useState } from 'react'
import { changeAdminPasswordAction } from '@/lib/actions/admin'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function PasswordChangeForm() {
  const [result, setResult] = useState<{ error?: string; success?: boolean } | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setResult(null)
    const formData = new FormData(e.currentTarget)
    const res = await changeAdminPasswordAction(formData)
    setResult(res ?? null)
    setPending(false)
    if (res?.success) {
      (e.target as HTMLFormElement).reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          placeholder="Минимум 8 символов"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Подтвердить пароль</label>
        <input
          name="confirm"
          type="password"
          required
          placeholder="Повторите пароль"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
        />
      </div>

      {result?.error && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4" />{result.error}
        </div>
      )}
      {result?.success && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
          <CheckCircle className="w-4 h-4" />Пароль успешно изменён
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors disabled:opacity-50"
      >
        {pending ? 'Сохраняю...' : 'Сменить пароль'}
      </button>
    </form>
  )
}

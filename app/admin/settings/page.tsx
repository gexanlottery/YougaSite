import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PasswordChangeForm from './PasswordChangeForm'

export default async function AdminSettingsPage() {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') redirect('/login')

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Настройки</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">Смена пароля</h2>
        <p className="text-sm text-gray-500 mb-5">
          Email: <span className="font-medium text-gray-700">{session.email}</span>
        </p>
        <PasswordChangeForm />
      </div>
    </div>
  )
}

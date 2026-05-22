import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { accesses: { where: { endDate: { gt: new Date() } }, take: 1 } },
    take: 50,
  }).catch(() => [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Пользователи</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Пользователь</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Доступ</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Роль</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Зарегистрирован</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">Пользователей пока нет</td></tr>
            ) : users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600">{user.email ?? user.phone ?? '—'}</td>
                <td className="px-4 py-3">
                  {user.accesses.length > 0 ? (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Активен</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Нет доступа</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role === 'ADMIN' ? 'Админ' : 'Пользователь'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

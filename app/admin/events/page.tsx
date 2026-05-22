import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate, formatPrice } from '@/lib/utils'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'desc' } }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Мероприятия</h1>
        <Link href="/admin/events/new" className="inline-flex items-center gap-2 bg-honey-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
          <Plus className="w-4 h-4" />Добавить
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Дата</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Место</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Цена</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">Мероприятий пока нет</td></tr>
            ) : events.map(event => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{event.title}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(event.date)}</td>
                <td className="px-4 py-3 text-gray-600">{event.location}</td>
                <td className="px-4 py-3 text-gray-600">{formatPrice(event.price)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    event.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {event.status === 'PUBLISHED' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {event.status === 'PUBLISHED' ? 'Опубликовано' : 'Черновик'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/events/${event.id}/edit`} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-honey-600 transition-colors">
                    <Edit className="w-3 h-3" />Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

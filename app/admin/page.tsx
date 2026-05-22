import { prisma } from '@/lib/prisma'
import { Video, Calendar, Users, MessageSquare } from 'lucide-react'

async function getStats() {
  try {
    const [videos, events, users, reviews] = await Promise.all([
      prisma.video.count({ where: { status: 'PUBLISHED' } }),
      prisma.event.count({ where: { status: 'PUBLISHED' } }),
      prisma.user.count(),
      prisma.review.count({ where: { isPublished: true } }),
    ])
    return { videos, events, users, reviews }
  } catch {
    return { videos: 0, events: 0, users: 0, reviews: 0 }
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const statCards = [
    { label: 'Видеоуроков', value: stats.videos, icon: Video, color: 'text-honey-600', bg: 'bg-honey-50' },
    { label: 'Мероприятий', value: stats.events, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Пользователей', value: stats.users, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Отзывов', value: stats.reviews, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Обзор</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg ${card.bg} ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: '/admin/videos', label: '+ Добавить урок' },
            { href: '/admin/events', label: '+ Добавить мероприятие' },
            { href: '/admin/faq', label: '+ Добавить вопрос FAQ' },
            { href: '/admin/users', label: 'Управление пользователями' },
          ].map(action => (
            <a key={action.href} href={action.href} className="block px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors">
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

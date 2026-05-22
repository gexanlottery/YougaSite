import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDuration, levelLabel } from '@/lib/utils'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Видеоуроки</h1>
        <Link href="/admin/videos/new" className="inline-flex items-center gap-2 bg-honey-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
          <Plus className="w-4 h-4" />Добавить урок
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Категория</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Уровень</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Длит.</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {videos.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">Уроков пока нет</td></tr>
            ) : videos.map(video => (
              <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 line-clamp-1">{video.title}</div>
                  {video.isFree && <span className="text-xs text-honey-600">Бесплатно</span>}
                </td>
                <td className="px-4 py-3 text-gray-600">{video.category.name}</td>
                <td className="px-4 py-3 text-gray-600">{levelLabel(video.level)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDuration(video.duration)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    video.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' :
                    video.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {video.status === 'PUBLISHED' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {video.status === 'PUBLISHED' ? 'Опубликован' : video.status === 'DRAFT' ? 'Черновик' : 'Архив'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/videos/${video.id}`} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-honey-600 transition-colors">
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

import { prisma } from '@/lib/prisma'
import { deleteReviewAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Отзывы</h1>
        <Link href="/admin/reviews/new" className="inline-flex items-center gap-2 bg-honey-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
          <Plus className="w-4 h-4" />Добавить отзыв
        </Link>
      </div>
      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl">Отзывов пока нет</div>
        ) : reviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{review.name}</span>
                {review.city && <span className="text-xs text-gray-400">· {review.city}</span>}
                {review.role && <span className="text-xs text-gray-400">· {review.role}</span>}
                {review.isPublished
                  ? <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><Eye className="w-3 h-3" />Опубликован</span>
                  : <span className="inline-flex items-center gap-1 text-xs text-yellow-600"><EyeOff className="w-3 h-3" />Скрыт</span>
                }
              </div>
              <div className="text-sm text-gray-500 line-clamp-2">{review.text}</div>
            </div>
            <Link href={`/admin/reviews/${review.id}`} className="flex-shrink-0 text-xs text-gray-400 hover:text-honey-600 flex items-center gap-1 transition-colors">
              <Edit className="w-3 h-3" />Ред.
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

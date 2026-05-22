import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'

export default async function AdminFAQPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">FAQ</h1>
        <Link href="/admin/faq/new" className="inline-flex items-center gap-2 bg-honey-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
          <Plus className="w-4 h-4" />Добавить вопрос
        </Link>
      </div>
      <div className="space-y-3">
        {faqs.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl">Вопросов пока нет</div>
        ) : faqs.map(faq => (
          <div key={faq.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">{faq.question}</div>
              <div className="text-sm text-gray-500 line-clamp-2">{faq.answer}</div>
              {!faq.isPublished && <span className="text-xs text-yellow-600 mt-1 inline-block">Скрыт</span>}
            </div>
            <Link href={`/admin/faq/${faq.id}`} className="flex-shrink-0 text-xs text-gray-400 hover:text-honey-600 flex items-center gap-1 transition-colors">
              <Edit className="w-3 h-3" />Ред.
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

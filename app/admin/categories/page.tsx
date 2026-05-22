import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Trash2, LayoutList } from 'lucide-react'
import { DeleteCategoryButton } from '@/components/admin/DeleteCategoryButton'

export default async function AdminCategoriesPage() {
  const categories = await prisma.videoCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { videos: true } } },
  }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Категории видео</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} категорий</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-honey-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors"
        >
          <Plus className="w-4 h-4" />Добавить категорию
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <LayoutList className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Категорий пока нет</p>
            <Link href="/admin/categories/new" className="text-sm text-honey-600 hover:underline mt-2 inline-block">
              Создать первую категорию
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-10">№</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Видео</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs">{cat.sortOrder}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{cat.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      cat._count.videos > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {cat._count.videos}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/categories/${cat.id}`}
                        className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-honey-600 transition-colors"
                      >
                        <Edit className="w-3 h-3" />Редактировать
                      </Link>
                      {cat._count.videos === 0 ? (
                        <DeleteCategoryButton id={cat.id} name={cat.name} />
                      ) : (
                        <span className="text-xs text-gray-300 cursor-not-allowed" title="Сначала удалите или перенесите видео">
                          <Trash2 className="w-3 h-3 inline" /> Нельзя удалить
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

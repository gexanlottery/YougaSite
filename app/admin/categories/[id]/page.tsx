import { prisma } from '@/lib/prisma'
import { saveCategoryAction, deleteCategoryAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cat = await prisma.videoCategory.findUnique({
    where: { id },
    include: { _count: { select: { videos: true } } },
  }).catch(() => null)

  if (!cat) notFound()

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/categories" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Редактировать категорию</h1>
      </div>

      <form action={saveCategoryAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <input type="hidden" name="id" value={cat.id} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            defaultValue={cat.name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL-адрес) <span className="text-red-500">*</span>
          </label>
          <input
            name="slug"
            required
            defaultValue={cat.slug}
            pattern="[a-z0-9-]+"
            title="Только латинские буквы, цифры и дефис"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <p className="text-xs text-gray-400 mt-1">Только латинские буквы, цифры и дефис</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Порядок сортировки</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={cat.sortOrder}
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
        </div>

        {cat._count.videos > 0 && (
          <div className="text-sm text-blue-700 bg-blue-50 rounded-lg px-4 py-3">
            В этой категории {cat._count.videos} видео.{' '}
            <Link href="/admin/videos" className="underline hover:no-underline">Посмотреть видео</Link>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors"
            >
              Сохранить
            </button>
            <Link href="/admin/categories" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Отмена
            </Link>
          </div>

          {cat._count.videos === 0 && (
            <form action={async () => { 'use server'; await deleteCategoryAction(cat.id) }}>
              <button
                type="submit"
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Удалить категорию
              </button>
            </form>
          )}
          {cat._count.videos > 0 && (
            <span className="text-sm text-gray-300 cursor-not-allowed" title="В категории есть видео — сначала перенесите их">
              Нельзя удалить (есть видео)
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

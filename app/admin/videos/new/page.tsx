import { prisma } from '@/lib/prisma'
import { saveVideoAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { KinescopeIdField } from '@/components/admin/KinescopeIdField'
import { ImageUploadField } from '@/components/admin/ImageUploadField'

export default async function NewVideoPage() {
  const categories = await prisma.videoCategory.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => [])

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/videos" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Новый видеоурок</h1>
      </div>

      <form action={saveVideoAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* Title + Slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
            <input
              name="title"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
            <input
              name="slug"
              required
              placeholder="hatha-yoga-dlya-nachinayushchikh"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
            />
          </div>
        </div>

        {/* Category + Level + Duration */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
            <select
              name="categoryId"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
            >
              <option value="">Выберите...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Уровень</label>
            <select name="level" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="ALL">Для всех</option>
              <option value="BEGINNER">Начинающий</option>
              <option value="INTERMEDIATE">Средний</option>
              <option value="ADVANCED">Продвинутый</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Длительность (сек) *</label>
            <input
              name="duration"
              type="number"
              required
              min="0"
              defaultValue="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
            />
          </div>
        </div>

        {/* Kinescope video ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kinescope ID (полное видео) *
          </label>
          <KinescopeIdField />
          <p className="text-xs text-gray-400 mt-1">
            Загрузите полное видео в Kinescope и вставьте его ID.
          </p>
        </div>

        {/* Kinescope preview ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kinescope Preview ID
          </label>
          <KinescopeIdField name="kinescopePreviewId" />
          <p className="text-xs text-gray-400 mt-1">
            Сюда вставьте ID отдельного preview-видео из Kinescope. Preview должно быть заранее подготовлено: первые 5 минут урока, ускорено x5, без звука, примерно 1 минута. Если не задано — пользователи без доступа увидят заглушку.
          </p>
        </div>

        {/* Cover image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Обложка</label>
          <ImageUploadField />
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание *</label>
          <textarea
            name="shortDesc"
            rows={2}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Полное описание *</label>
          <textarea
            name="fullDesc"
            rows={5}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>

        {/* Status + Free + Order */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="DRAFT">Черновик</option>
              <option value="PUBLISHED">Опубликован</option>
              <option value="ARCHIVED">Архив</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Доступ</label>
            <select name="isFree" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="false">Платный</option>
              <option value="true">Бесплатный</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Порядок</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
            />
          </div>
        </div>

        {/* SEO */}
        <details className="border-t border-gray-100 pt-4">
          <summary className="text-sm font-medium text-gray-600 cursor-pointer select-none">SEO (необязательно)</summary>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input name="seoTitle" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
              <textarea name="seoDesc" rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
              <input name="seoKeywords" placeholder="йога, видеоурок, хатха" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
            </div>
          </div>
        </details>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors"
          >
            Сохранить
          </button>
          <Link href="/admin/videos" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}

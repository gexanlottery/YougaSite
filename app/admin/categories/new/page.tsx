import { saveCategoryAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewCategoryPage() {
  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/categories" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Новая категория</h1>
      </div>

      <form action={saveCategoryAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            required
            placeholder="Хатха-йога"
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
            placeholder="hatha"
            pattern="[a-z0-9-]+"
            title="Только латинские буквы, цифры и дефис"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <p className="text-xs text-gray-400 mt-1">Только латинские буквы, цифры и дефис. Напр.: hatha, kultura-dvizheniya</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Порядок сортировки</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue="10"
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <p className="text-xs text-gray-400 mt-1">Меньше = выше в списке</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors"
          >
            Создать категорию
          </button>
          <Link href="/admin/categories" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}

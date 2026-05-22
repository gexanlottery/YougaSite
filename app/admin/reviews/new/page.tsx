import { saveReviewAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewReviewPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/reviews" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Новый отзыв</h1>
      </div>
      <form action={saveReviewAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
            <input name="name" required placeholder="Анна К." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <input name="city" placeholder="Москва" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Роль/описание</label>
            <input name="role" placeholder="Начинающая" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Текст отзыва *</label>
          <textarea name="text" rows={5} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Фото (путь)</label>
            <input name="photo" placeholder="/images/reviews/anna.jpg" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Порядок сортировки</label>
            <input name="sortOrder" type="number" defaultValue="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
          <select name="isPublished" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
            <option value="true">Опубликован</option>
            <option value="false">Скрыт</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
            Сохранить
          </button>
          <Link href="/admin/reviews" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}

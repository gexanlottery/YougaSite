import { saveEventAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewEventPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/events" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Новое мероприятие</h1>
      </div>
      <form action={saveEventAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
            <input name="title" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
            <input name="slug" required placeholder="yoga-tour-karelia-2025" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала *</label>
            <input name="date" type="datetime-local" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
            <input name="endDate" type="datetime-local" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Место проведения *</label>
            <input name="location" required placeholder="Карелия, Россия" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽) *</label>
            <input name="price" type="number" required min="0" step="0.01" defaultValue="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="DRAFT">Черновик</option>
              <option value="PUBLISHED">Опубликовано</option>
              <option value="ARCHIVED">Архив</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Фото обложки (путь)</label>
          <input name="coverImage" placeholder="/images/event-placeholder.jpg" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание *</label>
          <textarea name="shortDesc" rows={2} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Полное описание *</label>
          <textarea name="fullDesc" rows={5} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Программа (по дням)</label>
          <textarea name="program" rows={4} placeholder="День 1: Прибытие, знакомство..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Включено (каждый пункт с новой строки)</label>
            <textarea name="included" rows={4} placeholder="Проживание&#10;Питание&#10;Трансфер" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Не включено (каждый пункт с новой строки)</label>
            <textarea name="notIncluded" rows={4} placeholder="Авиаперелёт&#10;Страховка" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-600">SEO (необязательно)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
            <input name="seoTitle" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
            <textarea name="seoDesc" rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
            Сохранить
          </button>
          <Link href="/admin/events" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  )
}

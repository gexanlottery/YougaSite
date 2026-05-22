import { prisma } from '@/lib/prisma'
import { saveEventAction, deleteEventAction } from '@/lib/actions/admin'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

function toDatetimeLocal(date: Date | null | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } }).catch(() => null)
  if (!event) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/events" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Редактировать мероприятие</h1>
      </div>
      <form action={saveEventAction} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <input type="hidden" name="id" value={event.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
            <input name="title" required defaultValue={event.title} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
            <input name="slug" required defaultValue={event.slug} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала *</label>
            <input name="date" type="datetime-local" required defaultValue={toDatetimeLocal(event.date)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
            <input name="endDate" type="datetime-local" defaultValue={toDatetimeLocal(event.endDate)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Место проведения *</label>
            <input name="location" required defaultValue={event.location} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽) *</label>
            <input name="price" type="number" required min="0" step="0.01" defaultValue={event.price.toString()} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Уровень</label>
            <select name="level" defaultValue={event.level} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="ALL">Для всех</option>
              <option value="BEGINNER">Начинающий</option>
              <option value="INTERMEDIATE">Средний</option>
              <option value="ADVANCED">Продвинутый</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select name="status" defaultValue={event.status} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400">
              <option value="DRAFT">Черновик</option>
              <option value="PUBLISHED">Опубликовано</option>
              <option value="ARCHIVED">Архив</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Фото обложки (путь)</label>
          <input name="coverImage" defaultValue={event.coverImage} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание *</label>
          <textarea name="shortDesc" rows={2} required defaultValue={event.shortDesc} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Полное описание *</label>
          <textarea name="fullDesc" rows={5} required defaultValue={event.fullDesc} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Программа</label>
          <textarea name="program" rows={4} defaultValue={event.program ?? ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Включено</label>
            <textarea name="included" rows={4} defaultValue={event.included ?? ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Не включено</label>
            <textarea name="notIncluded" rows={4} defaultValue={event.notIncluded ?? ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-600">SEO</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
            <input name="seoTitle" defaultValue={event.seoTitle ?? ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
            <textarea name="seoDesc" rows={2} defaultValue={event.seoDesc ?? ''} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
            <button type="submit" className="bg-honey-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors">
              Сохранить
            </button>
            <Link href="/admin/events" className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Отмена
            </Link>
          </div>
          <form action={async () => { 'use server'; await deleteEventAction(event.id) }}>
            <button type="submit" className="text-sm text-red-500 hover:text-red-700 transition-colors">
              Удалить
            </button>
          </form>
        </div>
      </form>
    </div>
  )
}

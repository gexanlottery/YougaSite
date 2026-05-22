'use client'

import { useState, useTransition } from 'react'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { saveSiteContentAction } from '@/lib/actions/admin'

const DEFAULTS: Record<string, string> = {
  hero_badge: 'Йога · Движение · Осознанность',
  hero_subtitle: 'Онлайн-практика йоги. Деликатно, безопасно, с вниманием к каждому — независимо от уровня подготовки.',
  hero_photo: '/uploads/1.jpg',
  about_title: 'Практика, которая меняет — изнутри',
  about_p1: 'Андреева Кристина — занимаюсь йогой 12 лет, последние 7 преподаю, провожу семинары и устраиваю с любовью и задором йога-туры! Считаю, что йога — это инструмент для познания себя, благодаря которому наша жизнь становится более лёгкой, радостной, многогранной.',
  about_p2: 'Моё знакомство с йогой началось через такие направления как универсальная йога и Аштанга Виньяса. Прошла множество курсов и обучений, и только позже познакомилась с методом Культуры Движения Игоря Пантюшева. Прошла курсы повышения квалификации для преподавателей в 2022 году, которые вдохновили меня настолько, что в 2025 году я защитила диплом в Институте Современной Теории и Практики Йоги Игоря Пантюшева и Ксении Шатской.',
  about_p3: 'Уже с 2024 года веду занятия и сама занимаюсь по этому методу — и вижу потрясающие результаты у себя и своих учеников.',
  about_quote_p1: 'Культура движения — уникальный проект, который с одной стороны опирается на традицию, а с другой — оперирует самыми современными представлениями науки о движении и физической активности.',
  about_quote_p2: 'Здесь используется функциональный подход — тот самый элемент, взрывающий мозг при первом знакомстве. Являющийся основой трансформации, потому что позволяет найти границы своих возможностей. Подход, предоставляющий каждому эффективные и безопасные инструменты для роста.',
}

export function ContentForm({ initialData }: { initialData: Record<string, string> }) {
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaved(false)
    setError('')
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        const result = await saveSiteContentAction(formData)
        if (result.success) {
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
        } else {
          setError(result.error || 'Ошибка сохранения')
        }
      } catch {
        setError('Ошибка сохранения')
      }
    })
  }

  const v = (key: string) => initialData[key] ?? DEFAULTS[key] ?? ''

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ─── HERO ─── */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Главный экран (Hero)</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Метка над именем</label>
          <input
            name="hero_badge"
            defaultValue={v('hero_badge')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
          <p className="text-xs text-gray-400 mt-1">Например: «Йога · Движение · Осознанность»</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Подзаголовок</label>
          <textarea
            name="hero_subtitle"
            rows={3}
            defaultValue={v('hero_subtitle')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Фото (главный экран)</label>
          <ImageUploadField defaultValue={v('hero_photo')} name="hero_photo" />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Блок «Обо мне»</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
          <input
            name="about_title"
            defaultValue={v('about_title')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Абзац 1</label>
          <textarea
            name="about_p1"
            rows={4}
            defaultValue={v('about_p1')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Абзац 2</label>
          <textarea
            name="about_p2"
            rows={5}
            defaultValue={v('about_p2')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Абзац 3</label>
          <textarea
            name="about_p3"
            rows={3}
            defaultValue={v('about_p3')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
          />
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-4">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide">Выделенный блок (с золотой полосой)</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст 1</label>
            <textarea
              name="about_quote_p1"
              rows={3}
              defaultValue={v('about_quote_p1')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст 2</label>
            <textarea
              name="about_quote_p2"
              rows={4}
              defaultValue={v('about_quote_p2')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-y"
            />
          </div>
        </div>
      </section>

      {/* ─── SAVE ─── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-honey-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-honey-600 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Сохраняется...' : 'Сохранить изменения'}
        </button>
        {saved && <span className="text-sm text-green-600">✓ Сохранено</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  )
}

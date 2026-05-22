'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

interface Level {
  value: string
  label: string
}

interface VideoFiltersProps {
  categories: Category[]
  levels: Level[]
}

export function VideoFilters({ categories, levels }: VideoFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') ?? ''
  const currentLevel = searchParams.get('level') ?? ''

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-5 space-y-5 sm:space-y-6 lg:sticky lg:top-24">
      {/* Mobile: горизонтальные чипсы; Desktop: вертикальный список */}
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-ink mb-2 sm:mb-3 uppercase tracking-wide">Категория</h3>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1 lg:space-y-0 -mx-1 lg:mx-0">
          <button
            onClick={() => setParam('category', '')}
            className={cn(
              'px-3 py-2 rounded-full lg:rounded-lg text-sm transition-colors text-left lg:w-full whitespace-nowrap',
              !currentCategory
                ? 'bg-honey-50 text-honey-700 font-medium ring-1 ring-honey-200 lg:ring-0'
                : 'bg-sand-50 text-ink-muted hover:bg-sand-100 lg:bg-transparent'
            )}
          >
            Все категории
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setParam('category', cat.slug)}
              className={cn(
                'px-3 py-2 rounded-full lg:rounded-lg text-sm transition-colors text-left lg:w-full whitespace-nowrap',
                currentCategory === cat.slug
                  ? 'bg-honey-50 text-honey-700 font-medium ring-1 ring-honey-200 lg:ring-0'
                  : 'bg-sand-50 text-ink-muted hover:bg-sand-100 lg:bg-transparent'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-ink mb-2 sm:mb-3 uppercase tracking-wide">Уровень</h3>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1 lg:space-y-0 -mx-1 lg:mx-0">
          {levels.map(level => (
            <button
              key={level.value}
              onClick={() => setParam('level', level.value === 'ALL' ? '' : level.value)}
              className={cn(
                'px-3 py-2 rounded-full lg:rounded-lg text-sm transition-colors text-left lg:w-full whitespace-nowrap',
                (level.value === 'ALL' && !currentLevel) || currentLevel === level.value
                  ? 'bg-honey-50 text-honey-700 font-medium ring-1 ring-honey-200 lg:ring-0'
                  : 'bg-sand-50 text-ink-muted hover:bg-sand-100 lg:bg-transparent'
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {(currentCategory || currentLevel) && (
        <button
          onClick={() => router.push(pathname)}
          className="w-full text-center text-sm text-honey-600 hover:text-honey-700 transition-colors py-2"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  )
}

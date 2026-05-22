'use client'

import { Trash2 } from 'lucide-react'
import { deleteCategoryAction } from '@/lib/actions/admin'

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Удалить категорию «${name}»?`)) return
    await deleteCategoryAction(id)
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
    >
      <Trash2 className="w-3 h-3" />Удалить
    </button>
  )
}

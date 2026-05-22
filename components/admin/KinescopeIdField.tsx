'use client'

import { useState } from 'react'
import { Video, ExternalLink, X } from 'lucide-react'

interface Props {
  defaultValue?: string
  name?: string
}

export function KinescopeIdField({ defaultValue = '', name = 'kinescopeId' }: Props) {
  const [id, setId] = useState(defaultValue)

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={id} />
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Video className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value.trim())}
          placeholder="Вставьте ID видео из личного кабинета Kinescope..."
          className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-honey-400"
        />
        {id && (
          <button
            type="button"
            onClick={() => setId('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      {id && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-mono truncate">kinescope.io/embed/{id}</span>
          <a
            href={`https://kinescope.io/embed/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1 text-honey-600 hover:text-honey-700"
          >
            <ExternalLink className="w-3 h-3" />
            Проверить
          </a>
        </div>
      )}
    </div>
  )
}

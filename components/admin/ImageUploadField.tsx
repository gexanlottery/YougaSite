'use client'

import { useState, useRef } from 'react'
import { ImageIcon, CheckCircle, AlertCircle, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
  defaultValue?: string
  name?: string
}

export function ImageUploadField({ defaultValue = '', name = 'coverImage' }: Props) {
  const [path, setPath] = useState(defaultValue)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setStatus('error')
      setErrorMsg('Только jpg, png, webp')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setStatus('error')
      setErrorMsg('Максимум 20 МБ')
      return
    }

    setStatus('uploading')
    setErrorMsg('')

    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', 'image')

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.coverImage) {
        setPath(data.coverImage)
        setStatus('done')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Ошибка загрузки')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Ошибка соединения')
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={path || '/images/video-placeholder.jpg'} />

      {path && (
        <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <Image src={path} alt="Обложка" fill className="object-cover" sizes="128px" />
          <button type="button" onClick={() => { setPath(''); setStatus('idle'); if (inputRef.current) inputRef.current.value = '' }}
            className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {status === 'uploading' && (
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-honey-400 border-t-transparent rounded-full animate-spin" />
          Загружается...
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />{errorMsg}
        </div>
      )}

      <label className="inline-flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-3 py-2 hover:border-honey-400 hover:bg-honey-50 transition-colors">
        <ImageIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          {path ? 'Заменить обложку' : 'Загрузить обложку'}
          <span className="text-gray-400 ml-1">(jpg, png, webp)</span>
        </span>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="sr-only" />
      </label>

      {!path && status === 'idle' && (
        <p className="text-xs text-gray-400">Если не загрузить, будет использован дефолтный плейсхолдер</p>
      )}
    </div>
  )
}

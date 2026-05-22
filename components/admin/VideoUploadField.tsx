'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react'

interface Props {
  defaultValue?: string
  name?: string
}

export function VideoUploadField({ defaultValue = '', name = 'videoPath' }: Props) {
  const [path, setPath] = useState(defaultValue)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const xhrRef = useRef<XMLHttpRequest | null>(null)

  function handleCancel() {
    xhrRef.current?.abort()
    setStatus('idle')
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mpeg']
    if (!allowedTypes.includes(file.type)) {
      setStatus('error')
      setErrorMsg('Недопустимый тип файла. Загрузите mp4, mov, avi или webm.')
      return
    }

    setFileName(file.name)
    setStatus('uploading')
    setProgress(0)
    setErrorMsg('')

    const formData = new FormData()
    formData.append('video', file)
    formData.append('type', 'video')

    const xhr = new XMLHttpRequest()
    xhrRef.current = xhr

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100))
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText)
          if (data.videoPath) {
            setPath(data.videoPath)
            setStatus('done')
          } else {
            setStatus('error')
            setErrorMsg(data.error || 'Ошибка загрузки')
          }
        } catch {
          setStatus('error')
          setErrorMsg('Ошибка ответа сервера')
        }
      } else {
        try {
          const data = JSON.parse(xhr.responseText)
          setStatus('error')
          setErrorMsg(data.error || `Ошибка ${xhr.status}`)
        } catch {
          setStatus('error')
          setErrorMsg(`Ошибка сервера: ${xhr.status}`)
        }
      }
    })

    xhr.addEventListener('error', () => {
      setStatus('error')
      setErrorMsg('Ошибка соединения')
    })

    xhr.addEventListener('abort', () => {
      setStatus('idle')
    })

    xhr.open('POST', '/api/admin/upload')
    xhr.send(formData)
  }

  return (
    <div className="space-y-2">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={path} />

      {status === 'idle' && (
        <div>
          {path && (
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="font-mono truncate">{path}</span>
              <button type="button" onClick={() => setPath('')} className="ml-auto text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-3 hover:border-honey-400 hover:bg-honey-50 transition-colors">
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {path ? 'Заменить видеофайл' : 'Загрузить видеофайл'}
              <span className="text-gray-400 ml-1">(mp4, mov, avi, webm — до 4 ГБ)</span>
            </span>
            <input ref={inputRef} type="file" accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/mpeg" onChange={handleFile} className="sr-only" />
          </label>
        </div>
      )}

      {status === 'uploading' && (
        <div className="border border-honey-200 rounded-lg px-4 py-3 bg-honey-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700 truncate max-w-[70%]">{fileName}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-honey-700">{progress}%</span>
              <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-1.5 bg-honey-200 rounded-full overflow-hidden">
            <div className="h-full bg-honey-500 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className="flex items-center gap-2 text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span className="font-mono text-emerald-800 truncate">{path}</span>
          <button type="button" onClick={() => { setStatus('idle'); if (inputRef.current) inputRef.current.value = '' }}
            className="ml-auto text-emerald-600 hover:text-emerald-800 text-xs whitespace-nowrap">
            Заменить
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded-lg px-4 py-3 hover:border-honey-400 hover:bg-honey-50 transition-colors">
            <Upload className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Попробовать снова</span>
            <input ref={inputRef} type="file" accept="video/mp4,video/quicktime,video/x-msvideo,video/webm,video/mpeg" onChange={handleFile} className="sr-only" />
          </label>
        </div>
      )}
    </div>
  )
}

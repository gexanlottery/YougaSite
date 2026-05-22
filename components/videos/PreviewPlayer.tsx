'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface PreviewPlayerProps {
  kinescopePreviewId: string
  isLoggedIn: boolean
}

export function PreviewPlayer({ kinescopePreviewId, isLoggedIn }: PreviewPlayerProps) {
  return (
    <div className="relative w-full h-full bg-black">
      <iframe
        src={`https://kinescope.io/embed/${kinescopePreviewId}`}
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="w-full h-full"
        title="Превью урока"
      />

      {/* Gradient overlay at bottom — video stays visible above */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3 pt-16 sm:p-5 sm:pt-24 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)',
        }}
      >
        <p className="text-white/90 text-xs mb-2 sm:mb-3 leading-snug">
          Это короткое превью урока. Для просмотра полной версии необходим доступ.
        </p>
        <div className="flex gap-2 flex-wrap pointer-events-auto">
          {isLoggedIn ? (
            <Link href="/cabinet#access">
              <Button size="sm">Получить доступ</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Войти
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Получить доступ</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

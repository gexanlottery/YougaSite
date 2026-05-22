'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

interface AccessGateProps {
  isLoggedIn: boolean
}

export function AccessGate({ isLoggedIn }: AccessGateProps) {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6 bg-black/60">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
          <Lock className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">Урок доступен по подписке</h3>
        <p className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-6 max-w-xs">
          Получите доступ ко всей библиотеке на 7, 30 или 90 дней
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          {isLoggedIn ? (
            <Link href="/cabinet#access" className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto">Получить доступ</Button>
            </Link>
          ) : (
            <>
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto">Зарегистрироваться</Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  Войти
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

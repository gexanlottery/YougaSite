'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Menu, X, User, Settings } from 'lucide-react'

interface HeaderProps {
  user?: { name?: string | null; role: string } | null
}

const navLinks = [
  { href: '/videos', label: 'Видеоуроки' },
  { href: '/events', label: 'Мероприятия' },
  { href: '/cabinet#plans', label: 'Получить доступ' },
  { href: '/faq', label: 'FAQ' },
]

export function Header({ user }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200">
      <nav className="container-yoga flex items-center justify-between h-14 sm:h-16 md:h-18 gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/uploads/3.JPG"
              alt="Кристина Андреева"
              width={32}
              height={32}
              className="object-cover"
              style={{ objectPosition: '50% 18%' }}
            />
          </div>
          <span className="font-display font-semibold text-ink text-base sm:text-lg truncate">
            <span className="hidden sm:inline">Кристина Андреева</span>
            <span className="sm:hidden">Кристина А.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-honey-600',
                  pathname.startsWith(link.href) ? 'text-honey-600' : 'text-ink-muted'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <Link href="/admin">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Админ
                  </Button>
                </Link>
              )}
              <Link href="/cabinet">
                <Button variant="secondary" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user.name?.split(' ')[0] ?? 'Кабинет'}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Войти</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Начать</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden -mr-2 p-3 text-ink-muted flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white px-4 py-4 space-y-1 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block py-3 px-3 rounded-lg text-base font-medium transition-colors',
                pathname.startsWith(link.href)
                  ? 'bg-honey-50 text-honey-700'
                  : 'text-ink hover:bg-sand-100'
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-sand-200 flex flex-col gap-2">
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Админ-панель
                    </Button>
                  </Link>
                )}
                <Link href="/cabinet" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Личный кабинет
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Войти</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">Начать</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

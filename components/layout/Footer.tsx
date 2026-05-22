import Link from 'next/link'
import { Send } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const legalLinks = [
  { href: '/legal/privacy', label: 'Политика конфиденциальности' },
  { href: '/legal/terms', label: 'Пользовательское соглашение' },
  { href: '/legal/offer', label: 'Оферта' },
  { href: '/legal/personal-data', label: 'Обработка персональных данных' },
]

const navLinks = [
  { href: '/videos', label: 'Видеоуроки' },
  { href: '/events', label: 'Мероприятия' },
  { href: '/faq', label: 'FAQ' },
  { href: '/cabinet', label: 'Личный кабинет' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-auto">
      <div className="container-yoga py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-honey-400 flex items-center justify-center text-white font-display font-bold text-sm">
                КА
              </div>
              <span className="font-display font-semibold text-white text-lg">
                Кристина Андреева
              </span>
            </div>
            <p className="text-sm text-white/60 mb-6 max-w-xs">
              Онлайн-уроки йоги и йога-туры. Безопасная практика для всех уровней.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/glazamikris"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-honey-500 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-honey-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm tracking-wide">Разделы</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm tracking-wide">Документы</h3>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Кристина Андреева. Все права защищены.</p>
          <p>ИП Андреева Кристина</p>
        </div>
      </div>
    </footer>
  )
}

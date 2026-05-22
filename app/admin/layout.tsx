import { requireAdmin } from '@/lib/auth'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Video, Calendar, HelpCircle, Users, ArrowLeft, MessageSquare, LayoutList, Settings, FileText } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
  { href: '/admin/videos', label: 'Видеоуроки', icon: Video },
  { href: '/admin/categories', label: 'Категории', icon: LayoutList },
  { href: '/admin/events', label: 'Мероприятия', icon: Calendar },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/admin/reviews', label: 'Отзывы', icon: MessageSquare },
  { href: '/admin/content', label: 'Контент', icon: FileText },
  { href: '/admin/users', label: 'Пользователи', icon: Users },
  { href: '/admin/settings', label: 'Настройки', icon: Settings },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-ink text-white flex flex-col flex-shrink-0 fixed top-0 bottom-0 left-0 z-40">
        <div className="p-4 border-b border-white/10">
          <div className="text-sm font-medium text-white/60 mb-1">Админ-панель</div>
          <div className="font-display text-lg font-semibold">Кристина Андреева</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            На сайт
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  )
}

import { Metadata } from 'next'
import { requireAuth } from '@/lib/auth'
import { getActiveAccess } from '@/lib/actions/access'
import { prisma } from '@/lib/prisma'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { AccessPlansSection } from '@/components/cabinet/AccessPlansSection'
import { Calendar, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = { title: 'Личный кабинет' }

export default async function CabinetPage() {
  const session = await requireAuth()
  const [user, access, orders, bookings] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.id }, select: { name: true, email: true } }),
    getActiveAccess(session.id),
    prisma.order.findMany({ where: { userId: session.id }, orderBy: { createdAt: 'desc' }, take: 5, include: { plan: true } }),
    prisma.booking.findMany({ where: { userId: session.id }, orderBy: { createdAt: 'desc' }, take: 5, include: { event: true } }),
  ])

  const hasAccess = access && new Date(access.endDate) > new Date()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-white border-b border-sand-200">
        <div className="container-yoga py-6 sm:py-8 flex flex-wrap items-start sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink truncate">
              Привет, {user?.name?.split(' ')[0] ?? 'Пользователь'}!
            </h1>
            <p className="text-ink-muted text-sm mt-1 truncate">{user?.email}</p>
          </div>
          <div className="flex-shrink-0">
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container-yoga py-6 sm:py-8 space-y-5 sm:space-y-6">
        {/* Access status */}
        <div id="access" className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 ${hasAccess ? 'bg-emerald-50 border border-emerald-200' : 'bg-honey-50 border border-honey-200'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="min-w-0">
              {hasAccess ? <Badge variant="green">Доступ активен</Badge> : <Badge variant="honey">Нет активного доступа</Badge>}
              {hasAccess && access ? (
                <div className="mt-2 space-y-1">
                  <p className="text-ink font-medium">{access.plan.name}</p>
                  <p className="text-sm text-ink-muted">Активен до: <span className="font-medium text-ink">{formatDate(access.endDate)}</span></p>
                </div>
              ) : (
                <p className="text-ink-muted text-sm sm:text-base mt-2">Оформите подписку, чтобы получить доступ ко всем урокам</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/videos"><Button variant={hasAccess ? 'primary' : 'secondary'} size="sm">К урокам</Button></Link>
              {!hasAccess && <a href="#plans"><Button size="sm">Получить доступ</Button></a>}
            </div>
          </div>
        </div>

        <div id="plans"><AccessPlansSection /></div>

        {orders.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6">
            <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-honey-500 flex-shrink-0" />История платежей
            </h2>
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-sand-100 last:border-0">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{order.plan?.name ?? 'Заказ'}</div>
                    <div className="text-xs text-ink-muted">{formatDate(order.createdAt)}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-medium">{formatPrice(order.amount)}</span>
                    <Badge variant={order.status === 'PAID' ? 'green' : order.status === 'PENDING' ? 'honey' : 'outline'}>
                      {order.status === 'PAID' ? 'Оплачен' : order.status === 'PENDING' ? 'Ожидает' : 'Ошибка'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6">
            <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-honey-500 flex-shrink-0" />Мои мероприятия
            </h2>
            <div className="space-y-3">
              {bookings.map(booking => (
                <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-sand-100 last:border-0">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{booking.event.title}</div>
                    <div className="text-xs text-ink-muted">{formatDate(booking.event.date)}</div>
                  </div>
                  <Badge variant={booking.status === 'CONFIRMED' ? 'green' : 'honey'}>
                    {booking.status === 'CONFIRMED' ? 'Подтверждено' : 'На рассмотрении'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

const defaultPlans = [
  { id: '7d', name: 'Неделя', days: 7, price: 990 },
  { id: '30d', name: 'Месяц', days: 30, price: 2490 },
  { id: '90d', name: '3 месяца', days: 90, price: 5990 },
]
const paymentMethods = [
  { id: 'sbp', label: 'СБП', logo: '🏦' },
  { id: 'sber', label: 'SberPay', logo: '💚' },
  { id: 'yandex', label: 'Яндекс Пэй', logo: '🟡' },
  { id: 'tbank', label: 'Т-Банк', logo: '💛' },
]

async function getPlans() {
  try {
    const plans = await prisma.accessPlan.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } })
    return plans.length > 0 ? plans : defaultPlans
  } catch { return defaultPlans }
}

export async function AccessPlansSection() {
  const plans = await getPlans()
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl font-semibold text-ink mb-1 sm:mb-2">Доступ к библиотеке</h2>
      <p className="text-ink-muted text-sm mb-5 sm:mb-6">Все уроки открываются сразу после оплаты</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(plans as any[]).map((plan, idx) => (
          <div key={plan.id} className={`rounded-xl sm:rounded-2xl border-2 p-4 text-center relative ${idx === 1 ? 'border-honey-400 bg-honey-50' : 'border-sand-200'}`}>
            {idx === 1 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-honey-500 text-white text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">
                Популярный
              </div>
            )}
            <div className="font-display text-lg font-semibold text-ink mb-1">{plan.name}</div>
            <div className="text-2xl font-bold text-honey-600 mb-1">
              {typeof plan.price === 'number' ? `${plan.price.toLocaleString('ru-RU')} ₽` : formatPrice(plan.price)}
            </div>
            <div className="text-sm text-ink-muted mb-4">{plan.days} дней доступа</div>
            <ul className="text-xs text-ink-muted space-y-1 mb-4 text-left">
              {['Все уроки библиотеки', 'Без ограничений просмотров', 'С любого устройства'].map(f => (
                <li key={f} className="flex items-start gap-1.5"><Check className="w-3 h-3 text-honey-500 flex-shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <Button size="sm" variant={idx === 1 ? 'primary' : 'secondary'} className="w-full">Оформить</Button>
          </div>
        ))}
      </div>
      <div className="border-t border-sand-200 pt-4">
        <p className="text-xs text-ink-muted mb-3 text-center">Способы оплаты</p>
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {paymentMethods.map(pm => (
            <div key={pm.id} className="flex items-center gap-1.5 bg-sand-50 border border-sand-200 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm">
              <span>{pm.logo}</span><span className="text-ink-muted">{pm.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-light text-center mt-3">
          Интеграция оплаты в разработке —{' '}
          <a href="https://t.me/glazamikris" className="text-honey-600 hover:underline">напишите в Telegram</a>
        </p>
      </div>
    </div>
  )
}

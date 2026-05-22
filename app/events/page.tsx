import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MapPin, Calendar } from 'lucide-react'
import { formatDate, formatPrice, levelLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Мероприятия — йога-туры и ретриты',
  description: 'Предстоящие йога-туры, ретриты и семинары с Кристиной Андреевой.',
  alternates: { canonical: '/events' },
}

async function getEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { date: 'asc' },
    })
  } catch {
    return []
  }
}

const placeholders = [
  {
    id: '1', slug: 'altai-tour', title: 'Йога-тур на Алтай', location: 'Горный Алтай',
    date: new Date('2025-07-10'), price: 45000,
    shortDesc: 'Семь дней практики среди гор. Утренние медитации, дневные асаны, горные маршруты и вечерние костры.',
    level: 'ALL',
  },
  {
    id: '2', slug: 'podmoskovye-retreat', title: 'Весенний ретрит в Подмосковье', location: 'Подмосковье',
    date: new Date('2025-05-17'), price: 18000,
    shortDesc: 'Погружённый уикенд с практиками, пранаямой и работой с осознанностью. Уютное место, небольшая группа.',
    level: 'BEGINNER',
  },
]

export default async function EventsPage() {
  const events = await getEvents()
  const items = events.length > 0 ? events : placeholders

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-white border-b border-sand-200">
        <div className="container-yoga py-6 sm:py-8 lg:py-10">
          <SectionHeader
            label="Мероприятия"
            title="Йога-туры и живые встречи"
            subtitle="Практика в красивых местах — живое общение, глубокое погружение и незабываемые впечатления"
            className="mb-0"
          />
        </div>
      </div>

      <div className="container-yoga py-6 sm:py-8 lg:py-10">
        {items.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-ink-muted">Мероприятия скоро появятся</p>
          </div>
        ) : (
          <div className="space-y-5 sm:space-y-6 lg:space-y-8">
            {items.map((event: any) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 md:flex">
                  <div className="relative h-48 sm:h-56 md:h-auto md:w-64 lg:w-72 md:min-h-[16rem] bg-sand-200 flex-shrink-0">
                    {(event as any).coverImage ? (
                      <Image
                        src={(event as any).coverImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 288px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sand-200 to-honey-100 flex items-center justify-center">
                        <span className="text-5xl">🏔</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="sand">{levelLabel(event.level)}</Badge>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-2 group-hover:text-honey-600 transition-colors break-words">
                        {event.title}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          {typeof event.date === 'string' ? event.date : formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {event.location}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-ink-muted leading-relaxed">{event.shortDesc}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
                      <div className="text-lg sm:text-xl font-semibold text-honey-600">
                        {typeof event.price === 'number' ? `от ${event.price.toLocaleString('ru-RU')} ₽` : formatPrice(event.price)}
                      </div>
                      <Button variant="secondary" size="sm">Подробнее →</Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { MapPin, Calendar } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import { prisma } from '@/lib/prisma'

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: 'PUBLISHED', date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 2,
    })
  } catch {
    return []
  }
}

export async function EventsPreviewSection() {
  const events = await getUpcomingEvents()

  return (
    <section className="section-padding bg-white">
      <div className="container-yoga">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Мероприятия"
            title="Йога-туры и живые встречи"
            subtitle="Практика в красивых местах, живое общение и глубокое погружение"
          />
          <Link href="/events" className="flex-shrink-0">
            <Button variant="outline">Все мероприятия</Button>
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map(event => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group">
                <div className="bg-sand-50 rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-56 bg-sand-200">
                    <Image
                      src={event.coverImage || '/images/event-placeholder.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-xl font-semibold text-ink group-hover:text-honey-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="text-honey-600 font-semibold text-lg flex-shrink-0">
                        {formatPrice(event.price)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-ink-muted mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-sm text-ink-muted line-clamp-2">{event.shortDesc}</p>
                    <div className="mt-4">
                      <Button variant="secondary" size="sm">Подробнее</Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Placeholder */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Йога-тур на Алтай',
                location: 'Горный Алтай',
                date: 'Июль 2025',
                price: 'от 45 000 ₽',
                desc: 'Семь дней практики на фоне величественных гор. Утренние медитации, дневные асаны, вечерние костры.',
              },
              {
                title: 'Весенний ретрит в Подмосковье',
                location: 'Подмосковье',
                date: 'Май 2025',
                price: 'от 18 000 ₽',
                desc: 'Погружённый уикенд с практиками, пранаямой и работой с осознанностью. Уютное место, небольшая группа.',
              },
            ].map(ev => (
              <div key={ev.title} className="bg-sand-50 rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="h-56 bg-gradient-to-br from-sand-200 to-honey-100 flex items-center justify-center relative">
                  <span className="text-5xl">🏔</span>
                  <div className="absolute bottom-4 left-4 text-ink">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{ev.date}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-xl font-semibold text-ink">{ev.title}</h3>
                    <div className="text-honey-600 font-semibold flex-shrink-0">{ev.price}</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-ink-muted mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{ev.location}</span>
                  </div>
                  <p className="text-sm text-ink-muted">{ev.desc}</p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm">Подробнее</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

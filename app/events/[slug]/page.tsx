import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate, formatPrice, levelLabel } from '@/lib/utils'
import { MapPin, Calendar, Check, X, Send } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug }, select: { title: true, seoDesc: true, shortDesc: true } }).catch(() => null)
  if (!event) return {}
  return {
    title: event.title,
    description: event.seoDesc ?? event.shortDesc,
    alternates: { canonical: `/events/${slug}` },
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug, status: 'PUBLISHED' } }).catch(() => null)
  if (!event) notFound()

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date.toISOString(),
    location: { '@type': 'Place', name: event.location },
    description: event.shortDesc,
    offers: { '@type': 'Offer', price: event.price.toString(), priceCurrency: 'RUB' },
    organizer: { '@type': 'Person', name: 'Кристина Андреева' },
  }

  const included = event.included?.split('\n').filter(Boolean) ?? []
  const notIncluded = event.notIncluded?.split('\n').filter(Boolean) ?? []
  const program = event.program?.split('\n').filter(Boolean) ?? []

  return (
    <div className="min-h-screen bg-sand-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />

      {/* Hero */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-sand-200 overflow-hidden">
        {event.coverImage ? (
          <Image src={event.coverImage} alt={event.title} fill className="object-cover" priority sizes="100vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sand-200 via-honey-100 to-sand-300 flex items-center justify-center">
            <span className="text-7xl sm:text-8xl">🏔</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 container-yoga text-white">
          <Badge variant="honey" className="mb-2 sm:mb-3">{levelLabel(event.level)}</Badge>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold break-words">{event.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 sm:mt-3 text-xs sm:text-sm text-white/85">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 flex-shrink-0" />{formatDate(event.date)}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 flex-shrink-0" />{event.location}</span>
          </div>
        </div>
      </div>

      <div className="container-yoga py-6 sm:py-8 lg:py-10">
        <nav className="text-sm text-ink-muted mb-6 sm:mb-8 flex items-center gap-2 min-w-0">
          <Link href="/events" className="hover:text-honey-600 transition-colors flex-shrink-0">Мероприятия</Link>
          <span className="flex-shrink-0">/</span>
          <span className="text-ink truncate">{event.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-5 sm:space-y-6 min-w-0">
            {/* Description */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-ink mb-3 sm:mb-4">Об мероприятии</h2>
              <div className="text-ink-muted leading-relaxed whitespace-pre-line break-words">{event.fullDesc}</div>
            </div>

            {/* Program */}
            {program.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-ink mb-3 sm:mb-4">Программа</h2>
                <ul className="space-y-3">
                  {program.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                      <span className="text-ink-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included / Not included */}
            {(included.length > 0 || notIncluded.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {included.length > 0 && (
                  <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-5">
                    <h3 className="font-semibold text-ink mb-3 flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" />Включено</h3>
                    <ul className="space-y-2">
                      {included.map((item, i) => (
                        <li key={i} className="text-sm text-ink-muted flex items-start gap-2">
                          <Check className="w-3 h-3 text-emerald-500 mt-1 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {notIncluded.length > 0 && (
                  <div className="bg-sand-50 rounded-xl sm:rounded-2xl p-5">
                    <h3 className="font-semibold text-ink mb-3 flex items-center gap-2"><X className="w-4 h-4 text-ink-muted" />Не включено</h3>
                    <ul className="space-y-2">
                      {notIncluded.map((item, i) => (
                        <li key={i} className="text-sm text-ink-muted flex items-start gap-2">
                          <X className="w-3 h-3 text-ink-light mt-1 flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 shadow-soft lg:sticky lg:top-24">
              <div className="text-2xl font-display font-bold text-honey-600 mb-1">{formatPrice(event.price)}</div>
              <p className="text-xs text-ink-muted mb-5">Стоимость участия</p>

              <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mb-3">
                  <Send className="w-4 h-4 mr-2" />
                  Забронировать место
                </Button>
              </a>
              <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full">
                  Задать вопрос
                </Button>
              </a>

              <div className="mt-5 pt-5 border-t border-sand-200 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Дата</span>
                  <span className="font-medium text-ink">{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Место</span>
                  <span className="font-medium text-ink">{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Уровень</span>
                  <span className="font-medium text-ink">{levelLabel(event.level)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

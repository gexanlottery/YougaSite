import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-sand-50">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sand-100 rounded-bl-[80px] hidden lg:block" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-honey-100 opacity-40 blur-3xl hidden lg:block" />

      <div className="container-yoga relative z-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div className="order-2 lg:order-1">
          <p className="text-sm font-medium tracking-widest text-honey-600 uppercase mb-4">
            Онлайн-практика
          </p>
          <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold text-ink leading-tight text-balance mb-6">
            Йога с<br />
            <span className="text-honey-600">Кристиной</span><br />
            Андреевой
          </h1>
          <p className="text-xl text-ink-muted mb-8 max-w-md text-pretty">
            Онлайн-уроки йоги и йога-туры. Безопасная практика для всех уровней — с вниманием к каждому.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/videos">
              <Button size="lg">
                Смотреть видеоуроки
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" size="lg">
                Мероприятия
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            {[
              { num: '12', label: 'лет практики' },
              { num: '7', label: 'лет преподавания' },
              { num: '100+', label: 'учеников' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-ink">{stat.num}</div>
                <div className="text-sm text-ink-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-72 h-96 md:w-96 md:h-[520px] rounded-3xl overflow-hidden bg-sand-200 shadow-card">
              <Image
                src="/uploads/1.jpg"
                alt="Кристина Андреева — преподаватель йоги"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-honey-100 flex items-center justify-center text-honey-600 text-lg">
                🧘
              </div>
              <div>
                <div className="text-xs text-ink-muted">Метод</div>
                <div className="text-sm font-medium text-ink">Культура Движения</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-light animate-bounce">
        <span className="text-xs">прокрутите вниз</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}

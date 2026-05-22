import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

// ─── data ────────────────────────────────────────────────────────────────────
async function getReviews() {
  try {
    return await prisma.review.findMany({ where: { isPublished: true }, take: 3, orderBy: { sortOrder: 'asc' } })
  } catch { return [] }
}

const placeholderReviews = [
  { id: '1', name: 'Анна С.', role: 'Ученица 2 года', text: 'Занимаюсь с Кристиной два года. Изменилось не только тело — появилось другое ощущение себя.' },
  { id: '2', name: 'Марина К.', role: 'Йога-тур на Алтай', text: 'Поехала с нулевым опытом. Кристина так деликатно выстраивает занятия — к концу недели я делала асаны, которые казались невозможными.' },
  { id: '3', name: 'Елена В.', role: 'Онлайн-уроки', text: 'Подписалась три месяца назад. Теперь это моя утренняя традиция. Уроки построены очень грамотно.' },
]

// ─── V1: Minimalist · Premium · Quiet ────────────────────────────────────────
export default async function HomeV1() {
  const dbReviews = await getReviews()
  const reviews = dbReviews.length > 0 ? dbReviews : placeholderReviews

  return (
    <main style={{ fontFamily: 'Evolventa, system-ui, sans-serif' }}>

      {/* ── HERO ── full-height split, photo left */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        className="overflow-hidden bg-white max-lg:grid-cols-1">

        {/* Photo column */}
        <div className="relative bg-sand-100 max-lg:h-[55vw]" style={{ minHeight: '100vh' }}>
          <Image
            src="/uploads/1.jpg"
            alt="Кристина Андреева"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
          {/* subtle honey veil at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(246,195,66,0.10), transparent)' }} />
        </div>

        {/* Text column */}
        <div className="flex flex-col justify-between px-12 py-16 md:px-20 md:py-24 max-lg:px-8 max-lg:py-12">
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#e8a820', textTransform: 'uppercase' }}
              className="mb-16">
              Йога · Движение · Осознанность
            </p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', lineHeight: 1.1, color: '#1a1714', fontWeight: 400, letterSpacing: '-0.02em' }}
              className="mb-8">
              Кристина<br />Андреева
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#6b6560', lineHeight: 1.75, maxWidth: '28rem' }}
              className="mb-12">
              Онлайн-практика йоги. Деликатно, безопасно, с вниманием к каждому — независимо от уровня подготовки.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/videos" style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                background: '#1a1714',
                color: '#fff',
                borderRadius: '100px',
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
                textDecoration: 'none',
              }}>
                Видеоуроки
              </Link>
              <Link href="/events" style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                border: '1px solid #e3d0b5',
                color: '#1a1714',
                borderRadius: '100px',
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
                textDecoration: 'none',
              }}>
                Мероприятия
              </Link>
            </div>
          </div>

          {/* Stats — minimal */}
          <div style={{ display: 'flex', gap: '3rem', paddingTop: '4rem', borderTop: '1px solid #f0e6d0', marginTop: '4rem' }}>
            {[['12', 'лет практики'], ['7', 'лет преподавания'], ['100+', 'учеников']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.75rem', fontWeight: 400, color: '#1a1714', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.75rem', color: '#9b9490', marginTop: '0.3rem', letterSpacing: '0.05em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── wide text, generous whitespace */}
      <section style={{ padding: '8rem 0', background: '#fdfaf5' }}>
        <div className="container-yoga">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start' }}
            className="max-lg:grid-cols-1 max-lg:gap-10">
            <div>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#e8a820', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Обо мне
              </p>
              <div style={{ width: '2rem', height: '1px', background: '#e3d0b5' }} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#1a1714', lineHeight: 1.25, marginBottom: '2rem', letterSpacing: '-0.01em' }}>
                Практика, которая меняет — изнутри
              </h2>
              <div style={{ color: '#6b6560', lineHeight: 1.85, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p>Я Кристина Андреева — преподаватель йоги с 12-летним опытом практики и 7 годами преподавания. В основе моей работы лежит <strong style={{ color: '#1a1714', fontWeight: 700 }}>метод Культура Движения</strong> — осознанное движение и внимательное отношение к телу.</p>
                <p>Провожу групповые занятия, семинары и <strong style={{ color: '#1a1714', fontWeight: 700 }}>йога-туры по красивым местам России</strong>. В онлайн-библиотеке собраны уроки для самостоятельной практики — в своём ритме.</p>
              </div>
              <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Хатха', 'Виньяса', 'Инь-йога', 'Аштанга', 'Семинары', 'Йога-туры'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.75rem', padding: '0.35rem 0.9rem',
                    border: '1px solid #e3d0b5', borderRadius: '100px',
                    color: '#6b6560', letterSpacing: '0.03em'
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── quiet cards on white */}
      <section style={{ padding: '8rem 0', background: '#fff' }}>
        <div className="container-yoga">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#e8a820', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center' }}>
            Отзывы
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}
            className="max-lg:grid-cols-1 max-md:grid-cols-1">
            {reviews.map(r => (
              <div key={r.id} style={{ padding: '2.5rem', borderTop: '1px solid #f0e6d0' }}>
                <p style={{ color: '#6b6560', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem' }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ fontSize: '0.8rem', color: '#1a1714', fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#9b9490', marginTop: '0.2rem' }}>{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '8rem 0', background: '#fdfaf5', textAlign: 'center' }}>
        <div className="container-yoga" style={{ maxWidth: '36rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#1a1714', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Начните практику сегодня
          </h2>
          <p style={{ color: '#6b6560', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Пишите в Telegram — расскажите о своих целях, и я помогу выбрать подходящий формат.
          </p>
          <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '1rem 2.5rem',
              background: '#e8a820', color: '#fff',
              borderRadius: '100px', textDecoration: 'none',
              fontSize: '0.9rem', letterSpacing: '0.03em'
            }}>
            Написать в Telegram
          </a>
        </div>
      </section>

      {/* variant switcher */}
      <div style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 50
      }}>
        {[['/', 'Текущий'], ['/v1', 'V1'], ['/v2', 'V2'], ['/v3', 'V3']].map(([href, label]) => (
          <Link key={href} href={href} style={{
            display: 'block', padding: '0.4rem 0.9rem',
            background: href === '/v1' ? '#1a1714' : 'rgba(255,255,255,0.9)',
            color: href === '/v1' ? '#fff' : '#1a1714',
            borderRadius: '100px', fontSize: '0.75rem',
            border: '1px solid #e3d0b5', textDecoration: 'none',
            textAlign: 'center', backdropFilter: 'blur(8px)'
          }}>{label}</Link>
        ))}
      </div>
    </main>
  )
}

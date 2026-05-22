import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getReviews() {
  try {
    return await prisma.review.findMany({ where: { isPublished: true }, take: 3, orderBy: { sortOrder: 'asc' } })
  } catch { return [] }
}

const placeholderReviews = [
  { id: '1', name: 'Анна С.', role: 'Ученица 2 года', text: 'Занимаюсь с Кристиной два года. Изменилось не только тело — появилось другое ощущение себя.' },
  { id: '2', name: 'Марина К.', role: 'Йога-тур на Алтай', text: 'Поехала с нулевым опытом. К концу недели делала асаны, которые казались невозможными. Огромная благодарность.' },
  { id: '3', name: 'Елена В.', role: 'Онлайн-уроки', text: 'Уроки построены очень грамотно — чувствуется глубокое понимание тела и движения.' },
]

const stats = [
  { n: '12', label: 'лет\nпрактики' },
  { n: '7', label: 'лет\nпреподавания' },
  { n: '100+', label: 'учеников\nпо всей России' },
]

// ─── V3: Bold · Editorial · Contemporary ─────────────────────────────────────
export default async function HomeV3() {
  const dbReviews = await getReviews()
  const reviews = dbReviews.length > 0 ? dbReviews : placeholderReviews

  return (
    <main style={{ fontFamily: 'Evolventa, system-ui, sans-serif', background: '#0f0e0d', color: '#fff' }}>

      {/* ── HERO ── editorial full-bleed */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {/* full bg photo */}
        <Image src="/uploads/1.jpg" alt="Кристина Андреева" fill
          className="object-cover object-center" priority sizes="100vw"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(15,14,13,0.2) 0%, rgba(15,14,13,0.0) 35%, rgba(15,14,13,0.85) 75%, rgba(15,14,13,1) 100%)'
        }} />
        {/* honey accent bar top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #e8a820, #d97706)' }} />

        {/* content at bottom */}
        <div className="container-yoga" style={{ position: 'relative', zIndex: 1, paddingBottom: '5rem', paddingTop: '10rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'flex-end' }}
            className="max-md:grid-cols-1">
            <div>
              {/* overline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '2rem', height: '1px', background: '#e8a820' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#e8a820', textTransform: 'uppercase' }}>
                  Онлайн-практика
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                marginBottom: '0',
              }}>
                <span style={{ display: 'block', color: '#fff' }}>Йога</span>
                <span style={{ display: 'block', color: '#e8a820', fontWeight: 400, fontStyle: 'italic' }}>с Кристиной</span>
                <span style={{ display: 'block', color: '#fff' }}>Андреевой</span>
              </h1>
            </div>

            {/* stats vertical */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '0.5rem' }}>
              {stats.map(s => (
                <div key={s.n} style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#e8a820', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', whiteSpace: 'pre-line', lineHeight: 1.4, marginTop: '0.2rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div style={{
            marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '26rem' }}>
              Безопасная практика для всех уровней. Онлайн-уроки и йога-туры по России.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/videos" style={{
                display: 'inline-block', padding: '0.875rem 2rem',
                background: '#e8a820', color: '#0f0e0d',
                borderRadius: '100px', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.02em'
              }}>
                Видеоуроки →
              </Link>
              <Link href="/events" style={{
                display: 'inline-block', padding: '0.875rem 2rem',
                border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
                borderRadius: '100px', textDecoration: 'none',
                fontSize: '0.875rem'
              }}>
                Мероприятия
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── editorial asymmetric */}
      <section style={{ background: '#0f0e0d', padding: '8rem 0' }}>
        <div className="container-yoga">
          {/* big number label */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '5rem' }}>
            <span style={{ fontSize: '5rem', fontWeight: 700, color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>01</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#e8a820', textTransform: 'uppercase' }}>Обо мне</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
            className="max-lg:grid-cols-1 max-lg:gap-10">
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700,
                lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '2rem',
                color: '#fff'
              }}>
                12 лет в<br />
                <em style={{ color: '#e8a820', fontStyle: 'italic', fontWeight: 400 }}>движении</em><br />
                и практике
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: '1rem' }}>
                <p>Я Кристина Андреева. В основе моей работы — <strong style={{ color: '#e8a820' }}>метод Культура Движения</strong>: осознанное движение, работа с дыханием и внимание к телу.</p>
                <p>Провожу онлайн-уроки, семинары и йога-туры по красивым местам России.</p>
              </div>
              <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block', marginTop: '2.5rem',
                  padding: '0.875rem 2rem', background: 'transparent',
                  color: '#e8a820', borderRadius: '100px', textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.03em',
                  border: '1px solid #e8a820'
                }}>
                @glazamikris в Telegram
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden',
                position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
              }}>
                <Image src="/uploads/2.jpg" alt="Кристина" fill className="object-cover" sizes="50vw" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(15,14,13,0.6))'
                }} />
              </div>
              {/* honey line accent */}
              <div style={{
                position: 'absolute', top: '2rem', right: '-1.5rem',
                width: '3px', height: '40%',
                background: 'linear-gradient(to bottom, #e8a820, transparent)'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── editorial dark */}
      <section style={{ padding: '8rem 0', background: '#141210' }}>
        <div className="container-yoga">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '4rem' }}>
            <span style={{ fontSize: '5rem', fontWeight: 700, color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>02</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#e8a820', textTransform: 'uppercase' }}>Отзывы</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}
            className="max-lg:grid-cols-1">
            {reviews.map((r, i) => (
              <div key={r.id} style={{
                background: '#141210', padding: '2.5rem',
                borderLeft: i > 0 ? 'none' : undefined
              }}>
                <div style={{ fontSize: '3rem', color: '#e8a820', lineHeight: 1, marginBottom: '1.5rem', fontWeight: 400, opacity: 0.6 }}>"</div>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2rem' }}>
                  {r.text}
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>{r.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#e8a820', marginTop: '0.2rem', opacity: 0.8 }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── bold full-width honey */}
      <section style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, #e8a820 0%, #d97706 100%)',
          padding: '7rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* big background text */}
          <div style={{
            position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
            fontSize: '18rem', fontWeight: 700, color: 'rgba(255,255,255,0.08)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            letterSpacing: '-0.05em'
          }}>
            yoga
          </div>
          <div className="container-yoga" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '36rem' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Контакты
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: '#0f0e0d', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Начнём вместе?
              </h2>
              <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                Напишите мне — расскажите о целях, и я помогу выбрать подходящий формат.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', padding: '1rem 2.25rem',
                    background: '#0f0e0d', color: '#e8a820',
                    borderRadius: '100px', textDecoration: 'none',
                    fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.02em'
                  }}>
                  Telegram @glazamikris
                </a>
                <Link href="/videos" style={{
                  display: 'inline-block', padding: '1rem 2.25rem',
                  background: 'rgba(0,0,0,0.1)', color: '#0f0e0d',
                  borderRadius: '100px', textDecoration: 'none',
                  fontSize: '0.95rem', border: '1px solid rgba(0,0,0,0.2)'
                }}>
                  Видеоуроки
                </Link>
              </div>
            </div>
          </div>
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
            background: href === '/v3' ? '#e8a820' : 'rgba(15,14,13,0.85)',
            color: href === '/v3' ? '#0f0e0d' : '#fff',
            borderRadius: '100px', fontSize: '0.75rem',
            border: '1px solid rgba(232,168,32,0.3)', textDecoration: 'none',
            textAlign: 'center', backdropFilter: 'blur(8px)'
          }}>{label}</Link>
        ))}
      </div>
    </main>
  )
}

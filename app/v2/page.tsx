import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

async function getReviews() {
  try {
    return await prisma.review.findMany({ where: { isPublished: true }, take: 3, orderBy: { sortOrder: 'asc' } })
  } catch { return [] }
}

const placeholderReviews = [
  { id: '1', name: 'Анна С.', city: 'Москва', role: 'Ученица 2 года', text: 'Занимаюсь с Кристиной уже два года. За это время изменилось не только тело — появилось совсем другое ощущение себя.' },
  { id: '2', name: 'Марина К.', city: 'СПб', role: 'Йога-тур на Алтай', text: 'Поехала с нулевым опытом. Кристина так деликатно выстраивает занятия — к концу недели я делала асаны, которые казались невозможными.' },
  { id: '3', name: 'Елена В.', city: 'Екатеринбург', role: 'Онлайн-уроки', text: 'Теперь это моя утренняя традиция. Уроки построены очень грамотно — чувствуется глубокое понимание тела.' },
]

// ─── V2: Warm · Human · Emotional ────────────────────────────────────────────
export default async function HomeV2() {
  const dbReviews = await getReviews()
  const reviews = dbReviews.length > 0 ? dbReviews : placeholderReviews

  return (
    <main style={{ fontFamily: 'Evolventa, system-ui, sans-serif', background: '#fdfaf5' }}>

      {/* ── HERO ── warm full-width, centered personal */}
      <section style={{
        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fdfaf5 100%)',
        padding: '5rem 0 0',
        overflow: 'hidden',
      }}>
        <div className="container-yoga" style={{ textAlign: 'center', paddingBottom: '0' }}>
          {/* personal greeting */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: '#fff', borderRadius: '100px',
            padding: '0.5rem 1.25rem', marginBottom: '2.5rem',
            border: '1px solid #fde68a',
            boxShadow: '0 2px 12px rgba(232,168,32,0.12)'
          }}>
            <span style={{ fontSize: '1rem' }}>👋</span>
            <span style={{ fontSize: '0.85rem', color: '#b45309' }}>Привет! Я Кристина</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#1a1714',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Йога, которая
            <span style={{ display: 'block', color: '#d97706' }}>меняет изнутри</span>
          </h1>

          <p style={{
            fontSize: '1.2rem', color: '#6b6560',
            lineHeight: 1.7, maxWidth: '36rem', margin: '0 auto 2.5rem',
          }}>
            Онлайн-уроки и йога-туры с живым подходом, вниманием к каждому и настоящей заботой о вашем теле.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link href="/videos" style={{
              display: 'inline-block', padding: '1rem 2.25rem',
              background: '#d97706', color: '#fff',
              borderRadius: '1rem', textDecoration: 'none',
              fontSize: '1rem', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(217,119,6,0.3)'
            }}>
              Начать практику
            </Link>
            <Link href="/events" style={{
              display: 'inline-block', padding: '1rem 2.25rem',
              background: '#fff', color: '#1a1714',
              borderRadius: '1rem', textDecoration: 'none',
              fontSize: '1rem', border: '1px solid #fde68a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              Мероприятия
            </Link>
          </div>

          {/* Hero photo — warm frame */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 'min(420px, 90vw)', height: 'min(540px, 115vw)',
              borderRadius: '2rem 2rem 0 0', overflow: 'hidden',
              boxShadow: '0 -8px 60px rgba(232,168,32,0.18)',
              position: 'relative', margin: '0 auto'
            }}>
              <Image src="/uploads/1.jpg" alt="Кристина Андреева" fill
                className="object-cover object-top" priority sizes="420px" />
            </div>
            {/* floating warm badge */}
            <div style={{
              position: 'absolute', bottom: '3rem', right: '-1rem',
              background: '#fff', borderRadius: '1rem',
              padding: '0.75rem 1.25rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              border: '1px solid #fef3c7'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#9b9490' }}>Метод</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1714' }}>Культура Движения</div>
            </div>
            <div style={{
              position: 'absolute', top: '3rem', left: '-1rem',
              background: '#fef3c7', borderRadius: '1rem',
              padding: '0.75rem 1.25rem',
              boxShadow: '0 4px 16px rgba(232,168,32,0.2)',
            }}>
              <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>🧘</div>
              <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '0.25rem', fontWeight: 700 }}>12 лет практики</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── warm personal tone */}
      <section style={{ padding: '7rem 0', background: '#fff' }}>
        <div className="container-yoga">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}
            className="max-lg:grid-cols-1 max-lg:gap-10">
            {/* photo */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 8px 40px rgba(232,168,32,0.15)', aspectRatio: '4/5', position: 'relative' }}>
                <Image src="/uploads/2.jpg" alt="Кристина" fill className="object-cover" sizes="50vw" />
              </div>
              <div style={{
                position: 'absolute', top: '-1.5rem', right: '-1.5rem',
                width: '5rem', height: '5rem', borderRadius: '50%',
                background: '#fef3c7', zIndex: -1
              }} />
            </div>
            {/* text */}
            <div>
              <div style={{
                display: 'inline-block', background: '#fef3c7',
                borderRadius: '0.5rem', padding: '0.3rem 0.8rem',
                fontSize: '0.8rem', color: '#b45309', marginBottom: '1.5rem', fontWeight: 700
              }}>
                Немного о себе
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700,
                color: '#1a1714', lineHeight: 1.2, marginBottom: '1.5rem'
              }}>
                Привет! Я рада, что вы здесь
              </h2>
              <div style={{ color: '#6b6560', lineHeight: 1.8, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>Меня зовут Кристина Андреева. Йога изменила мою жизнь — и я занимаюсь ею уже <strong style={{ color: '#1a1714' }}>12 лет</strong>, а преподаю <strong style={{ color: '#1a1714' }}>7 лет</strong>.</p>
                <p>Мой подход — это <strong style={{ color: '#d97706' }}>метод Культура Движения</strong>: осознанное движение, работа с дыханием, внимание к себе. Без жёстких требований — только настоящая забота о вашем теле.</p>
                <p>Я провожу онлайн-уроки, семинары и йога-туры по России. Каждое занятие я строю так, чтобы оно было безопасным и подходило именно вам.</p>
              </div>
              <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginTop: '2rem', padding: '0.875rem 1.75rem',
                  background: '#229ED9', color: '#fff',
                  borderRadius: '100px', textDecoration: 'none',
                  fontSize: '0.95rem', fontWeight: 700
                }}>
                ✈ Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── warm feature blocks */}
      <section style={{ padding: '6rem 0', background: '#fffbeb' }}>
        <div className="container-yoga">
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1a1714', textAlign: 'center', marginBottom: '3.5rem' }}>
            Почему практика работает
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}
            className="max-lg:grid-cols-1">
            {[
              { icon: '🌱', title: 'Безопасность', text: 'Я строю каждое занятие на принципе «не навреди». Никакого форсирования — только то, что ваше тело готово принять.' },
              { icon: '💛', title: 'Внимание к вам', text: 'Не шаблонные занятия, а реальная работа с вашим уровнем и запросом. Я всегда на связи.' },
              { icon: '🏔', title: 'Живые впечатления', text: 'Йога-туры по красивым местам России — это не просто практика, это опыт, который остаётся с вами.' },
            ].map(item => (
              <div key={item.title} style={{
                background: '#fff', borderRadius: '1.5rem', padding: '2rem',
                boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                border: '1px solid #fef3c7'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1714', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: '#6b6560', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── warm testimonials */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container-yoga">
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1a1714', textAlign: 'center', marginBottom: '3rem' }}>
            Что говорят ученики
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}
            className="max-lg:grid-cols-1">
            {reviews.map(r => (
              <div key={r.id} style={{
                background: '#fffbeb', borderRadius: '1.5rem', padding: '2rem',
                border: '1px solid #fef3c7'
              }}>
                <div style={{ fontSize: '2rem', color: '#fcd34d', lineHeight: 1, marginBottom: '1rem' }}>"</div>
                <p style={{ color: '#6b6560', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{r.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: '#fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', fontWeight: 700, color: '#b45309', flexShrink: 0
                  }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1714' }}>{r.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9b9490' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── warm */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #d97706 0%, #e8a820 100%)',
        textAlign: 'center'
      }}>
        <div className="container-yoga" style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>
            Готовы начать?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.05rem' }}>
            Напишите мне — расскажите о своих целях, и я помогу подобрать то, что вам подойдёт.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://t.me/glazamikris" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', padding: '1rem 2.25rem',
                background: '#fff', color: '#d97706',
                borderRadius: '1rem', textDecoration: 'none',
                fontSize: '1rem', fontWeight: 700
              }}>
              Telegram @glazamikris
            </a>
            <Link href="/videos" style={{
              display: 'inline-block', padding: '1rem 2.25rem',
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              borderRadius: '1rem', textDecoration: 'none',
              fontSize: '1rem', border: '1px solid rgba(255,255,255,0.4)'
            }}>
              Смотреть видеоуроки
            </Link>
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
            background: href === '/v2' ? '#d97706' : 'rgba(255,255,255,0.9)',
            color: href === '/v2' ? '#fff' : '#1a1714',
            borderRadius: '100px', fontSize: '0.75rem',
            border: '1px solid #fde68a', textDecoration: 'none',
            textAlign: 'center', backdropFilter: 'blur(8px)'
          }}>{label}</Link>
        ))}
      </div>
    </main>
  )
}

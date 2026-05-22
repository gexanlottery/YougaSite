import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { PersonJsonLd, WebSiteJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Йога с Кристиной Андреевой — онлайн-уроки и йога-туры',
  description:
    'Онлайн-уроки йоги и йога-туры с Кристиной Андреевой. 12 лет практики, 7 лет преподавания. Безопасная практика для всех уровней подготовки.',
  alternates: { canonical: '/' },
}

// ─── data ────────────────────────────────────────────────────────────────────
async function getReviews() {
  try {
    return await prisma.review.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { sortOrder: 'asc' },
    })
  } catch {
    return []
  }
}

const CONTENT_DEFAULTS: Record<string, string> = {
  hero_badge: 'Йога · Движение · Осознанность',
  hero_subtitle: 'Онлайн-практика йоги. Деликатно, безопасно, с вниманием к каждому — независимо от уровня подготовки.',
  hero_photo: '/uploads/1.jpg',
  about_title: 'Практика, которая меняет — изнутри',
  about_p1: 'Андреева Кристина — занимаюсь йогой 12 лет, последние 7 преподаю, провожу семинары и устраиваю с любовью и задором йога-туры! Считаю, что йога — это инструмент для познания себя, благодаря которому наша жизнь становится более лёгкой, радостной, многогранной.',
  about_p2: 'Моё знакомство с йогой началось через такие направления как универсальная йога и Аштанга Виньяса. Прошла множество курсов и обучений, и только позже познакомилась с методом Культуры Движения Игоря Пантюшева. Прошла курсы повышения квалификации для преподавателей в 2022 году, которые вдохновили меня настолько, что в 2025 году я защитила диплом в Институте Современной Теории и Практики Йоги Игоря Пантюшева и Ксении Шатской.',
  about_p3: 'Уже с 2024 года веду занятия и сама занимаюсь по этому методу — и вижу потрясающие результаты у себя и своих учеников.',
  about_quote_p1: 'Культура движения — уникальный проект, который с одной стороны опирается на традицию, а с другой — оперирует самыми современными представлениями науки о движении и физической активности.',
  about_quote_p2: 'Здесь используется функциональный подход — тот самый элемент, взрывающий мозг при первом знакомстве. Являющийся основой трансформации, потому что позволяет найти границы своих возможностей. Подход, предоставляющий каждому эффективные и безопасные инструменты для роста.',
}

async function getSiteContent() {
  try {
    const rows = await prisma.siteContent.findMany()
    const content: Record<string, string> = { ...CONTENT_DEFAULTS }
    for (const row of rows) {
      content[row.key] = row.value
    }
    return content
  } catch {
    return { ...CONTENT_DEFAULTS }
  }
}

const placeholderReviews = [
  {
    id: '1',
    name: 'Анна С.',
    role: 'Ученица 2 года',
    text: 'Занимаюсь с Кристиной два года. Изменилось не только тело — появилось другое ощущение себя.',
  },
  {
    id: '2',
    name: 'Марина К.',
    role: 'Йога-тур на Алтай',
    text: 'Поехала с нулевым опытом. Кристина так деликатно выстраивает занятия — к концу недели я делала асаны, которые казались невозможными.',
  },
  {
    id: '3',
    name: 'Елена В.',
    role: 'Онлайн-уроки',
    text: 'Подписалась три месяца назад. Теперь это моя утренняя традиция. Уроки построены очень грамотно.',
  },
]

// ─── V1 — главная страница ────────────────────────────────────────────────────
export default async function HomePage() {
  const [dbReviews, content] = await Promise.all([getReviews(), getSiteContent()])
  const reviews = dbReviews.length > 0 ? dbReviews : placeholderReviews

  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
      <main style={{ fontFamily: 'Evolventa, system-ui, sans-serif' }}>

        {/* ── HERO ── full-height split, photo left */}
        <section className="overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
          {/* Photo column */}
          <div
            className="relative h-[70vw] min-h-[320px] max-h-[560px] lg:h-auto lg:max-h-none lg:min-h-screen"
            style={{ background: '#f9f3e8' }}
          >
            <Image
              src={content.hero_photo}
              alt="Кристина Андреева"
              fill
              className="object-cover object-top lg:object-contain"
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* subtle honey veil at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{ background: 'linear-gradient(to top, rgba(246,195,66,0.10), transparent)' }}
            />
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-between px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24">
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  color: '#e8a820',
                  textTransform: 'uppercase',
                }}
                className="mb-8 sm:mb-12 lg:mb-16"
              >
                {content.hero_badge}
              </p>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 9vw, 4rem)',
                  lineHeight: 1.1,
                  color: '#1a1714',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}
                className="mb-6 sm:mb-8"
              >
                Кристина<br />Андреева
              </h1>
              <p
                style={{
                  color: '#6b6560',
                  lineHeight: 1.75,
                  maxWidth: '28rem',
                }}
                className="text-base sm:text-lg mb-8 sm:mb-12"
              >
                {content.hero_subtitle}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm tracking-wide rounded-full bg-ink text-white no-underline"
                >
                  Видеоуроки
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm tracking-wide rounded-full border border-sand-300 text-ink no-underline"
                >
                  Мероприятия
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 lg:gap-x-12 pt-8 mt-10 sm:pt-10 sm:mt-12 lg:pt-16 lg:mt-16"
              style={{ borderTop: '1px solid #f0e6d0' }}
            >
              {[
                ['12', 'лет практики'],
                ['7', 'лет преподавания'],
                ['100+', 'учеников'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontWeight: 400, color: '#1a1714', lineHeight: 1 }} className="text-2xl sm:text-3xl">{n}</div>
                  <div style={{ color: '#9b9490', letterSpacing: '0.05em' }} className="text-xs mt-1.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section-y" style={{ background: '#fdfaf5' }}>
          <div className="container-yoga">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 sm:gap-10 lg:gap-24 items-start">
              {/* Left label */}
              <div>
                <p
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: '#e8a820',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Обо мне
                </p>
                <div style={{ width: '2rem', height: '1px', background: '#e3d0b5' }} />
              </div>

              {/* Right text */}
              <div>
                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 5.5vw, 2.5rem)',
                    fontWeight: 400,
                    color: '#1a1714',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                  className="mb-6 sm:mb-8"
                >
                  {content.about_title}
                </h2>

                <div
                  style={{
                    color: '#6b6560',
                    lineHeight: 1.85,
                  }}
                  className="flex flex-col gap-4 sm:gap-5 text-base sm:text-[1.05rem]"
                >
                  <p>{content.about_p1}</p>
                  <p>{content.about_p2}</p>
                  <p>{content.about_p3}</p>

                  {/* Культура движения — визуальный акцент */}
                  <div
                    style={{
                      borderLeft: '2px solid #e8a820',
                    }}
                    className="pl-4 sm:pl-5 flex flex-col gap-3"
                  >
                    <p>{content.about_quote_p1}</p>
                    <p>{content.about_quote_p2}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-2">
                  {['Универсальная йога', 'Аштанга Виньяса', 'Инь-йога', 'Семинары', 'Йога-туры', 'Культура Движения'].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.35rem 0.9rem',
                          border: '1px solid #e3d0b5',
                          borderRadius: '100px',
                          color: '#6b6560',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="section-y" style={{ background: '#fff' }}>
          <div className="container-yoga">
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: '#e8a820',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
              className="mb-8 sm:mb-12"
            >
              Отзывы
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="py-6 sm:py-8 lg:p-10"
                  style={{ borderTop: '1px solid #f0e6d0' }}
                >
                  <p
                    style={{ color: '#6b6560', lineHeight: 1.75 }}
                    className="text-[0.95rem] mb-6 sm:mb-8"
                  >
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
        <section className="section-y text-center" style={{ background: '#fdfaf5' }}>
          <div className="container-yoga max-w-xl mx-auto">
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 5.5vw, 2.5rem)',
                fontWeight: 400,
                color: '#1a1714',
                letterSpacing: '-0.01em',
              }}
              className="mb-5 sm:mb-6"
            >
              Начните практику сегодня
            </h2>
            <p
              style={{ color: '#6b6560', lineHeight: 1.75 }}
              className="text-base mb-8 sm:mb-10"
            >
              Пишите в Telegram — расскажите о своих целях, и я помогу выбрать подходящий формат.
            </p>
            <a
              href="https://t.me/glazamikris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 text-sm tracking-wide rounded-full no-underline"
              style={{
                background: '#e8a820',
                color: '#fff',
                letterSpacing: '0.03em',
              }}
            >
              Написать в Telegram
            </a>
          </div>
        </section>

      </main>
    </>
  )
}

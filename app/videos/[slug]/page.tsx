import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { hasActiveAccess } from '@/lib/actions/access'
import { Badge } from '@/components/ui/Badge'
import { formatDuration, levelLabel } from '@/lib/utils'
import { VideoPlayer } from '@/components/videos/VideoPlayer'
import { PreviewPlayer } from '@/components/videos/PreviewPlayer'
import { AccessGate } from '@/components/videos/AccessGate'
import { generateViewerToken } from '@/lib/kinescope'
import { Clock, BarChart2, Tag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const video = await prisma.video.findUnique({
    where: { slug },
    select: { title: true, seoDesc: true, shortDesc: true },
  })
  if (!video) return {}
  return {
    title: video.seoDesc ? video.title : video.title,
    description: video.seoDesc ?? video.shortDesc,
    alternates: { canonical: `/videos/${slug}` },
  }
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const [video, session] = await Promise.all([
    prisma.video.findUnique({
      where: { slug },
      include: { category: true },
    }),
    getSession(),
  ])

  if (!video || video.status !== 'PUBLISHED') notFound()

  const canWatch =
    video.isFree ||
    (session && (await hasActiveAccess(session.id)) || session?.role === 'ADMIN')

  const viewerToken = canWatch ? generateViewerToken(video.kinescopeId) : ''

  // JSON-LD for VideoObject
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.shortDesc,
    thumbnailUrl: video.coverImage,
    uploadDate: video.createdAt.toISOString(),
    duration: `PT${Math.floor(video.duration / 60)}M`,
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="container-yoga py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-ink-muted mb-4 sm:mb-6 flex items-center gap-2 min-w-0">
          <Link href="/videos" className="hover:text-honey-600 transition-colors flex-shrink-0">Видеоуроки</Link>
          <span className="flex-shrink-0">/</span>
          <span className="text-ink truncate">{video.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 min-w-0">
            {/* Video player area */}
            <div className="bg-black rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 aspect-video relative">
              {canWatch ? (
                <VideoPlayer kinescopeId={video.kinescopeId} token={viewerToken} title={video.title} />
              ) : video.kinescopePreviewId ? (
                <PreviewPlayer kinescopePreviewId={video.kinescopePreviewId} isLoggedIn={!!session} />
              ) : (
                <AccessGate isLoggedIn={!!session} />
              )}
            </div>

            {/* Video info */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-soft">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="sand">{video.category.name}</Badge>
                <Badge variant="outline">{levelLabel(video.level)}</Badge>
                {video.isFree && <Badge variant="honey">Бесплатно</Badge>}
              </div>
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-ink mb-3 break-words">
                {video.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  {formatDuration(video.duration)}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart2 className="w-4 h-4 flex-shrink-0" />
                  {levelLabel(video.level)}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4 flex-shrink-0" />
                  {video.category.name}
                </span>
              </div>
              <div className="prose prose-sm max-w-none text-ink-muted">
                <p className="whitespace-pre-line leading-relaxed break-words">{video.fullDesc}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {!canWatch && (
              <div className="bg-honey-50 border border-honey-200 rounded-xl sm:rounded-2xl p-5">
                <h3 className="font-semibold text-ink mb-2">Получите полный доступ</h3>
                <p className="text-sm text-ink-muted mb-4">
                  Все уроки библиотеки — с подпиской на 7, 30 или 90 дней
                </p>
                <Link href="/cabinet#access">
                  <Button className="w-full">Выбрать тариф</Button>
                </Link>
                {!session && (
                  <Link href="/register" className="block text-center text-sm text-honey-600 hover:underline mt-2">
                    Зарегистрироваться бесплатно
                  </Link>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl sm:rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-ink mb-3">Об уроке</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Категория</dt>
                  <dd className="font-medium text-ink">{video.category.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Уровень</dt>
                  <dd className="font-medium text-ink">{levelLabel(video.level)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Длительность</dt>
                  <dd className="font-medium text-ink">{formatDuration(video.duration)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Доступ</dt>
                  <dd className="font-medium text-ink">{video.isFree ? 'Бесплатно' : 'По подписке'}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-ink mb-2">Есть вопросы?</h3>
              <p className="text-sm text-ink-muted mb-3">Пишите в Telegram — отвечу лично</p>
              <a
                href="https://t.me/glazamikris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-honey-600 hover:text-honey-700 font-medium transition-colors"
              >
                @glazamikris →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Clock, PlayCircle, Lock } from 'lucide-react'
import { formatDuration, levelLabel } from '@/lib/utils'
import { VideoFilters } from '@/components/videos/VideoFilters'
import { Level } from '@/app/generated/prisma'

export const metadata: Metadata = {
  title: 'Видеоуроки йоги онлайн',
  description: 'Библиотека видеоуроков йоги с Кристиной Андреевой. Хатха, виньяса, инь-йога для всех уровней подготовки.',
  alternates: { canonical: '/videos' },
}

async function getVideos(categorySlug?: string, level?: string) {
  try {
    return await prisma.video.findMany({
      where: {
        status: 'PUBLISHED',
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        ...(level && level !== 'ALL' ? { level: level as Level } : {}),
      },
      include: { category: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    return await prisma.videoCategory.findMany({ orderBy: { sortOrder: 'asc' } })
  } catch {
    return []
  }
}

const levels = [
  { value: 'ALL', label: 'Все уровни' },
  { value: 'BEGINNER', label: 'Начинающий' },
  { value: 'INTERMEDIATE', label: 'Средний' },
  { value: 'ADVANCED', label: 'Продвинутый' },
]

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string }>
}) {
  const params = await searchParams
  const [videos, categories] = await Promise.all([
    getVideos(params.category, params.level),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-sand-200">
        <div className="container-yoga py-6 sm:py-8 lg:py-10">
          <SectionHeader
            label="Библиотека"
            title="Видеоуроки йоги"
            subtitle="Практикуйте в своём темпе — дома, в удобное время"
            className="mb-0"
          />
        </div>
      </div>

      <div className="container-yoga py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 lg:flex-shrink-0">
            <VideoFilters categories={categories} levels={levels} />
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {videos.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <PlayCircle className="w-14 h-14 sm:w-16 sm:h-16 text-sand-300 mx-auto mb-4" />
                <p className="text-ink-muted">Уроки скоро появятся</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-ink-muted mb-4 sm:mb-6">
                  Найдено уроков: <span className="font-medium text-ink">{videos.length}</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {videos.map(video => (
                    <Link key={video.id} href={`/videos/${video.slug}`} className="group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                        <div className="relative aspect-video bg-sand-200">
                          <Image
                            src={video.coverImage || '/images/video-placeholder.jpg'}
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <PlayCircle className="w-10 h-10 text-white opacity-80 group-hover:scale-110 transition-transform" />
                          </div>
                          {video.isFree && (
                            <div className="absolute top-2 left-2">
                              <Badge variant="honey">Бесплатно</Badge>
                            </div>
                          )}
                          {!video.isFree && (
                            <div className="absolute top-2 right-2 bg-black/40 rounded-full p-1">
                              <Lock className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="sand">{video.category.name}</Badge>
                            <Badge variant="outline">{levelLabel(video.level)}</Badge>
                          </div>
                          <h2 className="font-medium text-ink text-sm leading-snug mb-1 line-clamp-2 group-hover:text-honey-600 transition-colors">
                            {video.title}
                          </h2>
                          <p className="text-xs text-ink-muted line-clamp-2 mb-3">{video.shortDesc}</p>
                          <div className="flex items-center gap-1 text-xs text-ink-light">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(video.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Clock, PlayCircle, Lock } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import { prisma } from '@/lib/prisma'

async function getFeaturedVideos() {
  try {
    return await prisma.video.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
      orderBy: [{ isFree: 'desc' }, { sortOrder: 'asc' }],
      take: 3,
    })
  } catch {
    return []
  }
}

const benefits = [
  { icon: '🕐', title: 'В своё время', desc: 'Занимайтесь когда удобно — утром, вечером или в обед' },
  { icon: '📱', title: 'С любого устройства', desc: 'Телефон, планшет или компьютер — где вам комфортно' },
  { icon: '🔄', title: 'Повторяйте сколько угодно', desc: 'Каждый урок доступен снова в любой момент' },
  { icon: '🎯', title: 'По вашему уровню', desc: 'Уроки для начинающих, среднего и продвинутого уровня' },
]

export async function VideosPreviewSection() {
  const videos = await getFeaturedVideos()

  return (
    <section className="section-padding bg-sand-50">
      <div className="container-yoga">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Видеоуроки"
            title="Практикуйте дома — с профессиональным ведением"
            subtitle="Полная библиотека уроков по йоге в удобном онлайн-формате"
          />
          <Link href="/videos" className="flex-shrink-0">
            <Button variant="outline">Все уроки</Button>
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {benefits.map(b => (
            <div key={b.title} className="bg-white rounded-2xl p-4 text-center shadow-soft">
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="text-sm font-medium text-ink mb-1">{b.title}</div>
              <div className="text-xs text-ink-muted">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Video cards */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <Link key={video.id} href={`/videos/${video.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-video bg-sand-200">
                    <Image
                      src={video.coverImage || '/images/video-placeholder.jpg'}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    {video.isFree && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="honey">Бесплатно</Badge>
                      </div>
                    )}
                    {!video.isFree && (
                      <div className="absolute top-3 right-3">
                        <Lock className="w-4 h-4 text-white opacity-70" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="sand">{video.category.name}</Badge>
                    </div>
                    <h3 className="font-medium text-ink mb-1 line-clamp-2 group-hover:text-honey-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-ink-muted line-clamp-2 mb-3">{video.shortDesc}</p>
                    <div className="flex items-center gap-1 text-xs text-ink-light">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Placeholder when DB empty */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Утренняя практика для начинающих', cat: 'Хатха-йога', dur: '30 мин', free: true },
              { title: 'Виньяса-флоу: связки в движении', cat: 'Виньяса', dur: '45 мин', free: false },
              { title: 'Расслабление и восстановление', cat: 'Инь-йога', dur: '40 мин', free: false },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-sand-200 to-honey-100 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-honey-500 opacity-60" />
                  {v.free && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="honey">Бесплатно</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="sand">{v.cat}</Badge>
                  </div>
                  <h3 className="font-medium text-ink mb-1">{v.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-ink-light mt-3">
                    <Clock className="w-3 h-3" />
                    <span>{v.dur}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/videos">
            <Button size="lg">Перейти к библиотеке уроков</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

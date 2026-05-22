import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoga-kristina.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_pages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/videos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  let videoPages: MetadataRoute.Sitemap = []
  let eventPages: MetadataRoute.Sitemap = []

  try {
    const videos = await prisma.video.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } })
    videoPages = videos.map(v => ({ url: `${siteUrl}/videos/${v.slug}`, lastModified: v.updatedAt, changeFrequency: 'monthly', priority: 0.7 }))

    const events = await prisma.event.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } })
    eventPages = events.map(e => ({ url: `${siteUrl}/events/${e.slug}`, lastModified: e.updatedAt, changeFrequency: 'weekly', priority: 0.8 }))
  } catch { /* DB not connected */ }

  return [...static_pages, ...videoPages, ...eventPages]
}

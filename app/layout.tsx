import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSession } from '@/lib/auth'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoga-kristina.ru'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Йога с Кристиной Андреевой — онлайн-уроки и йога-туры',
    template: '%s | Йога с Кристиной Андреевой',
  },
  description:
    'Онлайн-уроки йоги и йога-туры с Кристиной Андреевой. 12 лет практики, 7 лет преподавания. Безопасная и эффективная практика для всех уровней.',
  keywords: ['йога онлайн', 'видеоуроки йоги', 'йога туры', 'Кристина Андреева', 'йога для начинающих'],
  authors: [{ name: 'Кристина Андреева' }],
  creator: 'Кристина Андреева',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Йога с Кристиной Андреевой',
    title: 'Йога с Кристиной Андреевой — онлайн-уроки и йога-туры',
    description:
      'Онлайн-уроки йоги и йога-туры с Кристиной Андреевой. 12 лет практики, 7 лет преподавания.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Йога с Кристиной Андреевой',
    description: 'Онлайн-уроки йоги и йога-туры',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col bg-sand-50 text-ink antialiased">
        <Header user={session} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

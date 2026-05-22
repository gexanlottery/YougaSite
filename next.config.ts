import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Добавить при переходе на внешнее хранилище
    ],
  },
  // Защита видео-файлов — не отдаём через /public напрямую
  async headers() {
    return [
      {
        source: '/uploads/videos/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
}

export default nextConfig

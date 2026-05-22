import { NextRequest, NextResponse } from 'next/server'
import { stat, readFile } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOADS_ROOT = path.join(process.cwd(), 'public', 'uploads')

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params
  if (!segments?.length) return new NextResponse(null, { status: 404 })

  // videos directory is served via separate signed-token mechanism, not here
  if (segments[0] === 'videos') return new NextResponse(null, { status: 404 })

  if (segments.some((s) => s.includes('..') || s.includes('\0') || s.startsWith('.'))) {
    return new NextResponse(null, { status: 400 })
  }

  const filePath = path.join(UPLOADS_ROOT, ...segments)
  if (!filePath.startsWith(UPLOADS_ROOT + path.sep)) {
    return new NextResponse(null, { status: 400 })
  }

  try {
    const s = await stat(filePath)
    if (!s.isFile()) return new NextResponse(null, { status: 404 })
    const data = await readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME[ext] ?? 'application/octet-stream'
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(s.size),
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import Busboy from 'busboy'
import { Readable } from 'stream'
import path from 'path'
import fs from 'fs'

export const dynamic = 'force-dynamic'

const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mpeg']
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_VIDEO_SIZE = 4 * 1024 * 1024 * 1024 // 4 GB
const MAX_IMAGE_SIZE = 20 * 1024 * 1024 // 20 MB

function transliterate(str: string): string {
  const map: Record<string, string> = {
    а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',
    н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'shch',
    ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',
    ' ':'-','_':'-',
  }
  return str.toLowerCase().split('').map(c => map[c] ?? c).join('')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 })
  }

  return new Promise<NextResponse>((resolve) => {
    const busboy = Busboy({ headers: Object.fromEntries(request.headers.entries()) })

    let uploadType: 'video' | 'image' | null = null
    let savedVideoPath: string | null = null
    let savedCoverPath: string | null = null
    let fileError: string | null = null
    const pending: Promise<void>[] = []

    busboy.on('field', (name, value) => {
      if (name === 'type' && (value === 'video' || value === 'image')) {
        uploadType = value
      }
    })

    busboy.on('file', (fieldname, stream, info) => {
      const { filename, mimeType } = info

      if (fieldname === 'video') {
        if (!ALLOWED_VIDEO_TYPES.includes(mimeType)) {
          stream.resume()
          fileError = `Недопустимый тип файла: ${mimeType}. Допустимы: mp4, mov, avi, webm`
          return
        }

        const ext = path.extname(filename) || '.mp4'
        const base = transliterate(path.basename(filename, path.extname(filename))) || 'video'
        const safeName = `${base}-${Date.now()}${ext}`
        const uploadDir = path.join(process.cwd(), 'uploads', 'videos')
        fs.mkdirSync(uploadDir, { recursive: true })
        const filePath = path.join(uploadDir, safeName)

        let bytesWritten = 0
        const writeStream = fs.createWriteStream(filePath)
        const p = new Promise<void>((res, rej) => {
          writeStream.on('finish', () => {
            savedVideoPath = `videos/${safeName}`
            res()
          })
          writeStream.on('error', rej)
        })
        pending.push(p)

        stream.on('data', (chunk: Buffer) => {
          bytesWritten += chunk.length
          if (bytesWritten > MAX_VIDEO_SIZE) {
            fileError = 'Файл слишком большой (максимум 4 ГБ)'
            stream.resume()
            writeStream.destroy()
            fs.unlink(filePath, () => {})
            return
          }
        })
        stream.pipe(writeStream)
      }

      if (fieldname === 'image') {
        if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
          stream.resume()
          fileError = `Недопустимый тип: ${mimeType}. Допустимы: jpg, png, webp`
          return
        }

        const ext = path.extname(filename) || '.jpg'
        const base = transliterate(path.basename(filename, path.extname(filename))) || 'cover'
        const safeName = `${base}-${Date.now()}${ext}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        fs.mkdirSync(uploadDir, { recursive: true })
        const filePath = path.join(uploadDir, safeName)

        let bytesWritten = 0
        const writeStream = fs.createWriteStream(filePath)
        const p = new Promise<void>((res, rej) => {
          writeStream.on('finish', () => {
            savedCoverPath = `/uploads/${safeName}`
            res()
          })
          writeStream.on('error', rej)
        })
        pending.push(p)

        stream.on('data', (chunk: Buffer) => {
          bytesWritten += chunk.length
          if (bytesWritten > MAX_IMAGE_SIZE) {
            fileError = 'Изображение слишком большое (максимум 20 МБ)'
            stream.resume()
            writeStream.destroy()
            fs.unlink(filePath, () => {})
          }
        })
        stream.pipe(writeStream)
      }
    })

    busboy.on('finish', async () => {
      try {
        await Promise.all(pending)
      } catch {
        resolve(NextResponse.json({ error: 'Ошибка записи файла' }, { status: 500 }))
        return
      }

      if (fileError) {
        resolve(NextResponse.json({ error: fileError }, { status: 400 }))
        return
      }

      resolve(NextResponse.json({
        videoPath: savedVideoPath,
        coverImage: savedCoverPath,
      }))
    })

    busboy.on('error', (err) => {
      resolve(NextResponse.json({ error: String(err) }, { status: 500 }))
    })

    if (!request.body) {
      resolve(NextResponse.json({ error: 'Empty body' }, { status: 400 }))
      return
    }

    const nodeReadable = Readable.fromWeb(request.body as Parameters<typeof Readable.fromWeb>[0])
    nodeReadable.pipe(busboy)
  })
}

import { prisma } from '@/lib/prisma'
import { ContentForm } from './ContentForm'

export default async function AdminContentPage() {
  const rows = await prisma.siteContent.findMany().catch(() => [])
  const data: Record<string, string> = {}
  for (const row of rows) {
    data[row.key] = row.value
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Контент сайта</h1>
        <p className="text-sm text-gray-500 mt-1">Тексты и фото главной страницы</p>
      </div>
      <ContentForm initialData={data} />
    </div>
  )
}

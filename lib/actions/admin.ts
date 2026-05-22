'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../prisma'
import { requireAdmin } from '../auth'
import { Level, ContentStatus } from '@/app/generated/prisma'
import bcrypt from 'bcryptjs'

// ─── Categories ──────────────────────────────────────────────────────────────

export async function saveCategoryAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = formData.get('id') as string | null
  const data = {
    name: (formData.get('name') as string).trim(),
    slug: (formData.get('slug') as string).trim(),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0', 10),
  }
  if (id) {
    await prisma.videoCategory.update({ where: { id }, data })
  } else {
    await prisma.videoCategory.create({ data })
  }
  revalidatePath('/admin/categories')
  revalidatePath('/videos')
  redirect('/admin/categories')
}

export async function deleteCategoryAction(id: string): Promise<{ error?: string }> {
  await requireAdmin()
  const videosCount = await prisma.video.count({ where: { categoryId: id } })
  if (videosCount > 0) {
    return { error: `Нельзя удалить категорию: в ней ${videosCount} видео. Сначала перенесите или удалите видео.` }
  }
  await prisma.videoCategory.delete({ where: { id } })
  revalidatePath('/admin/categories')
  revalidatePath('/videos')
  redirect('/admin/categories')
}

// ─── Password change ──────────────────────────────────────────────────────────

export async function changeAdminPasswordAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const session = await requireAdmin()
  const newPassword = (formData.get('newPassword') as string)?.trim()
  const confirm = (formData.get('confirm') as string)?.trim()

  if (!newPassword || newPassword.length < 8) {
    return { error: 'Пароль должен быть минимум 8 символов' }
  }
  if (newPassword !== confirm) {
    return { error: 'Пароли не совпадают' }
  }

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({ where: { id: session.id }, data: { passwordHash } })
  return { success: true }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function saveFaqAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = formData.get('id') as string | null
  const data = {
    question: (formData.get('question') as string).trim(),
    answer: (formData.get('answer') as string).trim(),
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0', 10),
    isPublished: formData.get('isPublished') === 'true',
  }
  if (id) {
    await prisma.fAQ.update({ where: { id }, data })
  } else {
    await prisma.fAQ.create({ data })
  }
  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  redirect('/admin/faq')
}

export async function deleteFaqAction(id: string): Promise<void> {
  await requireAdmin()
  await prisma.fAQ.delete({ where: { id } })
  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  redirect('/admin/faq')
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function saveEventAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = formData.get('id') as string | null
  const endDateStr = formData.get('endDate') as string
  const data = {
    slug: (formData.get('slug') as string).trim(),
    title: (formData.get('title') as string).trim(),
    date: new Date(formData.get('date') as string),
    endDate: endDateStr ? new Date(endDateStr) : null,
    location: (formData.get('location') as string).trim(),
    price: parseFloat((formData.get('price') as string) || '0'),
    shortDesc: (formData.get('shortDesc') as string).trim(),
    fullDesc: (formData.get('fullDesc') as string).trim(),
    program: (formData.get('program') as string)?.trim() || null,
    included: (formData.get('included') as string)?.trim() || null,
    notIncluded: (formData.get('notIncluded') as string)?.trim() || null,
    level: ((formData.get('level') as string) || 'ALL') as Level,
    coverImage: (formData.get('coverImage') as string)?.trim() || '/images/event-placeholder.jpg',
    status: ((formData.get('status') as string) || 'DRAFT') as ContentStatus,
    seoTitle: (formData.get('seoTitle') as string)?.trim() || null,
    seoDesc: (formData.get('seoDesc') as string)?.trim() || null,
  }
  if (id) {
    await prisma.event.update({ where: { id }, data })
  } else {
    await prisma.event.create({ data })
  }
  revalidatePath('/admin/events')
  revalidatePath('/events')
  redirect('/admin/events')
}

export async function deleteEventAction(id: string): Promise<void> {
  await requireAdmin()
  await prisma.event.delete({ where: { id } })
  revalidatePath('/admin/events')
  revalidatePath('/events')
  redirect('/admin/events')
}

// ─── Videos ──────────────────────────────────────────────────────────────────

export async function saveVideoAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = formData.get('id') as string | null
  const kinescopeId = (formData.get('kinescopeId') as string)?.trim()
  if (!kinescopeId) throw new Error('Kinescope ID обязателен. Вставьте ID видео из личного кабинета Kinescope.')
  const data = {
    slug: (formData.get('slug') as string).trim(),
    title: (formData.get('title') as string).trim(),
    shortDesc: (formData.get('shortDesc') as string).trim(),
    fullDesc: (formData.get('fullDesc') as string).trim(),
    categoryId: formData.get('categoryId') as string,
    level: ((formData.get('level') as string) || 'ALL') as Level,
    duration: parseInt((formData.get('duration') as string) || '0', 10),
    coverImage: (formData.get('coverImage') as string)?.trim() || '/images/video-placeholder.jpg',
    kinescopeId,
    kinescopePreviewId: (formData.get('kinescopePreviewId') as string)?.trim() || null,
    isFree: formData.get('isFree') === 'true',
    status: ((formData.get('status') as string) || 'DRAFT') as ContentStatus,
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0', 10),
    seoTitle: (formData.get('seoTitle') as string)?.trim() || null,
    seoDesc: (formData.get('seoDesc') as string)?.trim() || null,
    seoKeywords: (formData.get('seoKeywords') as string)?.trim() || null,
  }
  if (id) {
    await prisma.video.update({ where: { id }, data })
  } else {
    await prisma.video.create({ data })
  }
  revalidatePath('/admin/videos')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

export async function deleteVideoAction(id: string): Promise<void> {
  await requireAdmin()
  await prisma.video.delete({ where: { id } })
  revalidatePath('/admin/videos')
  revalidatePath('/videos')
  redirect('/admin/videos')
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function saveReviewAction(formData: FormData): Promise<void> {
  await requireAdmin()
  const id = formData.get('id') as string | null
  const data = {
    name: (formData.get('name') as string).trim(),
    city: (formData.get('city') as string)?.trim() || null,
    role: (formData.get('role') as string)?.trim() || null,
    text: (formData.get('text') as string).trim(),
    photo: (formData.get('photo') as string)?.trim() || null,
    isPublished: formData.get('isPublished') === 'true',
    sortOrder: parseInt((formData.get('sortOrder') as string) || '0', 10),
  }
  if (id) {
    await prisma.review.update({ where: { id }, data })
  } else {
    await prisma.review.create({ data })
  }
  revalidatePath('/admin/reviews')
  redirect('/admin/reviews')
}

export async function deleteReviewAction(id: string): Promise<void> {
  await requireAdmin()
  await prisma.review.delete({ where: { id } })
  revalidatePath('/admin/reviews')
  redirect('/admin/reviews')
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export async function saveSiteContentAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()
  const allowedKeys = [
    'hero_badge', 'hero_subtitle', 'hero_photo',
    'about_title', 'about_p1', 'about_p2', 'about_p3',
    'about_quote_p1', 'about_quote_p2',
  ]
  for (const key of allowedKeys) {
    const value = formData.get(key)
    if (typeof value === 'string') {
      await prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    }
  }
  revalidatePath('/')
  revalidatePath('/admin/content')
  return { success: true }
}

import { PrismaClient } from '../app/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@yoga-kristina.ru'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: 'ADMIN' },
    create: { email: adminEmail, name: 'Кристина Андреева', passwordHash, role: 'ADMIN' },
  })
  console.log('✅ Admin user created:', adminEmail)

  // Video categories
  const categories = [
    { name: 'Хатха-йога', slug: 'hatha', sortOrder: 1 },
    { name: 'Виньяса', slug: 'vinyasa', sortOrder: 2 },
    { name: 'Инь-йога', slug: 'yin', sortOrder: 3 },
    { name: 'Для начинающих', slug: 'beginners', sortOrder: 4 },
    { name: 'Медитация', slug: 'meditation', sortOrder: 5 },
    { name: 'Пранаяма', slug: 'pranayama', sortOrder: 6 },
  ]

  for (const cat of categories) {
    await prisma.videoCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Video categories created')

  // Access plans
  const plans = [
    { name: 'Неделя', days: 7, price: 990, sortOrder: 1 },
    { name: 'Месяц', days: 30, price: 3000, sortOrder: 2 },
    { name: '3 месяца', days: 90, price: 8100, sortOrder: 3 },
  ]

  for (const plan of plans) {
    const existing = await prisma.accessPlan.findFirst({ where: { days: plan.days } })
    if (!existing) {
      await prisma.accessPlan.create({ data: plan })
    }
  }
  console.log('✅ Access plans created')

  // Sample FAQs
  const faqs = [
    { question: 'Кому подходят уроки?', answer: 'Уроки подойдут всем — от новичков до опытных практиков. Для каждого урока указан уровень сложности.', sortOrder: 1 },
    { question: 'Нужен ли опыт занятий йогой?', answer: 'Нет, опыт не нужен. Уроки для начинающих объясняют всё с нуля — безопасно и понятно.', sortOrder: 2 },
    { question: 'Как получить доступ к видеоурокам?', answer: 'Зарегистрируйтесь, выберите тариф (7, 30 или 90 дней) и перейдите к оплате. Доступ открывается мгновенно.', sortOrder: 3 },
    { question: 'Как продлить доступ?', answer: 'В личном кабинете в разделе «Мой доступ» нажмите «Продлить» и выберите новый тариф.', sortOrder: 4 },
    { question: 'Есть ли бесплатные уроки?', answer: 'Да! Часть уроков доступна бесплатно без регистрации. Они помечены бейджем «Бесплатно».', sortOrder: 5 },
    { question: 'Что делать, если остались вопросы?', answer: 'Пишите в Telegram @glazamikris — Кристина отвечает лично.', sortOrder: 6 },
  ]

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: faq.question } })
    if (!existing) {
      await prisma.fAQ.create({ data: faq })
    }
  }
  console.log('✅ FAQs created')

  console.log('✨ Seed completed!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

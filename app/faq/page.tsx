import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FAQList } from '@/components/faq/FAQList'

export const metadata: Metadata = {
  title: 'Частые вопросы — FAQ',
  description: 'Ответы на частые вопросы о видеоуроках йоги, доступе к библиотеке, мероприятиях и оплате.',
  alternates: { canonical: '/faq' },
}

const defaultFAQs = [
  { id: '1', question: 'Кому подходят уроки?', answer: 'Уроки подойдут всем — от полных новичков до практикующих йогой несколько лет. Для каждого урока указан уровень сложности, чтобы вы могли выбрать подходящий.' },
  { id: '2', question: 'Нужен ли опыт занятий йогой?', answer: 'Нет, опыт не нужен. В библиотеке есть уроки для начинающих, которые объясняют всё с нуля — безопасно и понятно.' },
  { id: '3', question: 'Как получить доступ к видеоурокам?', answer: 'Зарегистрируйтесь на сайте, выберите тариф (7, 30 или 90 дней) и перейдите к оплате. После успешной оплаты доступ открывается мгновенно.' },
  { id: '4', question: 'Что входит в доступ к библиотеке?', answer: 'При активном доступе вам доступны все платные уроки библиотеки без ограничений. Смотреть можно сколько угодно раз в течение выбранного срока.' },
  { id: '5', question: 'Как продлить доступ?', answer: 'В личном кабинете в разделе «Мой доступ» нажмите кнопку «Продлить» и выберите новый тариф.' },
  { id: '6', question: 'Есть ли бесплатные уроки?', answer: 'Да! Часть уроков в библиотеке доступна бесплатно без регистрации. Они помечены бейджем «Бесплатно».' },
  { id: '7', question: 'Как записаться на мероприятие?', answer: 'Выберите мероприятие в разделе «Мероприятия» и нажмите «Забронировать место» — вы перейдёте в Telegram Кристины, где можно уточнить все детали и оформить бронь.' },
  { id: '8', question: 'Какие способы оплаты доступны?', answer: 'Принимаем оплату через СБП, SberPay, Яндекс Пэй и Т-Банк. При возникновении вопросов с оплатой — пишите в Telegram @glazamikris.' },
  { id: '9', question: 'Что делать, если остались вопросы?', answer: 'Пишите напрямую в Telegram @glazamikris — Кристина отвечает лично и старается делать это быстро.' },
]

async function getFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } })
    return faqs.length > 0 ? faqs : defaultFAQs
  } catch {
    return defaultFAQs
  }
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-white border-b border-sand-200">
        <div className="container-yoga py-6 sm:py-8 lg:py-10">
          <SectionHeader
            label="Помощь"
            title="Часто задаваемые вопросы"
            subtitle="Если не нашли ответ — пишите в Telegram @glazamikris"
            className="mb-0"
          />
        </div>
      </div>
      <div className="container-yoga py-6 sm:py-8 lg:py-10 max-w-3xl">
        <FAQList faqs={faqs} />
      </div>
    </div>
  )
}

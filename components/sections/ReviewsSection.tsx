import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { prisma } from '@/lib/prisma'

async function getReviews() {
  try {
    return await prisma.review.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
      take: 6,
    })
  } catch {
    return []
  }
}

const placeholderReviews = [
  {
    id: '1',
    name: 'Анна С.',
    city: 'Москва',
    role: 'Ученица 2 года',
    text: 'Занимаюсь с Кристиной уже два года. За это время изменилось не только тело — появилось совсем другое ощущение себя. Кристина умеет объяснять сложное просто и никогда не торопит.',
    photo: null,
  },
  {
    id: '2',
    name: 'Марина К.',
    city: 'Санкт-Петербург',
    role: 'Йога-тур на Алтай',
    text: 'Поехала на тур с нулевым опытом йоги. Была уверена, что не потяну. Кристина так деликатно выстраивает занятия, что к концу недели я делала асаны, которые казались невозможными. Огромная благодарность!',
    photo: null,
  },
  {
    id: '3',
    name: 'Елена В.',
    city: 'Екатеринбург',
    role: 'Онлайн-уроки',
    text: 'Подписалась на библиотеку три месяца назад. Теперь это моя утренняя традиция. Уроки построены очень грамотно — чувствуется глубокое понимание тела и движения.',
    photo: null,
  },
]

export async function ReviewsSection() {
  const dbReviews = await getReviews()
  const reviews = dbReviews.length > 0 ? dbReviews : placeholderReviews

  return (
    <section className="section-padding bg-sand-50">
      <div className="container-yoga">
        <SectionHeader
          label="Отзывы"
          title="Что говорят ученики"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-soft">
              {/* Quote mark */}
              <div className="text-4xl font-display text-honey-300 leading-none mb-3">"</div>
              <p className="text-ink-muted leading-relaxed mb-6 text-pretty">{review.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-honey-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {review.photo ? (
                    <Image src={review.photo} alt={review.name} width={40} height={40} className="object-cover" />
                  ) : (
                    <span className="text-honey-600 font-medium text-sm">{review.name[0]}</span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-ink text-sm">{review.name}</div>
                  <div className="text-xs text-ink-light">
                    {review.city && `${review.city} · `}{review.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Подходят ли уроки для начинающих?',
    a: 'Да, в библиотеке есть уроки для всех уровней — от самых начинающих до продвинутых. Каждый урок имеет метку уровня сложности.',
  },
  {
    q: 'Нужен ли опыт занятий йогой?',
    a: 'Нет, опыт не нужен. Уроки для начинающих построены так, чтобы каждый мог освоить базу с нуля безопасно и комфортно.',
  },
  {
    q: 'Как получить доступ к видеоурокам?',
    a: 'Зарегистрируйтесь на сайте и выберите подходящий тариф: 7, 30 или 90 дней. После оплаты вы получите мгновенный доступ ко всей библиотеке.',
  },
  {
    q: 'Что делать, если остались вопросы?',
    a: 'Пишите в Telegram @glazamikris — я отвечаю лично и стараюсь делать это быстро.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-sand-200 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-ink">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-ink-muted flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <p className="pb-5 text-ink-muted leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export function FAQPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-yoga max-w-3xl mx-auto">
        <SectionHeader
          label="FAQ"
          title="Часто задаваемые вопросы"
          centered
        />
        <div className="mt-10 bg-sand-50 rounded-3xl p-6 md:p-8">
          {faqs.map(f => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq">
            <Button variant="outline">Все вопросы и ответы</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

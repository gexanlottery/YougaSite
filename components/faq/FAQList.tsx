'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQ {
  id: string
  question: string
  answer: string
}

export function FAQList({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft divide-y divide-sand-200">
      {faqs.map(faq => (
        <div key={faq.id}>
          <button
            className="w-full flex items-start justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-sand-50 transition-colors"
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            aria-expanded={openId === faq.id}
          >
            <span className="font-medium text-ink text-sm sm:text-base leading-snug">{faq.question}</span>
            <ChevronDown className={cn('w-5 h-5 text-ink-muted flex-shrink-0 mt-0.5 transition-transform duration-200', openId === faq.id && 'rotate-180')} />
          </button>
          {openId === faq.id && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-ink-muted leading-relaxed text-sm sm:text-base">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

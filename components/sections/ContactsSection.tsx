import { Send } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ContactsSection() {
  return (
    <section className="section-padding bg-ink text-white">
      <div className="container-yoga text-center">
        <p className="text-sm font-medium tracking-widest text-honey-400 uppercase mb-3">
          Контакты
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-balance">
          Остались вопросы?
        </h2>
        <p className="text-white/70 mb-10 max-w-lg mx-auto text-pretty">
          Пишите напрямую — я отвечаю лично. Расскажите о своих целях, уровне подготовки, и я помогу выбрать подходящий формат.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://t.me/glazamikris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#229ED9] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
            Telegram @glazamikris
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            <InstagramIcon className="w-4 h-4" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

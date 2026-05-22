import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'

const highlights = [
  '12 лет личной практики йоги',
  '7 лет преподавания',
  'Семинары и йога-туры по России',
  'Метод Культура Движения',
  'Постоянное повышение квалификации',
]

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-yoga">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-sand-100 shadow-soft">
              <Image
                src="/uploads/2.jpg"
                alt="Кристина Андреева на занятии йогой"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-honey-100 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-sand-200 -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium tracking-widest text-honey-600 uppercase mb-3">
              Обо мне
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6 text-balance">
              Практика, которая меняет — изнутри
            </h2>

            <div className="space-y-4 text-ink-muted leading-relaxed">
              <p>
                Привет! Я Кристина Андреева — преподаватель йоги с 12-летним опытом практики и 7 годами преподавания. Моя история с йогой началась не с красивых фото в асанах, а с желания разобраться в себе и найти способ жить в своём теле с удовольствием.
              </p>
              <p>
                За эти годы я прошла путь через разные направления: хатха, виньяса, аштанга, инь-йога. Каждое из них дало мне что-то важное. Сейчас в основе моей работы лежит <strong className="text-ink font-medium">метод Культура Движения</strong> — подход, который объединяет осознанное движение, работу с дыханием и внимательное отношение к телу.
              </p>
              <p>
                Я провожу групповые занятия, индивидуальные консультации, семинары и <strong className="text-ink font-medium">йога-туры по красивым местам России</strong>. Каждое моё занятие построено на принципе безопасности: прежде всего — не навредить, а потом уже — расти и развиваться.
              </p>
              <p>
                Здесь, в онлайн-библиотеке, я собрала уроки, которые можно практиковать дома — в своём ритме, в своё время. Уроки подойдут как начинающим, так и тем, кто давно практикует.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map(item => (
                <Badge key={item} variant="sand">{item}</Badge>
              ))}
            </div>

            {/* Telegram CTA */}
            <div className="mt-8 p-4 bg-sand-50 rounded-2xl border border-sand-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#229ED9] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.61c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.04 14.4l-2.968-.924c-.645-.202-.658-.645.136-.955l11.57-4.463c.537-.194 1.006.131.784.19z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-ink">Пишите в Telegram</div>
                <a
                  href="https://t.me/glazamikris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-honey-600 hover:text-honey-700 transition-colors"
                >
                  @glazamikris
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

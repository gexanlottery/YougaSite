import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type LegalType = 'privacy' | 'terms' | 'offer' | 'personal-data'

const docs: Record<LegalType, { title: string; sections: { heading?: string; text: string }[] }> = {
  privacy: {
    title: 'Политика конфиденциальности',
    sections: [
      { text: 'Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем ваши персональные данные при использовании сайта.' },
      { heading: '1. Сбор данных', text: 'Мы собираем следующие данные: имя, email-адрес, данные об использовании сайта.' },
      { heading: '2. Использование данных', text: 'Для предоставления доступа к видеоурокам, отправки уведомлений и улучшения качества сервиса.' },
      { heading: '3. Хранение данных', text: 'Данные хранятся на защищённых серверах. Мы не передаём ваши данные третьим лицам без вашего согласия.' },
      { heading: '4. Ваши права', text: 'Вы вправе запросить удаление своих данных, написав в Telegram @glazamikris.' },
      { heading: '5. Контакт', text: 'По вопросам обработки данных: Telegram @glazamikris' },
    ],
  },
  terms: {
    title: 'Пользовательское соглашение',
    sections: [
      { text: 'Используя данный сайт, вы соглашаетесь с настоящим Пользовательским соглашением.' },
      { heading: '1. Предмет соглашения', text: 'Соглашение регулирует использование сайта и видеоматериалов.' },
      { heading: '2. Правила использования', text: 'Запрещается копировать, распространять или использовать видеоматериалы в коммерческих целях без письменного разрешения правообладателя.' },
      { heading: '3. Доступ к материалам', text: 'Доступ к платным материалам предоставляется при наличии активной подписки.' },
      { heading: '4. Ответственность', text: 'Мы прилагаем все усилия для обеспечения качества и доступности сервиса, однако не несём ответственности за временные технические перебои.' },
      { heading: '5. Изменения', text: 'Мы оставляем за собой право изменять условия соглашения с уведомлением пользователей.' },
    ],
  },
  offer: {
    title: 'Публичная оферта',
    sections: [
      { text: 'Настоящая Оферта является официальным предложением ИП Андреева Кристина о заключении договора на предоставление доступа к видеоматериалам.' },
      { heading: '1. Предмет договора', text: 'Предоставление доступа к библиотеке видеоуроков йоги на определённый срок.' },
      { heading: '2. Стоимость и оплата', text: 'Стоимость определяется выбранным тарифом. Оплата производится единовременно.' },
      { heading: '3. Активация доступа', text: 'Доступ активируется в течение 24 часов с момента подтверждения оплаты.' },
      { heading: '4. Возврат средств', text: 'Возврат осуществляется в соответствии с законодательством РФ при наличии обоснованных оснований.' },
      { heading: '5. Контакты исполнителя', text: 'ИП Андреева Кристина, Telegram @glazamikris' },
    ],
  },
  'personal-data': {
    title: 'Согласие на обработку персональных данных',
    sections: [
      { text: 'Регистрируясь на сайте, вы даёте согласие на обработку следующих персональных данных: имя и фамилия, адрес электронной почты, номер телефона (при указании), данные об активности на сайте.' },
      { heading: 'Цели обработки', text: 'Предоставление доступа к сервису, информирование об изменениях условий, улучшение качества услуг.' },
      { heading: 'Срок хранения', text: 'Данные хранятся в течение срока действия аккаунта и 3 лет после его удаления.' },
      { heading: 'Права субъекта данных', text: 'Вы вправе запросить доступ, исправление или удаление своих данных, обратившись в Telegram @glazamikris.' },
      { heading: 'Отзыв согласия', text: 'Согласие может быть отозвано путём направления соответствующего запроса.' },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const doc = docs[type as LegalType]
  if (!doc) return {}
  return { title: doc.title }
}

export default async function LegalPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const doc = docs[type as LegalType]
  if (!doc) notFound()

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="container-yoga py-6 sm:py-8 lg:py-10 max-w-3xl">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-5 sm:mb-8 break-words">{doc.title}</h1>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-8 space-y-4">
          {doc.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-semibold text-ink text-base mt-4 mb-2">{section.heading}</h2>
              )}
              <p className="text-ink-muted leading-relaxed text-sm sm:text-base">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

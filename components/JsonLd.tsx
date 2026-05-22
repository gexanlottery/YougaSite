export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Кристина Андреева',
    jobTitle: 'Преподаватель йоги',
    description: 'Преподаватель йоги с 12-летним опытом практики и 7 годами преподавания. Метод Культура Движения.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    sameAs: ['https://t.me/glazamikris'],
    knowsAbout: ['йога', 'хатха-йога', 'виньяса', 'инь-йога', 'пранаяма', 'медитация'],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoga-kristina.ru'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Йога с Кристиной Андреевой',
    url: siteUrl,
    description: 'Онлайн-уроки йоги и йога-туры с Кристиной Андреевой',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/videos?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

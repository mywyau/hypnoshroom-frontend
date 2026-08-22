interface PageSeoOptions {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
  robots?: string
  breadcrumbs?: Array<{ name: string; path: string }>
  schema?: Record<string, unknown>
}

const siteUrl = 'https://hypnoshroom.com'

export const usePageSeo = ({
  title,
  description,
  path = '/',
  type = 'website',
  robots = 'index, follow',
  breadcrumbs = [],
  schema,
}: PageSeoOptions) => {
  const url = `${siteUrl}${path}`
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: url,
    ogSiteName: 'Hypnoshroom',
    ogLocale: 'en_GB',
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
    robots,
  })

  const structuredData: Record<string, unknown>[] = []
  if (breadcrumbs.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.path}`,
      })),
    })
  }
  if (schema) structuredData.push(schema)

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: structuredData.map(item => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(item),
    })),
  })
}

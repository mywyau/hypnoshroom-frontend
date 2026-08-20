interface PageSeoOptions {
  title: string
  description: string
  path?: string
}

export const usePageSeo = ({ title, description, path = '/' }: PageSeoOptions) => {
  const url = `https://hypnoshroom.com${path}`
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogSiteName: 'Hypnoshroom',
    twitterCard: 'summary_large_image',
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}

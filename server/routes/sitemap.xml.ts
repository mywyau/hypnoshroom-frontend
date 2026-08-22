import { articles } from '../../data/articles'
import { services } from '../../data/services'

const siteUrl = 'https://hypnoshroom.com'
const staticRoutes = ['/', '/about', '/contact', '/expertise', '/services', '/insights', '/scala', '/java', '/typescript', '/python']

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

export default defineEventHandler((event) => {
  const routes = [
    ...staticRoutes,
    ...services.map(service => `/services/${service.slug}`),
    ...articles.map(article => `/insights/${article.slug}`),
  ]

  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(path => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`),
    '</urlset>',
  ].join('\n')
})

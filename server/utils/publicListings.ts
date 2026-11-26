import type { H3Event } from 'h3'
import { disciplines, languageChoices, languages, ir35Options, type BoardType, type PublicContract } from '../../domain/employers/contract'

async function readListings(type: BoardType, query: Record<string, string | number>) {
  const config = useRuntimeConfig().public
  if (!config.employerSupabaseUrl || !config.employerSupabaseKey) {
    throw createError({ statusCode: 503, statusMessage: 'Job board is not configured' })
  }
  try {
    return await $fetch<PublicContract[]>('/rest/v1/open_employer_listings', {
      baseURL: config.employerSupabaseUrl,
      headers: { apikey: config.employerSupabaseKey },
      query: { employment_type: type === 'contract' ? 'eq.contract' : 'in.(permanent,temporary)', ...query }, timeout: 7000, retry: 0,
    })
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Job board is temporarily unavailable' })
  }
}

export async function searchListings(event: H3Event, type: BoardType) {
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page' })
  }
  function term(name: string) {
    const value = query[name] ?? ''
    if (typeof value !== 'string' || value.length > 100 || /\p{Cc}/u.test(value)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid search term' })
    }
    return value.trim()
  }
  const keyword = term('q')
  const location = term('location')
  const ir35 = term('ir35')
  const discipline = term('discipline')
  const language = term('language')
  const employment = term('employment')
  const remote = term('remote')
  const filters: Record<string, string> = {}
  if (keyword) {
    // PostgreSQL's ***= prefix matches the entire input literally, including C++ and .NET.
    // PostgREST's grouped filters require quoted values with quotes and backslashes escaped.
    const literal = JSON.stringify('***=' + keyword)
    const matches = ['title', 'description', 'discipline', 'other_language'].map(column => column + '.imatch.' + literal)
    const taggedLanguage = languages.find(item => item.toLowerCase() === keyword.toLowerCase())
    if (taggedLanguage) matches.push('languages.cs.{' + taggedLanguage + '}')
    filters.or = '(' + matches.join(',') + ')'
  }
  if ((discipline && !disciplines.includes(discipline)) || (language && !languageChoices.includes(language)) || (remote && remote !== '1')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid role filter' })
  }
  if (employment) {
    if (type !== 'jobs' || !['permanent', 'temporary'].includes(employment)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid employment type' })
    }
    filters.employment_type = 'eq.' + employment
  }
  if (remote) filters.fully_remote = 'is.true'
  if (discipline) filters.discipline = 'eq.' + discipline
  if (language === 'Other') filters.other_language = 'not.is.null'
  else if (language) filters.languages = 'cs.{' + language + '}'
  if (location) filters.location = 'imatch.***=' + location
  if (ir35) {
    if (type !== 'contract' || !ir35Options.some(option => option === ir35)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid IR35 status' })
    }
    filters.ir35 = 'eq.' + ir35
  }
  const rows = await readListings(type, {
    ...filters, select: 'id,company_name,title,location,duration,day_rate_gbp,ir35,closes_on,employment_type,fully_remote,discipline,languages,other_language,salary_gbp,salary_max_gbp',
    order: 'created_at.desc,id.asc', offset: (page - 1) * 20, limit: 21,
  })
  return { listings: rows.slice(0, 20), hasNext: rows.length > 20 }
}

export async function getListing(event: H3Event, type: BoardType) {
  const id = getRouterParam(event, 'id') ?? ''
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) {
    throw createError({ statusCode: 404, statusMessage: 'Listing unavailable' })
  }
  const [listing] = await readListings(type, { id: `eq.${id}`, limit: 1 })
  if (!listing) throw createError({ statusCode: 404, statusMessage: 'Listing unavailable' })
  return listing
}

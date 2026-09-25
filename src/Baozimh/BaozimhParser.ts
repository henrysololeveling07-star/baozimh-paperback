// All site-specific selectors live in this file. If Baozimh changes its markup,
// this is the only file that should need edits.

export const DOMAIN = 'https://www.baozimh.com'
const COVER_HOST = 'https://static-tw.baozimh.com'

export interface ListItem {
    id: string
    title: string
    image: string
}

export interface ChapterItem {
    id: string // "<section>_<slot>", e.g. "0_12"
    name: string
    slot: number
    chapNum: number
}

// cheerio is typed loosely on purpose to avoid depending on a specific cheerio typings path.
type Cheerio$ = any

const COMIC_HREF = /^(?:https?:\/\/[^/]+)?\/comic\/([^/?#]+)\/?$/
const CHAPTER_HREF_A = /comic_id=([^&]+)&section_slot=(\d+)&chapter_slot=(\d+)/
const CHAPTER_HREF_B = /\/comic\/chapter\/[^/]+\/(\d+)_(\d+)\.html/

export const coverFor = (id: string): string =>
    `${COVER_HOST}/cover/${id}.jpg?w=285&h=375&q=100`

export const normalizeUrl = (src: string): string => {
    const s = src.trim()
    if (s.startsWith('//')) return `https:${s}`
    if (s.startsWith('/')) return `${DOMAIN}${s}`
    return s
}

/** Search / classify / list pages: collect every /comic/<slug> link, merged by slug. */
export function parseComicList($: Cheerio$): ListItem[] {
    const found = new Map<string, ListItem>()

    $('a[href*="/comic/"]').each((_: number, el: any) => {
        const a = $(el)
        const m = COMIC_HREF.exec(a.attr('href') ?? '')
        if (!m || m[1] === 'sitemap') return

        const id = m[1]
        const item = found.get(id) ?? { id, title: '', image: '' }

        const title = (a.attr('title') ?? a.find('h3').first().text()).trim()
        if (title && !item.title) item.title = title

        const img = a.find('amp-img, img').first()
        const src = img.attr('src') ?? img.attr('data-src') ?? ''
        if (src && !item.image) item.image = normalizeUrl(src)

        found.set(id, item)
    })

    return Array.from(found.values())
        .filter((i) => i.title)
        .map((i) => ({ ...i, image: i.image || coverFor(i.id) }))
}

export interface MangaDetails {
    title: string
    author: string
    image: string
    completed: boolean
    genres: string[]
    desc: string
}

/** Detail page: prefers the OpenGraph "novel" meta tags, which are stable across redesigns. */
export function parseMangaDetails($: Cheerio$, mangaId: string): MangaDetails {
    const meta = (name: string): string =>
        ($(`meta[property="${name}"]`).attr('content') ??
            $(`meta[name="${name}"]`).attr('content') ??
            '').trim()

    const title = meta('og:novel:book_name') || $('h1').first().text().trim() || mangaId
    const status = meta('og:novel:status')
    const genres = meta('og:novel:category')
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t && !t.startsWith('types.'))

    let desc = $('.comics-detail__desc').first().text().trim()
    if (!desc) {
        // og:description looks like "《X》,《X》全集,<synopsis>"
        desc = meta('og:description').replace(/^《[^》]*》,《[^》]*》全集,?/, '').trim()
    }

    return {
        title,
        author: meta('og:novel:author'),
        image: meta('og:image').split('?')[0] || coverFor(mangaId),
        completed: status.includes('完結') || status.includes('完结'),
        genres,
        desc,
    }
}

/** Chapter list: links use ?comic_id=..&section_slot=..&chapter_slot=.. or /comic/chapter/<id>/<s>_<c>.html */
export function parseChapters($: Cheerio$): ChapterItem[] {
    const seen = new Set<string>()
    const out: ChapterItem[] = []

    $('a[href*="page_direct"], a[href*="/comic/chapter/"]').each((_: number, el: any) => {
        const a = $(el)
        const href: string = a.attr('href') ?? ''
        let section: string | undefined
        let slot: string | undefined

        const a1 = CHAPTER_HREF_A.exec(href)
        const b1 = CHAPTER_HREF_B.exec(href)
        if (a1) [, , section, slot] = a1
        else if (b1) [, section, slot] = b1
        if (section === undefined || slot === undefined) return

        const id = `${section}_${slot}`
        if (seen.has(id)) return
        seen.add(id)

        const name = (a.attr('title') ?? a.text()).trim()
        const num = /第\s*(\d+(?:\.\d+)?)\s*[話话章回]/.exec(name)
        out.push({
            id,
            name,
            slot: Number(slot),
            chapNum: num ? Number(num[1]) : Number(slot) + 1,
        })
    })

    return out
}

/** Chapter reader page: returns page image URLs in reading order. */
export function parsePages($: Cheerio$): string[] {
    const selectors = ['.comic-contain amp-img', '.comic-contain img', 'amp-img', '.chapter-img img']
    for (const sel of selectors) {
        const urls: string[] = []
        $(sel).each((_: number, el: any) => {
            const e = $(el)
            const src = e.attr('src') ?? e.attr('data-src') ?? ''
            if (src && !src.includes('/static/bzmh/')) urls.push(normalizeUrl(src))
        })
        if (urls.length) return urls
    }
    return []
}

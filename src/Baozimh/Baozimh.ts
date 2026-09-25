import {
    BadgeColor,
    Chapter,
    ChapterDetails,
    ChapterProviding,
    ContentRating,
    HomePageSectionsProviding,
    HomeSection,
    HomeSectionType,
    MangaProviding,
    PagedResults,
    PartialSourceManga,
    Request,
    Response,
    SearchRequest,
    SearchResultsProviding,
    SourceInfo,
    SourceIntents,
    SourceManga,
} from '@paperback/types'

import {
    DOMAIN,
    ListItem,
    parseChapters,
    parseComicList,
    parseMangaDetails,
    parsePages,
} from './BaozimhParser'

export const BaozimhInfo: SourceInfo = {
    version: '1.0.0',
    name: 'Baozimh',
    icon: 'icon.png',
    author: 'Henry Khaw',
    authorWebsite: 'https://github.com/',
    description: 'Unofficial source for Baozimh (包子漫畫).',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: DOMAIN,
    sourceTags: [{ text: 'Chinese', type: BadgeColor.GREY }],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS,
}

const classify = (region: string, page: number): string =>
    `${DOMAIN}/classify?type=all&region=${region}&state=all&filter=*&page=${page}`

// containsMore = whether the list URL supports ?page=N (unverified for /list/new)
const SECTIONS: { id: string; title: string; url: (page: number) => string; containsMore: boolean }[] = [
    { id: 'new', title: '最新上架', url: () => `${DOMAIN}/list/new`, containsMore: false },
    { id: 'jp', title: '日本', url: (p) => classify('jp', p), containsMore: true },
    { id: 'kr', title: '韓國', url: (p) => classify('kr', p), containsMore: true },
    { id: 'cn', title: '國漫', url: (p) => classify('cn', p), containsMore: true },
]

export class Baozimh implements SearchResultsProviding, MangaProviding, ChapterProviding, HomePageSectionsProviding {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private cheerio: any) {}

    requestManager = App.createRequestManager({
        requestsPerSecond: 4,
        requestTimeout: 20000,
        interceptor: {
            interceptRequest: async (request: Request): Promise<Request> => {
                request.headers = {
                    ...(request.headers ?? {}),
                    referer: `${DOMAIN}/`,
                    'user-agent': await this.requestManager.getDefaultUserAgent(),
                }
                return request
            },
            interceptResponse: async (response: Response): Promise<Response> => response,
        },
    })

    private async fetchPage(url: string) {
        const response = await this.requestManager.schedule(App.createRequest({ url, method: 'GET' }), 1)
        if (response.status >= 400) {
            throw new Error(`Baozimh returned HTTP ${response.status} for ${url}`)
        }
        return this.cheerio.load(response.data as string)
    }

    private toPartial(items: ListItem[]): PartialSourceManga[] {
        return items.map((i) =>
            App.createPartialSourceManga({ mangaId: i.id, image: i.image, title: i.title, subtitle: undefined }),
        )
    }

    async getMangaShareUrl(mangaId: string): Promise<string> {
        return `${DOMAIN}/comic/${mangaId}`
    }

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        const $ = await this.fetchPage(`${DOMAIN}/comic/${mangaId}`)
        const d = parseMangaDetails($, mangaId)

        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                titles: [d.title],
                image: d.image,
                status: d.completed ? 'Completed' : 'Ongoing',
                author: d.author,
                artist: d.author,
                tags: [
                    App.createTagSection({
                        id: 'genres',
                        label: 'Genres',
                        tags: d.genres.map((g) => App.createTag({ id: g, label: g })),
                    }),
                ],
                desc: d.desc,
                hentai: false,
            }),
        })
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const $ = await this.fetchPage(`${DOMAIN}/comic/${mangaId}`)
        return parseChapters($).map((c) =>
            App.createChapter({
                id: c.id,
                name: c.name,
                langCode: '🇹🇼',
                chapNum: c.chapNum,
                volume: 0,
                sortingIndex: c.slot,
            }),
        )
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const $ = await this.fetchPage(`${DOMAIN}/comic/chapter/${mangaId}/${chapterId}.html`)
        const pages = parsePages($)
        if (!pages.length) {
            throw new Error(`No pages found for ${mangaId} / ${chapterId}`)
        }
        return App.createChapterDetails({ id: chapterId, mangaId, pages })
    }

    async getSearchResults(query: SearchRequest, _metadata: unknown): Promise<PagedResults> {
        const title = (query.title ?? '').trim()
        if (!title) return App.createPagedResults({ results: [], metadata: undefined })

        const $ = await this.fetchPage(`${DOMAIN}/search?q=${encodeURIComponent(title)}`)
        return App.createPagedResults({ results: this.toPartial(parseComicList($)), metadata: undefined })
    }

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        await Promise.all(
            SECTIONS.map(async (s) => {
                const section = App.createHomeSection({
                    id: s.id,
                    title: s.title,
                    containsMoreItems: s.containsMore,
                    type: HomeSectionType.singleRowNormal,
                })
                sectionCallback(section)
                const $ = await this.fetchPage(s.url(1))
                section.items = this.toPartial(parseComicList($))
                sectionCallback(section)
            }),
        )
    }

    async getViewMoreItems(homepageSectionId: string, metadata: { page?: number } | undefined): Promise<PagedResults> {
        const section = SECTIONS.find((s) => s.id === homepageSectionId)
        if (!section) return App.createPagedResults({ results: [], metadata: undefined })

        const page = metadata?.page ?? 2
        const $ = await this.fetchPage(section.url(page))
        const items = parseComicList($)
        return App.createPagedResults({
            results: this.toPartial(items),
            metadata: items.length ? { page: page + 1 } : undefined,
        })
    }
}

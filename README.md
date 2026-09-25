# Baozimh for Paperback 0.8

Unofficial source extension for [Baozimh](https://www.baozimh.com) (包子漫畫), for the Paperback iOS reader.

Features: home sections (latest, Japan, Korea, China), search, manga details, chapter list, chapter pages.

## Publish it

1. Create a GitHub repo and push this folder to `main`.
2. Repo Settings → Pages → deploy from branch `gh-pages` (the workflow creates it on first push).
3. In Paperback: Settings → External Sources → Add Repo → `https://<your-username>.github.io/<repo-name>`.
4. Install **Baozimh** from the repo's source list.

## Develop

```bash
npm install
npm run bundle   # type-checks and builds ./bundles
npm run serve    # local dev server; add http://<your-ip>:8080 in Paperback
```

## If something breaks

All selectors and URL patterns are in `src/Baozimh/BaozimhParser.ts`; URL builders are at the top of `Baozimh.ts`.
Things worth checking first, since they were written without running against the live site:

- Search URL: `/search?q=`
- Paging on classify lists: `&page=N`
- Chapter reader URL: `/comic/chapter/<id>/<section>_<slot>.html`, and whether long chapters split across multiple pages
- Page image selector in `parsePages`

Use only for content you are legally permitted to access. The extension does not bypass logins, paywalls, or access controls.

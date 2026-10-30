# kukirim.com

Static brand homepage and product catalog for Kukirim, built with Astro and deployed on Cloudflare Pages.
`tools.kukirim.com` is a separate site and deployment; this repo only links to it.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Build to `dist/` |
| `npm run verify` | Type check (`astro check`), build, then `check:seo`. Run by CI |
| `npm run check:seo` | SEO/link checks on `dist/` (`scripts/check-seo.mjs`, same as kukirim-tools plus site rules) |
| `npm run check:launch` | Launch gate: fails while `draftPages` is non-empty or a page uses `<Placeholder>` |
| `npm run preview` | Serve the built site |
| `npm run images` | Regenerate OG image, logo PNG and apple-touch icon in `public/` |
| `npm run check:live -- <url>` | Read-only post-deploy checks (defaults to `https://kukirim.com`) |

`check:seo` (part of `verify`; errors fail CI) checks every built page for: `lang="id"`, a unique title (≤65 chars,
warning) and description (70–160 chars, warning), one `<h1>` and no skipped heading levels, `<img>` alt text, valid
JSON-LD, no client `<script>`. Indexable pages need a canonical equal to their URL, a sitemap entry, `og:title`,
`og:description`, `og:url` (= canonical), `og:image` (file must exist) and `og:image:alt`. Only `/404` and
`draftPages` may be `noindex`; they must have no canonical and no sitemap entry. Internal links must be absolute, end
in `/` (or a file extension) and resolve; `#` anchors must exist. Placeholders are errors on indexable pages, and a
missing space before a link is a warning.

`_headers`, the 404 status and trailing-slash redirects are only applied by Cloudflare Pages, so check them with
`check:live` against a deployed URL.

## Where things live

- `src/data/site.ts`: brand name, URL, contact email, and `draftPages` (noindex + draft banner + excluded from sitemap).
- `src/data/products.ts`: product cards. Add only verified products and features.
- `src/styles/global.css`: design tokens (colours, font, radius).
- `src/content/panduan/`: guides. Copy `_TEMPLATE.md` to add one; the Panduan nav item, homepage section, `/panduan/` index and sitemap entries appear automatically once a non-draft guide exists. After adding the very first guide, restart `npm run dev` (the empty-folder check runs once at startup). Set `updatedAt` when you revise a guide: the sitemap `lastmod` uses it, falling back to `publishedAt`.
- `public/_headers`: security headers, asset caching, noindex for `*.pages.dev` (a backup: `kukirim-web.pages.dev`
  redirects to kukirim.com, so it only applies to per-deployment `<hash>.kukirim-web.pages.dev` URLs).

## Trust pages and drafts

`/tentang/`, `/privasi/` and `/syarat-ketentuan/` were approved by the owner on 2026-10-29 and are indexable.
Privasi and Syarat follow the reviewed wording on tools.kukirim.com; re-review them whenever data handling changes
(e.g. before enabling analytics or ads).

To hold a page back while it awaits review, add its path to `draftPages` in `src/data/site.ts`: it then shows a
draft banner, gets `noindex`, and is excluded from the sitemap. Mark unconfirmed details with
`src/components/Placeholder.astro` (`[PERLU KONFIRMASI: …]`); `check:seo` fails if an indexable page contains one,
and `check:launch` blocks deployment while any draft or placeholder remains.

Current drafts and open placeholders: none.

Confirmed content decisions:

- Contact email: `halo@kukirim.com` (same address as tools.kukirim.com).
- Footer shows "© {year} Kukirim Digital" as a brand name; Tentang, Privasi and Syarat name Kukirim Digital as operator.
- Privasi and Syarat reuse the tools.kukirim.com wording for liability, analytics, rights and the last-updated date
  (26 Oktober 2026). There is no governing-law section and no email-retention period, matching tools.kukirim.com.

## Deployment (Cloudflare Pages)

Deployed by GitHub Actions, not by Cloudflare's Git integration, the same way as tools.kukirim.com.
`.github/workflows/ci.yml` has two jobs:

- `check` (pushes to `main` and pull requests): `npm ci`, `npm run verify`, then uploads `dist/`.
- `deploy` (pushes to `main` only): runs `npm run check:launch`, downloads the verified `dist/`, then runs
  `wrangler pages deploy dist --project-name=kukirim-web --branch=main` via `cloudflare/wrangler-action`.

No Wrangler config or `.wrangler/` folder lives in this repo. Node.js comes from `.nvmrc` (22.23.4; `engines` in
`package.json`).

One-time setup, done by the owner (nothing here changes DNS, redirects or analytics):

1. Create a **Direct Upload** Pages project named `kukirim-web` (or change `--project-name` in the workflow).
2. Add repository secrets `CLOUDFLARE_API_TOKEN` (Pages edit permission) and `CLOUDFLARE_ACCOUNT_ID`.
3. Add custom domain `kukirim.com` (canonical) and `www.kukirim.com` to the Pages project.
4. Redirect `www.kukirim.com/*` to `https://kukirim.com/$1` (301) with a Redirect Rule / Bulk Redirect. `_redirects` cannot do host redirects.
5. Redirect `kukirim-web.pages.dev/` to `https://kukirim.com/` (301) with an account-level Bulk Redirect (subpath
   matching, preserve path suffix and query string). Done 2026-10-31.
6. Web Analytics stays off: `/privasi/` states that no analytics are used. To enable it later, update the "Analitik, iklan, dan cookie" section first. The CSP in `_headers` already allows its beacon.
7. In Search Console, add `https://kukirim.com/` and submit `https://kukirim.com/sitemap-index.xml`.

## Launch checklist

Content:

- [x] Trust pages approved and removed from `draftPages` (2026-10-29).

Done locally:

- [x] `npm run verify` (astro check, build, check:seo) and `npm run check:launch`.
- [x] `check:live` passed 8/8 against a local Pages emulation on 2026-10-29 (headers, 404, trailing-slash redirect, sitemap, noindex, outbound links).
- [x] Layout at 360px and 1280px; colour contrast meets WCAG AA in light and dark themes (lowest 5.38:1).
- [x] Lighthouse 13.5 (mobile) scored 100 for performance, accessibility, best practices, and SEO on all 8 indexable pages against `astro preview` (2026-10-29).

Pending until deployed:

- [ ] Direct Upload project `kukirim-web`, repository secrets, first push to `main` (deploy job green).
- [ ] `npm run check:live` against the production URL (adds http→https and www→apex 301 checks).
- [x] `kukirim-web.pages.dev` returns a 301 to the same path on `https://kukirim.com/` for every path (2026-10-31).
- [ ] `npm run check:live -- https://<hash>.kukirim-web.pages.dev` (a deployment URL, which is not redirected; checks
  `X-Robots-Tag: noindex`).
- [ ] Lighthouse (mobile) re-run on the production URL (the local run does not apply `_headers`).
- [ ] Screen-reader pass (VoiceOver iOS/macOS or TalkBack): skip link, nav, headings, link names.
- [ ] Rich Results Test for the Organization/WebSite JSON-LD on `/`.
- [ ] Search Console: property verified, sitemap submitted, `/` inspected.

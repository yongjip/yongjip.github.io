# yongjip.github.io

Portfolio site for Yongjip Kim, rebuilt as an Astro static site with React available for future interactive islands.

## Stack

- Astro static output
- React available for component islands and future app-like features
- MDX content collections for bilingual case studies and methods
- Mermaid as diagram source, prebuilt PNG as the published diagram format
- GitHub Actions for build and Pages deployment

## Information Architecture

Canonical routes:

- `/`
- `/ko/`
- `/work/`
- `/ko/work/`
- `/methods/`
- `/ko/methods/`
- `/work/text-to-sql/`
- `/ko/work/text-to-sql/`
- `/work/warehouse-optimization/`
- `/ko/work/warehouse-optimization/`
- `/methods/seasonality-index/`
- `/ko/methods/seasonality-index/`

Legacy `.html` URLs are preserved as thin redirect files under `public/`.

## Content Model

Collections live under `src/content/`:

- `src/content/work/en/*.mdx`
- `src/content/work/ko/*.mdx`
- `src/content/methods/en/*.mdx`
- `src/content/methods/ko/*.mdx`

Shared route, metadata, and language-link logic lives in `src/lib/` and `src/data/`.

## SEO And Discovery

The site ships a static SEO baseline suitable for GitHub Pages:

- clean self-canonical routes
- bilingual `hreflang` links with `x-default`
- shared `og:*` and `twitter:*` metadata
- JSON-LD structured data for home, archive, and detail pages
- `robots.txt` with sitemap reference
- Astro sitemap generation with per-URL `lastmod` values derived from git history

Current SEO helpers live in:

- `src/lib/seo.ts`
- `src/layouts/BaseLayout.astro`
- `scripts/sitemap-lastmod.mjs`

## Diagram Workflow

- Mermaid source files live in `resources/diagrams/*.mmd`
- Mermaid rendering is configured in `resources/diagrams/mermaid-config.json`
- Generated production assets are written to `public/resources/diagrams/`
- Regenerate them with `npm run build:diagrams` or `./scripts/build-diagrams.sh`
- Published pages reference only the generated PNG assets

## Commands

Requires Node `22.12.0` or newer. `.nvmrc` is pinned to `22.12.0`.

```bash
npm install
npm run dev
npm run check
npm run build:diagrams
npm run build
npm run preview
```

## Analytics

Cloudflare Web Analytics is wired into the shared layout and can be enabled by setting:

```bash
PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_site_token
```

For local testing, add it to a local `.env` file. For GitHub Actions / Pages deployment, add it as a repository variable or environment variable used during the build.

Once the token is set, the Cloudflare beacon will be injected site-wide from the shared layout.

Google Analytics 4 can also be enabled by setting:

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

This uses the standard site-wide `gtag.js` snippet from the shared layout.

## Documentation

- `design-system.md`: site principles, URL policy, naming rules, and layout language
- `docs/authoring-playbook.md`: repeatable workflow for adding pages, editing content, updating diagrams, QA, and future LLM-agent guardrails

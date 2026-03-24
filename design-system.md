# Portfolio Design Notes

This site is designed as a small, bilingual portfolio for Yongjip Kim.

It is intentionally simple. The goal is not to behave like a product site or a startup landing page. It is meant to read more like a clear professional brief: a short introduction, selected work, a concise experience summary, and a few supporting methods.

## Design Direction

The current direction is best described as a `systems memo`.

It should feel closer to a researcher or operator homepage than to a designer portfolio.

Core traits:

- quiet, document-like backgrounds
- strong but non-display typography
- dense scanning on archive pages
- memo-style detail-page framing
- low-hype, low-template presentation

The intent is to make the work easy to scan and easy to trust.

## Page Types

The site uses three page types.

### Home

The home page is a front page, not the main archive.

Current structure:
1. header
2. hero
3. selected work
4. experience
5. methods
6. footer

Its job is to establish identity, credibility, and direction into the real archives.

### Case Pages

Case pages are used for project writeups such as Text-to-SQL and Warehouse Optimization.

Current structure:
1. header
2. back link
3. article header
4. overview
5. core mechanism or workflow
6. results
7. takeaways
8. related pages
9. footer

These pages should read like short internal memos first, and full writeups second.

### Method Pages

Method pages are used for shorter planning or modeling notes such as Seasonality Index.

Current structure:
1. header
2. back link
3. article header
4. overview
5. method
6. why it matters
7. source
8. related pages
9. footer

## Navigation

The header is intentionally minimal, but it now carries stable internal navigation as well.

It is reserved for:

- Home
- Work
- Methods
- LinkedIn profile
- GitHub profile
- language switch

Project discovery happens inside the page through:

- featured work on home
- work and methods archives
- related pages plus back links on detail pages

This keeps the global navigation stable while letting the content carry the browsing flow.

## URL Strategy

The site now uses clean canonical routes.

English:

- `https://yongjip.github.io/`
- `https://yongjip.github.io/work/`
- `https://yongjip.github.io/methods/`

Korean:

- `https://yongjip.github.io/ko/`
- `https://yongjip.github.io/ko/work/`
- `https://yongjip.github.io/ko/methods/`

This keeps metadata, navigation, and language links aligned around one route system instead of mixing root pages with ad hoc file names.

## Project Naming

Projects may use two levels of naming when a full page title is too long for compact contexts.

For the warehouse project:

- short display title: `Graph-Based Warehouse Optimization and Simulation`
- full page title: `Building a Graph-Based Warehouse Optimization and Simulation Workflow`

Korean uses:

- short display title: `창고 그래프 기반 최적화 및 시뮬레이션`
- page title: `창고 그래프 기반 최적화 및 시뮬레이션`

Use the short display title in compact contexts such as:

- home work cards
- other list-based navigation

Use the full page title in page-level contexts such as:

- page `<title>`
- `og:title`
- `twitter:title`
- the page `h1` when the longer title is part of the case framing

## Article Header Pattern

Case and method pages share the same article-header pattern.

Each page opens with:

1. a page label
2. a title
3. one short summary paragraph
4. two short fact items

This pattern exists to handle long titles naturally and give direct visitors enough context before the body starts.

The fact row is intentionally plain. It is not treated as a set of badges or cards.

## Layout Rules

The site uses a few structural rules to stay consistent.

### Width Lanes

The site uses exactly three width layers:

- `shell`: page margins and overall container width
- `reading`: default width for text-first content
- `wide`: wider content such as diagrams and metric grids

Use `reading` for:

- hero copy
- archive rows
- article summary
- fact rows
- section intros
- detail stacks
- source lists

Use `wide` only for content that actually benefits from extra horizontal space:

- diagrams
- metric grids
- rare paired comparison blocks

Apply lane changes at the section level, not inside child components. Diagrams and metric grids should inherit their section width, and only sections that genuinely benefit from extra width should opt into the `wide` lane.
Metric cards should read as compact evidence blocks inside the section lane, not as full-row panels stretched to the shell. Let them wrap within the lane instead of forcing equal-width columns across the entire row.

Do not add one-off `max-width` rules for individual sections unless there is a concrete, visual reason that cannot be handled by one of these three layers.

Note: `lane="wide"` is primarily used to allow diagrams and metric grids to expand. Text inside the section should still read like a document and stay aligned to the reading lane by default.

### Home

- selected work is a small preview, not a full archive
- experience should remain a compact credibility list
- methods should remain a quiet preview with minimal weight

### Detail Pages

- default to single-column reading flow
- use two columns only for naturally paired content
- use full-width treatment for diagrams when helpful
- article header and body text should share the same reading lane
- metrics and diagrams may break wider, but text blocks should not invent separate width systems

Good uses of two columns include:

- starting point and current scope
- problem and approach
- context and approach

The main rule is simple: layout should help the reading order, not compete with it.

### Archives

- `Work` is the main archive and should use dense memo rows, not showcase cards
- `Methods` should use the same information grammar, but quieter
- archive pages should feel faster and more index-like than home

## Section Vocabulary

The site intentionally uses a small shared section vocabulary.

English:

- `Overview`
- `Workflow`
- `Method`
- `Results`
- `Takeaways`
- `Why it matters`
- `Source`

Korean:

- `개요`
- `워크플로우` or `흐름`
- `방법`
- `결과`
- `배운 점`
- `왜 중요한가`
- `원문`
- `관련 작업`

Pages should stay close to this shared set and only use labels from the allowed vocabulary enforced by `npm run check` (`scripts/check-site-consistency.mjs`). If a new label is needed, add it deliberately to the allow-list rather than inventing one-off wording.

## Components

The current site is built around a small set of reusable Astro components and a shared global stylesheet in [`src/styles/global.css`](./src/styles/global.css).

Core page-shell components:

- `SiteHeader`
- `SiteFooter`
- `WorkCard`
- `MethodList`
- `BriefList`
- `ResponsiveDiagram`

### Content Primitives (MDX)

All `Work` and `Methods` detail content should be composed from the shared primitives under `src/components/content/`.

Primitives:

- `DetailSection` (required)
- `DetailColumns`
- `DetailStack`
- `DetailItem`
- `DetailCopy`
- `MetricGrid`
- `MetricItem`
- `SourceList`
- `SourceItem`

These components intentionally render the stable class-based structure (`detail-section`, `metric-grid`, etc.) so styling stays centralized in `global.css` while the authoring model stays consistent.

Forbidden patterns in MDX:

- Do not handwrite `<section class="detail-section ...">`.
- Do not handwrite `<p class="section-label">...</p>`.
- Do not add `detail-section-wide` manually. Use `lane="wide"` on `DetailSection`.
- Do not generate labels dynamically. `label` must be a double-quoted string literal.

Section labels are enforced by `scripts/check-site-consistency.mjs` via `npm run check`.

New pages should reuse these patterns before introducing new ones.

## Authoring Model

The published site is generated from Astro content collections rather than handwritten standalone HTML files.

Current collections:

- `work`
- `methods`

Each entry is language-specific and paired through a shared stable `id`.

This allows the site to keep:

- clean canonical routes
- reusable page shells
- consistent metadata
- stable related-page links
- bilingual parity without duplicating templates

For the step-by-step editing and review workflow, see [`docs/authoring-playbook.md`](./docs/authoring-playbook.md).

## Diagrams

Diagrams may use Mermaid as an authoring format, but not as a production rendering path.

For this site:

- Mermaid source files live in `resources/diagrams/*.mmd`
- Mermaid rendering is controlled by `resources/diagrams/mermaid-config.json`
- published assets are generated into `public/resources/diagrams/`
- production pages should not load Mermaid in the browser

This keeps diagrams editable while avoiding browser-dependent clipping and layout drift.

When diagrams are updated:

- edit the Mermaid source
- regenerate the PNG assets with `npm run build:diagrams`
- keep the published pages pointing at the generated raster files

## Typography and Color

The type system is simple:

- Fraunces for English headings
- IBM Plex Sans / IBM Plex Sans KR for body text
- IBM Plex Sans KR for Korean headings

The color system is defined in CSS custom properties and is meant to stay stable across pages.

The palette is built around:

- warm background tones
- dark neutral text
- muted secondary text
- restrained accent color
- subtle divider lines

Strong visual color blocks are intentionally avoided.

## Copy Style

The writing style follows the same principles as the layout:

- factual
- compact
- specific
- low on self-promotion

Pages should prefer:

- what was built
- why it mattered
- what changed
- what is still limited

The site should not read like marketing copy. It should read like explainable work.

## External Links

External profile links are written explicitly so they do not look like internal navigation.

Examples:

- `LinkedIn profile`
- `GitHub profile`
- `View LinkedIn profile`
- `View GitHub profile`

Profile links open in a new tab.

## Footer Roles

The home footer should stay minimal.

It should work as a quiet closing note rather than a second navigation bar. For that reason,
the home page should not repeat LinkedIn and GitHub profile links that already appear in the header.

Detail-page footers may still include utility links such as:

- home
- LinkedIn profile
- GitHub profile

## Bilingual Structure

English and Korean pages are kept structurally parallel.

The goal is not literal translation. Some English terms remain in Korean pages when they are clearer or more natural in context. The priority is readability, not mechanical symmetry.

## Modal Guidance

Modals are possible, but they are not a default pattern for this site.

They are most appropriate for supplementary content such as:

- enlarging a diagram
- enlarging an image
- previewing a visual asset

They are not a good fit for core content such as:

- main project descriptions
- experience summaries
- navigation

If a piece of information matters to understanding the page, it should stay in the page itself.

## Metadata

Each page should have:

- `title`
- `meta description`
- `meta robots`
- `canonical`
- `hreflang` alternates
- `og:title`
- `og:description`
- `og:site_name`
- `og:locale`
- `og:url`
- `twitter:title`
- `twitter:description`
- JSON-LD structured data

The site should also publish a sitemap with per-URL `lastmod` values so search engines can
see which pages changed most recently.

Metadata should match the visible framing of the page rather than describing the entire site in generic terms.

## What This Site Should Feel Like

This site should feel like:

- a clear professional brief
- selected work with supporting methods
- a data and systems portfolio

It should not feel like:

- a startup landing page
- a card-heavy template
- a generic AI-generated portfolio

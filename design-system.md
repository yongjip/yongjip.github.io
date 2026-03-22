# Portfolio Design Notes

This site is designed as a small, bilingual portfolio for Yongjip Kim.

It is intentionally simple. The goal is not to behave like a product site or a startup landing page. It is meant to read more like a clear professional brief: a short introduction, selected work, a concise experience summary, and a few supporting methods.

## Design Direction

The site follows a restrained visual direction:

- warm, quiet backgrounds instead of high-contrast themes
- strong typography, but limited decorative treatment
- clear section hierarchy over visual effects
- document-like detail pages rather than poster-like heroes

The intent is to make the work easy to scan without making the site feel generic or over-designed.

## Page Types

The site uses three page types.

### Home

The home page introduces the overall profile and serves as the main navigation point.

Current structure:
1. header
2. hero
3. selected work
4. experience
5. methods
6. footer

Only the selected work section uses stronger visual emphasis.

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
8. related work
9. footer

These pages are written to be readable as standalone entry points.

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
8. related work
9. footer

## Navigation

The header is intentionally minimal.

It is reserved for:

- LinkedIn profile
- GitHub profile
- language switch

Project links do not appear in the global header. Project discovery happens inside the page through:

- the home hero CTA
- selected work cards
- related work links

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

Legacy `.html` URLs remain available only as redirect stubs. They should not be treated as canonical.

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
- related work links
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

### Home

- selected work may use cards
- experience should remain a quiet list
- methods should remain a quiet list

### Detail Pages

- default to single-column reading flow
- use two columns only for naturally paired content
- use full-width treatment for diagrams when helpful
- keep related work visually quiet

Good uses of two columns include:

- starting point and current scope
- problem and approach
- context and approach

The main rule is simple: layout should help the reading order, not compete with it.

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
- `Related work`

Korean:

- `개요`
- `워크플로우` or `흐름`
- `방법`
- `결과`
- `배운 점`
- `왜 중요한가`
- `원문`
- `관련 작업`

The exact wording may vary slightly when needed, but pages should stay close to this shared set.

## Components

The current site is built around a small set of reusable Astro components and a shared global stylesheet in [`src/styles/global.css`](./src/styles/global.css).

Core structural components:

- `site-header`
- `top-nav`
- `lang-switch`
- `hero-home`
- `article-header`
- `article-summary`
- `article-facts`
- `work-grid`
- `brief-list`
- `method-list`
- `detail-section`
- `detail-columns`
- `detail-stack`
- `metric-grid`
- `related-list`
- `site-footer`

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
- stable related-work links
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
- `canonical`
- `og:title`
- `og:description`
- `og:url`
- `twitter:title`
- `twitter:description`

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

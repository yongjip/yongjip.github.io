# Authoring Playbook

This document captures the working method used to shape and maintain this portfolio.

It is meant to be reusable. When adding a new case page, refining an existing page, or updating diagrams, follow this workflow instead of making ad hoc changes page by page.

## 1. Start With The Message

Before changing layout or styling, decide three things:

- what the page is for
- what the reader should understand in the first 20 to 30 seconds
- what level of detail is actually needed

For this site, the default is:

- simple
- factual
- useful
- not over-claimed
- easy to scan before it asks for close reading

If a sentence sounds like it belongs in a startup landing page, it is usually wrong for this portfolio.

## 2. Pick A Page Type First

Do not invent a new page structure unless the content really demands it.

The site uses three page types:

- `Home`
- `Case page`
- `Method page`

Use the existing structure for each type.

### Home

Order:

1. header
2. hero
3. selected work
4. experience
5. methods
6. footer

Use home as a front page only. It should not become the main archive.

### Case Page

Order:

1. header
2. back link
3. article header
4. overview
5. core mechanism or workflow
6. results
7. takeaways
8. related work
9. footer

Case pages should read memo-first:

- short executive framing at the top
- structured depth below
- clear return path back to the archive

### Method Page

Order:

1. header
2. back link
3. article header
4. overview
5. method
6. why it matters
7. source
8. related work
9. footer

## 3. Keep The Header Brief

Detail pages should open with a brief-style header, not a poster-style hero.

The header should contain:

- page label
- title
- one short summary paragraph
- two short fact items

Use the facts row to carry context that would otherwise make the title or summary too long.

Examples:

- scope
- status
- result
- format
- planning use

## 4. Use Short And Full Titles Intentionally

Some projects need two title lengths.

Use:

- a short display title for compact contexts
- a full page title for metadata and page-level contexts

Compact contexts include:

- home work cards
- related work links
- list-based navigation

Page-level contexts include:

- page `h1`
- browser title
- `og:title`
- `twitter:title`

If a long title looks awkward in a compact context, do not force it. Define a shorter display title instead.

## 5. Default To Single-Column Reading Flow

Most detail pages should read like a document.

Default rule:

- single-column by default
- two columns only for clearly paired content

Good two-column pairs:

- starting point and current scope
- problem and approach
- context and implication

Do not use multi-column layout just to create visual variety.

## 6. Diagram Rule: Mermaid As Source, PNG In Production

This repo uses Mermaid as the editable source format for diagrams, but not as the production rendering path.

Why:

- production Mermaid rendering caused clipping and browser inconsistency
- prebuilt raster assets are more stable for this site
- this portfolio has only a few diagrams, so edit convenience still remains acceptable

Source of truth:

- `resources/diagrams/*.mmd`

Rendering config:

- `resources/diagrams/mermaid-config.json`

Production assets:

- `resources/diagrams/*.png`

Build command:

```bash
./scripts/build-diagrams.sh
```

### When A Diagram Should Exist

Use a diagram only if it helps explain structure faster than text.

Good fits:

- system flow
- graph construction flow
- staged decision workflow

Bad fits:

- content that is already obvious as a list
- diagrams that only restate section headings
- tiny linear flows that become oversized without adding clarity

### When To Split Diagram Variants

If a single diagram is awkward across breakpoints, use different assets for desktop and mobile.

Typical case:

- desktop: left-to-right flow
- mobile: top-to-bottom flow

This is better than forcing one layout to do both jobs badly.

Use explicit variant names when doing this:

- `project-en-desktop`
- `project-en-mobile`
- `project-ko-desktop`
- `project-ko-mobile`

## 7. Keep Copy Tight

Default rules:

- summary: one short paragraph
- facts: exactly two items
- section intros: one short paragraph at most
- related work: short description only
- archive rows: one scan sentence plus one proof line

Try to avoid:

- too many labels
- stacked metrics without a real reason
- repeating the same claim in hero, body, and footer

On archive pages, prefer denser rows over more decorative card treatment.

## 8. Preserve Navigation Roles

Do not let the same link appear everywhere without a reason.

Current roles:

- header: stable external profile links and language switch
- home body: project discovery
- detail pages: back link plus related work
- home footer: quiet close, not duplicate navigation

When a link appears in multiple places, each placement should have a distinct job.

## 9. Local Preview Workflow

For local testing, use the Astro dev server.

Example:

```bash
npm run dev
```

Then open:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/ko/`

For production-style local testing, use:

```bash
npm run build
npm run preview
```

Legacy `.html` redirects are preserved in `public/`, but the authoring model should treat the clean routes as the real page structure.

## 10. QA Checklist Before Finishing

### Structure

- correct page type used
- correct section order
- no duplicate navigation roles

### Copy

- title length is appropriate for context
- summary is short and clear
- no over-claiming
- EN and KR pages feel parallel, not mechanically translated

### Links

- language switch stays within the same page family
- related work links point to same-language pages
- external profile links open the correct profile

### Diagrams

- production page uses PNG asset, not live Mermaid
- diagram is readable on desktop and mobile
- no clipped labels
- no unnecessary white box or styling mismatch

### Metadata

- `title`
- `canonical`
- `og:title`
- `og:description`
- `og:url`
- `twitter:title`
- `twitter:description`

Metadata should match the visible page framing.

## 11. Improvement Priorities

When reviewing the site, improve in this order:

1. information clarity
2. consistency
3. responsiveness
4. visual polish
5. automation

Do not jump to visual polish while the structure is still uneven.

## 12. Current Automation And Remaining Gaps

The site already uses GitHub Actions for build and Pages deployment.

Current automated path:

- install dependencies
- build Mermaid diagram PNG assets
- run `astro check`
- run Astro static build
- deploy GitHub Pages

Still worth adding later:

- Lighthouse CI for a small quality gate
- a lightweight screenshot or DOM regression check for key pages
- a check that no production page loads Mermaid in the browser

Automation should support the content model, not replace manual judgment about hierarchy, copy, and page role.

## 13. LLM Agent Best Practices

Future LLM agents working in this repo should follow these rules.

### Treat Astro As The Source Of Truth

Do not reintroduce handwritten root HTML pages as the primary implementation.

The real site lives in:

- `src/pages/`
- `src/components/`
- `src/content/`
- `src/styles/`

Only keep legacy `.html` files as redirect stubs under `public/`.

Do not edit `dist/` manually.

### Respect The Current Stack Constraints

This site currently assumes:

- Astro `6.x`
- Node `22.12.0` or newer
- content collections loaded explicitly through `glob()` loaders
- Mermaid used as source only, PNG used in production

If Astro is upgraded again, check the official upgrade guide first and verify:

- Node version requirements
- content collection API changes
- integration version compatibility
- build and deploy workflow compatibility

### Do Not Break The Collection Model

The content model is intentionally split into:

- `work`
- `methods`

Each entry is language-specific and paired by a shared `id`.

Important rule:

- preserve the current collection directories under `src/content/`
- preserve explicit collection loaders in `src/content.config.ts`
- preserve clean route generation from `data.id`

Do not flatten EN and KR into one file unless the authoring model is intentionally redesigned.

### Keep Route Logic Clean

Canonical routes should stay clean:

- `/`
- `/ko/`
- `/work/`
- `/ko/work/`
- `/methods/`
- `/ko/methods/`

When adding new pages:

- use clean routes as canonical
- preserve legacy `.html` URLs only through redirect stubs if backward compatibility matters
- keep language switches inside the same page family

Do not mix canonical clean routes with file-style navigation in normal page components.

### Preserve The Navigation Roles

The header is intentionally small.

It is for:

- LinkedIn profile
- GitHub profile
- language switch

Project discovery belongs in page content, not in the global header.

If a link appears in both header and footer, there must be a distinct reason. Avoid duplicate navigation by default.

### Prefer Scan Hierarchy Over More Prose

This portfolio is moving toward a skim-first model.

When improving a page, prefer:

- clearer headings
- better card or list scan order
- shorter summary text
- stronger proof lines

Avoid solving every clarity problem by adding more explanatory paragraphs.

### Use Different Separation Rules For Different Levels

Do not use the same divider pattern for:

- major sections
- repeated list items
- intra-item content

Major sections should be separated mostly by spacing.
Repeated items may use soft dividers.
Paragraphs inside an item should rely on typography and spacing only.

### Treat `Work` And `Methods` As Different, But Related

`Work` is the main archive.
`Methods` is a quieter supporting archive.

That means:

- `Work` can use stronger cards
- `Methods` should stay list-like or quieter
- both should still share the same information grammar

Do not make `Methods` feel like a second full portfolio homepage.

### Diagrams: Edit Source, Ship Assets

If a diagram changes:

1. update the Mermaid source in `resources/diagrams/`
2. regenerate PNG assets
3. verify the page references the PNG output
4. check desktop and mobile variants where applicable

Do not put live Mermaid back into production pages to save time.

If a flow becomes visually awkward, prefer:

- a desktop/mobile asset split
- a simpler layout
- a different explanatory pattern

not runtime Mermaid tweaks.

### Verify Before Declaring Success

Minimum check for meaningful changes:

- `npm run check`
- `npm run build`

If the change affects routes, content, or diagrams, also verify:

- target pages exist in the build output
- collections are not empty
- diagram assets are generated
- local preview still works

If a build passes but pages silently disappear, treat that as a regression.

### Update The Docs When The Working Method Changes

If an LLM agent changes how the site is authored or built, update at least one of:

- `README.md`
- `design-system.md`
- `docs/authoring-playbook.md`

Do not leave a new workflow undocumented.

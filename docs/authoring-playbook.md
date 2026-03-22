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

Try to avoid:

- too many labels
- stacked metrics without a real reason
- repeating the same claim in hero, body, and footer

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

## 12. Future Automation

Two improvements are worth adding later:

- GitHub Actions build and deploy workflow
- Lighthouse CI for a small quality gate

Good candidates for automation:

- build diagram assets from Mermaid source
- verify no production page loads Mermaid in the browser
- run a small regression check on key pages

These are useful, but only after the manual workflow is stable.

# Stack Best Practices

This document captures the current best-practice baseline for the stacks used in this repo, based on the codebase and official docs reviewed on 2026-03-24.

Current stack:

- Astro 6 with `output: "static"`
- MDX content collections
- React 19 for optional interactive islands
- TypeScript in strict mode via `astro/tsconfigs/strict`
- Mermaid CLI for diagram source and PNG generation

These rules are intentionally repo-specific. If a generic framework pattern conflicts with this portfolio's content-first architecture, follow this document.

## Core Principles

- Default to static HTML and server-rendered content.
- Add client-side JavaScript only when a user interaction clearly needs it.
- Keep content typed and schema-validated.
- Prefer small shared primitives over page-specific abstractions.
- Preserve EN and KO structure parity unless there is a concrete reason not to.

## Astro

Astro is the primary architecture, not just the build tool.

- Prefer `.astro` for pages, layouts, and non-interactive components.
- Keep the site content-driven and server-first. This repo is a portfolio, not an SPA shell.
- Preserve `output: "static"` unless a real product requirement forces on-demand rendering.
- Use islands selectively. In Astro, an island is an interactive component on an otherwise static page, and Astro's default is to render framework components without client hydration unless you opt in.
- Choose the lightest hydration directive that works:
  - `client:load` only for immediately visible UI that must be interactive right away
  - `client:idle` for lower-priority interaction
  - `client:visible` for below-the-fold or heavy UI
  - `client:only` only when server rendering is not viable
- Keep route, metadata, and collection logic in shared helpers such as `src/lib/` instead of duplicating it per page.
- Avoid `set:html` unless the source is trusted or sanitized first.
- Favor Astro's built-in page structure and component composition before adding custom runtime complexity.

## Content Collections And MDX

The content system is a first-class part of the architecture.

- Treat `src/content.config.ts` as the schema contract. Add or change fields there before authoring content that depends on them.
- Keep frontmatter complete, explicit, and consistent across languages.
- Maintain the current content grammar unless there is a deliberate design decision to change it:
  - `facts` stays exactly two items
  - `kind`, `lang`, `related`, and ordering metadata stay normalized
- Use MDX for authored longform content with occasional embedded components.
- Do not turn MDX entries into mini applications. If logic becomes substantial, move it into an Astro or React component and import it.
- Prefer importing Astro components into MDX. Import React components only when interactivity is required, and remember that UI framework components need an explicit `client:*` directive when hydrated.
- Keep MDX configuration simple. Add remark/rehype plugins only for a clear editorial or rendering need.
- Preserve bilingual slug parity whenever the content represents the same project or method.

## React

React is available here as an island tool, not as the main rendering model.

- Use React only for isolated interactive behavior, browser state, or UI that genuinely benefits from client rendering.
- Do not move page shells, archive rendering, or document-like content into React when Astro already handles them well.
- Keep React components pure and idempotent:
  - no side effects during render
  - no mutation of props or shared values during render
  - effects only for real post-render synchronization
- Pass serializable props from Astro into React islands.
- Keep each island narrow in scope. One interaction boundary is better than one page-sized client bundle.
- Remove placeholder islands if they are no longer needed. Avoid keeping React around by habit.

## TypeScript

TypeScript is part of the content safety model, not just editor convenience.

- Keep strict mode enabled.
- Avoid `any`, broad type assertions, and duplicate shape definitions.
- Let collection schemas define content shapes, then infer types from Astro content APIs where possible.
- Keep shared data and route helpers typed at the boundary, especially in `src/lib/` and `src/data/`.
- Prefer explicit unions and enums for language, content kind, and other closed sets.
- If a type is hard to express cleanly, simplify the API before weakening the type contract.

## Mermaid Diagrams

This repo already uses the right production pattern: Mermaid as source, PNG as published asset.

- Treat `resources/diagrams/*.mmd` as the editable source of truth.
- Treat `public/resources/diagrams/*.png` as production output.
- Do not render Mermaid live on the published page unless there is a strong reason to accept browser inconsistency.
- Use diagrams only when they explain structure faster than prose.
- Keep labels short and layouts readable at the actual page size, not just in the editor.
- Split desktop and mobile variants when one layout does not survive both breakpoints cleanly.
- Regenerate diagram assets after every diagram edit with `npm run build:diagrams`.
- Watch for Mermaid flowchart syntax edge cases called out in the official docs, especially lowercase `end` and links that start with `o` or `x`.

## Build, QA, And Maintenance

- Use the repo-pinned Node version or newer compatible version. The current minimum is Node `22.12.0`.
- Run `npm run check` before shipping content or code changes.
- Run `npm run build` before merge or deploy to catch static build issues.
- If diagrams changed, include `npm run build:diagrams` in the validation path.
- Preview visual changes locally when layout, MDX imports, diagrams, or language links change.
- Keep static-output assumptions in mind for GitHub Pages compatibility.

## Recommended Decision Rules

When adding something new, use this order:

1. Plain content in MDX if it is mostly narrative.
2. Shared Astro component if it is reusable presentation without client state.
3. React island only if interaction or browser APIs are necessary.
4. New build-time tooling only if the existing Astro + MDX + scripts flow cannot support the need cleanly.

## References

- [Astro: Why Astro?](https://docs.astro.build/en/concepts/why-astro/)
- [Astro: Islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Astro: Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro: MDX integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro: Template directives reference](https://docs.astro.build/en/reference/directives-reference/)
- [Astro: Develop and build](https://docs.astro.build/en/develop-and-build/)
- [React: Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure)
- [TypeScript: `strict`](https://www.typescriptlang.org/tsconfig/strict.html)
- [MDX docs](https://mdxjs.com/docs/)
- [Mermaid: CLI](https://mermaid.js.org/config/mermaidCLI)
- [Mermaid: Flowchart syntax](https://mermaid.js.org/syntax/flowchart.html)

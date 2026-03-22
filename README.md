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

## Documentation

- `design-system.md`: site principles, URL policy, naming rules, and layout language
- `docs/authoring-playbook.md`: repeatable workflow for adding pages, editing content, updating diagrams, QA, and future LLM-agent guardrails

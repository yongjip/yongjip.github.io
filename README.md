# yongjip.github.io

Portfolio site for Yongjip Kim.

This repository hosts a simple static site focused on:

- personal positioning around data platforms, analytics workflows, and AI-assisted internal tools
- project writeups and method notes
- a lightweight GitHub Pages setup that can be iterated quickly without a framework

Current pages:

- `index.html`: English home page served as `https://yongjip.github.io/`
- `index-ko.html`: Korean home page and portfolio overview
- `text-to-sql.html`: detailed project page for the AI-powered Text-to-SQL system
- `text-to-sql-ko.html`: Korean version of the Text-to-SQL case study
- `warehouse-optimization.html`: warehouse graph and simulation case study
- `warehouse-optimization-ko.html`: Korean version of the warehouse case study
- `seasonality-index.html`: method note on product-level seasonality and planning logic
- `seasonality-index-ko.html`: Korean version of the seasonality method note

Diagram workflow:

- Mermaid source files live in `resources/diagrams/*.mmd`
- Mermaid rendering is configured in `resources/diagrams/mermaid-config.json`
- Production diagram assets are prebuilt PNG files in `resources/diagrams/`
- Regenerate the published diagram assets with `./scripts/build-diagrams.sh`
- Published pages should reference the generated PNG assets, not Mermaid runtime output
- Mermaid is an authoring format only for this site. Production pages do not execute Mermaid in the browser.

Site guidance:

- `design-system.md`: page templates, URL policy, naming rules, navigation rules, and copy guidelines for keeping the site consistent
- `docs/authoring-playbook.md`: reusable workflow for adding pages, updating diagrams, and reviewing site quality

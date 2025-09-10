# Product Requirement Document - NoDaysIdle Blog

## Overview

- Purpose: deliver a multi-language AI Ethics blog using Astro with Netlify deployment, Admin Dashboard for content operations, SEO-first architecture, anonymous authorship, and a dark purple/black aesthetic based on the new visual reference (replacing the prior 22292F-led palette).[^3_2][^3_1]
- The existing content inventory and site behavior (EN/IT/SL articles, search, language switching, featured images) are preserved, with the implementation migrated to Astro and rethemed to the new color direction.[^3_1][^3_2]


## Goals

- Replatform the site to Astro for fast static/SSR rendering, componentized UI, and content collections while maintaining the established multi-language structure and reading experience.[^3_2][^3_1]
- Deploy on Netlify with CI/CD from the repo, enabling preview builds and simple environment configuration without introducing tracking by default.[^3_7][^3_1]
- Implement an Admin Dashboard to manage posts, languages, publishing cadence, and media, supporting the existing 10-post plan and three‑day release rhythm with anonymous authorship.[^3_1][^3_2]


## Non-goals

- No newsletter or email capture at launch; omit signup UI and related data processing to keep the experience compliant and minimal.[^3_7][^3_2]
- No shift away from anonymous authorship, and no author bios or personal profiles will be added.[^3_2][^3_1]


## Scope

- In scope: Astro migration, Netlify deployment, Admin Dashboard, SEO upgrades (sitemap, robots, structured data, hreflang), purple/black retheme, and integration of the first post assets in EN/IT/SL.[^3_1][^3_2]
- Out of scope: adding third‑party analytics by default; any analytics, if later enabled, must be disclosed and follow the style guide’s transparency principle.[^3_7][^3_1]


## Tech stack

- Framework: Astro with file-based content collections for EN/IT/SL markdown, preserving the current multi-language mapping and naming conventions.[^3_2][^3_1]
- Hosting/CI: Netlify as the primary deployment target with branch previews and production deploys on main, replacing previous static-only flows.[^3_1][^3_2]
- Content format: Markdown per language, with images and datasets stored alongside posts as already organized in the repository’s blog folders.[^3_2][^3_1]


## Content and assets

- First post: “The Mirror Effect” in English, Italian, and Slovenian, using the existing markdown files for immediate integration in Astro’s content pipeline.[^3_4][^3_6][^3_3]
- Dataset: ai_scapegoating_data.csv remains the source for the first post’s visuals, preserving the current data story.[^3_5][^3_2]
- Future posts: maintain the total of 10 posts and stage remaining nine entries for the three‑day cadence across all three languages.[^3_1][^3_2]


## Visual and branding

- Palette: replace the prior tokens (e.g., 22292F and related variables) with a new purple/black, neon-accent look aligned to the provided reference image; update CSS variables and theme tokens accordingly while preserving AA contrast and accessibility.[^3_7][^3_2]
- Typography: headings remain Montserrat (Inter var acceptable), body stays Merriweather/Georgia, and existing typographic rhythm (line height and max width) is preserved in Astro layouts.[^3_7][^3_1]
- Logo and anonymity: continue using the geometric logo in the header and keep bylines removed across index and post templates.[^3_7][^3_1]


## Functional requirements

- Multi-language UX: language switching across EN/IT/SL on every post using Astro routes and per-language slugs, maintaining the current reader behavior and badges.[^3_2][^3_1]
- Search: keep fast, client-side search on the homepage grid with language indicators and featured images, ported into Astro components.[^3_1][^3_2]
- Accessibility: WCAG 2.2 AA for color contrast, focus states, alt text, and semantic HTML, carried forward into Astro pages and components.[^3_7][^3_1]


## Admin Dashboard

- Admin area: create an authenticated /admin interface in Astro to manage posts, translations, scheduled publish dates, and media attachments while preserving the file-per-language structure.[^3_2][^3_1]
- Operations: enable create/read/update workflows for EN/IT/SL markdown, status flags (draft/scheduled/published), and per-post scheduling aligned to the three‑day cadence planner.[^3_1][^3_2]
- Governance: keep anonymous authorship system-wide and enforce alt-text validation and accessibility checks before allowing publish state changes.[^3_7][^3_1]


## SEO requirements

- Metadata: generate canonical tags, Open Graph/Twitter cards, and structured data (Article/BlogPosting and ClaimReview where relevant) per style guide’s schema guidance.[^3_7][^3_1]
- Internationalization: add hreflang alternates between EN/IT/SL routes and include a language switcher that maps to canonical localized URLs for each post.[^3_2][^3_1]
- Indexing: provide sitemap.xml and robots.txt from build, and ensure clean, stable permalinks for all languages and posts.[^3_1][^3_2]


## Publishing plan

- Cadence: release one post every three days across EN/IT/SL, with the Admin Dashboard controlling scheduling windows and status transitions.[^3_2][^3_1]
- Start date: default remains 2025‑09‑10 CEST; shift dates as needed while maintaining the three‑day rhythm.[^3_1][^3_2]


### Release schedule (default start: 2025‑09‑10 CEST)

| Post | Target date | Languages |
| :-- | :-- | :-- |
| 1 | 2025-09-10 [^3_1] | EN/IT/SL [^3_2] |
| 2 | 2025-09-13 [^3_1] | EN/IT/SL [^3_2] |
| 3 | 2025-09-16 [^3_1] | EN/IT/SL [^3_2] |
| 4 | 2025-09-19 [^3_1] | EN/IT/SL [^3_2] |
| 5 | 2025-09-22 [^3_1] | EN/IT/SL [^3_2] |
| 6 | 2025-09-25 [^3_1] | EN/IT/SL [^3_2] |
| 7 | 2025-09-28 [^3_1] | EN/IT/SL [^3_2] |
| 8 | 2025-10-01 [^3_1] | EN/IT/SL [^3_2] |
| 9 | 2025-10-04 [^3_1] | EN/IT/SL [^3_2] |
| 10 | 2025-10-07 [^3_1] | EN/IT/SL [^3_2] |

## Acceptance criteria

- Astro build renders the first post in EN/IT/SL with the new purple/black theme and preserved typography and max-width/spacing rules.[^3_7][^3_1]
- Netlify deploy succeeds with correct routes, language switching, SEO tags, sitemap/robots, and no regressions in search or accessibility.[^3_2][^3_1]
- Admin Dashboard supports creating and scheduling multi-language posts and blocks publish when alt text or required SEO fields are missing.[^3_7][^3_1]
- Anonymous authorship and logo-only branding are retained on all index and post views.[^3_1][^3_7]


## Risks and mitigations

- Theme switch regressions: replacing the old palette may affect contrast; run AA checks on all surfaces before release.[^3_7][^3_1]
- Multi-language route mapping: ensure hreflang and canonical links resolve correctly across EN/IT/SL to avoid duplicate content penalties.[^3_2][^3_1]
- Content consistency: verify EN/IT/SL presence per post before scheduling to prevent missing-language states on publish.[^3_1][^3_2]


## Implementation notes

- Port index and post reader to Astro components; keep the search behavior and language badges from the current implementation while adopting the new theme tokens.[^3_2][^3_1]
- Update CSS variables to the new purple/black aesthetic and audit focus states and alt text across components to preserve WCAG compliance.[^3_7][^3_1]
- Generate structured data and open graph tags from frontmatter, including language metadata, and emit sitemap/robots during Astro build.[^3_1][^3_7]


## Deliverables

- Astro codebase with Netlify deployment, Admin Dashboard, and SEO outputs (canonical, hreflang, OG/Twitter, sitemap, robots).[^3_2][^3_1]
- First post integrated with English, Italian, and Slovenian content plus dataset-driven visuals, rethemed to the new purple/black direction.[^3_6][^3_3][^3_4][^3_5]


## TBDs

- Final extraction of exact theme color tokens from the provided visual reference and documentation of the updated design tokens in the style guide.[^3_7][^3_2]
- Admin auth approach and roles (e.g., single editor vs. multi-editor workflow) and whether to gate scheduling behind an approval step in the dashboard.[^3_1][^3_2]


## Appendix: referenced files

- BLOG.md — development, deployment options, multi-language behavior, and site features to preserve during migration.[^3_1]
- README.md — structure, features, assets, and language switching conventions across posts.[^3_2]
- blog-style-guide.md — typography, accessibility, and schema guidance to retain while replacing the old palette with the new theme.[^3_7]
- mirror-effect-english.md / -italian.md / -slovenian.md — first post content in three languages for initial release.[^3_3][^3_4][^3_6]
- ai_scapegoating_data.csv — dataset for first post charts/visuals carried forward into the Astro build.[^3_5]

<div style="text-align: center">⁂</div>

[^3_1]: BLOG.md

[^3_2]: README.md

[^3_3]: mirror-effect-slovenian.md

[^3_4]: mirror-effect-english.md

[^3_5]: ai_scapegoating_data.csv

[^3_6]: mirror-effect-italian.md

[^3_7]: blog-style-guide.md

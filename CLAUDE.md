# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — produce the static site in `out/`
- `npm run lint` — run `next lint` (ESLint with `eslint-config-next`)
- `npm run format` — run Prettier across the repo

Node 20+ is required (see `.nvmrc`). There is no test suite configured.

## Architecture

Next.js 14 App Router with **static export** (`output: 'export'` in `next.config.mjs`). Every route must be statically generatable at build time — no server-side runtime, no API routes, no dynamic `searchParams`. `images: { unoptimized: true }` because the Next image optimizer is unavailable on GitHub Pages.

### Content pipeline

MDX files in `content/projects/` and `content/posts/` are the source of truth for both case studies and blog posts. The pipeline is split:

- **Frontmatter + listing** — `src/lib/content.ts` reads MDX files directly with `fs` + `gray-matter`. Index pages and `generateStaticParams` use `getAllSlugs()` / `getAllContent()` from this module.
- **Body rendering** — the dynamic detail routes (`src/app/projects/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`) `await import()` the MDX file by slug so Next's MDX loader compiles it as a React component.

Adding a piece of content requires only a new MDX file with valid frontmatter — no route or registry edits.

Frontmatter shape lives in the `Frontmatter` type in `src/lib/content.ts`:

| Field         | Type       | Notes                                  |
| ------------- | ---------- | -------------------------------------- |
| `title`       | `string`   | Display title                          |
| `description` | `string`   | Card and meta summary                  |
| `date`        | `string`   | ISO 8601, used for descending sort     |
| `tags`        | `string[]` | Optional                               |
| `featured`    | `boolean`  | Optional, surfaces on homepage         |

MDX is processed with `remark-gfm`, `rehype-slug`, and `rehype-autolink-headings` (configured in `next.config.mjs`). Custom MDX component overrides go in `mdx-components.tsx`.

### Routing layout

- `src/app/layout.tsx` — root layout, wraps every page with `Nav` + `Footer` and a centered `max-w-3xl` main container. Inter font is loaded via `next/font/google`.
- `src/app/page.tsx`, `src/app/about/page.tsx` — top-level pages
- `src/app/projects/page.tsx` + `src/app/projects/[slug]/page.tsx` — index and case study detail
- `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx` — index and post detail

### Path aliases & styling

- `@/*` resolves to `src/*` (see `tsconfig.json`)
- Tailwind CSS with `prettier-plugin-tailwindcss` for class sorting; merge utilities via `clsx` + `tailwind-merge` exposed as `cn()` in `src/lib/cn.ts`
- Framer Motion is used via the `MotionSection` component wrapper

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`: runs `npm ci && npm run build`, touches `out/.nojekyll`, and publishes `out/` to GitHub Pages. Anything that breaks the static export will break the deploy — verify locally with `npm run build` before pushing changes that touch routing, data fetching, or `next.config.mjs`.

## Important Notes

- Be concise and clear when providing information to user about implementation or error faced.
- Do not create documents in base directory.
- For complex tasks, use sub-agents to implement the tasks parallel with accuracy.
- For sub-agents, use sonnet 4.6 as a default agent if not another model specifically mentioned.
- Do not get confused if there are different changes on different modules. Team is working in this team so agents work on different modules at the same time simultaneously.
- If you see sudden changes in the codebase, do not revert as different agents are running paralelly for same or different modules at the same time. 
- On Windows/PowerShell, do not use Bash heredocs (`<<EOF`); pipe PowerShell here-strings to the target command or use `-c`.
- Documentation Rule: Whenever you create or modify a file(s) in src/db, add or change a server action, or alter a core route, you MUST proactively open the corresponding markdown file in the docs/ directory and update it to reflect your changes. Do not wait for me to ask.

## When completing tasks:

1. Analyze repository structure
2. Use relevant skills from .github/skills (if exists)
3. If have any questions or uncertanity, just ask developer to clarify.

## After implementation finish:

- Write short summary text in console to inform developer what to expect from that implementation.
- Provide guidance on how to test the current phase and inform user if manual approach is needed
- Ensure .github\workflows\ci.yml test will pass as soon as I push to github: Lint check and Type Check.

## About Errors:
- Before implementing, check ERRORS.md for known failure patterns 
related to project. List any that apply before writing code.
- After fixed a bug. Now:
  1. State the root cause in one sentence
  2. Write the generalized rule that prevents this class of error
  3. Append it to ERRORS.md, can be found in each module specifically.
  4. Check if copilot-instructions.md needs updating.
- Do not just fix the symptom. Identify: (a) why this happened, (b) where else in the codebase this same assumption might be wrong, (c) what rule would have prevented it.
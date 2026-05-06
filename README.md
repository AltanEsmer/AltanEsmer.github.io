# AltanEsmer.github.io

Personal portfolio — designed and built by Altan Esmer.

## Stack

- [Next.js 14](https://nextjs.org/) — App Router, static export
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MDX](https://mdxjs.com/) — for content authoring

## Development

**Prerequisites:** Node 20+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy

```bash
npm run build
```

Produces a fully static site in `out/`. Deployment is automated via GitHub Actions on every push to `main` — the workflow builds the site and publishes the `out/` directory to GitHub Pages.

## Project Structure

```
.
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Reusable UI components
│   └── lib/          # Utilities and helpers
├── content/
│   ├── projects/     # Case study MDX files
│   └── posts/        # Blog post MDX files
├── public/           # Static assets
└── docs/             # Architecture notes and design references
```

## Content

Case studies live in `content/projects/*.mdx` and blog posts in `content/posts/*.mdx`.

Each MDX file expects the following frontmatter fields:

| Field         | Type       | Description                              |
| ------------- | ---------- | ---------------------------------------- |
| `title`       | `string`   | Display title of the piece               |
| `description` | `string`   | Short summary shown in cards and meta    |
| `date`        | `string`   | ISO 8601 date (e.g. `2026-01-15`)        |
| `tags`        | `string[]` | Topic tags for filtering                 |
| `featured`    | `boolean`  | Whether to surface on the homepage       |

## License

All rights reserved. See [LICENSE](./LICENSE).

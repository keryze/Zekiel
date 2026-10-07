<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Work in this existing checkout. A cloud task is already isolated; do not create a worktree unless explicitly requested.
- Use Node.js 24 and the committed npm lockfile. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` for relevant changes.
- Keep the editorial dark visual system: one muted green accent, Inter + IBM Plex Mono, precise spacing, image-led work, compact research lists.
- Personal information belongs in `site.config.ts`; do not invent identity, employment, results, or credentials. Keep sample content visibly labeled.
- Projects live in `data/projects.ts`; notes are auto-discovered from `content/notes/<category>/<slug>.mdx`. Real content uses Published / In progress or `sample: false`.
- Preserve static export compatibility. Use `generateStaticParams` for content routes, `assetPath` for public files, and `pageMetadata` for route SEO.
- The preview server serves `out/`; after a build it can run via `npm run preview`. Browser checks use `npm run test:e2e` with optional `BASE_URL` and `CHROMIUM_PATH`.
- Read `docs/verification.md` for the baseline and remaining external publication steps. Treat local checks, push, and successful deployment as separate facts.

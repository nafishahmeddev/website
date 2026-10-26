# nafish.me

Personal site of Nafish Ahmed. Astro with server rendering on Cloudflare Workers, no UI framework, one page.

## Where things are

| Path | What it is |
| --- | --- |
| `src/data/profile.ts` | Every fact on the site: work, studio apps, experience, stack, FAQ. The page, JSON-LD, sitemap and `llms.txt` all read from it. |
| `src/styles/system.css` | The design system: tokens (colour, type, space, radius, motion), base, primitives, motion states. |
| `src/components/` | One component per section. `Split.astro` splits headings into words for the reveal; `*phrase*` sets it in the serif italic. |
| `src/scripts/gl.ts` | The WebGL topographic field (one fragment shader, no library). |
| `src/scripts/sfx.ts` | Interface sound, synthesised with Web Audio. Off by default. |
| `src/scripts/motion.ts` | Smooth scroll (Lenis), reveals, cursor, magnetic buttons, counters, toggles. Each is opt-in via a `data-*` attribute. |
| `src/lib/agent.ts` | The profile as Markdown, for AI agents. Served at `/llms.txt`, `/index.md`, and at `/` when a client sends `Accept: text/markdown`. |
| `src/middleware.ts` | Runs on the Worker: Markdown for agents, security and cache headers, `www` to bare domain. |
| `src/pages/robots.txt.ts`, `sitemap.xml.ts`, `llms.txt.ts`, `index.md.ts` | Search and agent files, prerendered at build time. |
| `public/_headers` | Headers for files served straight from Cloudflare assets. |
| `wrangler.jsonc` | Cloudflare Workers configuration. |

## Design rules

- Dark by default, light follows the system; one accent, cobalt (`--c-accent`).
- Geist for text, Geist Mono for labels and data, Instrument Serif italic for one phrase per heading.
- Components use tokens only, never raw values.
- Motion is gated on `html.js` and `prefers-reduced-motion`; without JavaScript every section is fully visible.
- Copy states facts. If a sentence would be true of any developer, cut it.

## Commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # Worker in dist/server, static files in dist/client
npm run check    # astro check
npx wrangler dev # run the built Worker locally, as Cloudflare will
```

## Deploy (Cloudflare Workers Builds)

Cloudflare builds and deploys every push to `master`.

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → `nafishahmeddev/website`.
2. Build command `npm run build`, deploy command `npx wrangler deploy`, root `/`, Node 22 or newer.
3. **Settings → Domains & Routes**: add `nafish.me` and `www.nafish.me` as custom domains. The Worker redirects `www` to the bare domain.

The Worker is named `nafish-website` (see `wrangler.jsonc`).

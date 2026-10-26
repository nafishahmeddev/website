# nafish.me

Personal site of Nafish Ahmed. Astro, no UI framework, one page.

## Where things are

| Path | What it is |
| --- | --- |
| `src/data/profile.ts` | Every fact on the site: work, studio apps, experience, stack, FAQ. The page, JSON-LD, sitemap and `llms.txt` all read from it. |
| `src/styles/system.css` | The design system: tokens (colour, type, space, radius, motion), base, primitives, motion states. |
| `src/components/` | One component per section. `Split.astro` splits headings into words for the reveal; `*phrase*` sets it in the serif italic. |
| `src/scripts/gl.ts` | The WebGL topographic field (one fragment shader, no library). |
| `src/scripts/sfx.ts` | Interface sound, synthesised with Web Audio. Off by default. |
| `src/scripts/motion.ts` | Smooth scroll (Lenis), reveals, cursor, magnetic buttons, counters, toggles. Each is opt-in via a `data-*` attribute. |
| `src/pages/llms.txt.ts`, `robots.txt.ts`, `sitemap.xml.ts` | Search and AI-assistant files, generated from `profile.ts`. |

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
npm run build    # static site in dist/
```

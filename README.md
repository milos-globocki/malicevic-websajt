# Maličević Enterijeri website

Landing page + portfolio for a furniture / interiors workshop (finished products,
designer pieces, made-to-measure) based in Republika Srpska, BiH, with clients across Europe.
Serbian, ijekavian (default, `/`) and English (`/en/`).

**Design goal:** the look of [hola.design](https://hola.design) (warm off-white `#f6f3f0`,
black, big grotesque + serif, 25px radii, scroll-driven motion) at a fraction of the weight.

## Stack

| | |
|---|---|
| Framework | Astro (static output, zero client framework) |
| Styling | Tailwind v4 + a small hand-written `src/styles/global.css` |
| Fonts | Inter Tight + Newsreader, self-hosted, Latin + Latin-Ext only (Serbian č ć š ž đ) |
| Motion | CSS scroll-driven animations (`animation-timeline`), progressive enhancement |
| JS | ~2 KB in `src/scripts/main.ts`: menu close, video play/pause, lightbox |
| Contact | Static details section (phone, Viber, WhatsApp, Instagram, Facebook, TikTok, email, opening hours). **No form, no backend.** |
| SEO | JSON-LD `@graph`, hreflang, OG tags, `sitemap.xml` (with images) + `robots.txt` generated from `site` |
| Hosting | Not decided. Any static host works (Cloudflare Pages recommended). |

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site -> dist/
pnpm preview
pnpm check      # type-check .astro/.ts files
```

## Replace the placeholders (everything marked TODO)

1. **Business details** → `src/data/site.ts` (phone, Viber/WhatsApp number, international number, email, address, hours + `openingHours`).
2. **Photos** → overwrite files in `src/assets/photos/` keeping the names
   (`hero.jpg`, `poster.jpg`, `about.jpg`, `p-01.jpg`…). Export ~2400 px wide for `hero`,
   ~1600 px for the rest; Astro generates AVIF/WebP-sized variants at build time.
3. **Projects** → edit `src/data/projects.ts` (title/note in both languages, category,
   `featured: true` for the 3 stacked cards). Add a photo and an entry to add a project.
4. **Looping video** → drop `workshop.mp4` (and optionally `workshop.webm`) into `public/video/`.
   Until then the band shows its poster. Target: 1280×720, 6–12 s seamless loop, no audio,
   MP4/H.264 under ~1.5 MB. It loads lazily, plays only while on screen, and falls back to
   the poster for reduced-motion or data-saver users.
5. **Copy** → `src/i18n/ui.ts` (all text is draft; Serbian must be ijekavian).
6. **Domain** → `site` in `astro.config.mjs` (canonicals, sitemap and robots.txt follow it).
7. **Logo** → the header uses a text wordmark; swap for an SVG in `src/components/Header.astro`
   and add `logo` to the JSON-LD in `src/lib/seo.ts`.

## Performance notes

- Static HTML ≈ 6.5 KB gzipped, CSS ≈ 6.5 KB gzipped, no framework bundle.
- Every effect is CSS. Where `animation-timeline` is unsupported, or the visitor prefers
  reduced motion, the page simply shows its final static state.
- Images are the real weight. Keep source photos sharp but let Astro do the resizing.

## Gotchas

- **Scroll-driven animations are written as longhands on purpose** (see the comment in
  `global.css`): Lightning CSS merges `animation-timeline` into the `animation` shorthand,
  which current Chrome rejects, silently killing the effect.
- Component classes are in `@layer components` so Tailwind utilities (`hidden`, `md:flex`)
  can override them.
- **Fonts:** hola.design uses Adobe Fonts (Neue Haas Grotesk Display + Imperial URW), which are
  licensed per account. We use the free lookalikes above. If the client wants the originals they
  need an Adobe Fonts / Monotype license.

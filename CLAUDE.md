# Maličević Enterijeri — website

Showcase site and portfolio for a furniture and interiors workshop: finished products, designer pieces, made-to-measure. The company is based in **Republika Srpska, BiH** and has clients across Europe.

**Goal:** an ultra-smooth, modern, designer-looking page that shows real information and turns visitors into enquiries. SEO matters, both local (BiH) and international (EU).

## Languages
- **Serbian, ijekavian, Latin script** is the default, served at `/`. English is served at `/en/`.
- All Serbian copy must be ijekavian (`lijepo`, `rješenje`, `namještaj`, `cijena`). Ekavian forms are bugs.
- The locale is BiH, not Serbia:
  - `<html lang="sr-Latn-BA">`, `og:locale` `sr_BA`, phone `+387`, schema `addressCountry: "BA"`.
  - hreflang stays plain `sr`/`en`. It should not be region-locked, because Serbian-speaking clients are all over Europe.
- Every string lives in `src/i18n/ui.ts`, and every project text in `src/data/projects.ts`, always as an `{ sr, en }` pair.

## SEO
- `src/lib/seo.ts` builds the JSON-LD `@graph` (FurnitureStore, WebSite and WebPage, from `src/data/site.ts`) and the list of indexable images.
- `sitemap.xml` and `robots.txt` are endpoints in `src/pages/`, not static files and not `@astrojs/sitemap`. The sitemap includes hreflang alternates and image entries.
- Everything derives from `site` in `astro.config.mjs`.

## Stack and architecture
- Astro with static output, no client framework. Tailwind v4 via `@tailwindcss/vite`, with tokens in the `@theme` block of `src/styles/global.css`.
- There is **no backend and no contact form**. The contact section only shows details (phone, Viber, WhatsApp, Instagram, Facebook, email, map). Don't add a form, server, or Turnstile/Resend unless the user asks.
- JS is one file, `src/scripts/main.ts` (~2 KB). It closes the menu, plays and pauses the video while it is visible, and runs the lightbox. The opening sequence is CSS only: the hero photo opens from a card to full bleed, then the headline lines rise. On scroll the hero tucks back into a card; the "frame opens" motif repeats in the photo reveals and the video band. **Don't add animation libraries** (GSAP, Lenis, etc.). Motion is CSS scroll-driven animation, behind `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Without support, the page shows its static final state.
- Layout:
  - Sections are in `src/components/*.astro`, composed in `Home.astro`.
  - `src/pages/index.astro` and `src/pages/en/index.astro` only pass `lang`.
  - Business details are in `src/data/site.ts`.
- Images:
  - Photos go in `src/assets/photos/` and are looked up through `photo(name)` in `src/data/photos.ts`, which throws if a file is missing. Always render them via `astro:assets`.
  - The video goes in `public/video/workshop.mp4`/`.webm`. `VideoBand` falls back to its poster when the file is absent.
- Fonts are self-hosted woff2 in `src/assets/fonts/`, Latin + Latin-Ext only. They are Inter Tight (UI) and Newsreader (serif accent), free stand-ins for hola.design's Adobe fonts.

## Design
- The reference is hola.design: warm paper `#f6f3f0`, black ink, a large grotesque paired with a serif accent, 25px radii, pill buttons. The aim is the same feel at a fraction of the weight.
- The client's own logo and brand colours may override the palette once they arrive.

## Gotchas
- **Write scroll-driven animations as longhands** (`animation-name`, `animation-timeline`, …). Lightning CSS folds `animation-timeline` into the `animation` shorthand, which Chrome rejects, and the effect silently dies. To verify, check that the computed `animation-name` is not `none`.
- When an element has more than one effect (hover zoom + scroll reveal), animate the individual `translate`/`scale` properties rather than `transform`, so the effects compose.
- Never put `overflow: hidden` on an ancestor of a `view()`-animated element. It makes that ancestor the timeline's scroller, which never scrolls, so the effect freezes. Use `overflow: clip` (`overflow-clip`) to crop instead.
- Never read `photo(x).width`/`.height` in a component. Any property access makes Astro ship the original JPEG as well. Read the dimensions off a `getImage()` result (`.options.src`) instead, as `Portfolio.astro` does.
- Component CSS must stay inside `@layer components`. Otherwise it overrides Tailwind utilities such as `hidden` and `md:flex`.
- `astro check` needs TypeScript 6. TS 7 is unsupported, so keep `typescript@^6`.

## Content workflow
- The developer adds portfolio projects by hand for the first year: photo into `src/assets/photos/`, entry into `src/data/projects.ts`. Mark exactly 3 projects `featured`.
- Portfolio tiles take their shape from the photo: portrait photos become tall tiles (2 rows), and the first project, if landscape, becomes a large 2x2 tile on desktop. Order the list so the 3-column "all" view packs without holes, e.g. with 1 large tile, 5 tall and 7 normal.
- An admin panel or CMS comes only if manual updates become a burden. Keep the data shape CMS-friendly: flat objects, one photo per name.
- Current photos are Pexels stock placeholders, listed in `src/assets/photos/CREDITS.md`. Replace them with the client's photos.
- Placeholders are marked `TODO`. This covers contact details, domain (`site` in `astro.config.mjs`), logo, video and copy.

## Commands
`pnpm dev` · `pnpm build` · `pnpm preview` · `pnpm check`. Run `pnpm check && pnpm build` before calling work done.
Hosting is undecided. Any static host works; Cloudflare Pages is preferred.

## Don'ts
- Don't use the connected Resend MCP. It belongs to another project (Terminko).
- Commit after each finished piece of work, once `pnpm check && pnpm build` pass. Push only when asked.

# Maličević Enterijeri website

Showcase site and portfolio for a furniture and interiors workshop: finished products, designer pieces, made-to-measure. The company is based in **Republika Srpska, BiH** and has clients across Europe.

**Goal:** an ultra-smooth, modern, designer-looking page that shows real information and turns visitors into enquiries. SEO matters, both local (BiH) and international (EU).

## Languages
- **Serbian, ijekavian, Latin script** is the default, served at `/`. English is served at `/en/`.
- All Serbian copy must be ijekavian (`lijepo`, `rješenje`, `namještaj`, `cijena`). Ekavian forms are bugs.
- The locale is BiH, not Serbia:
  - `<html lang="sr-Latn-BA">`, `og:locale` `sr_BA`, phone `+387`, schema `addressCountry: "BA"`.
  - hreflang stays plain `sr`/`en`. It should not be region-locked, because Serbian-speaking clients are all over Europe.
- **No em dashes (—) and no double hyphens (--) anywhere a person can read them**: copy, meta titles, alt text, captions, code comments, docs, commit messages. Don't swap in a hyphen either; rewrite the sentence so it reads naturally, with a comma, a full stop, or a colon. Use `|` to separate a meta title. Ranges with an en dash (`Pon–Pet`, `08–16h`) are fine, as is syntax such as CSS custom properties (`--ease-out`) and `<!-- -->`.
- Every string lives in `src/i18n/ui.ts`, and every project text in `src/data/projects.ts`, always as an `{ sr, en }` pair.

## SEO
- `src/lib/seo.ts` builds the JSON-LD `@graph` (FurnitureStore, WebSite and WebPage, from `src/data/site.ts`) and the list of indexable images.
- `sitemap.xml` and `robots.txt` are endpoints in `src/pages/`, not static files and not `@astrojs/sitemap`. The sitemap lists every page (home, projects index, each project) with hreflang alternates and image entries.
- Every page goes through `Layout.astro`, which takes the page's `paths` in both languages (canonical + hreflang), title, description, og photo and page JSON-LD (breadcrumbs, `CreativeWork` per project, `ItemList` on the index).
- Everything derives from `site` in `astro.config.mjs`.

## Stack and architecture
- Astro with static output, no client framework. Tailwind v4 via `@tailwindcss/vite`, with tokens in the `@theme` block of `src/styles/global.css`.
- There is **no backend and no contact form**. The contact section only shows details (calls number, one Viber/WhatsApp number, an international calls number, Instagram, Facebook, TikTok, email, opening hours). There is no map and no street address: the client has no premises for customers to visit. Don't add a form, server, or Turnstile/Resend unless the user asks.
- JS is one file, `src/scripts/main.ts` (~2 KB). It closes the menu, runs the hero background clip and the video band (playing only while visible), and runs the lightbox (home page wall and project pages). The opening sequence is CSS only: the hero photo opens from a card to full bleed, then the headline lines rise. On scroll the hero tucks back into a card; the "frame opens" motif repeats in the photo reveals and the video band. **Don't add animation libraries** (GSAP, Lenis, etc.). Motion is CSS scroll-driven animation, behind `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. Without support, the page shows its static final state.
- Layout:
  - Sections are in `src/components/*.astro`, composed in `Home.astro`.
  - `src/pages/index.astro` and `src/pages/en/index.astro` only pass `lang`.
  - Projects, modelled on hola.design/projects: the index is `/projects/` and `/en/projects/` (`ProjectsIndex.astro`), each project is `/projects/<slug>/` and `/en/projects/<slug>/` (`ProjectPage.astro`). Route segments and slugs are English in both languages; only the `/en/` prefix differs. The index has a List view (one row per project: number, title, note and facts beside three of its photos, the cover large and two stacked; plain scrolling, nothing pinned or overlapping) and a Grid view, switched by a CSS-only floating pill. A project page has a full-bleed hero that fades into the paper, the intro, a gallery laid out by photo shape with a lightbox, and a "next project" card. The header nav only moves between home page sections (Početna, Ponuda, Projekti, Galerija, O nama, Kontakt): "Projekti" jumps to the featured stack (`#projects`: three featured projects, then a fourth card that opens the index) and "Galerija" to the photo wall (`#portfolio`). The hero's "Projekti" pill opens the index directly.
  - The header takes `alt` (the same page in the other language) and `solid` (for pages that open on paper, not a photo).
  - Business details are in `src/data/site.ts`.
- Images:
  - Photos go in `src/assets/photos/` and are looked up through `photo(name)` in `src/data/photos.ts`, which throws if a file is missing. Always render them via `astro:assets`.
  - The video band clip goes in `public/video/workshop.mp4`/`.webm`. `VideoBand` falls back to its poster when the file is absent.
  - The hero background is two clips in `public/video/`: `hero-landscape.webm`/`.mp4` (wide screens) and `hero-portrait.webm`/`.mp4` (phones and portrait tablets). `Hero.astro` lists whichever files exist at build time; `main.ts` picks by `(orientation: portrait)`, swaps on rotation, fades the clip in over the photo once it plays and pauses it off screen. One orientation alone serves both; with none, or with reduced motion or data saver, the photo stays. Recommended: 1920x1080 and 1080x1920, 8 to 15 s seamless loop, no audio, H.264 mp4 under ~3 MB with `+faststart`, plus a VP9 webm.
- Fonts are self-hosted woff2 in `src/assets/fonts/`, Latin + Latin-Ext only. They are Inter Tight (UI) and Newsreader (serif accent), free stand-ins for hola.design's Adobe fonts.

## Design
- The reference is hola.design: warm paper `#f6f3f0`, black ink, a large grotesque paired with a serif accent, 25px radii, pill buttons. The aim is the same feel at a fraction of the weight.
- The client's logo has arrived: a near-black "m" monogram with the wordmark "MALIČEVIĆ WOOD FORM", monochrome, so it fits the palette as is. `src/components/Mark.astro` is the monogram traced to a vector (it takes `currentColor`), used in the header and menu. `public/brand/lockup.png` (monogram with wordmark) is used as a CSS mask at the foot of the contact section's left column, `public/brand/logo-square.png` is the schema.org logo, and the favicons are generated from the same trace.

## Gotchas
- **Write scroll-driven animations as longhands** (`animation-name`, `animation-timeline`, …). Lightning CSS folds `animation-timeline` into the `animation` shorthand, which Chrome rejects, and the effect silently dies. To verify, check that the computed `animation-name` is not `none`.
- When an element has more than one effect (hover zoom + scroll reveal), animate the individual `translate`/`scale` properties rather than `transform`, so the effects compose.
- Never put `overflow: hidden` on an ancestor of a `view()`-animated element. It makes that ancestor the timeline's scroller, which never scrolls, so the effect freezes. Use `overflow: clip` (`overflow-clip`) to crop instead.
- Never read `photo(x).width`/`.height` in a component. Any property access makes Astro ship the original JPEG as well. Read the dimensions off a `getImage()` result (`.options.src`) instead, as `Portfolio.astro` does.
- Component CSS must stay inside `@layer components`. Otherwise it overrides Tailwind utilities such as `hidden` and `md:flex`.
- `astro check` needs TypeScript 6. TS 7 is unsupported, so keep `typescript@^6`.

## Content workflow
- The developer adds projects by hand for the first year: photos into `src/assets/photos/` named `<id>-NN.jpg`, entry into `projects` in `src/data/projects.ts` (`photos` in page order, the first is the cover). A project is one shoot or one set of renders. Mark exactly 3 projects `featured`; the home page shows them, then a card for all projects.
- Project galleries lay photos out by shape: a landscape photo gets a row of its own, two portrait or square photos share a row, a leftover one sits centred. Order `photos` with that in mind.
- The home page photo wall ("Naši radovi") is `works` in the same file: a photo, its caption and its category (`designer` or `custom`). It is kept apart from the projects: a tile opens the photo in the lightbox, not a project. Its filters are Izdvojeno (the whole wall), Dizajn enterijera and Elementi po mjeri. Wall tiles take their shape from the photo: portrait photos become tall tiles (2 rows), and the first work, if landscape, becomes a large 2x2 tile on desktop. Order the list so the 3-column "Izdvojeno" view packs without holes, e.g. with 1 large tile, 7 tall and 9 normal. Check every filter view and the 2-column phone grid too.
- An admin panel or CMS comes only if manual updates become a burden. Keep the data shape CMS-friendly: flat objects, one photo per name.
- Current photos are the client's own work, taken from their old website and listed in `src/assets/photos/CREDITS.md`. They are only 900 to 1920px wide, so swap in the camera originals when they arrive (same file names). The rest of the old site's photos are archived in `../original-site-assets/`; the projects already draw most of them.
- Contact details, address (city only), geo and socials come from the old site too. Placeholders are marked `TODO`: domain (`site` in `astro.config.mjs`), the international phone number (`phoneIntl` in `site.ts`, the row hides while empty), opening hours, the two hero clips, the workshop video, and the About/Offer copy and numbers.

## Commands
`pnpm dev` · `pnpm build` · `pnpm preview` · `pnpm check`. Run `pnpm check && pnpm build` before calling work done.
Hosting is undecided. Any static host works; Cloudflare Pages is preferred.

## Don'ts
- Don't use the connected Resend MCP. It belongs to another project (Terminko).
- Commit after each finished piece of work, once `pnpm check && pnpm build` pass. Push only when asked.

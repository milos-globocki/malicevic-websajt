import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// TODO: real production domain. Canonicals, hreflang, sitemap.xml and robots.txt all derive from it.
// SITE_URL overrides it for test builds, e.g. the Cloudflare Pages preview.
const site = process.env.SITE_URL ?? "https://malicevic.example";

export default defineConfig({
  site,
  i18n: {
    defaultLocale: "sr",
    locales: ["sr", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: "auto" },
});

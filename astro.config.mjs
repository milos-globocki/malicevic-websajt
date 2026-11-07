import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Production domain. Canonicals, hreflang, sitemap.xml and robots.txt all derive from it.
// SITE_URL overrides it for a build meant for another address.
const site = process.env.SITE_URL ?? "https://enterijermalicevic.ba";

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

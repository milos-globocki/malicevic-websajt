import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// TODO: real production domain. Canonicals, hreflang, sitemap.xml and robots.txt all derive from it.
const site = "https://malicevic.example";

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

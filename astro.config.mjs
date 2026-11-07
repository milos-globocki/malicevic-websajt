import { rename, rmdir } from "node:fs/promises";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Production domain. Canonicals, hreflang, sitemap.xml and robots.txt all derive from it.
// SITE_URL overrides it for a build meant for another address.
const site = process.env.SITE_URL ?? "https://enterijermalicevic.ba";

// Astro only writes the root 404 as a flat file, and Cloudflare looks for en/404.html.
const flatEnglish404 = {
  name: "flat-english-404",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await rename(new URL("en/404/index.html", dir), new URL("en/404.html", dir));
      await rmdir(new URL("en/404/", dir));
    },
  },
};

export default defineConfig({
  site,
  integrations: [flatEnglish404],
  i18n: {
    defaultLocale: "sr",
    locales: ["sr", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: "auto" },
});

import type { APIRoute } from "astro";
import { getUI, homePath } from "../i18n/ui";
import { indexableImages, langs } from "../lib/seo";

// Hand-rolled instead of @astrojs/sitemap: two URLs, but we want hreflang
// alternates and image entries, which the integration can't derive.
export const GET: APIRoute = async ({ site }) => {
  const origin = site!;
  const url = (l: (typeof langs)[number]) => new URL(homePath(l), origin).href;
  const images = await indexableImages(origin);
  const lastmod = new Date().toISOString().slice(0, 10);

  const alternates = [
    ...langs.map((l) => `<xhtml:link rel="alternate" hreflang="${getUI(l).hreflang}" href="${url(l)}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${url("sr")}"/>`,
  ].join("");
  const imgs = images.map((src) => `<image:image><image:loc>${src}</image:loc></image:image>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${langs.map((l) => `<url><loc>${url(l)}</loc><lastmod>${lastmod}</lastmod>${alternates}${imgs}</url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

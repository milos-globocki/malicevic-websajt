import type { APIRoute } from "astro";
import { getUI } from "../i18n/ui";
import { langs, sitemapPages } from "../lib/seo";

// Hand-rolled instead of @astrojs/sitemap: we want hreflang alternates and image
// entries on every page, which the integration can't derive.
export const GET: APIRoute = async ({ site }) => {
  const origin = site!;
  const lastmod = new Date().toISOString().slice(0, 10);
  const pages = await sitemapPages(origin);

  const urls = pages.flatMap(({ paths, images }) => {
    const url = (l: (typeof langs)[number]) => new URL(paths[l], origin).href;
    const alternates = [
      ...langs.map((l) => `<xhtml:link rel="alternate" hreflang="${getUI(l).hreflang}" href="${url(l)}"/>`),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${url("sr")}"/>`,
    ].join("");
    const imgs = images.map((src) => `<image:image><image:loc>${src}</image:loc></image:image>`).join("");
    return langs.map((l) => `<url><loc>${url(l)}</loc><lastmod>${lastmod}</lastmod>${alternates}${imgs}</url>`);
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

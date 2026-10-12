import { getImage } from "astro:assets";
import { photo } from "../data/photos";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { getUI, homePath, languages, type Lang } from "../i18n/ui";

export const langs = Object.keys(languages) as Lang[];

// Same options as the components use, so Astro reuses the generated files.
export const ogImage = () => getImage({ src: photo("hero"), width: 1200, height: 630, format: "jpg", fit: "cover" });
export const projectImage = (name: string) => getImage({ src: photo(name), width: 1800, format: "webp" });

/** schema.org @graph: one business + website, plus the page in the given language. */
export async function jsonLd(lang: Lang, origin: URL) {
  const t = getUI(lang);
  const base = origin.href;
  const page = new URL(homePath(lang), origin).href;
  const image = new URL((await ogImage()).src, origin).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FurnitureStore",
        "@id": `${base}#business`,
        name: site.name,
        url: base,
        image,
        // TODO: add `logo` once the client sends one.
        telephone: site.phone.href,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.countryCode,
        },
        openingHours: site.openingHours,
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
        sameAs: [site.instagram, site.facebook],
      },
      {
        "@type": "WebSite",
        "@id": `${base}#website`,
        url: base,
        name: site.name,
        inLanguage: langs.map((l) => getUI(l).htmlLang),
        publisher: { "@id": `${base}#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: t.metaTitle,
        description: t.metaDescription,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": `${base}#website` },
        about: { "@id": `${base}#business` },
        primaryImageOfPage: image,
      },
    ],
  };
}

/** Absolute URLs of every image worth indexing (hero + portfolio). */
export async function indexableImages(origin: URL) {
  const srcs = [(await ogImage()).src, ...(await Promise.all(projects.map(async (p) => (await projectImage(p.image)).src)))];
  return srcs.map((s) => new URL(s, origin).href);
}

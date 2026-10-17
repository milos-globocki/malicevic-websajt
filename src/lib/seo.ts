import { getImage } from "astro:assets";
import { photo } from "../data/photos";
import { projectPath, projects, works, type Project } from "../data/projects";
import { site } from "../data/site";
import { getUI, homePath, languages, projectsPath, type Lang } from "../i18n/ui";

export const langs = Object.keys(languages) as Lang[];

/** A page's path in every language, for canonical, hreflang and the sitemap. */
export type Paths = Record<Lang, string>;
export const homePaths = Object.fromEntries(langs.map((l) => [l, homePath(l)])) as Paths;
export const projectsPaths = Object.fromEntries(langs.map((l) => [l, projectsPath(l)])) as Paths;
export const projectPaths = (p: Project) => Object.fromEntries(langs.map((l) => [l, projectPath(p, l)])) as Paths;

// Same options as the components use, so Astro reuses the generated files.
export const ogImage = (name = "hero") =>
  getImage({ src: photo(name), width: 1200, height: 630, format: "jpg", fit: "cover" });
/** Lightbox size: fits a 1800x1500 box, so portrait shots don't ship at 2700px tall. */
export const projectImage = (name: string) =>
  getImage({ src: photo(name), width: 1800, height: 1500, fit: "inside", format: "webp" });

export interface PageMeta {
  lang: Lang;
  paths: Paths;
  title: string;
  description: string;
  /** Absolute og:image URL, also the page's primary image. */
  image: string;
  /** schema.org type of the page itself. */
  type?: "WebPage" | "CollectionPage";
  /** Breadcrumb trail below the home page, as [name, path] pairs. */
  crumbs?: [string, string][];
  /** The @id of what the page is mainly about; defaults to the business. */
  about?: string;
  /** Extra @graph nodes, such as the project shown on the page. */
  nodes?: Record<string, unknown>[];
}

/** schema.org @graph: the business and website on every page, plus this page. */
export async function jsonLd(m: PageMeta, origin: URL) {
  const t = getUI(m.lang);
  const base = origin.href;
  const page = new URL(m.paths[m.lang], origin).href;
  const businessImage = new URL((await ogImage()).src, origin).href;
  const crumbs: [string, string][] = [[t.nav.home, homePath(m.lang)], ...(m.crumbs ?? [])];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FurnitureStore",
        "@id": `${base}#business`,
        name: site.name,
        url: base,
        image: businessImage,
        legalName: site.legalName,
        logo: new URL("/brand/logo-square.png", origin).href,
        telephone: [site.phone.href, site.messenger.href, site.phoneIntl.href].filter(Boolean),
        email: site.email,
        address: {
          "@type": "PostalAddress",
          ...(site.address.street ? { streetAddress: site.address.street } : {}),
          postalCode: site.address.postalCode,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.countryCode,
        },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
        openingHours: site.openingHours,
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
        sameAs: [site.instagram, site.facebook, site.tiktok],
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
        "@type": m.type ?? "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: m.title,
        description: m.description,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": `${base}#website` },
        about: { "@id": m.about ?? `${base}#business` },
        primaryImageOfPage: m.image,
        ...(m.crumbs ? { breadcrumb: { "@id": `${page}#breadcrumb` } } : {}),
      },
      ...(m.crumbs
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${page}#breadcrumb`,
              itemListElement: crumbs.map(([name, path], i) => ({
                "@type": "ListItem",
                position: i + 1,
                name,
                item: new URL(path, origin).href,
              })),
            },
          ]
        : []),
      ...(m.nodes ?? []),
    ],
  };
}

/** Every indexable page with its alternates and images, for sitemap.xml. */
export async function sitemapPages(origin: URL) {
  const abs = (src: string) => new URL(src, origin).href;
  const full = async (names: string[]) =>
    Promise.all(names.map(async (n) => abs((await projectImage(n)).src)));
  const unique = <T,>(xs: T[]) => [...new Set(xs)];

  return [
    {
      paths: homePaths,
      images: [abs((await ogImage()).src), ...(await full(unique(works.map((w) => w.image))))],
    },
    { paths: projectsPaths, images: await full(projects.map((p) => p.photos[0]!)) },
    ...(await Promise.all(projects.map(async (p) => ({ paths: projectPaths(p), images: await full(p.photos) })))),
  ];
}

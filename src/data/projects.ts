import { projectsPath, type Lang } from "../i18n/ui";

export type Category = "finished" | "designer" | "custom";

export interface Project {
  /** Stable key, used as the file prefix of the project's photos. */
  id: string;
  /** URL segment, in English for both languages: /projects/<slug>/ and /en/projects/<slug>/. */
  slug: string;
  category: Category;
  featured?: boolean;
  year: number;
  title: Record<Lang, string>;
  /** One line: what was made. Used as the subtitle and the meta description. */
  note: Record<Lang, string>;
  /** The paragraph that opens the project page. */
  intro: Record<Lang, string>;
  /** Names in src/assets/photos, in page order. The first is the cover. */
  photos: string[];
}

// Real work from the client's previous website (see src/assets/photos/CREDITS.md), grouped
// by shoot: the two finished apartments are one photo session each, the design projects
// one set of MODO renders each. Years, copy and the grouping of the renders are provisional
// until the client confirms them.
//
// Project pages lay the photos out by shape: a landscape photo gets a row of its own, two
// portrait or square photos in a row share one, and a portrait left over sits centred.
// Order the photos with that in mind. Mark exactly 3 projects `featured`.
export const projects: Project[] = [
  {
    id: "vitrine",
    slug: "apartment-with-lit-glass-cabinets",
    category: "custom",
    featured: true,
    year: 2025,
    title: { sr: "Stan sa osvijetljenim vitrinama", en: "Apartment with lit glass cabinets" },
    note: {
      sr: "Kompletan enterijer po mjeri: kuhinja, garderoba, kupatilo i predsoblje.",
      en: "A complete made-to-measure interior: kitchen, dressing room, bathroom and hallway.",
    },
    intro: {
      sr: "Topli bijeli tonovi, hrastov dekor i mermer prolaze kroz cijeli stan kao jedan jezik materijala. Garderobe i vitrine sa staklenim frontovima i skrivenom LED rasvjetom same postaju izvor svjetla, a svaki element je izmjeren, izrađen i ugrađen u našoj radionici.",
      en: "Warm whites, oak finishes and marble run through the whole apartment as one material language. Wardrobes and display cabinets with glass fronts and concealed LED lighting become light sources in their own right, and every piece was measured, built and installed by our workshop.",
    },
    photos: [
      "p-15", "vitrine-01", "vitrine-02", "vitrine-03", "poster", "vitrine-04", "p-04", "vitrine-05",
      "p-14", "vitrine-06", "vitrine-07", "vitrine-08", "p-05", "vitrine-09", "p-09", "p-07",
      "vitrine-12", "p-13", "vitrine-13", "vitrine-10", "vitrine-11", "vitrine-14",
    ],
  },
  {
    id: "hrast",
    slug: "oak-and-white-apartment",
    category: "custom",
    featured: true,
    year: 2025,
    title: { sr: "Stan u hrastu i bijeloj", en: "Oak and white apartment" },
    note: {
      sr: "Kuhinja, vitrine, TV element, predsoblje i kupatilo u hrastovom furniru.",
      en: "Kitchen, display cabinets, media unit, hallway and bathroom in oak veneer.",
    },
    intro: {
      sr: "Hrastov furnir i mat bijeli frontovi, uz tanke crne okvire stakla, povezuju kuhinju, dnevni boravak i predsoblje. Zaobljeni rubovi, ručke u boji nane i rasvjeta u vitrinama donose malo igre u miran prostor.",
      en: "Oak veneer and matt white fronts, framed by slim black glazing bars, tie together the kitchen, living room and hallway. Rounded edges, mint-green handles and lit display shelves bring a little play to a calm space.",
    },
    photos: [
      "p-01", "hero", "hrast-01", "hrast-02", "hrast-03", "p-11", "p-03", "hrast-04", "p-08",
      "offer-1", "hrast-05", "hrast-06", "hrast-07",
    ],
  },
  {
    id: "luk",
    slug: "apartment-with-arched-shelving",
    category: "designer",
    featured: true,
    year: 2025,
    title: { sr: "Stan sa lučnim policama", en: "Apartment with arched shelving" },
    note: {
      sr: "Idejno rješenje i 3D vizualizacija: kuhinja, dnevni boravak, predsoblje i spavaća soba.",
      en: "Concept design and 3D visualisation: kitchen, living room, hallway and bedroom.",
    },
    intro: {
      sr: "Rebrasti frontovi, lučna niša sa policama i kuhinja u nježnoj zelenoj boji. Idejno rješenje koje prije izrade pokazuje kako će svaki zid, materijal i ručka izgledati u stvarnom prostoru.",
      en: "Fluted fronts, an arched shelving niche and a kitchen in a soft sage green. A concept that shows, before anything is built, how every wall, material and handle will look in the real space.",
    },
    photos: ["p-02", "luk-04", "luk-05", "luk-01", "luk-02", "offer-2", "p-17", "luk-03"],
  },
  {
    id: "vrt",
    slug: "light-apartment-with-a-garden-view",
    category: "designer",
    year: 2025,
    title: { sr: "Svijetli stan sa pogledom na vrt", en: "Light apartment with a garden view" },
    note: {
      sr: "Vizualizacija otvorenog dnevnog prostora, kuhinje i TV zida.",
      en: "Visualisation of an open-plan living area, kitchen and media wall.",
    },
    intro: {
      sr: "Bež kuhinja sa zlatnim ručkama, kamena obloga TV zida i paneli iza sofe drže otvoren prostor na okupu. Svjetlo iz vrta ulazi duboko u stan, pa su svi materijali birani u toplim, svijetlim tonovima.",
      en: "A beige kitchen with brass handles, a stone-clad media wall and panelling behind the sofa hold the open space together. Daylight from the garden reaches deep into the room, so every material was chosen in warm, light tones.",
    },
    photos: ["p-12", "p-16", "vrt-01", "vrt-02", "p-10"],
  },
  {
    id: "orah",
    slug: "walnut-kitchen",
    category: "designer",
    year: 2025,
    title: { sr: "Kuhinja u orahu", en: "Walnut kitchen" },
    note: {
      sr: "Dizajn kuhinje sa visokim ormarima u furniru oraha.",
      en: "Kitchen design with tall walnut-veneer cabinets.",
    },
    intro: {
      sr: "Visoki ormari u orahu kriju ugradne aparate, a bijeli gornji elementi i svijetla radna ploča čine prostor lakšim. Staklena vitrina u crnom okviru zatvara kompoziciju sa strane.",
      en: "Tall walnut cabinets house the built-in appliances, while white wall units and a pale worktop keep the room light. A black-framed glass cabinet closes the composition at the side.",
    },
    photos: ["p-06", "orah-01", "orah-02", "orah-03"],
  },
  {
    id: "crno",
    slug: "kitchen-and-bedroom-with-black-glass",
    category: "designer",
    year: 2025,
    title: { sr: "Kuhinja i spavaća soba sa crnim staklom", en: "Kitchen and bedroom with black glass" },
    note: {
      sr: "Vizualizacija bež kuhinje i spavaće sobe sa vitrinama u crnom okviru.",
      en: "Visualisation of a beige kitchen and a bedroom with black-framed glass cabinets.",
    },
    intro: {
      sr: "Kuhinja u obliku slova U u toplim bež tonovima, sa visokom vitrinom od dimljenog stakla u crnom okviru. Isti detalj se ponavlja na garderobi u spavaćoj sobi i povezuje dva prostora.",
      en: "A U-shaped kitchen in warm beige, with a tall smoked-glass cabinet in a black frame. The same detail returns on the bedroom wardrobe and links the two rooms.",
    },
    photos: ["crno-02", "crno-01", "crno-03", "crno-04"],
  },
  {
    id: "letvice",
    slug: "kitchen-and-entrance-with-timber-slats",
    category: "designer",
    year: 2025,
    title: { sr: "Kuhinja i ulaz sa letvicama", en: "Kitchen and entrance with timber slats" },
    note: {
      sr: "3D prikaz kuhinje, ulaza i zida od letvica u orahu.",
      en: "3D view of a kitchen, an entrance and a walnut slatted wall.",
    },
    intro: {
      sr: "Zid od letvica u orahu odvaja ulaz od kuhinje, a u njega su uklopljene vješalice i polica. Gornji elementi prate isti ton, dok bijeli donji elementi i svijetla ploča drže prostor otvorenim.",
      en: "A walnut slatted wall separates the entrance from the kitchen, with coat hooks and a shelf built into it. The wall units pick up the same tone, while white base units and a pale worktop keep the space open.",
    },
    photos: ["letvice-01", "letvice-02", "letvice-03"],
  },
];

export interface Work {
  /** A name in src/assets/photos. It may also appear in a project, but doesn't have to. */
  image: string;
  /** The filter it shows under, besides "Selected". */
  category: "designer" | "custom";
  title: Record<Lang, string>;
}

// The photo wall on the home page: a selection of single photos, kept apart from the
// projects. A tile opens the photo itself in the lightbox, not a project. The order is
// chosen so the grid packs without holes in every filter view, on desktop (3 columns) and
// phones (2): portrait shots become tall tiles and the first entry (if landscape) a large
// one, here 1 large, 7 tall and 9 normal tiles.
export const works: Work[] = [
  { image: "p-01", category: "custom", title: { sr: "Kuhinja u hrastu i bijeloj", en: "Oak and white kitchen" } },
  { image: "p-04", category: "custom", title: { sr: "Kupatilo sa elementom po mjeri", en: "Made-to-measure bathroom vanity" } },
  { image: "p-09", category: "custom", title: { sr: "TV zid u svijetlom furniru", en: "Media wall in pale veneer" } },
  { image: "p-17", category: "designer", title: { sr: "Spavaća soba, vizualizacija", en: "Bedroom, visualisation" } },
  { image: "p-11", category: "custom", title: { sr: "Vitrina za čaše", en: "Glassware display" } },
  { image: "p-03", category: "custom", title: { sr: "Viseći TV element u hrastu", en: "Floating oak media unit" } },
  { image: "p-07", category: "custom", title: { sr: "Vitrina sa rasvjetom", en: "Lit glass display" } },
  { image: "p-16", category: "designer", title: { sr: "Svijetla kuhinja, vizualizacija", en: "Light kitchen, visualisation" } },
  { image: "p-08", category: "custom", title: { sr: "Plakar sa zelenom ručkom", en: "Wardrobe with a mint handle" } },
  { image: "p-10", category: "designer", title: { sr: "Dnevni boravak sa TV zidom", en: "Living room with a media wall" } },
  { image: "p-15", category: "custom", title: { sr: "Dnevna soba sa vitrinom", en: "Living room with a glass display" } },
  { image: "p-06", category: "designer", title: { sr: "Kuhinja u orahu, vizualizacija", en: "Walnut kitchen, visualisation" } },
  { image: "p-05", category: "custom", title: { sr: "Garderoba sa radnim kutkom", en: "Wardrobe with a study nook" } },
  { image: "p-02", category: "designer", title: { sr: "Dnevna soba, 3D vizualizacija", en: "Living room, 3D visualisation" } },
  { image: "p-13", category: "custom", title: { sr: "Predsoblje", en: "Hallway" } },
  { image: "p-12", category: "designer", title: { sr: "Dnevna soba sa trpezarijom", en: "Living and dining room" } },
  { image: "p-14", category: "custom", title: { sr: "Spavaća soba sa osvijetljenim plakarom", en: "Bedroom with a lit wardrobe" } },
];

export const projectPath = (p: Project, lang: Lang) => `${projectsPath(lang)}${p.slug}/`;

/** The project after this one, wrapping round to the first. */
export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length]!;

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
  /** Further paragraphs, set smaller below the intro. */
  text?: Record<Lang, string[]>;
  /** Names in src/assets/photos, in page order. The first is the cover. */
  photos: string[];
  /**
   * A clip in public/video/, named without the extension (<name>.mp4 and/or .webm, 9:16).
   * Its first frame goes in src/assets/photos/<name>-video.jpg as the poster.
   */
  video?: string;
}

/** Names <id>-01 to <id>-<count>: the photos of a project in page order. */
const shots = (id: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${id}-${String(i + 1).padStart(2, "0")}`);

// The client's own projects, one shoot each (see src/assets/photos/CREDITS.md). The copy
// is the client's; the names of their clients are never shown anywhere on the site.
//
// Project pages lay the photos out by shape: a landscape photo gets a row of its own, two
// portrait or square photos in a row share one, and a portrait left over sits centred.
// Order the photos with that in mind. Mark exactly 3 projects `featured`.
export const projects: Project[] = [
  {
    id: "minimal",
    slug: "warm-minimalism",
    category: "custom",
    featured: true,
    year: 2026,
    title: { sr: "Savremeni minimalizam u toplim tonovima", en: "Contemporary minimalism in warm tones" },
    note: {
      sr: "Kuhinja, dnevni boravak, garderober i kupatilo po mjeri.",
      en: "A made-to-measure kitchen, living room, walk-in wardrobe and bathroom.",
    },
    intro: {
      sr: "Topli neutralni tonovi, čiste linije i pažljivo uklopljeni tamni akcenti definišu karakter ovog enterijera. Namještaj po mjeri povezuje kuhinju, dnevni boravak, garderober i kupatilo u skladnu cjelinu, uz dosljedan pristup dizajnu i maksimalnu funkcionalnost. Otvorene police u zelenim tonovima unose suptilan kontrast, dok precizno izvedeni detalji doprinose prepoznatljivom izgledu prostora.",
      en: "Warm neutral tones, clean lines and carefully placed dark accents define the character of this interior. Made-to-measure furniture ties the kitchen, living room, walk-in wardrobe and bathroom into one harmonious whole, with a consistent approach to design and every centimetre put to use. Open shelving in shades of green adds a subtle contrast, while precisely finished details give the space its distinctive look.",
    },
    photos: shots("minimal", 31),
    video: "minimal",
  },
  {
    id: "luksuz",
    slug: "modern-luxury-and-calm",
    category: "custom",
    featured: true,
    year: 2025,
    title: { sr: "Definicija modernog luksuza i mira", en: "Modern luxury, defined by calm" },
    note: {
      sr: "Kuhinja, vitrine sa rasvjetom, garderober, kupatilo i predsoblje.",
      en: "Kitchen, lit display cabinets, walk-in wardrobe, bathroom and hallway.",
    },
    intro: {
      sr: "Tonovi drveta, profinjene bež fronte, zatvorene i otvorene kompozicije i pažljivo uklopljena ambijentalna rasvjeta. Svaki element projektovan je tako da prostor bude skladan, funkcionalan i bezvremenski.",
      en: "Wood tones, refined beige fronts, closed and open compositions and carefully integrated ambient lighting. Every element was designed so that the space feels harmonious, functional and timeless.",
    },
    photos: shots("luksuz", 19),
    video: "luksuz",
  },
  {
    id: "drvo",
    slug: "warm-wood-and-neutrals",
    category: "custom",
    featured: true,
    year: 2026,
    title: {
      sr: "Savremeni enterijer u toplim drvenim tonovima i elegantnim neutralnim nijansama",
      en: "A contemporary interior in warm wood and elegant neutrals",
    },
    note: {
      sr: "Kuhinja u obliku slova L, garderobe, kupatilo i lebdeća komoda.",
      en: "An L-shaped kitchen, wardrobes, a bathroom and a floating sideboard.",
    },
    intro: {
      sr: "Projekat objedinjuje savremeni dizajn, funkcionalnost i pažljivo odabrane materijale u skladnu cjelinu prilagođenu svakodnevnom životu. Osnovu enterijera čine namještaj po mjeri, čiste linije i kombinacija svijetlih, neutralnih fronti s toplom teksturom drveta, koja prostoru daje prirodan karakter i osjećaj topline.",
      en: "The project brings contemporary design, function and carefully chosen materials together into a harmonious whole made for everyday life. The interior rests on made-to-measure furniture, clean lines and light, neutral fronts paired with the warm texture of wood, which gives the space a natural character and a sense of warmth.",
    },
    text: {
      sr: [
        "Kuhinja je oblikovana u praktičnoj L-konfiguraciji, s ravnim frontama bez vidljivih ručkica, diskretnim crnim profilima i radnom pločom u dekoru drveta. Gornji elementi u dvije različite nijanse stvaraju vizuelnu dinamiku, dok pažljivo usklađeni detalji doprinose minimalističkom izgledu.",
        "Koncept se nastavlja kroz ostatak stambenog prostora, gdje su garderobni elementi, kupatilski namještaj i lebdeća komoda izrađeni po mjeri, uz dosljednu primjenu odabranih dekora i precizno uklopljenih detalja. Zaobljene ivice komode, ugradni elementi i kombinacija drveta s neutralnim površinama dodatno naglašavaju individualni karakter enterijera.",
        "Svaki element osmišljen je s ciljem da odgovori konkretnim potrebama prostora, uz poseban fokus na proporcije, kvalitet izrade i vizuelnu povezanost različitih prostorija. Rezultat je moderan i bezvremenski enterijer u kojem se estetika, praktičnost i izrada namještaja po mjeri nadopunjuju u jedinstvenu cjelinu.",
      ],
      en: [
        "The kitchen takes a practical L shape, with flat handleless fronts, discreet black profiles and a wood-effect worktop. Wall units in two different shades add visual rhythm, while carefully matched details keep the look minimal.",
        "The concept carries on through the rest of the home, where the wardrobes, bathroom furniture and a floating sideboard were all made to measure, using the same finishes and precisely fitted details. The sideboard's rounded edges, the built-in units and the pairing of wood with neutral surfaces underline the interior's individual character.",
        "Every piece was designed to answer the real needs of the space, with particular care for proportion, build quality and the visual link between rooms. The result is a modern, timeless interior where looks, practicality and made-to-measure craft complete one another.",
      ],
    },
    photos: shots("drvo", 19),
    video: "drvo",
  },
  {
    id: "prirodno",
    slug: "natural-finishes-modern-function",
    category: "custom",
    year: 2026,
    title: { sr: "Prirodni dekori i savremena funkcionalnost", en: "Natural finishes, modern function" },
    note: {
      sr: "Kuhinja sa poluostrvom i mjestom za sjedenje, povezana sa dnevnim boravkom.",
      en: "A kitchen with a seating peninsula, joined to the living room.",
    },
    intro: {
      sr: "Kombinacija svijetlog drveta, prigušenih zelenih fronti i elegantnih crnih detalja daje ovom enterijeru prepoznatljiv karakter. Kuhinja je povezana s dnevnim boravkom kroz namještaj izrađen po mjeri, stvarajući jedinstvenu cjelinu u kojoj su estetika i svakodnevna funkcionalnost ravnopravno zastupljene. Posebnu pažnju privlače kuhinjsko poluostrvo s integrisanim prostorom za sjedenje, diskretna rasvjeta i pažljivo oblikovani elementi koji doprinose urednom i skladnom izgledu prostora.",
      en: "Light wood, muted green fronts and elegant black details give this interior a character of its own. Made-to-measure furniture joins the kitchen to the living room in a single whole, where looks and everyday function carry equal weight. The eye goes to the kitchen peninsula with its built-in seating, the discreet lighting and the carefully shaped units that keep the space tidy and calm.",
    },
    photos: shots("prirodno", 16),
    video: "prirodno",
  },
  {
    id: "bez",
    slug: "warm-neutral-interior",
    category: "custom",
    year: 2025,
    title: { sr: "Moderan enterijer u toplim neutralnim tonovima", en: "A modern interior in warm neutrals" },
    note: {
      sr: "Kuhinja, dnevni boravak, trpezarija, hodnik i spavaća soba.",
      en: "Kitchen, living room, dining area, hallway and bedroom.",
    },
    intro: {
      sr: "Enterijer po mjeri koji objedinjuje kuhinju, dnevni boravak, trpezariju, hodnik i spavaću sobu u skladnu i funkcionalnu cjelinu. Kombinacija bež fronti, dekora drveta, dekorativnih letvica i pažljivo osmišljene ambijentalne rasvjete prostoru daje toplinu i sofisticiran izgled. Namještaj čistih linija, diskretni detalji i maksimalno iskorišten prostor odražavaju savremen pristup dizajnu i izradi namještaja po mjeri.",
      en: "A made-to-measure interior that brings the kitchen, living room, dining area, hallway and bedroom together into one harmonious, practical whole. Beige fronts, wood finishes, decorative slats and carefully planned ambient lighting give the space warmth and a refined look. Clean-lined furniture, discreet details and every bit of space put to use reflect a contemporary approach to designing and building furniture to measure.",
    },
    photos: shots("bez", 7),
  },
  {
    id: "maslina",
    slug: "green-and-wood-interior",
    category: "custom",
    year: 2024,
    title: { sr: "Savremeni enterijer u zelenim i drvenim tonovima", en: "A contemporary interior in green and wood" },
    note: {
      sr: "Kuhinja sa ostrvom, TV komoda, spavaća soba i hodnik.",
      en: "A kitchen with an island, a media unit, a bedroom and a hallway.",
    },
    intro: {
      sr: "Projekat objedinjuje kuhinju s ostrvom, TV komodu, spavaću sobu i elemente hodnika u skladnu cjelinu izrađenu po mjeri. Maslinastozelene fronte, topli dekori drveta, dekorativni kamen i drvene letvice daju prostoru prepoznatljiv karakter, dok čiste linije i pažljivo osmišljeni detalji naglašavaju savremen dizajn i funkcionalnost. Svaki element prilagođen je prostoru i potrebama klijenta, uz poseban fokus na kvalitet izrade i usklađenost materijala.",
      en: "The project brings a kitchen with an island, a media unit, a bedroom and hallway units together into one harmonious, made-to-measure whole. Olive-green fronts, warm wood finishes, decorative stone and timber slats give the space a distinctive character, while clean lines and carefully considered details underline its contemporary design and function. Every piece was fitted to the space and to the client's needs, with particular care for build quality and how the materials work together.",
    },
    photos: shots("maslina", 7),
  },
];

export type Room = "kitchen" | "storage" | "living";

export interface Work {
  /** A name in src/assets/photos. It may also appear in a project, but doesn't have to. */
  image: string;
  /** The filter it shows under. */
  category: Room;
  /** Also shown under "Selected", the wall's first view. */
  selected?: true;
  title: Record<Lang, string>;
}

// The photo wall on the home page: single photos of other work, kept apart from the
// projects. A tile opens the photo itself in the lightbox, not a project. Portrait shots
// become tall tiles and the first entry (landscape) a large one. Every view must pack
// without holes on desktop (3 columns) and phones (2), so the counts are chosen for it:
// Selected is 1 large, 9 tall and 5 normal tiles, Kitchens 1 large, 15 tall and 5 normal,
// Wardrobes and Living 6 tall each (a view of tall tiles only needs 6 or 12). The order
// comes from a simulation of grid-auto-flow: dense, so check every view after a change.
// Seven of the client's gallery photos are left out to keep those counts; they wait in
// src/assets/photos/unused/ (outside the photo glob, so they don't ship).
const w = (image: string, category: Room, sr: string, en: string, selected?: true): Work => ({
  image,
  category,
  title: { sr, en },
  ...(selected && { selected }),
});
export const works: Work[] = [
  w("g-24", "kitchen", "Kuhinja sa ostrvom i rasvjetom", "Kitchen with an island and lighting", true),
  w("g-36", "kitchen", "Ugaona kuhinja", "Corner kitchen"),
  w("g-17", "kitchen", "Šank obložen letvicama", "Slatted breakfast bar"),
  w("g-04", "living", "TV zid sa drvenim letvicama", "Media wall with timber slats", true),
  w("g-35", "storage", "Plakar sa letvicama", "Wardrobe with timber slats"),
  w("g-26", "kitchen", "Kuhinja sa skrivenom rasvjetom", "Kitchen with hidden lighting", true),
  w("g-18", "kitchen", "Bijela kuhinja bez ručkica", "Handleless white kitchen", true),
  w("g-27", "living", "Trpezarija sa policama za knjige", "Dining room with bookshelves", true),
  w("g-32", "kitchen", "Kuhinja u drvetu i bijeloj", "Kitchen in wood and white"),
  w("g-14", "kitchen", "Kuhinja sa šankom", "Kitchen with a breakfast bar", true),
  w("g-33", "living", "Komoda sa rebrastim frontama", "Sideboard with fluted fronts", true),
  w("g-38", "living", "Poslovni prostor", "Retail interior"),
  w("g-05", "kitchen", "Kuhinja sa otvorenim policama", "Kitchen with open shelving"),
  w("g-09", "storage", "Polica u drvetu i crnom metalu", "Shelving in wood and black metal"),
  w("g-06", "kitchen", "Vitrina od dimljenog stakla", "Smoked glass cabinet"),
  w("g-07", "kitchen", "Klasične fronte i drvena ploča", "Shaker fronts and a wooden worktop"),
  w("g-10", "storage", "Predsoblje sa vješalicama", "Hallway unit with coat hooks"),
  w("g-31", "kitchen", "Kuhinja sa mermernim zidom", "Kitchen with a marble wall"),
  w("g-23", "kitchen", "Ostrvo sa dubokim ladicama", "Island with deep drawers", true),
  w("g-28", "storage", "Ugradni ormari u hodniku", "Built-in hallway cabinets"),
  w("g-13", "kitchen", "Kuhinjski blok u toplom drvetu", "Kitchen wall in warm wood", true),
  w("g-01", "kitchen", "Kuhinja u tamnom drvetu", "Kitchen in dark wood"),
  w("g-34", "storage", "Ormari oko kreveta", "Wardrobes around the bed", true),
  w("g-25", "kitchen", "Siva kuhinja u visokom sjaju", "High-gloss grey kitchen", true),
  w("g-21", "storage", "Klizni plakar sa ogledalom", "Sliding wardrobe with a mirror", true),
  w("g-19", "kitchen", "Šank i visoka vitrina", "Bar and a tall glass cabinet"),
  w("g-11", "kitchen", "Kuhinja u drvetu i sivoj", "Kitchen in wood and grey"),
  w("g-02", "kitchen", "Kuhinja sa kamenom oblogom zida", "Kitchen with a stone splashback"),
  w("g-03", "kitchen", "Bijela kuhinja sa hrastovom pločom", "White kitchen with an oak worktop", true),
  w("g-08", "living", "Pregrada sa staklenom vitrinom", "Room divider with a glass cabinet", true),
  w("g-39", "living", "Izložbene vitrine", "Display cases"),
  w("g-29", "kitchen", "Ladica ispod sudopere", "Drawer under the sink"),
  w("g-22", "kitchen", "Siva kuhinja sa mermernom pločom", "Grey kitchen with a marble worktop", true),
];

export const projectPath = (p: Project, lang: Lang) => `${projectsPath(lang)}${p.slug}/`;

/** The project after this one, wrapping round to the first. */
export const nextProject = (p: Project) => projects[(projects.indexOf(p) + 1) % projects.length]!;

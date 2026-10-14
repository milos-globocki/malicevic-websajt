import type { Lang } from "../i18n/ui";

export type Category = "finished" | "designer" | "custom";

export interface Project {
  /** Matches src/assets/photos/<image>.jpg */
  image: string;
  category: Category;
  featured?: boolean;
  year: number;
  title: Record<Lang, string>;
  note: Record<Lang, string>;
}

// Real work from the client's previous website (see src/assets/photos/CREDITS.md).
// Years and descriptions are provisional until the client confirms them. Edit this list
// and the photos; the grid, filter and lightbox pick the changes up automatically.
// Photos can be any aspect ratio: portrait shots become tall tiles, and the first entry
// (if landscape) a large one. The order below is chosen so the grid packs without holes
// in every filter view, on desktop (3 columns) and phones (2): 1 large, 7 tall and
// 9 normal tiles. Categories with no projects hide their filter.
export const projects: Project[] = [
  { image: "p-01", category: "custom", featured: true, year: 2025,
    title: { sr: "Kuhinja u hrastu i bijeloj", en: "Oak and white kitchen" },
    note: { sr: "Kuhinja po mjeri sa hrastovim gornjim elementima i osvijetljenom vitrinom.", en: "Made-to-measure kitchen with oak wall units and a lit glass display." } },
  { image: "p-04", category: "custom", featured: true, year: 2025,
    title: { sr: "Kupatilo sa elementom po mjeri", en: "Made-to-measure bathroom vanity" },
    note: { sr: "Viseći element u hrastu uz kamenu oblogu i rasvjetu ogledala.", en: "Floating oak vanity set against stone cladding and a lit mirror." } },
  { image: "p-09", category: "custom", year: 2025,
    title: { sr: "TV zid u svijetlom furniru", en: "Media wall in pale veneer" },
    note: { sr: "Obloga zida sa integrisanim niskim elementom.", en: "Wall cladding with an integrated low unit." } },
  { image: "p-17", category: "designer", year: 2025,
    title: { sr: "Spavaća soba, vizualizacija", en: "Bedroom, visualisation" },
    note: { sr: "Ormari oko kreveta i tapacirano uzglavlje u jednom zidu.", en: "Wardrobes around the bed and an upholstered headboard in one wall." } },
  { image: "p-11", category: "custom", year: 2025,
    title: { sr: "Vitrina za čaše", en: "Glassware display" },
    note: { sr: "Detalj ugradne vitrine sa toplom rasvjetom.", en: "Detail of a built-in display with warm lighting." } },
  { image: "p-03", category: "custom", featured: true, year: 2025,
    title: { sr: "Viseći TV element u hrastu", en: "Floating oak media unit" },
    note: { sr: "Zaobljen niski element ispred zida sa profilisanim panelima.", en: "Rounded low unit set against a panelled wall." } },
  { image: "p-07", category: "custom", year: 2025,
    title: { sr: "Vitrina sa rasvjetom", en: "Lit glass display" },
    note: { sr: "Staklena vitrina u crnom okviru sa LED rasvjetom po policama.", en: "Black-framed glass display with LED lighting on every shelf." } },
  { image: "p-16", category: "designer", year: 2025,
    title: { sr: "Svijetla kuhinja, vizualizacija", en: "Light kitchen, visualisation" },
    note: { sr: "Idejno rješenje kuhinje u bež tonovima sa zlatnim ručkama.", en: "Kitchen concept in beige tones with brass handles." } },
  { image: "p-08", category: "custom", year: 2025,
    title: { sr: "Plakar sa zelenom ručkom", en: "Wardrobe with a mint handle" },
    note: { sr: "Bijeli frontovi, niša sa rasvjetom i okrugla ručka u boji nane.", en: "White fronts, a lit niche and a round mint-green handle." } },
  { image: "p-10", category: "designer", year: 2025,
    title: { sr: "Dnevni boravak sa TV zidom", en: "Living room with a media wall" },
    note: { sr: "Vizualizacija zida od kamena sa visećim elementom i osvijetljenim policama.", en: "Visualisation of a stone-effect wall with a floating unit and lit shelves." } },
  { image: "p-15", category: "custom", year: 2025,
    title: { sr: "Dnevna soba sa vitrinom", en: "Living room with a glass display" },
    note: { sr: "Niski TV element, obloga zida i visoka vitrina sa rasvjetom.", en: "Low media unit, wall cladding and a tall lit display." } },
  { image: "p-06", category: "designer", year: 2025,
    title: { sr: "Kuhinja u orahu, vizualizacija", en: "Walnut kitchen, visualisation" },
    note: { sr: "Dizajn kuhinje sa visokim ormarima u furniru oraha.", en: "Kitchen design with tall walnut-veneer cabinets." } },
  { image: "p-05", category: "custom", year: 2025,
    title: { sr: "Garderoba sa radnim kutkom", en: "Wardrobe with a study nook" },
    note: { sr: "Ugradna garderoba sa radnim stolom, ogledalom i skrivenom rasvjetom.", en: "Built-in wardrobe with a desk, mirror and concealed lighting." } },
  { image: "p-02", category: "designer", year: 2025,
    title: { sr: "Dnevna soba, 3D vizualizacija", en: "Living room, 3D visualisation" },
    note: { sr: "Idejno rješenje sa TV zidom i lučnom nišom za police.", en: "Concept for a living room with a media wall and an arched shelf niche." } },
  { image: "p-13", category: "custom", year: 2025,
    title: { sr: "Predsoblje", en: "Hallway" },
    note: { sr: "Ogledala, police i ulazna vrata u istom jeziku materijala.", en: "Mirrors, shelving and an entrance door in one material language." } },
  { image: "p-12", category: "designer", year: 2025,
    title: { sr: "Dnevna soba sa trpezarijom", en: "Living and dining room" },
    note: { sr: "Vizualizacija otvorenog prostora u svijetlim tonovima.", en: "Visualisation of an open-plan space in light tones." } },
  { image: "p-14", category: "custom", year: 2025,
    title: { sr: "Spavaća soba sa osvijetljenim plakarom", en: "Bedroom with a lit wardrobe" },
    note: { sr: "Plakar od poda do plafona sa staklenim frontovima i rasvjetom po policama.", en: "Floor-to-ceiling wardrobe with glass fronts and lighting on every shelf." } },
];

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

// Placeholder projects (stock photos, see src/assets/photos/CREDITS.md). Replace the
// photos and edit this list; the grid, filter and lightbox pick the changes up
// automatically. Photos can be any aspect ratio: portrait shots become tall tiles,
// and the first entry (if landscape) a large one. The order below is chosen so the
// "all" view packs into the 3-column grid without holes.
export const projects: Project[] = [
  { image: "p-01", category: "custom", featured: true, year: 2025,
    title: { sr: "Kuhinja od orahovine", en: "Walnut kitchen" },
    note: { sr: "Kuhinja po mjeri sa ostrvom i skrivenim ormarićima.", en: "Made-to-measure kitchen with an island and concealed storage." } },
  { image: "p-04", category: "finished", year: 2025,
    title: { sr: "Trpezarijski sto", en: "Dining table" },
    note: { sr: "Gotov proizvod, dostupan u više završnih obrada.", en: "Ready-made, available in several finishes." } },
  { image: "p-02", category: "designer", featured: true, year: 2025,
    title: { sr: "Biblioteka Nit", en: "Nit library" },
    note: { sr: "Modularne police od masivnog oraha.", en: "Modular shelving in solid walnut." } },
  { image: "p-05", category: "custom", year: 2024,
    title: { sr: "Zidna obloga od oraha", en: "Walnut wall panelling" },
    note: { sr: "Obloga sa integrisanom indirektnom rasvjetom.", en: "Panelling with integrated indirect lighting." } },
  { image: "p-03", category: "custom", featured: true, year: 2024,
    title: { sr: "Garderoba sa rasvjetom", en: "Lit walk-in wardrobe" },
    note: { sr: "Ugradna garderoba sa LED rasvjetom, prilagođena prostoru.", en: "Built-in walk-in wardrobe with LED lighting, fitted to the room." } },
  { image: "p-07", category: "finished", year: 2023,
    title: { sr: "Noćni ormarić", en: "Bedside table" },
    note: { sr: "Serija gotovih ormarića.", en: "Ready-made bedside series." } },
  { image: "p-06", category: "custom", year: 2024,
    title: { sr: "Dnevna soba", en: "Living room" },
    note: { sr: "TV zid i niski elementi u tamnom furniru.", en: "Media wall and low units in dark veneer." } },
  { image: "p-08", category: "designer", year: 2023,
    title: { sr: "Fotelja Oblik", en: "Oblik armchair" },
    note: { sr: "Autorski komad od savijenog furnira, ručni rad.", en: "Signature piece in bent veneer, handmade." } },
  { image: "p-09", category: "designer", year: 2024,
    title: { sr: "Sto Krug", en: "Krug table" },
    note: { sr: "Okrugli sto na skulpturalnoj nozi.", en: "Round table on a sculptural base." } },
  { image: "p-10", category: "finished", year: 2023,
    title: { sr: "Sofa Luka", en: "Luka sofa" },
    note: { sr: "Kožna sofa na metalnoj konstrukciji.", en: "Leather sofa on a steel frame." } },
  { image: "p-13", category: "custom", year: 2022,
    title: { sr: "Trpezarija od hrasta", en: "Oak dining room" },
    note: { sr: "Sto i stolice od masivnog hrasta, rađeni u kompletu.", en: "Table and chairs in solid oak, made as a set." } },
  { image: "p-11", category: "custom", year: 2023,
    title: { sr: "Spavaća soba", en: "Bedroom" },
    note: { sr: "Ugradni ormari i krevet po mjeri.", en: "Built-in wardrobes and a made-to-measure bed." } },
  { image: "p-12", category: "custom", year: 2023,
    title: { sr: "Kuhinja u hrastu", en: "Oak kitchen" },
    note: { sr: "Bijeli frontovi i radna ploča od hrasta.", en: "White fronts with an oak worktop." } },
];

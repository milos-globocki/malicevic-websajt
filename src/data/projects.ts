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

// Placeholder projects. Replace the photos in src/assets/photos and edit this
// list; the grid, filter and lightbox pick the changes up automatically.
export const projects: Project[] = [
  { image: "p-01", category: "custom", featured: true, year: 2025,
    title: { sr: "Kuhinja od orahovine", en: "Walnut kitchen" },
    note: { sr: "Kuhinja po mjeri sa skrivenim ormarićima.", en: "Made-to-measure kitchen with concealed storage." } },
  { image: "p-02", category: "designer", featured: true, year: 2025,
    title: { sr: "Komoda Linija", en: "Linija sideboard" },
    note: { sr: "Dizajnerski komad od masivnog hrasta.", en: "Designer piece in solid oak." } },
  { image: "p-03", category: "custom", featured: true, year: 2024,
    title: { sr: "Garderober u nišama", en: "Alcove wardrobe" },
    note: { sr: "Ugradni plakar prilagođen prostoru.", en: "Built-in wardrobe fitted to the room." } },
  { image: "p-04", category: "finished", year: 2025,
    title: { sr: "Trpezarijski sto", en: "Dining table" },
    note: { sr: "Gotov proizvod, dostupan u više završnih obrada.", en: "Ready-made, available in several finishes." } },
  { image: "p-05", category: "designer", year: 2024,
    title: { sr: "Polica Nit", en: "Nit shelving" },
    note: { sr: "Modularna polica, ograničena serija.", en: "Modular shelving, limited series." } },
  { image: "p-06", category: "custom", year: 2024,
    title: { sr: "Dnevna soba", en: "Living room" },
    note: { sr: "TV zid sa ugrađenim osvetljenjem.", en: "Media wall with integrated lighting." } },
  { image: "p-07", category: "finished", year: 2023,
    title: { sr: "Noćni ormarići", en: "Bedside tables" },
    note: { sr: "Serija gotovih ormarića.", en: "Ready-made bedside series." } },
  { image: "p-08", category: "designer", year: 2023,
    title: { sr: "Fotelja Oblik", en: "Oblik armchair" },
    note: { sr: "Autorski komad, ručni rad.", en: "Signature piece, handmade." } },
  { image: "p-09", category: "custom", year: 2023,
    title: { sr: "Radni kutak", en: "Home office" },
    note: { sr: "Kancelarijski namještaj po mjeri.", en: "Custom home-office furniture." } },
];

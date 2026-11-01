import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.jpg", {
  eager: true,
});

// The home page's fixed slots borrow photos from the projects, so a photo is stored once.
// Swap one by pointing it at another name in src/assets/photos.
const slots: Record<string, string> = {
  hero: "luksuz-12",
  about: "drvo-07",
  poster: "prirodno-08",
  "offer-1": "drvo-09",
  "offer-2": "luksuz-13",
  "offer-3": "prirodno-05",
};

/** Look up a photo from src/assets/photos by base name, e.g. "drvo-01", or a slot such as "hero". */
export function photo(name: string): ImageMetadata {
  const file = slots[name] ?? name;
  const entry = modules[`../assets/photos/${file}.jpg`];
  if (!entry) throw new Error(`Missing photo: src/assets/photos/${file}.jpg`);
  return entry.default;
}

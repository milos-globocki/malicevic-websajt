import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.jpg", {
  eager: true,
});

/** Look up a photo from src/assets/photos by base name, e.g. "hero". */
export function photo(name: string): ImageMetadata {
  const entry = modules[`../assets/photos/${name}.jpg`];
  if (!entry) throw new Error(`Missing photo: src/assets/photos/${name}.jpg`);
  return entry.default;
}

/** Split text into words with a 0..1 position, used for the scroll-fill effect. */
export function splitWords(text: string): { word: string; p: string }[] {
  const words = text.trim().split(/\s+/);
  const last = Math.max(1, words.length - 1);
  return words.map((word, i) => ({ word, p: (i / last).toFixed(3) }));
}

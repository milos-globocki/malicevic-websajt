/** A tile's column and row span in the photo wall. */
export type Span = [cols: number, rows: number];

/**
 * Empty cells left when CSS grid places these tiles in `cols` columns with
 * `grid-auto-flow: dense`: each tile takes the first slot from the top left where it fits.
 */
function holes(spans: Span[], cols: number): number {
  const taken: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (taken[y]?.[x]) return false;
    return true;
  };
  for (const [span, h] of spans) {
    const w = Math.min(span, cols);
    let r = 0;
    let c = 0;
    while (!free(r, c, w, h)) {
      if (++c + w > cols) [r, c] = [r + 1, 0];
    }
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) (taken[y] ??= [])[x] = true;
  }
  let empty = 0;
  for (let y = 0; y < taken.length; y++) for (let x = 0; x < cols; x++) if (!taken[y]?.[x]) empty++;
  return empty;
}

/**
 * Tile spans for a photo wall that packs without holes, in the order given. A portrait
 * photo is tall (two rows), a landscape one a single cell, and on desktop the first photo,
 * if landscape, is a large 2x2 tile, as on the home page wall. When the counts leave a
 * gap, up to two photos change shape: a landscape one goes wide (two columns), or, failing
 * that, a portrait one goes down to a single cell.
 */
export function packWall(tall: boolean[]): { lg: Span[]; sm: Span[] } {
  const pick = (cols: number, big: boolean): Span[] => {
    const base = tall.map((t): Span => (t ? [1, 2] : [1, 1]));
    if (big && tall[0] === false) base[0] = [2, 2];
    const alt = tall.map((t): [Span, number] => (t ? [[1, 1], 5] : [[2, 1], 2]));
    const free = tall.map((_, i) => i).filter((i) => base[i]![0] === 1);

    let best = { spans: base, score: Infinity };
    const tryOut = (changed: number[]) => {
      const spans = base.slice();
      let cost = 0;
      for (const i of changed) {
        spans[i] = alt[i]![0];
        cost += alt[i]![1];
      }
      const score = holes(spans, cols) * 100 + cost;
      if (score < best.score) best = { spans, score };
    };
    tryOut([]);
    for (const i of free) tryOut([i]);
    for (const i of free) for (const j of free) if (j > i) tryOut([i, j]);
    return best.spans;
  };
  return { lg: pick(3, true), sm: pick(2, false) };
}

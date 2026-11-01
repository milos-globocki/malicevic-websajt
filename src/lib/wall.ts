/** A tile's column and row span in the photo wall, and on desktop its first column (1-based), if fixed. */
export type Span = [cols: number, rows: number, col?: number];

/**
 * Empty cells left when CSS grid places these tiles in `cols` columns with
 * `grid-auto-flow: dense`: each tile takes the first slot from the top left where it fits,
 * a tile with a fixed column the first row where it fits in that column.
 */
function holes(spans: Span[], cols: number): number {
  const taken: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (taken[y]?.[x]) return false;
    return true;
  };
  for (const [span, h, at] of spans) {
    const w = Math.min(span, cols);
    const fixed = at !== undefined && at - 1 + w <= cols;
    let r = 0;
    let c = fixed ? at - 1 : 0;
    while (!free(r, c, w, h)) {
      if (fixed) r++;
      else if (++c + w > cols) [r, c] = [r + 1, 0];
    }
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) (taken[y] ??= [])[x] = true;
  }
  let empty = 0;
  for (let y = 0; y < taken.length; y++) for (let x = 0; x < cols; x++) if (!taken[y]?.[x]) empty++;
  return empty;
}

/**
 * Tile spans for a project's photo wall that packs without holes, in the order given.
 * A portrait photo is tall (two rows), a landscape one a single cell. For rhythm, the first
 * photo and then every few photos is featured at two columns: a landscape one as a 2x2
 * tile, a portrait one as 2x4 (it sits beside two tall tiles), alternating left and right
 * on desktop. The spacing is picked so the rows fill; where no spacing does, up to two
 * photos change shape: a feature goes back to normal, a landscape photo goes wide (two
 * columns), or a portrait one goes down to a single cell.
 */
export function packWall(tall: boolean[]): { lg: Span[]; sm: Span[] } {
  const plain = (i: number): Span => (tall[i] ? [1, 2] : [1, 1]);
  const featured = (i: number): Span => (tall[i] ? [2, 4] : [2, 2]);

  const pick = (cols: number, every: number) => {
    let side = 1;
    const base = tall.map((_, i): Span => {
      if (i % every !== 0 || tall.length < 4) return plain(i);
      const [w, h] = featured(i);
      const at = cols === 3 ? side : undefined;
      side = side === 1 ? 2 : 1;
      return [w, h, at];
    });
    const alt = base.map((s, i): [Span, number] =>
      s[0] === 2 ? [plain(i), 3] : tall[i] ? [[1, 1], 5] : [[2, 1], 2],
    );

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
    for (let i = 0; i < base.length; i++) tryOut([i]);
    for (let i = 0; i < base.length; i++) for (let j = i + 1; j < base.length; j++) tryOut([i, j]);
    return best;
  };

  // The spacing closest to every seventh photo that packs cleanly on both screens.
  let best: { lg: Span[]; sm: Span[]; score: number } | undefined;
  for (const every of [7, 6, 8, 9, 5, 10]) {
    const lg = pick(3, every);
    const sm = pick(2, every);
    const score = lg.score + sm.score;
    if (!best || score < best.score) best = { lg: lg.spans, sm: sm.spans, score };
    if (score === 0) break;
  }
  return { lg: best!.lg, sm: best!.sm };
}

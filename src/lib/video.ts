import fs from "node:fs";
import path from "node:path";

export interface Source {
  src: string;
  type: string;
}

const formats = [
  ["webm", 'video/webm; codecs="vp9"'],
  ["mp4", 'video/mp4; codecs="avc1.640028"'],
] as const;

/**
 * The files of public/video/<name>.webm and .mp4 that exist, smaller first: the browser
 * takes the first one it can play, and either encoder can win depending on the clip.
 */
export function clipSources(name: string): Source[] {
  return formats
    .map(([ext, type]) => ({ file: path.join(process.cwd(), "public/video", `${name}.${ext}`), src: `/video/${name}.${ext}`, type }))
    .filter((s) => fs.existsSync(s.file))
    .sort((a, b) => fs.statSync(a.file).size - fs.statSync(b.file).size)
    .map(({ src, type }) => ({ src, type }));
}

// Runs only for /video/* (run_worker_first in wrangler.jsonc). Everything else is served as
// plain static assets. Static assets answer a Range request with the whole file (200), and
// Safari expects 206 Partial Content for video, so the ranges are cut here.

const parseRange = (header, size) => {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || (match[1] === "" && match[2] === "")) return null; // multipart or malformed
  if (match[1] === "") {
    const length = Math.min(Number(match[2]), size);
    return { start: size - length, end: size - 1 };
  }
  const start = Number(match[1]);
  const end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
  return { start, end };
};

export default {
  async fetch(request, env) {
    const assetHeaders = new Headers(request.headers);
    assetHeaders.delete("Range");
    const asset = await env.ASSETS.fetch(request.url, { method: request.method, headers: assetHeaders });

    const headers = new Headers(asset.headers);
    if (!asset.ok && asset.status !== 304) return new Response(asset.body, { status: asset.status, headers });
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=86400");

    const whole = () => new Response(asset.body, { status: asset.status, headers });
    const rangeHeader = request.headers.get("Range");
    if (request.method !== "GET" || asset.status !== 200 || !rangeHeader) return whole();

    const ifRange = request.headers.get("If-Range");
    if (ifRange && ifRange !== asset.headers.get("ETag")) return whole();

    // The asset response doesn't reliably state its length, so read the clip first. The clips
    // are at most a few MB, so holding one in memory is fine.
    const bytes = await asset.arrayBuffer();
    const size = bytes.byteLength;
    const range = parseRange(rangeHeader, size);
    if (!range) return new Response(bytes, { status: 200, headers });
    if (range.start >= size || range.start > range.end) {
      headers.set("Content-Range", `bytes */${size}`);
      headers.delete("Content-Length");
      return new Response(null, { status: 416, headers });
    }

    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);
    headers.set("Content-Length", String(range.end - range.start + 1));
    return new Response(bytes.slice(range.start, range.end + 1), { status: 206, headers });
  },
};

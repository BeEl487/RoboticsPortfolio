// Reads a project's markdown, splits it into the numbered design steps, and points every picture at a web-sized copy.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { getImage } from "astro:assets";

marked.setOptions({ gfm: true, breaks: false });

const ROOT = path.resolve(process.cwd(), ".."); // the repo root (commands run from web/)
const PHOTOS = import.meta.glob("/src/assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}");
const RASTER = /\.(jpe?g|png)$/i;

/** The ImageMetadata of a photo in the repo's images/ folder (for <Image>), or null. */
export async function photo(rel) {
  const load = PHOTOS[`/src/assets/images/${decodeURI(rel)}`];
  return load ? (await load()).default : null;
}

/** URL of a web-sized copy of a photo (or of the file itself for videos / PDFs). */
export async function photoUrl(rel, width = 1600) {
  if (!RASTER.test(rel)) return `/images/${rel}`;
  const meta = await photo(rel);
  if (!meta) return `/images/${rel}`;
  const out = await getImage({ src: meta, width: Math.min(width, meta.width), format: "webp" });
  return out.src;
}

async function rewriteImages(html) {
  const found = [...html.matchAll(/(src|poster|href)="images\/([^"]+)"/g)];
  const urls = await Promise.all(found.map((m) => photoUrl(m[2], m[1] === "href" ? 2400 : 1600)));
  let i = 0;
  return html.replace(/(src|poster|href)="images\/([^"]+)"/g, (_, attr) => `${attr}="${urls[i++]}"`);
}

/** Split markdown into an intro and sections at headings of `level` ("#" or "##"), ignoring code fences. */
function splitAt(md, level) {
  const re = new RegExp(`^${level} (.+)$`);
  const intro = [];
  const sections = [];
  let fence = false;
  for (const line of md.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    const m = !fence && line.match(re);
    if (m) sections.push({ heading: m[1].trim(), body: [] });
    else (sections.length ? sections[sections.length - 1].body : intro).push(line);
  }
  return { intro: intro.join("\n"), sections: sections.map((s) => ({ heading: s.heading, body: s.body.join("\n") })) };
}

// "1. Introduction" / "1.1 Success criteria": the step rail numbers the steps, so the written numbers go
export const stripNumber = (h) => h.replace(/^\d+(\.\d+)*\.?\s+/, "");

async function md2html(md) {
  return rewriteImages(marked.parse(md.replace(/^(#{1,4} )\d+(\.\d+)*\.?\s+/gm, "$1")));
}

/** { introHtml, steps: [{ heading, html, photos: [url], videos: [{src, poster, label, portrait}] }] } */
export async function loadPage(p) {
  let md = fs.readFileSync(path.join(ROOT, p.file), "utf8").replace(/\r\n/g, "\n");
  let intro, sections;
  if (p.split === "h1") {
    ({ intro, sections } = splitAt(md, "#"));
  } else {
    md = md.replace(/^# .+\n/, ""); // the page title is already the page heading
    ({ intro, sections } = splitAt(md, "##"));
  }
  const steps = [];
  for (const s of sections) {
    const photos = await Promise.all(((p.images || {})[s.heading] || []).map((g) => photoUrl(g, 1200)));
    const videos = await Promise.all(
      ((p.videos || {})[s.heading] || []).map(async (v) => ({ ...v, src: `/images/${v.src}`, poster: await photoUrl(v.poster, 1200) })),
    );
    if (!s.body.trim() && !photos.length && !videos.length) continue; // an empty heading, e.g. "Abstract"
    steps.push({ heading: stripNumber(s.heading), html: await md2html(s.body), photos, videos });
  }
  return { introHtml: intro.trim() ? await md2html(intro) : "", steps };
}

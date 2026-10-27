// Runs before `astro build` / `astro dev`. Copies only the files the site uses out of the repo's images/ folder (~1 GB):
// photos (jpg/png) into src/assets/images, where Astro makes web-sized copies of them; videos and PDFs into public/images,
// served as they are. Both folders are generated (git-ignored) and rebuilt on every run.
import fs from "node:fs";
import path from "node:path";
import { pages } from "../src/data/pages.mjs";

const WEB = process.cwd();
const ROOT = path.resolve(WEB, "..");
const SRC_IMAGES = path.join(ROOT, "images");
const RASTER = /\.(jpe?g|png)$/i;

const used = new Set();
const add = (rel) => rel && used.add(decodeURI(rel));
for (const p of pages) {
  add(p.hero);
  for (const list of Object.values(p.images || {})) list.forEach(add);
  for (const list of Object.values(p.videos || {})) list.forEach((v) => (add(v.src), add(v.poster)));
  const md = fs.readFileSync(path.join(ROOT, p.file), "utf8");
  for (const m of md.matchAll(/(?:src|poster|href)=["']images\/([^"']+)["']/g)) add(m[1]);
  for (const m of md.matchAll(/\]\(images\/([^)\s]+)\)/g)) add(m[1]);
}
if (fs.existsSync(path.join(SRC_IMAGES, "portrait.jpg"))) add("portrait.jpg");

const rasterDir = path.join(WEB, "src", "assets", "images");
const publicDir = path.join(WEB, "public", "images");
fs.rmSync(rasterDir, { recursive: true, force: true });
fs.rmSync(publicDir, { recursive: true, force: true });

let photos = 0, other = 0;
const missing = [];
for (const rel of used) {
  const from = path.join(SRC_IMAGES, rel);
  if (!fs.existsSync(from)) { missing.push(rel); continue; }
  const to = path.join(RASTER.test(rel) ? rasterDir : publicDir, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  RASTER.test(rel) ? photos++ : other++;
}
console.log(`collect-assets: ${photos} photos, ${other} videos/PDFs` + (missing.length ? `, missing: ${missing.join(", ")}` : ""));

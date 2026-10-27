// Static site generator for the robotics portfolio.
// Reads markdown files from the repo root and renders them as case-study pages: each page's sections become a numbered
// step rail, so the design process reads in order. Output goes to docs/ (served by Vercel; see vercel.json).
// Only the images the pages actually use are copied into docs/images.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { marked } = require("marked");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "docs");
const CSS_VERSION = crypto.createHash("md5").update(fs.readFileSync(path.join(__dirname, "style.css"))).digest("hex").slice(0, 8);

marked.setOptions({ gfm: true, breaks: false });

const NAME = "Brandon Lai";
const GITHUB = "https://github.com/BeEl487";
const YOUTUBE = "https://www.youtube.com/channel/UCtvEuVHtahAkyb2Jg0Qb9iA";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8").replace(/\r\n/g, "\n");
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---- What is on the site ---------------------------------------------------
// Page details. The home page order and the VEX pairing are set by RANK / PAIRED / OTHER below.
// Removed 2026-10-27 at the owner's request: 3D design & printing, game design, Blender animation, bin-picking RL,
// parametric wind turbine blades, both QDD actuators (shoulder/hip and elbow/wrist), and the YouTube page (now a link).
const pages = [
  {
    slug: "robot-hand", file: "Robot Hand.md",
    title: "Vision-guided robot hand", tag: "Manipulation & vision",
    deck: "A hand that finds an object's outline with YOLOE and places each finger against it - simulated in MuJoCo, built for the Amazing Hand.",
    hero: "robot-hand/00_overview_real_scenes.jpg",
  },
  {
    slug: "mini-echo", file: "Mini Echo Journey.md", split: "h1",
    title: "Mini Echo", tag: "Quadruped robot",
    deck: "Three prototypes - from micro servos and AA batteries to inverse kinematics, mechanical linkages, and a fully integrated walking quadruped.",
    hero: "mini-echo/mini-echo-hero.jpeg",
    videos: {
      "Version 1 — Prototyping the Concept": [{ src: "mini-echo/v1-demo.mp4", poster: "mini-echo/v1-demo-poster.jpg", label: "V1 prototype demo" }],
      "Version 2 — Servos, Inverse Kinematics and Walking": [{ src: "mini-echo/v2-walk.mp4", poster: "mini-echo/v2-walk-poster.jpg", label: "V2 inverse-kinematics walking gait" }],
      "Version 3 — Mechanical Optimisation": [
        { src: "mini-echo/v3-manual-move.mp4", poster: "mini-echo/v3-manual-move-poster.jpg", label: "V3 legs moved manually" },
        { src: "mini-echo/v3-walking.mp4", poster: "mini-echo/v3-walking-poster.jpg", label: "V3 walking", portrait: true },
      ],
    },
  },
  {
    slug: "hand-tracking", file: "Mechanical Hand Tracking.md",
    title: "Mechanical hand motion capture", tag: "Sensing & kinematics",
    deck: "A low-cost potentiometer exoskeleton for sign-language interpretation - 15 channels of joint data reconstructed into a live 3D hand model.",
    hero: "hand-tracking/hero.jpg",
  },
  {
    slug: "custom-computer", file: "Custom Computer.md",
    title: "Breadboard computer", tag: "Digital logic",
    deck: "A minimal-instruction-set computer designed in CircuitVerse and hand-built from six perfboard cards - CPU, program counter, memory, and a 555 timer clock.",
    hero: "custom-computer/assembled-powered.jpg",
  },
  {
    slug: "redbacks-localization", file: "Redbacks Localization.md",
    title: "Redbacks localization", tag: "VEX autonomous software",
    deck: "A C++ library for team 4613B: odometry fused with distance sensors by a 200-particle Monte Carlo filter, plus a closed-loop motion controller.",
    hero: "redbacks-code/code-09-mcl-update-sensor-likelihood.png",
  },
  {
    slug: "python-projects", file: "Python Projects.md",
    title: "Python projects", tag: "Algorithms & simulation",
    deck: "A path tracer, a NEAT network that learns Flappy Bird, an A* visualizer and more - built from scratch to understand how each algorithm works.",
    hero: "python-projects/raytracer.png",
  },
  {
    slug: "frc", file: "FRC Journey.md", split: "h1",
    title: "FRC", tag: "2025–26 REBUILT season",
    deck: "From VEX to FRC - competing with two Barker teams across regionals, Worlds, and Einstein.",
    hero: "frc/hero.jpg",
    images: {
      "Southern Cross Regional": ["frc/greybacks-action.jpg", "frc/greybacks-scoring.jpg"],
      "FIRST Championship - Houston": ["frc/mechanism-cad-greybacks.jpg", "frc/mechanism-cad-1.jpg", "frc/8613-worlds-win.jpg"],
      "FIRST Championship - 4613 Barker Redbacks": ["frc/redbacks-back.jpg", "frc/subsystem-test.jpg", "frc/4613-worlds-win.jpg"],
    },
    videos: {
      "Southern Cross Regional": [{ src: "frc/shooting-regionals.mp4", poster: "frc/shooting-regionals-poster.jpg", label: "Shooting mechanism at Southern Cross Regional" }],
    },
  },
  {
    slug: "vex", file: "Vex Competition Journey.md", split: "h1",
    title: "VEX V5", tag: "Team 4613B / 4613O",
    deck: "Two seasons of VEX Robotics - from Nationals-winning Whisper to the powertrain-optimised Switch, plus a V5RC Middle School Nationals win.",
    hero: "vex/hero.jpg",
    images: {
      "VEX Robotics: Team 4613B (Barker College)": ["vex/whisper-rings.jpg"],
      "V5RC - Middle School Worlds": ["vex-v5/pit-1.jpg", "vex-v5/pit-2.jpg", "vex-v5/pit-3.jpg", "vex-v5/pit-4.jpg", "vex-v5/nationals-team.jpg"],
      "Override - Switch, the Robot": ["override/robot-dr4b.jpg", "override/robot-stack.jpg", "override/robot-field.jpg", "override/ratchet.jpg"],
      "Override - Achievements": ["override/robot-top.jpg", "override/robot-field-2.jpg"],
      "Override - Problems We Faced": ["override/end-effector.jpg", "override/lift-bands.jpg", "override/build-day.jpg"],
      "Override - The Code": ["override/plan.jpg"],
    },
    videos: {
      "V5RC - Middle School": [{ src: "vex-v5/auto-nats.mp4", poster: "vex-v5/auto-nats-poster.jpg", label: "Autonomous run at Nationals" }],
    },
  },
  {
    slug: "vex-iq", file: "VEX IQ Journey.md", split: "h1",
    title: "VEX IQ", tag: "Team 4613B",
    deck: "Full Volume season - a Barker League tournament win and a top-6.4% finish at the 2024 VEX Robotics World Championship.",
    hero: "vex-iq/stacking-demo-poster.jpg",
    images: { "Barker League VIQC": ["vex-iq/practice-robot.jpeg"] },
  },
  {
    slug: "ftc", file: "FTC Journey.md",
    title: "FTC", tag: "Sydney North Qualifier 2025",
    deck: "DECODE season - Innovate Award 1st place (Bluey, 11144) and Inspire Award 2nd place (18306).",
    hero: "ftc/field-action.jpg",
  },
];

// Home page order, most important first (owner's ranking, 2026-10-27). VEX V5 is shown as one block with the pages
// paired to it: VEX IQ (the same team's earlier season) and Redbacks localization (that team's autonomous code).
const RANK = ["frc", "vex", "mini-echo", "hand-tracking", "robot-hand", "ftc"];
const PAIRED = { vex: ["vex-iq", "redbacks-localization"] };
const OTHER = ["custom-computer", "python-projects"]; // not in the ranking: a short list at the bottom
const pairedTo = (slug) => Object.keys(PAIRED).find((k) => PAIRED[k].includes(slug));
const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
// reading order for "Next project": the ranking, each block's paired pages straight after it, then the rest
const ORDERED = [...RANK.flatMap((s) => [s, ...(PAIRED[s] || [])]), ...OTHER].map((s) => bySlug[s]);
for (const p of pages) if (!ORDERED.includes(p)) throw new Error(`${p.slug} is not placed in RANK / PAIRED / OTHER`);

// The photo beside the home page intro: images/portrait.jpg once there is one, else the top project's robot.
const PORTRAIT = fs.existsSync(path.join(ROOT, "images", "portrait.jpg"))
  ? { src: "portrait.jpg", alt: NAME, caption: `${NAME}, Sydney` }
  : { src: "frc/hero.jpg", alt: "The FRC robot", caption: "FRC robot, 2025–26 season" };

// small overrides for this ordering
bySlug["mini-echo"].title = "Mini Echo robot dog";
bySlug["mini-echo"].tag = "Quadruped robot";

// ---- Markdown helpers -------------------------------------------------------
// Split markdown into an intro and sections at headings of `level` ("#" or "##"), ignoring lines inside code fences.
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

// "1. Introduction" / "1.1 Success criteria" -> the rail numbers the steps, so drop the written ones.
const stripNumber = (h) => h.replace(/^\d+(\.\d+)*\.?\s+/, "");

function md2html(md) {
  return marked
    .parse(md.replace(/^(#{1,4} )\d+(\.\d+)*\.?\s+/gm, "$1"))
    .replace(/(src|href|poster)="images\//g, '$1="../images/');
}

const img = (rel, depth) => (/^https?:/.test(rel) ? rel : `${depth ? "../" : ""}images/${rel}`);

function media(p, heading) {
  const photos = (p.images || {})[heading] || [];
  const videos = (p.videos || {})[heading] || [];
  const grid = photos.length
    ? `<div class="photo-grid">${photos.map((g) => `<img src="${img(g, 1)}" alt="${esc(heading)}" loading="lazy" />`).join("")}</div>`
    : "";
  const vids = videos.length
    ? `<div class="video-grid">${videos
        .map((v) => `<figure${v.portrait ? ' class="portrait"' : ""}><video controls preload="none" poster="${img(v.poster, 1)}"><source src="${img(v.src, 1)}" type="video/mp4" /></video><figcaption>${esc(v.label)}</figcaption></figure>`)
        .join("")}</div>`
    : "";
  return grid + vids;
}

// ---- Layout -----------------------------------------------------------------
function layout({ title, description, content, depth, current }) {
  const base = depth ? "../" : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..650;1,8..60,400&display=swap" />
<link rel="stylesheet" href="${base}style.css?v=${CSS_VERSION}" />
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="${base}index.html">${NAME}</a>
  <nav aria-label="Main">
    <a href="${base}index.html#work"${current === "work" ? ' aria-current="page"' : ""}>Work</a>
    <a href="${base}index.html#profile">Profile</a>
    <a href="${base}index.html#contact">Contact</a>
  </nav>
</header>
<main id="main">
${content}
</main>
<footer class="site-footer">
  <span>${NAME} · Sydney</span>
  <a href="${GITHUB}">GitHub</a>
  <a href="${YOUTUBE}">YouTube</a>
</footer>
</body>
</html>`;
}

// ---- Home ---------------------------------------------------------------------
function rowLink(p, cls) {
  return `
        <a class="${cls}" href="projects/${p.slug}.html">
          <img src="${img(p.hero, 0)}" alt="" loading="lazy" />
          <span class="work-text">
            <span class="work-tag">${esc(p.tag)}</span>
            <span class="work-title">${esc(p.title)}</span>
            <span class="work-deck">${esc(p.deck)}</span>
          </span>
        </a>`;
}

function row(p) {
  const pair = (PAIRED[p.slug] || []).map((s) => bySlug[s]);
  return `
      <li class="work-item${pair.length ? " has-pair" : ""}">${rowLink(p, "work-row")}
        ${pair.length ? `<ul class="pair-list" aria-label="Paired with ${esc(p.title)}">${pair.map((q) => `<li>${rowLink(q, "pair-row")}</li>`).join("")}</ul>` : ""}
      </li>`;
}

function buildIndex() {
  const groups = `
    <section class="work-group" aria-labelledby="g-main">
      <h2 id="g-main">Work</h2>
      <p class="group-note">Most important first. Each page walks through the design: the problem, the options, what failed, and what changed.</p>
      <ol class="work-list">${RANK.map((s) => row(bySlug[s])).join("")}
      </ol>
    </section>
    <section class="work-group work-other" aria-labelledby="g-other">
      <h2 id="g-other">Other projects</h2>
      <ul class="work-list">${OTHER.map((s) => `<li>${rowLink(bySlug[s], "work-row")}</li>`).join("")}
      </ul>
    </section>`;

  const content = `
  <section class="intro">
    <div class="intro-text">
      <h1>I design and build robots, and write down why.</h1>
      <p>Robotics student at Barker College, Sydney. Each project here shows the thinking behind the build: the options I
      weighed, what I tested, what failed, and what I changed because of it.</p>
      <p class="intro-links"><a class="button" href="#work">See the work</a><a href="#profile">About me</a></p>
    </div>
    <figure class="intro-photo">
      <img src="${img(PORTRAIT.src, 0)}" alt="${esc(PORTRAIT.alt)}" />
      <figcaption>${esc(PORTRAIT.caption)}</figcaption>
    </figure>
  </section>

  <section id="work" class="work" aria-label="Work">
    ${groups}
  </section>

  <section id="profile" class="profile">
    <h2>Profile</h2>
    <div class="profile-body">
      <p>I started in VEX IQ with team 4613B, finishing in the top 6.4% at the 2024 VEX Robotics World Championship, then moved
      to VEX V5 and FRC with Barker's teams, competing at regionals, Worlds and Einstein.</p>
      <p>Outside competition I build my own robots: a vision-guided robot hand, a walking quadruped, a motion-capture glove
      and a computer made from logic chips. I document builds on my YouTube channel, which has been featured on Hackaday and
      Hackster.io.</p>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>Contact</h2>
    <p>The code and design logs for most of these projects are public.</p>
    <p class="contact-links"><a href="${GITHUB}">GitHub</a><a href="${YOUTUBE}">YouTube</a></p>
  </section>`;

  fs.writeFileSync(
    path.join(OUT, "index.html"),
    layout({ title: `${NAME} - Robotics portfolio`, description: "Robots I have designed and built, and the design process behind each one.", content, depth: 0, current: "work" }),
  );
}

// ---- Project pages ---------------------------------------------------------------
function buildPage(p, i) {
  let md = read(p.file);
  let sections;
  let intro;
  if (p.split === "h1") {
    ({ intro, sections } = splitAt(md, "#"));
    if (sections.length && !intro.trim() && sections.length > 1 && !sections[0].body.trim().replace(/^#+.*$/gm, "").trim()) {
      sections = sections.slice(1); // a title-only first event
    }
  } else {
    md = md.replace(/^# .+\n/, ""); // the page title is already the page heading
    ({ intro, sections } = splitAt(md, "##"));
  }
  // drop sections with no content at all (e.g. an empty "Abstract" heading)
  sections = sections.filter((s) => s.body.trim() || media(p, s.heading));

  const steps = sections
    .map(
      (s, n) => `
      <section class="step" id="step-${n + 1}">
        <div class="step-num" aria-hidden="true">${String(n + 1).padStart(2, "0")}</div>
        <div class="step-body">
          <h2>${esc(stripNumber(s.heading))}</h2>
          <div class="prose">${md2html(s.body)}</div>
          ${media(p, s.heading)}
        </div>
      </section>`,
    )
    .join("");

  const next = ORDERED[(i + 1) % ORDERED.length];
  // the pages paired with this one (VEX V5 <-> VEX IQ <-> Redbacks localization)
  const lead = PAIRED[p.slug] ? p.slug : pairedTo(p.slug);
  const related = lead ? [lead, ...PAIRED[lead]].filter((s) => s !== p.slug).map((s) => bySlug[s]) : [];
  const relatedNav = related.length
    ? `<nav class="related" aria-label="Paired pages"><span>Goes with</span>${related.map((q) => `<a href="${q.slug}.html">${esc(q.title)}</a>`).join("")}</nav>`
    : "";
  const content = `
  <article class="case">
    <header class="case-head">
      <a class="back" href="../index.html#work">Back to all work</a>
      <p class="case-tag">${esc(p.tag)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="case-deck">${esc(p.deck)}</p>
      ${relatedNav}
    </header>
    <figure class="case-hero"><img src="${img(p.hero, 1)}" alt="${esc(p.title)}" /></figure>
    ${intro.trim() ? `<div class="case-intro prose">${md2html(intro)}</div>` : ""}
    ${sections.length > 2 ? `<nav class="steps-nav" aria-label="On this page"><ol>${sections.map((s, n) => `<li><a href="#step-${n + 1}">${esc(stripNumber(s.heading))}</a></li>`).join("")}</ol></nav>` : ""}
    <div class="steps">${steps}
    </div>
    <nav class="case-foot" aria-label="More work">
      <a href="../index.html#work">Back to all work</a>
      <a class="next" href="${next.slug}.html">Next: ${esc(next.title)}</a>
    </nav>
  </article>`;

  fs.writeFileSync(
    path.join(OUT, "projects", `${p.slug}.html`),
    layout({ title: `${p.title} - ${NAME}`, description: p.deck, content, depth: 1 }),
  );
}

// ---- Images: copy only what the pages use ------------------------------------
function copyUsedImages() {
  const used = new Set();
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, f.name);
      if (f.isDirectory()) { if (f.name !== "images") walk(full); continue; }
      if (!f.name.endsWith(".html")) continue;
      for (const m of fs.readFileSync(full, "utf8").matchAll(/(?:src|poster|href)="(?:\.\.\/)?images\/([^"#?]+)"/g)) {
        used.add(decodeURI(m[1]));
      }
    }
  };
  walk(OUT);
  const dest = path.join(OUT, "images");
  fs.rmSync(dest, { recursive: true, force: true });
  let missing = 0;
  for (const rel of used) {
    const src = path.join(ROOT, "images", rel);
    if (!fs.existsSync(src)) { console.warn("missing image:", rel); missing++; continue; }
    fs.mkdirSync(path.dirname(path.join(dest, rel)), { recursive: true });
    fs.copyFileSync(src, path.join(dest, rel));
  }
  console.log(`copied ${used.size - missing} images (${missing} missing)`);
}

// ---- Run -------------------------------------------------------------------------
fs.rmSync(OUT, { recursive: true, force: true }); // removed projects must not linger
fs.mkdirSync(path.join(OUT, "projects"), { recursive: true });
fs.copyFileSync(path.join(__dirname, "style.css"), path.join(OUT, "style.css"));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
buildIndex();
ORDERED.forEach(buildPage);
copyUsedImages();
console.log("Built site into", OUT);

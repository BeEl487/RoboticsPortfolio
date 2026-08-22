// Static site generator for the robotics portfolio.
// Reads markdown files from the repo root, renders them to styled HTML pages.
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "..", "docs"); // GitHub Pages friendly output dir

marked.setOptions({ gfm: true, breaks: false });

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8").replace(/\r\n/g, "\n");
}

function firstImage(md) {
  const m = md.match(/<img[^>]*src="([^"]+)"/);
  return m ? m[1] : null;
}

// Local images live in /images at the repo root and are copied into docs/images.
// Paths below are relative to that images/ folder.
function imgPath(relPath, active) {
  if (/^https?:\/\//.test(relPath)) return relPath;
  const base = active === "root" ? "images/" : "../images/";
  return base + relPath;
}

// ---- Project catalogue -----------------------------------------------
const projects = [
  {
    slug: "qdd-actuator-v1",
    file: "QDD Actuator V3.md",
    title: "QDD Actuator - Shoulder/Hip Joint",
    tag: "Actuator Design",
    deck: "A 55mm quasi-direct drive actuator built around a custom cycloidal gearbox - 50Nm continuous torque for shoulder- and hip-style joints.",
    accent: "#c96a4d",
    hero: "actuator-v1/thumbnail.png",
  },
  {
    slug: "qdd-actuator-v2",
    file: "Elbow Actuator.md",
    title: "QDD Actuator - Elbow/Wrist Joint",
    tag: "Actuator Design",
    deck: "The fast, light counterpart to the first actuator - a vertical-stack planetary design tuned for speed and low reflected inertia near the end effector.",
    accent: "#4d7ac9",
  },
  {
    slug: "hand-tracking",
    file: "Mechanical Hand Tracking.md",
    title: "Mechanical Hand Motion Capture",
    tag: "Sensing & Kinematics",
    deck: "A low-cost potentiometer-based exoskeleton for sign-language interpretation - 15 channels of joint data reconstructed into a live 3D hand model.",
    accent: "#4dc98f",
    hero: "hand-tracking/hero.jpg",
  },
  {
    slug: "wind-turbine",
    file: "Wind Turbine.md",
    title: "Parametric Wind Turbine Blades",
    tag: "Aero & Policy",
    deck: "Parametric CAD, CFD, and iterative print-and-test cycles on micro wind turbine blades - paired with a real legislative policy submission on agricultural decarbonisation.",
    accent: "#c9a84d",
  },
  {
    slug: "bin-picking-rl",
    file: "Test.md",
    title: "Bin-Picking Manipulation RL",
    tag: "Reinforcement Learning",
    deck: "Eleven PPO training iterations on a simulated bin-picking policy - chasing a reward-hacking exploit, a blocked curriculum target, and finally, real finger contact.",
    accent: "#8a4dc9",
  },
  {
    slug: "ftc",
    file: "FTC Journey.md",
    title: "FIRST Tech Challenge",
    tag: "Sydney North Qualifier 2025",
    deck: "DECODE season — Innovate Award 1st Place (Bluey, 11144) and Inspire Award 2nd Place (18306) at the Sydney North Qualifier.",
    accent: "#4d9ec9",
    hero: "ftc/field-action.jpg",
    competition: true,
  },
  {
    slug: "youtube",
    file: "YouTube.md",
    title: "YouTube — Brandon Lai",
    tag: "Video",
    deck: "My own channel documenting robotics builds - custom actuators, combat robots, and a self-balancing robot, from first prototype to finished machine.",
    accent: "#c94d4d",
    hero: "actuator-v1/thumbnail.png",
    card: "youtube/avatar.jpg",
  },
];

const timelines = [
  {
    slug: "frc",
    file: "FRC Journey.md",
    title: "FRC Journey",
    tag: "2025–26 REBUILT Season",
    deck: "From VEX to FRC - competing with two Barker teams across regionals, Worlds, and Einstein.",
    accent: "#c94d4d",
    hero: "frc/hero.jpg",
    // Photos are of the Worlds (Houston) robot unless the moment below was
    // specifically photographed elsewhere (e.g. regionals prototyping/CAD).
    // These trailing grids render at the END of each event's content, after
    // results — the "photos of winning / in competition" close for that event.
    // Design/action photos with a specific narrative position (CAD, climber,
    // the shooting video) are embedded inline in the markdown instead.
    images: {
      "Southern Cross Regional": ["frc/greybacks-action.jpg", "frc/greybacks-scoring.jpg"],
      "FIRST Championship - Houston": ["frc/mechanism-cad-greybacks.jpg", "frc/mechanism-cad-1.jpg", "frc/8613-worlds-win.jpg"],
      "FIRST Championship - 4613 Barker Redbacks": ["frc/redbacks-back.jpg", "frc/subsystem-test.jpg", "frc/4613-worlds-win.jpg"],
    },
    videos: {
      "Southern Cross Regional": [{ src: "frc/shooting-regionals.mp4", poster: "frc/shooting-regionals-poster.jpg", label: "Shooting mechanism at Southern Cross Regional" }],
    },
    competition: true,
  },
  {
    slug: "vex",
    file: "Vex Competition Journey.md",
    title: "VEX Competition Journey",
    tag: "Team 4613B / 4613O - Barker College",
    deck: "Two seasons of VEX Robotics - from Nationals-winning Whisper to the powertrain-optimised Switch, plus a V5RC Middle School Nationals win.",
    accent: "#4dabc9",
    hero: "vex/hero.jpg",
    images: {
      "VEX Robotics: Team 4613B (Barker College)": ["vex/whisper-rings.jpg"],
      "V5RC - Middle School Worlds": ["vex-v5/pit-1.jpg", "vex-v5/pit-2.jpg", "vex-v5/pit-3.jpg", "vex-v5/pit-4.jpg", "vex-v5/nationals-team.jpg"],
    },
    videos: {
      "V5RC - Middle School": [{ src: "vex-v5/auto-nats.mp4", poster: "vex-v5/auto-nats-poster.jpg", label: "Autonomous run at Nationals" }],
    },
    competition: true,
  },
  {
    slug: "vex-iq",
    file: "VEX IQ Journey.md",
    title: "VEX IQ Journey",
    tag: "Team 4613B - Barker Redbacks",
    deck: "Full Volume season - a Barker League tournament win and a top-6.4% finish at the 2024 VEX Robotics World Championship.",
    accent: "#c98a4d",
    hero: "vex-iq/stacking-demo-poster.jpg",
    videos: {
      "4613B - Barker Redbacks": [{ src: "vex-iq/skills-run-2.mp4", poster: "vex-iq/skills-run-2-poster.jpg", label: "Robot Skills run" }],
      "Barker League VIQC": [
        { src: "vex-iq/scoring.mp4", poster: "vex-iq/scoring-poster.jpg", label: "Scoring run" },
        { src: "vex-iq/stacking-demo.mp4", poster: "vex-iq/stacking-demo-poster.jpg", label: "Robot stacking demo" },
      ],
      "2024 VEX Robotics World Championship": [{ src: "vex-iq/worlds-match.mp4", poster: "vex-iq/worlds-match-poster.jpg", label: "Competition match at Worlds" }],
    },
    competition: true,
  },
  {
    slug: "mini-echo",
    file: "Mini Echo Journey.md",
    title: "Mini Echo",
    tag: "Iterative Quadruped Robot",
    deck: "Three prototypes - from micro servos and AA batteries to inverse kinematics, mechanical linkages, and a fully integrated walking quadruped.",
    accent: "#4d6ac9",
    hero: "mini-echo/mini-echo-hero.jpeg",
    videos: {
      "Version 1 — Prototyping the Concept": [{ src: "mini-echo/v1-demo.mp4", poster: "mini-echo/v1-demo-poster.jpg", label: "V1 prototype demo" }],
      "Version 2 — Servos, Inverse Kinematics and Walking": [{ src: "mini-echo/v2-walk.mp4", poster: "mini-echo/v2-walk-poster.jpg", label: "V2 inverse-kinematics walking gait" }],
      "Version 3 — Mechanical Optimisation": [
        { src: "mini-echo/v3-manual-move.mp4", poster: "mini-echo/v3-manual-move-poster.jpg", label: "V3 legs moved manually", grow: 1.4 },
        { src: "mini-echo/v3-walking.mp4", poster: "mini-echo/v3-walking-poster.jpg", label: "V3 walking", aspect: "9/16", grow: 1.4 },
      ],
    },
  },
];

// ---- Shared layout -----------------------------------------------------
function layout({ title, content, active, css = "" }) {
  const base = active === "root" ? "" : "../";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<link rel="stylesheet" href="${base}style.css" />
<style>${css}</style>
</head>
<body>
<header class="site-header">
  <a class="brand" href="${base}index.html">Brandon Lai</a>
  <nav>
    <a href="${base}index.html" class="${active === "root" ? "current" : ""}">Projects</a>
    <a href="${base}timelines/frc.html" class="${active === "frc" ? "current" : ""}">FRC</a>
    <a href="${base}timelines/vex.html" class="${active === "vex" ? "current" : ""}">VEX</a>
    <a href="${base}timelines/vex-iq.html" class="${active === "vex-iq" ? "current" : ""}">VEX IQ</a>
    <a href="${base}timelines/mini-echo.html" class="${active === "mini-echo" ? "current" : ""}">Mini Echo</a>
  </nav>
</header>
${content}
<footer class="site-footer">Robotics &amp; Engineering Portfolio</footer>
</body>
</html>`;
}

// ---- Gallery (index) ----------------------------------------------------
function buildIndex() {
  const all = [...projects, ...timelines];
  const group = (p) => (p.competition ? 0 : p.card || p.hero ? 1 : 2);
  const cards = all
    .slice()
    .sort((a, b) => group(a) - group(b))
    .map((p) => {
      const href = timelines.includes(p) ? `timelines/${p.slug}.html` : `projects/${p.slug}.html`;
      const img = p.card || p.hero ? imgPath(p.card || p.hero, "root") : null;
      const media = img
        ? `<img src="${img}" alt="${p.title}" loading="lazy" />`
        : `<div class="placeholder" style="background:linear-gradient(160deg, ${p.accent}22, ${p.accent}55)">
             <span style="color:${p.accent}">${p.title}</span>
           </div>`;
      return `
      <a class="card" href="${href}">
        <div class="card-media">${media}</div>
        <div class="card-body">
          <span class="card-tag" style="color:${p.accent}">${p.tag}</span>
          <h2>${p.title}</h2>
          <p>${p.deck}</p>
        </div>
      </a>`;
    })
    .join("\n");

  const content = `
  <section class="hero">
    <h1>Robotics &amp; Engineering Portfolio</h1>
    <p>A working record of actuators, manipulation research, competition robotics, and everything in between.</p>
  </section>
  <main class="gallery">
    ${cards}
  </main>`;

  fs.writeFileSync(path.join(OUT, "index.html"), layout({ title: "Brandon Lai - Portfolio", content, active: "root" }));
}

// ---- Project detail pages ------------------------------------------------
function buildProjectPages() {
  const dir = path.join(OUT, "projects");
  fs.mkdirSync(dir, { recursive: true });
  for (const p of projects) {
    const md = read(p.file);
    const body = marked.parse(md).replace(/(src|href)="images\//g, '$1="../images/');
    const heroImg = p.hero ? imgPath(p.hero, "project") : null;
    const hero = heroImg
      ? `<div class="detail-hero"><img src="${heroImg}" alt="${p.title}" /></div>`
      : `<div class="detail-hero placeholder" style="background:linear-gradient(160deg, ${p.accent}22, ${p.accent}55)"></div>`;
    const gallery = (p.gallery || []).length
      ? `<div class="photo-grid">
           ${p.gallery.map((g) => `<img src="${imgPath(g, "project")}" alt="${p.title}" loading="lazy" />`).join("\n")}
         </div>`
      : "";
    const content = `
    ${hero}
    <main class="detail">
      <a class="back" href="../index.html">&larr; All projects</a>
      <span class="card-tag" style="color:${p.accent}">${p.tag}</span>
      <h1>${p.title}</h1>
      <article class="markdown-body">${body}</article>
      ${gallery}
    </main>`;
    fs.writeFileSync(path.join(dir, `${p.slug}.html`), layout({ title: `${p.title} - Brandon Lai`, content, active: "project" }));
  }
}

// ---- Timeline pages (FRC / VEX) ------------------------------------------
// Splits the markdown on top-level "# " headings into timeline events.
function splitEvents(md) {
  const lines = md.split("\n");
  const events = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^# (.+)$/);
    if (m) {
      if (current) events.push(current);
      current = { heading: m[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) events.push(current);
  return events;
}

function buildTimelinePage(t) {
  const md = read(t.file);
  const events = splitEvents(md);
  const imageMap = t.images || {};
  const videoMap = t.videos || {};
  const items = events
    .map((e, i) => {
      const html = marked.parse(e.body.join("\n")).replace(/(src|href)="images\//g, '$1="../images/');
      const eventImages = imageMap[e.heading] || [];
      const photoGrid = eventImages.length
        ? `<div class="photo-grid">
             ${eventImages.map((g) => `<img src="${imgPath(g, t.slug)}" alt="${e.heading}" loading="lazy" />`).join("\n")}
           </div>`
        : "";
      const eventVideos = videoMap[e.heading] || [];
      const videoGrid = eventVideos.length
        ? `<div class="video-grid">
             ${eventVideos
               .map((v) => {
                 // aspect: custom CSS aspect-ratio for the <video> (e.g. portrait clips).
                 // grow: flex-grow multiplier so a video can take up more width than its sibling.
                 const videoStyle = v.aspect ? ` style="aspect-ratio:${v.aspect}"` : "";
                 const figureStyle = v.grow ? ` style="flex-grow:${v.grow}"` : "";
                 return `<figure class="video-card"${figureStyle}>
                      <video controls preload="none" poster="${imgPath(v.poster, t.slug)}"${videoStyle}>
                        <source src="${imgPath(v.src, t.slug)}" type="video/mp4" />
                      </video>
                      <figcaption>${v.label}</figcaption>
                    </figure>`;
               })
               .join("\n")}
           </div>`
        : "";
      return `
      <div class="tl-item">
        <div class="tl-marker" style="background:${t.accent}"></div>
        <div class="tl-content">
          <h2>${e.heading}</h2>
          <div class="markdown-body">${html}</div>
          ${photoGrid}
          ${videoGrid}
        </div>
      </div>`;
    })
    .join("\n");

  const content = `
  <main class="timeline-page">
    <a class="back" href="../index.html">&larr; All projects</a>
    <span class="card-tag" style="color:${t.accent}">${t.tag}</span>
    <h1>${t.title}</h1>
    <p class="deck">${t.deck}</p>
    <div class="timeline" style="--accent:${t.accent}">
      ${items}
    </div>
  </main>`;

  const dir = path.join(OUT, "timelines");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${t.slug}.html`), layout({ title: `${t.title} - Brandon Lai`, content, active: t.slug }));
}

function copyImages() {
  const src = path.join(ROOT, "images");
  const dest = path.join(OUT, "images");
  if (!fs.existsSync(src)) return;
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
}

// ---- Run -------------------------------------------------------------
fs.mkdirSync(OUT, { recursive: true });
fs.copyFileSync(path.join(__dirname, "style.css"), path.join(OUT, "style.css"));
copyImages();
buildIndex();
buildProjectPages();
for (const t of timelines) buildTimelinePage(t);

console.log("Built site into", OUT);

// What is on the site. Plain data, read by the Astro pages and by scripts/collect-assets.mjs.
// `file` is a markdown file in the repo root; image paths are relative to the repo's images/ folder.
// Removed 2026-10-27 at the owner's request: 3D design & printing, game design, Blender animation, bin-picking RL,
// parametric wind turbine blades, both QDD actuators (shoulder/hip and elbow/wrist), and the YouTube page (now a link).

export const NAME = "Brandon Lai";
export const GITHUB = "https://github.com/BeEl487";
export const YOUTUBE = "https://www.youtube.com/channel/UCtvEuVHtahAkyb2Jg0Qb9iA";

export const pages = [
  {
    slug: "frc", file: "FRC Journey.md", split: "h1",
    title: "FRC", category: "Competition robotics", date: "2025–26 season",
    deck: "From VEX to FRC - competing with two Barker teams across regionals, Worlds, and Einstein.",
    tags: ["FRC", "Mechanism CAD", "Competition"],
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
    title: "VEX V5", category: "Competition robotics", date: "Team 4613B / 4613O",
    deck: "Two seasons of VEX Robotics - from Nationals-winning Whisper to the powertrain-optimised Switch, plus a V5RC Middle School Nationals win.",
    tags: ["VEX V5", "Drivetrain", "Competition"],
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
    title: "VEX IQ", category: "Competition robotics", date: "2023–24 season",
    deck: "Full Volume season - a Barker League tournament win and a top-6.4% finish at the 2024 VEX Robotics World Championship.",
    tags: ["VEX IQ", "Worlds"],
    hero: "vex-iq/stacking-demo-poster.jpg",
    images: { "Barker League VIQC": ["vex-iq/practice-robot.jpeg"] },
  },
  {
    slug: "redbacks-localization", file: "Redbacks Localization.md",
    title: "Redbacks localization", category: "VEX autonomous software", date: "Team 4613B",
    deck: "A C++ library for team 4613B: odometry fused with distance sensors by a 200-particle Monte Carlo filter, plus a closed-loop motion controller.",
    tags: ["C++", "Monte Carlo localization", "Odometry"],
    hero: "redbacks-code/code-09-mcl-update-sensor-likelihood.png",
  },
  {
    slug: "mini-echo", file: "Mini Echo Journey.md", split: "h1",
    title: "Mini Echo robot dog", category: "Quadruped robot",
    deck: "Three prototypes - from micro servos and AA batteries to inverse kinematics, mechanical linkages, and a fully integrated walking quadruped.",
    tags: ["Quadruped", "Inverse kinematics", "Servos"],
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
    title: "Mechanical motion capture", category: "Sensing & kinematics",
    deck: "A low-cost potentiometer exoskeleton for sign-language interpretation - 15 channels of joint data reconstructed into a live 3D hand model.",
    tags: ["ESP32", "PCB design", "Kinematics"],
    hero: "hand-tracking/hero.jpg",
  },
  {
    slug: "robot-hand", file: "Robot Hand.md",
    title: "Vision-guided robot hand", category: "Manipulation & vision", date: "2026 · in progress",
    deck: "A hand that finds an object's outline with YOLOE and places each finger against it - simulated in MuJoCo, built for the Amazing Hand.",
    tags: ["Computer vision", "MuJoCo", "Grasp planning"],
    hero: "robot-hand/00_overview_real_scenes.jpg",
  },
  {
    slug: "ftc", file: "FTC Journey.md",
    title: "FTC", category: "Competition robotics", date: "Sydney North Qualifier 2025",
    deck: "DECODE season - Innovate Award 1st place (Bluey, 11144) and Inspire Award 2nd place (18306).",
    tags: ["FTC", "Awards"],
    hero: "ftc/field-action.jpg",
  },
  {
    slug: "custom-computer", file: "Custom Computer.md",
    title: "Breadboard computer", category: "Digital logic",
    deck: "A minimal-instruction-set computer designed in CircuitVerse and hand-built from six perfboard cards - CPU, program counter, memory, and a 555 timer clock.",
    tags: ["Digital logic", "CircuitVerse"],
    hero: "custom-computer/assembled-powered.jpg",
  },
  {
    slug: "python-projects", file: "Python Projects.md",
    title: "Python projects", category: "Algorithms & simulation",
    deck: "A path tracer, a NEAT network that learns Flappy Bird, an A* visualizer and more - built from scratch to understand how each algorithm works.",
    tags: ["Python", "Algorithms"],
    hero: "python-projects/raytracer.png",
  },
];

// Home page order, most important first (owner's ranking, 2026-10-27). VEX V5 is shown as one block with the pages
// paired to it: VEX IQ (the same team's earlier season) and Redbacks localization (that team's autonomous code).
export const RANK = ["frc", "vex", "mini-echo", "hand-tracking", "robot-hand", "ftc"];
export const PAIRED = { vex: ["vex-iq", "redbacks-localization"] };
export const OTHER = ["custom-computer", "python-projects"]; // not in the ranking: a short list at the bottom

export const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
export const pairedTo = (slug) => Object.keys(PAIRED).find((k) => PAIRED[k].includes(slug));
// reading order for "Next project": the ranking, each block's paired pages straight after it, then the rest
export const ORDERED = [...RANK.flatMap((s) => [s, ...(PAIRED[s] || [])]), ...OTHER].map((s) => bySlug[s]);
for (const p of pages) if (!ORDERED.includes(p)) throw new Error(`${p.slug} is not placed in RANK / PAIRED / OTHER`);

/**
 * wave.js — the site's sound-motif graphics, generated as inline SVG.
 *
 *   edge()        diffuser-skyline section transition
 *   arcs()        concentric sound arcs behind heroes and dark bands
 *   signature(id) one drawing per discipline, replacing the old numbered squares
 *
 * Everything is deterministic (no Math.random) so builds are reproducible, and
 * every graphic is decorative: aria-hidden, no text.
 */

const round = (value) => Math.round(value * 10) / 10;

/* ─── Section edge ─────────────────────────────────────────────────────────
   Wells follow a quadratic-residue sequence (n = 7), the same profile used to
   diffuse sound. Placed at the top of a section it rises into the one above. */

const QRD = [0, 1, 4, 2, 2, 4, 1];

export function edge() {
  const wells = 28;
  const width = 50;
  const height = 40;
  const points = [`0,${height}`];
  for (let index = 0; index < wells; index += 1) {
    const top = height - (5 + QRD[index % QRD.length] * 5);
    points.push(`${index * width},${top}`, `${(index + 1) * width},${top}`);
  }
  points.push(`${wells * width},${height}`);
  return `<div class="edge" aria-hidden="true"><svg viewBox="0 0 ${wells * width} ${height}" preserveAspectRatio="none" focusable="false"><polygon points="${points.join(" ")}"/></svg></div>`;
}

/* ─── Arcs ─── */

export function arcs(modifier = "") {
  const radii = [64, 120, 176, 232, 288, 344, 392];
  const rings = radii
    .map((radius, index) => {
      const dash = index % 3 === 2 ? ' stroke-dasharray="2 9"' : index % 3 === 1 ? ' stroke-dasharray="90 26"' : "";
      return `<circle cx="400" cy="400" r="${radius}" stroke-width="${index % 2 === 0 ? 1.4 : 1}"${dash}/>`;
    })
    .join("");

  const rays = [-62, -38, -14, 14, 38, 62]
    .map((degrees) => {
      const radians = (degrees * Math.PI) / 180;
      const from = 40;
      const to = 396;
      return `<line x1="${round(400 + Math.cos(radians) * from)}" y1="${round(400 + Math.sin(radians) * from)}" x2="${round(400 + Math.cos(radians) * to)}" y2="${round(400 + Math.sin(radians) * to)}" stroke-width=".8" opacity=".55"/>`;
    })
    .join("");

  return `<div class="arcs-clip" aria-hidden="true"><div class="arcs${modifier ? ` ${modifier}` : ""}"><svg viewBox="0 0 800 800" fill="none" stroke="currentColor" focusable="false">${rings}${rays}<circle cx="400" cy="400" r="5" fill="currentColor" stroke="none"/></svg></div></div>`;
}

/* ─── Discipline signatures — 320 × 200 ─── */

function absorption() {
  // A decaying reverberation tail: an impulse followed by a shrinking series.
  const bars = [];
  for (let index = 0; index < 30; index += 1) {
    const x = 16 + index * 10;
    const jitter = 0.78 + 0.22 * Math.abs(Math.sin(index * 2.3));
    const half = Math.max(3, 84 * Math.exp(-index * 0.13) * jitter);
    bars.push(`<line class="sig-line" x1="${x}" y1="${round(100 - half)}" x2="${x}" y2="${round(100 + half)}"/>`);
  }
  return `<line class="sig-thin" x1="8" y1="100" x2="312" y2="100"/>${bars.join("")}<path class="sig-gold" d="M16 16 C 90 18, 150 70, 306 97"/>`;
}

function insulation() {
  // Strong wave on one side of a wall, a weak one on the other.
  const wave = (from, to, amplitude, cycles) => {
    const points = [];
    for (let x = from; x <= to; x += 3) {
      const phase = ((x - from) / (to - from)) * Math.PI * 2 * cycles;
      points.push(`${x},${round(100 + Math.sin(phase) * amplitude)}`);
    }
    return points.join(" ");
  };
  return `<polyline class="sig-line" points="${wave(12, 146, 46, 3.5)}" fill="none"/>
<rect class="sig-dim" x="148" y="24" width="24" height="152"/>
<line class="sig-gold" x1="148" y1="24" x2="148" y2="176"/><line class="sig-gold" x1="172" y1="24" x2="172" y2="176"/>
<polyline class="sig-line" points="${wave(174, 308, 9, 3.5)}" fill="none"/>
<line class="sig-thin" x1="8" y1="100" x2="312" y2="100"/>`;
}

function simulation() {
  // A room in section with a source and reflected rays.
  const grid = [];
  for (let x = 60; x <= 260; x += 40) grid.push(`<line class="sig-thin" x1="${x}" y1="36" x2="${x}" y2="164"/>`);
  for (let y = 68; y <= 132; y += 32) grid.push(`<line class="sig-thin" x1="28" y1="${y}" x2="292" y2="${y}"/>`);
  return `<polygon class="sig-line" points="28,36 292,36 292,164 28,164" fill="none"/>${grid.join("")}
<polyline class="sig-thin" points="70,100 292,58 190,164 28,128 150,36 292,138"/>
<polyline class="sig-gold" points="70,100 292,72 214,164 28,112"/>
<circle class="sig-fill" cx="70" cy="100" r="5"/><circle class="sig-line" cx="70" cy="100" r="11" fill="none"/>`;
}

function measurement() {
  // Third-octave bars against a target line.
  const heights = [46, 62, 78, 94, 108, 96, 112, 100, 88, 74, 60, 44];
  const bars = heights
    .map((height, index) => {
      const x = 30 + index * 23;
      return `<rect class="sig-dim" x="${x}" y="${170 - height}" width="15" height="${height}"/><rect class="sig-line" x="${x}" y="${170 - height}" width="15" height="${height}" fill="none"/>`;
    })
    .join("");
  return `<line class="sig-line" x1="22" y1="170" x2="302" y2="170"/><line class="sig-line" x1="22" y1="26" x2="22" y2="170"/>${bars}
<line class="sig-gold" x1="22" y1="82" x2="302" y2="82" stroke-dasharray="7 6"/>
<circle class="sig-fill" cx="302" cy="82" r="4.5"/>`;
}

const SIGNATURES = {
  "architectural-acoustics": absorption,
  "sound-insulation-and-noise-control": insulation,
  "simulation-and-modelling": simulation,
  "measurement-and-verification": measurement
};

export function signature(serviceId) {
  const draw = SIGNATURES[serviceId] ?? absorption;
  return `<svg class="signature" viewBox="0 0 320 200" aria-hidden="true" focusable="false">${draw()}</svg>`;
}

/** A neutral waveform used on cards that have no photograph. */
export function waveform(seed = 1) {
  const bars = [];
  for (let index = 0; index < 42; index += 1) {
    const x = 8 + index * 7.4;
    const height = 6 + Math.abs(Math.sin(index * 0.55 + seed) * Math.cos(index * 0.21 + seed * 2)) * 66;
    bars.push(`<line class="sig-line" x1="${round(x)}" y1="${round(90 - height)}" x2="${round(x)}" y2="${round(90 + height)}"/>`);
  }
  return `<svg class="signature" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${bars.join("")}<line class="sig-gold" x1="0" y1="90" x2="320" y2="90"/></svg>`;
}

/**
 * wave.js — the site's sound-motif graphics, generated as inline SVG.
 *
 *   edge(kind)    section dividers: decay, wave and the diffuser skyline
 *   arcs()        concentric sound arcs behind heroes and dark bands
 *   signature(id) one drawing per discipline, replacing the old numbered squares
 *
 * Everything is deterministic (no Math.random) so builds are reproducible, and
 * every graphic is decorative: aria-hidden, no text.
 */

const round = (value) => Math.round(value * 10) / 10;

/* ─── Section dividers ─────────────────────────────────────────────────────
   A divider sits at the top of a section and rises into the one above it. Its
   fill is the section's own ground (--edge-color) and everything else is
   transparent, so it is gap-free against whatever ground is above and at any
   width (preserveAspectRatio "none", bottom edge overlapping the section by 1px).
   Every silhouette is one unbroken closed path: no bars, gaps or joins. Lines and
   the T60 label are drawn inside the lower ground only, in colours set per ground
   (--edge-line, --edge-ink), so contrast never depends on the ground above.

     wave     a smooth oscilloscope trace: the default, used at most boundaries.
              It loops forever (a seamless one-period drift) unless motion is off;
              `seed` varies the shape, speed and direction between neighbours
     decay    reverberation decay: one continuous rectified waveform under an
              exponential envelope, a fine -60 dB line and a T60 tick. Used sparingly.
     skyline  quadratic-residue diffuser wells, the original divider. Kept available but
              no longer used: the site keeps to one family of dividers (wave, decay).

   Traces and envelopes draw in once when scrolled into view (data-draw, see
   reveal.js and motion.css). Without JavaScript or under reduced motion they are
   simply there. */

const QRD = [0, 1, 4, 2, 2, 4, 1];

function skyline() {
  const wells = 28;
  const width = 50;
  const height = 40;
  const points = [`0,${height}`];
  for (let index = 0; index < wells; index += 1) {
    const top = height - (5 + QRD[index % QRD.length] * 5);
    points.push(`${index * width},${top}`, `${(index + 1) * width},${top}`);
  }
  points.push(`${wells * width},${height}`);
  return `<div class="edge edge--skyline" aria-hidden="true"><svg viewBox="0 0 ${wells * width} ${height}" preserveAspectRatio="none" focusable="false"><polygon points="${points.join(" ")}"/></svg></div>`;
}

/* ─── Wave ─── */

const WAVE_HEIGHT = 56;
const WAVE_MID = 30;
const WAVE_PERIOD = 1200;
const WAVE_STEP = 12;
const MAIN_CYCLES = [3, 2, 4]; // whole cycles per period, so any drift of one period is seamless

/** Two harmonics of the period: the curve repeats exactly every WAVE_PERIOD. */
const waveY = (x, seed) => {
  const main = MAIN_CYCLES[seed % MAIN_CYCLES.length];
  const phase = 0.6 + seed * 1.9;
  return (
    WAVE_MID -
    (11 * Math.sin((2 * Math.PI * main * x) / WAVE_PERIOD + phase) +
      4 * Math.sin((2 * Math.PI * (main * 2 + 2) * x) / WAVE_PERIOD + 2.1 + seed))
  );
};

const DRIFT_SECONDS = [44, 58, 72]; // one period of drift; varied so neighbours are never in step

function wave(live, seed) {
  const width = WAVE_PERIOD * (live ? 2 : 1);
  const drift = live ? ` style="--drift:${DRIFT_SECONDS[seed % DRIFT_SECONDS.length]}s"` : "";
  const curve = (offset) => {
    const points = [];
    for (let x = 0; x <= width; x += WAVE_STEP) points.push(`${x} ${round(waveY(x, seed) + offset)}`);
    return points.join(" ");
  };
  return `<div class="edge edge--wave${live ? " edge--live" : ""}${live && seed % 2 === 1 ? " edge--rev" : ""}" aria-hidden="true" data-draw${drift}><div class="edge__box"><svg class="edge__svg" viewBox="0 0 ${width} ${WAVE_HEIGHT}" preserveAspectRatio="none" focusable="false"><path class="edge__fill" d="M0 ${WAVE_HEIGHT}L${curve(0)}L${width} ${WAVE_HEIGHT}Z"/><path class="edge__line" d="M${curve(4)}"/></svg></div></div>`;
}

/* ─── Decay ─── */

const DECAY_HEIGHT = 64;
const DECAY_BASE = 16;
const T60_AT = 0.9;
const DECAY_RANGE = 30; // envelope amplitude falls by this factor by the T60 tick

/**
 * One resolution of the decay divider. The silhouette is a rectified two-tone
 * oscillation under an exponential envelope, sampled every `step` units: a single
 * continuous curve, so nothing separates one "bar" from the next.
 */
function decayCurve(variant, width, step) {
  const floor = DECAY_HEIGHT - DECAY_BASE;
  const tick = round(width * T60_AT);
  const tau = tick / Math.log(DECAY_RANGE);
  const peak = floor - 4;
  const lineY = round(floor + DECAY_BASE * 0.45);

  const points = [];
  for (let x = 0; x <= width; x += step) {
    const envelope = peak * Math.exp(-x / tau);
    const oscillation = Math.abs(0.62 * Math.sin((2 * Math.PI * x) / 21 + 0.4) + 0.38 * Math.sin((2 * Math.PI * x) / 8.3 + 1.7));
    points.push(`${x} ${round(floor - Math.max(1.2, envelope * (0.16 + 0.84 * oscillation)))}`);
  }

  return `<svg class="edge__svg edge__svg--${variant}" viewBox="0 0 ${width} ${DECAY_HEIGHT}" preserveAspectRatio="none" focusable="false"><path class="edge__fill" d="M0 ${DECAY_HEIGHT}L${points.join(" ")}L${width} ${DECAY_HEIGHT}Z"/><line class="edge__line" x1="0" y1="${lineY}" x2="${width}" y2="${lineY}"/><line class="edge__line edge__tick" x1="${tick}" y1="${floor + 2}" x2="${tick}" y2="${DECAY_HEIGHT - 2}"/></svg>`;
}

function decay(label) {
  return `<div class="edge edge--decay" aria-hidden="true" data-draw><div class="edge__box">${decayCurve("wide", 1440, 3)}${decayCurve("narrow", 600, 3)}</div>${label ? '<span class="edge__t60">T60</span>' : ""}</div>`;
}

/**
 * @param {"wave"|"decay"|"skyline"} [kind]  wave is the default
 * @param {object} [options]
 * @param {boolean} [options.live]   wave only: loop forever; pass false for a still wave
 * @param {number}  [options.seed]   wave only: vary the shape between neighbours
 * @param {boolean} [options.label]  decay only: print the small "T60" mark
 */
export function edge(kind = "wave", { live = true, seed = 0, label = true } = {}) {
  if (kind === "wave") return wave(live, seed);
  if (kind === "decay") return decay(label);
  if (kind === "skyline") return skyline();
  throw new Error(`edge(): unknown divider "${kind}"`);
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

/**
 * build-grain.mjs — writes public/assets/brand/grain.png, the site's single grain.
 *
 * DEC-021: the earlier mineral draft repeated an feTurbulence SVG data-URI on a
 * dozen elements, which the browser re-rasterises. This is one small pre-rendered
 * tile instead: 128 × 128, 4-bit indexed, about 6 KB, deterministic (fixed seed),
 * so it tiles without a seam and the file is reproducible.
 *
 *   node scripts/build-grain.mjs
 *
 * Pixels are half transparent, a quarter dark and a quarter light at low alpha, so
 * the same tile works on stone, on navy and on a crimson band. The maximum alpha
 * is recorded in GRAIN_MAX_ALPHA and used by scripts/check-contrast.mjs to test
 * text against the worst pixel.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

export const GRAIN_SIZE = 128;
export const GRAIN_MAX_ALPHA = 0.08;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "public", "assets", "brand", "grain.png");

/* Palette: index 0 transparent, 1-7 dark at rising alpha, 8-15 light at rising alpha. */
function palette() {
  const entries = [{ rgb: [0, 0, 0], alpha: 0 }];
  for (let step = 1; step <= 7; step += 1) entries.push({ rgb: [22, 18, 12], alpha: Math.round((step / 7) * GRAIN_MAX_ALPHA * 255) });
  for (let step = 1; step <= 8; step += 1) entries.push({ rgb: [255, 250, 240], alpha: Math.round((step / 8) * GRAIN_MAX_ALPHA * 255) });
  return entries;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

export function renderGrain() {
  const colours = palette();
  const random = mulberry32(2011);
  const rowBytes = GRAIN_SIZE / 2;
  const raw = Buffer.alloc((rowBytes + 1) * GRAIN_SIZE);

  for (let y = 0; y < GRAIN_SIZE; y += 1) {
    raw[y * (rowBytes + 1)] = 0; // filter: none
    for (let x = 0; x < GRAIN_SIZE; x += 2) {
      const pick = () => {
        const roll = random();
        if (roll < 0.5) return 0;
        const step = Math.floor(random() * 7);
        return roll < 0.75 ? 1 + step : 8 + Math.min(7, step);
      };
      raw[y * (rowBytes + 1) + 1 + x / 2] = (pick() << 4) | pick();
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(GRAIN_SIZE, 0);
  header.writeUInt32BE(GRAIN_SIZE, 4);
  header[8] = 4; // bit depth
  header[9] = 3; // colour type: indexed
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("PLTE", Buffer.from(colours.flatMap((entry) => entry.rgb))),
    chunk("tRNS", Buffer.from(colours.map((entry) => entry.alpha))),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const png = renderGrain();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, png);
  console.log(`grain.png written: ${png.length} bytes, ${GRAIN_SIZE}×${GRAIN_SIZE}`);
}

# PHASE LOG

Chronological record of phase execution. Not a changelog — see `CHANGELOG.md` for
user-facing changes.

---

## Phase 0 — Source Audit + Repository Foundation

| Field | Value |
|---|---|
| **Date started** | 2026-08-24 |
| **Status** | `IN PROGRESS` — planning package complete; awaiting Gate 01 client inputs |
| **Approval** | `PENDING GATE 01` |

### Completed

- Inspected client deck (`Aware Acoustics Profile - April  2026.odp`) — 36 slides, 2,957 words, 88 embedded images
- Inspected brand direction (`brand-design-direction.md`) — Direction 02 "Mineral / Material", 681 lines
- Inspected reference repo `sujeth-dev/Velmont` — process benchmark captured
- Extracted full deck text → `assets/source/deck-text-extract.txt`
- Extracted all 88 deck images → `assets/source/deck-media/`
- Audited every image for dimension, weight, provenance and rights
- Created repository skeleton (`plan/ docs/ data/ scripts/ tests/ e2e/ public/assets/ src/* assets/*`)
- Wrote `plan/00_SOURCE_AUDIT.md` — complete
- Wrote `plan/WEBSITE_PLAN.md` — complete
- Wrote `plan/_HANDOFF.md` — session continuation brief
- Wrote `plan/CONTENT_PLAN.md` and `plan/PROJECT_DATA.md`
- Created safe seed data for projects, services, people, standards and settings
- Implemented and ran `scripts/validate-data.js` successfully
- Wrote production design, image, admin and SEO plans
- Wrote the Phase 0–16 master plan, change guide and deployment plan
- Recorded **DEC-001…DEC-010** and completed root governance/readme files

### 2026-08-27 update

- **DEC-011** — IA simplified from 11 routes to 5 (Home · Work · Services · About · Contact) plus
  `/privacy/` and `/404/` fillers, per client direction. `/expertise/` + 4 discipline pages folded
  into `/services/` as in-page anchor sections; `/method/` + `/practice/` merged into `/about/`.
  Updated `WEBSITE_PLAN.md`, `CONTENT_PLAN.md`, `MASTER_PLAN.md` (Phase 7/8 outputs), `SEO_PLAN.md`.
- **Q-02 resolved** — founding year taken as stated in `assets/brand-design-direction.md` (**Est.
  2011**). Not merged with any individual's `experienceYears`. `settings.foundedYear` to be set to
  `2011`.
- **Q-03 closed** — attribution split dropped by client instruction; the 10 seeded projects (from
  slide 29) are treated as Aware Acoustics work as-is, no MMG cross-referencing.
- **Q-16 partially resolved** — client supplied `assets/finalised logo @5x.png` (raster PNG,
  1261×724, RGBA). Usable for header/footer/favicon now; a true vector (SVG/AI/EPS) is still
  wanted for print and small-favicon use. Sampled colours: navy `#0c203a`, red `#e53a49`, gold
  `#f4d879`.
- **DEC-002 confirmed as live conflict** — logo red runs brighter/pinker than `--red` (#A63A32);
  logo gold has no palette equivalent; logo navy is close to existing `--navy` token. Open decision:
  keep logo off-palette (normal) vs. shift `--red`/add a gold token. Not yet resolved.
- **DEC-012** — beige tokens lifted in saturation to match the karika.in/about reference the
  client pointed to (hue and lightness held constant to protect existing contrast pairings).
  `--dust` `#e2dbd0`→`#e7dccb`, `--dust-warm` `#d6cfc2`→`#ded2ba`, `--stone` `#c8c0b2`→`#d3c3a7`.
  Updated in `brand-design-direction.md` (tokens now marked `[D]` not `[E]`), `DESIGN_GUIDE.md`,
  `_HANDOFF.md`. Owed: formal contrast re-check in Phase 10.

- **DEC-013** — trimmed the critical path to Homepage. Split Phase 2 into 2a (tokens/base CSS,
  blocking) / 2b (full component lab + accessibility/responsive audit suite, deferred to Phase 10).
  Split Phase 3 into 3a (Vite scaffold + JSON loading, blocking) / 3b (full CI: Vitest/Playwright/
  Lighthouse/ESLint, deferred, hardens at Phase 9/13). Moved Phase 4 (Firebase admin, entire phase)
  off the critical path entirely — Homepage reads `data/*.json` directly, no admin/CMS required to
  render a static page. Gate 03 no longer blocks Phase 5–9. Updated `MASTER_PLAN.md` §2/2.1 and the
  Phase 2/3/4/5 tables. Nothing dropped, only resequenced.

- **DEC-014** — logo/Q-01/Q-06/Q-07 handling: use the raster logo now (no vector wait), leave all
  colour tokens unchanged (logo runs off-palette, left as-is), keep using the trading name "Aware
  Acoustics" with no invented legal entity details, updated the AV service summary in
  `data/services.json` with the one verified deck fact while keeping it unpublished, and left the
  equipment section omitted. All five tracked together for pickup later; none block build start.

- **Q-01 narrowed** — client confirmed the practice is based in Bengaluru. `settings.city` set;
  footer location and homepage hero caption now render instead of being omitted. Q-01 now covers
  only legal name, entity type, CIN/GSTIN and full registered address (needed for the footer legal
  line and `LocalBusiness` NAP), not the city. Updated `CONTENT_PLAN.md`, `SEO_PLAN.md`, DEC-014.

### Remaining in Phase 0 / Phase 1

- Receive written answers to **Q-01**, **Q-05**, **Q-06**, **Q-07** and acknowledge the full
  **Q-08…Q-30** request set (**Q-02** and **Q-03** now resolved, see above)
- Resolve the logo colour-reconciliation call (off-palette vs. adjust `--red`/gold)
- Request a vector version of the logo alongside the raster already received
- Resolve Gate 01 IA decisions and approve the content direction — **DEC-011** now recorded
- Commit the approved planning baseline

### Tests

`node scripts/validate-data.js` — passed: 10 projects, 5 services, 15 standards, 2 people and settings.
No production UI exists yet; UI, E2E and Lighthouse tests correctly begin in later phases.

### Lighthouse

N/A.

### Open issues

| ID | Issue |
|---|---|
| **C-02** | Client list attribution unresolved — highest-risk item in the project |
| **C-01** | Founding year contradicts stated years of experience |
| **L-01** | `image7.png` is a third-party asset copied from `xiengineering.com` — must not be republished |
| **L-02** | Client logo wall (~23 marks) has no publication permission |
| **I-01** | No source image is both cleared and high enough resolution for a hero |
| **DEC-002** | Logo conflicts with the approved brand system |
| **DEC-003** | Photography-vs-texture strategy needs client sign-off at Gate 02 |

### Client dependencies

**Blocking:** Q-01 … Q-07 (legal entity · founding year · client attribution · name permissions ·
domain control · AV scope · instrumentation register).

**High priority:** Q-08 … Q-15. **Assets:** Q-16 … Q-21. **Confirmations:** Q-22 … Q-30.

Full checklist: `plan/00_SOURCE_AUDIT.md` §10.

### Commit

_(not yet committed)_

### Next

Send the client confirmation pack and obtain **Approval Gate 01 — Content + IA**. Then run Phase 2
from `plan/MASTER_PLAN.md` only after the gate conditions are recorded.

---

## Phase 2a — Core design tokens (blocking slice of Phase 2, DEC-013)

| Field | Value |
|---|---|
| **Date started** | 2026-08-27 |
| **Status** | `COMPLETE` — 2a only; 2b (component lab, audit suite) deferred to Phase 10 |
| **Approval** | `GATE 02 NARROWED TO 2a` per DEC-013 |

### Completed

- `src/css/tokens.css` — the Complete CSS Token Set transcribed verbatim from
  `assets/brand-design-direction.md`, including the DEC-012 beige values
  (`--dust` `#e7dccb`, `--dust-warm` `#ded2ba`, `--stone` `#d3c3a7`). No token invented, none
  omitted. `[E]`/`[D]`/`[C]` provenance markers retained inline.
- `src/css/base.css` — reset, element defaults, focus-visible ring (`2px solid var(--color-accent)`,
  brightened to `--color-accent-hover` on dark grounds per B11), `.visually-hidden`, skip link,
  touch-action, the `prefers-reduced-motion` block and a print fallback.
- `src/css/typography.css` — the A4 type scale as utility classes (`.t-hero`, `.t-h2`…`.t-h5`,
  `.t-body`, `.t-lead`, `.t-standfirst`, `.eyebrow`, `.t-meta`, `.t-data`, `.t-label`), all heading
  weights 300, negative tracking per size, `em`/`i` neutralised to a colour shift (A4 bans italics),
  measure utilities at 34/46/55ch, and `.on-dark` inversions.

### Deviations recorded

- **Body typeface.** The token set defines `--font-body: 'Public Sans'` (Part B `[C]`), but Part A
  §A4 states Newsreader is the sole public typeface — serif throughout, including body and
  navigation. Part A is the authority, so `body` is set to `var(--serif)`. `--font-body` is kept in
  `tokens.css` unchanged and reserved for the admin layer (Phase 4), which is not public-facing.
- **Fonts loaded.** Newsreader (300/400/500) and IBM Plex Mono (400) only. Public Sans is not
  requested by any public page, so it is not loaded. Font `<link>` tags are added in Phase 3a with
  the document shell.

### Not built (deliberate — Phase 2b, DEC-013)

Component lab, texture-plate recipes as components, contrast/focus/keyboard/reduced-motion audit,
320–1440 screenshot regression suite. Deferred to Phase 10, verified against real pages.

### Tests

`node scripts/validate-data.js` — passed. No UI tests exist yet; they begin in Phase 3b.

### Lighthouse

N/A — no page renders yet.

### Open issues

`DEC-002` (logo runs off-palette) unchanged and deliberately unresolved per DEC-014.
Contrast re-verification for the DEC-012 beige lift is still owed at Phase 10.

### Commit

`feat: establish mineral production design system`

### Next

Phase 3a — Vite scaffold, page templates, shared layout, JSON loading with runtime guards.

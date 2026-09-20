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
- **DEC-015** — typeface swap, Newsreader/IBM Plex Mono → Spectral/JetBrains Mono, client's pick
  against a live specimen comparison. Updated `src/css/tokens.css` (`--serif`, `--font-mono`, now
  `[D]` not `[E]`/`[C]`, "was" values noted), `src/css/typography.css` header comment,
  `src/components/document.js`'s `FONTS` constant. Regenerated static pages via `npm run generate`.
  `--font-body` (Public Sans, admin-reserved) untouched. Separately: logo wordmark identified as
  visually consistent with Poppins by comparison, not a verified font file — independent of the
  site's own typeface, no code change from that.

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

---

## Phase 3a — Build foundation (blocking slice of Phase 3, DEC-013)

| Field | Value |
|---|---|
| **Date started** | 2026-08-27 |
| **Status** | `COMPLETE` — 3a only; 3b (ESLint, Vitest, Playwright, Lighthouse CI) deferred |
| **Approval** | Not a gate. 3a is a prerequisite for Phase 5, per DEC-013 |

### Completed

- **`vite.config.js`** — MPA build (`appType: "mpa"`), `publicDir: public`, `outDir: dist`, and a
  local `aware-route-generator` plugin that materialises the route tree before Vite reads it and
  regenerates it on change to `src/pages`, `src/components`, `src/lib`, `data/` or the generator.
- **`scripts/generate-pages.js`** — writes one HTML file per route. No HTML is checked in; templates
  plus `data/*.json` are the source of truth. Routes render with trailing slashes
  (`/work/` → `work/index.html`), and `/404/` additionally emits a root `404.html` host fallback.
  Generated paths are gitignored.
- **`src/lib/data.js`** — JSON loading with per-record runtime guards (shape, types, enum values,
  tier minimums per DEC-007, foreign keys against `services.json`/`standards.json`). Guard failures
  are fatal when `NODE_ENV=production` and loud otherwise. Nothing is defaulted or coerced to make
  a page render. `client` is stripped at the boundary for every `clientPublic: false` project
  (DEC-010), so templates cannot leak a private name into HTML, metadata or asset paths.
  Selectors: `publishedProjects`, `caseProjects`, `featuredProjects`, `publishedServices`,
  `publishedStandards`, `publishedPeople`, `standardsForService`, `projectsForService`.
- **`src/lib/html.js`** — `esc`, `join`, `when`, `each`, `attrs`, `pad2`, `oneLine`. Absent data
  returns an empty string so the calling template omits the component; no helper supplies a
  fallback value.
- **`src/components/`** — `document.js` (shell, `<head>`, font loading, landmarks), `header.js`
  (wordmark, four-item nav, sub-900px overlay panel), `nav.js`, `footer.js` (four columns),
  `ui.js` (eyebrow, CTA, tag row, field caption, data list, dev-fixture marker).
- **`src/pages/`** — one module per route plus `index.js` route table. Record routes derive from
  published case-tier projects only, so a record page cannot exist without its evidence.
- **CSS** — `layout.css` (bands, grounds, A6 grid ratios, editorial flip), `components.css`
  (four-layer texture plates and their veils, header/nav/overlay, CTA, tags, field caption, data
  list, dev-fixture marker, footer), `motion.css` (transitions inside a `prefers-reduced-motion:
  no-preference` block), `responsive.css` (900px/600px only), `main.css` entry.
- **`src/js/main.js`** — the only public script. Overlay nav toggle with `aria-expanded`, focus
  move, Escape-to-close and a width-change close. Every page is complete with it blocked.
- `public/assets/brand/logo.png` — the supplied raster logo in the served tree (DEC-014).

### Decisions taken inside this phase

- **No checked-in HTML.** Generated route files are build artefacts and are gitignored. This keeps
  "a template must never become the source of a fact" enforceable — there is no HTML to edit.
- **Canonical tags omitted** until `settings.domainConfirmed` is true (Q-05). A guessed origin is
  worse than no canonical. Full metadata is Phase 11.
- **Footer legal line omitted** per DEC-014. The footer renders the year and the Privacy link with
  no entity name; no legal name is invented.
- **`build` vs `build:production`.** `npm run build` is the development build. `npm run
  build:production` sets `NODE_ENV=production`, which makes the data guards fatal and enforces
  V-14 (fewer than 2 featured case records fails). It is expected to fail today — that is the
  Q-08/Q-09 gate working, not a defect.

### Not built (deliberate — Phase 3b, DEC-013)

ESLint, Prettier, Vitest, Playwright, Lighthouse CI, the CI workflow, bundle budgets and the
`no-hardcoded-facts` test. These run incrementally through Phases 5–9 and harden at Phase 9/13.

### Tests

- `node scripts/validate-data.js` — passed.
- Build smoke: `npm run build` → 8 routes, 13.6 kB CSS, 1.4 kB JS.
- Dev smoke: `npm run dev` → `/`, `/work/`, `/services/`, `/about/`, `/contact/`, `/privacy/`,
  `/404/` all return 200.

### Lighthouse

Deferred to Phase 3b — no page carries real content yet, so a score would not be meaningful.

### Open issues

Unchanged. `git push` to `origin main` is currently unavailable from the build environment (no
GitHub credential); commits are local until a credential is supplied.

### Commit

`build: add application foundation and quality pipeline`

### Next

Phase 5 — Homepage, six sections plus footer (WEBSITE_PLAN.md §5.1/§6, CONTENT_PLAN.md §3).

---

## Phase 5 — Homepage

| Field | Value |
|---|---|
| **Date started** | 2026-08-27 |
| **Status** | `COMPLETE FOR STRUCTURE` — production content blocked on Q-08/Q-09 |
| **Approval** | Contributes to Gate 04 |

### Completed

Six sections plus the shared footer, in the order set by `WEBSITE_PLAN.md` §6, with copy from
`CONTENT_PLAN.md` H-01…H-06:

| § | Section | Ground | Source of its content |
|---|---|---|---|
| 01 | Hero | four-layer texture plate + veils | H-01 copy; caption from `settings.city`/`country`/`foundedYear` |
| 02 | About | `--dust-warm`, 1.2fr/.8fr | H-02 copy |
| 03 | Selected work | `--stone`, 1fr/1fr head | `featuredProjects()` — currently empty |
| 04 | Services | `--dust-warm`, four alternating bands | `services.json` (name, summary, parameters) |
| 05 | Verification | `--navy`, .9fr/1.1fr | H-05 copy + `standards.json` register and count |
| 06 | Appointment | `--dust`, centred | H-06 copy + `settings.phones`/`emails` |

- `src/components/record-row.js` — the A7 numbered row in both compositions: case-tier rows link
  into `/work/[slug]/` and carry client label · city · year · one headline measured value;
  list-tier rows render a texture plate and are not links (DEC-007). Absent values drop out of the
  meta line rather than rendering an empty label.
- Section CSS added for the hero plate, record rows, the four service bands, the standards strip
  and the centred appointment block, plus 900px/600px recomposition (record row collapses to
  `32px minmax(0,1fr)` with a 16:9 thumbnail strip above; bands collapse the same way).

### Gated content — what renders instead

- **§03 Selected work.** No project qualifies: all ten seeds are `tier: "record"`,
  `published: false`, with no year and no target/measured pair. Development renders a dev-fixture
  marker naming the gap and the blocking questions. Production refuses to build — the featured
  count check now lives in `scripts/generate-pages.js` as well as `validate-data.js` V-14.
  Nothing is populated from the ten shallow deck entries.
- **§05 Verification.** The target/measured grid needs Q-09. Development shows a dev-fixture
  marker; production omits the block entirely and publishes the process copy plus the standards
  register and its count. No demonstration numbers, industry averages or example results.
- **§02 About detail panel.** The independence triad is `CLIENT TO CONFIRM` under Q-22, so the
  panel is omitted per the documented fallback rather than softened into a weaker claim.

### Decisions taken inside this phase

- **`AWARE_ENV` replaces `NODE_ENV` as the content gate.** Vite sets `NODE_ENV=production` for
  every `vite build`, including development builds of gated pages, which silently suppressed the
  dev-fixture markers in a build meant to show them. `AWARE_ENV=production` is now the switch and
  is set only by `npm run build:production`. `validate-data.js` honours either variable, so no
  existing CI invocation changes behaviour. Recorded in `plan/PROJECT_DATA.md` §6.
- **Two body links to `/contact/`.** `WEBSITE_PLAN.md` §7 asks for exactly one body link to
  `/contact/` per page, while §6 specifies a primary CTA in the hero *and* §4 places the primary
  CTA at Home §06. The homepage-specific spec wins: the hero CTA ("Send us a drawing set") and the
  appointment CTA ("Start a conversation") both resolve to `/contact/`. They are never in view
  together, so the "no more than one primary CTA in view" rule still holds. Flagged for the Phase
  10 link audit rather than silently resolved.

### Tests

- `node scripts/validate-data.js` — passed.
- `npm run build` (development content) — 8 routes, 16.1 kB CSS, 1.4 kB JS.
- `AWARE_ENV=production npm run generate` — fails as designed: *"production build requires at
  least 2 featured published case records; found 0. Blocked on Q-08 / Q-09."*
- Visual check at 1440px and 375px against the built output: section order, grounds, band
  alternation, standards strip, mobile record/band recomposition and footer collapse all correct.

### Lighthouse

Deferred to Phase 3b/13. The homepage carries no images and no third-party script; the only
external request is the Google Fonts stylesheet.

### Open issues

Unchanged, plus: `git push` to `origin main` still unavailable from the build environment.

### Commit

`feat: build evidence-led homepage`

### Next

Phase 6 — Work index and `/work/[slug]/` project records.

---

## Phase 6 — Work index and project records

| Field | Value |
|---|---|
| **Date started** | 2026-08-27 |
| **Status** | `COMPLETE FOR STRUCTURE` — zero records publish today; blocked on Q-08/Q-09 |
| **Approval** | Contributes to Gate 04 |

### Completed

**`/work/`** — eyebrow, H1 *Work held to a number.*, standfirst, record list, derived counter line
(`[n] projects · [n] measured records`) and the appointment CTA. Renders every published project in
both tiers. With none published, development shows a dev-fixture marker naming the gap; production
omits the list rather than printing a zero counter.

**Filter strip** — implemented as the threshold test `filtersQualify()`, not as markup: filters
ship only above 12 published projects with at least four sectors carrying two projects each
(`WEBSITE_PLAN.md` §5.2). At 0 published the test returns false and nothing renders. Building the
control now would be furniture that makes a small list look smaller.

**`/work/[slug]/`** — the full §5.3 hierarchy: hero plate (cover image when the record has one,
texture plate when it does not) with the field caption card; fact table; `01 · Condition`;
`02 · Approach`; `03 · Verification` target/measured table on the navy ground; `04 · Standards and
tools` tag rows; gallery; prev/next across published case records; appointment CTA. Reverse links
into `/services/#[discipline]` come from the record's own `services[]` (`WEBSITE_PLAN.md` §7).

Routes are derived from published case-tier records only, so a record page cannot exist without the
evidence its template renders. Today that yields zero record routes, which is correct.

### Verification fixture — how the template was proved

No real record can reach `/work/[slug]/` yet, so `tests/fixtures/case-record.fixture.json` plus
`tests/render-record.smoke.mjs` (`npm run test:smoke`) exercise it. The fixture is synthetic,
labelled `FIXTURE` in every field, lives outside `data/`, and is never read by
`scripts/generate-pages.js`. `tests/fixtures/README.md` states that plainly. The smoke test asserts
the section structure, that a standard designation resolves from `standards.json`, that the reverse
service link and CTA render, and — per DEC-010 — that the private `client` value never reaches the
markup while the anonymised label does.

### Responsive

`.result-table` stacks per parameter below 600px using `data-label` prefixes rather than scrolling
sideways — the payload data must never require a horizontal scroll (`WEBSITE_PLAN.md` §8). Record
rows collapse to `32px minmax(0,1fr)` with a 16:9 thumbnail strip above; the gallery goes one-up;
the hero caption card moves below the plate.

### Tests

- `node scripts/validate-data.js` — passed.
- `npm run test:smoke` — passed, including the client-anonymisation assertion.
- Visual check at 1440px of `/work/` and of the record template rendered against the fixture:
  section order, fact table, target/measured table on navy, tag rows, CTA and footer all correct.
  Fixed from that pass: sector value now title-cased, standfirst/narrative/tag-row spacing.

### Lighthouse

Deferred to Phase 3b/13.

### Open issues

Unchanged. Record pages cannot be reviewed with real content until Q-08/Q-09 land.

### Commit

`feat: publish structured work records`

### Next

Phase 7 — Services, single page with four in-page anchor sections.

---

## Redesign pass — design system and Home / Work restyle (DEC-016)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `COMPLETE` — homepage hero deliberately untouched |
| **Approval** | Client feedback: pages read as basic; stay on-brand, execute better |

### Completed

- Activated the brand devices that were defined but unused: `grid--editorial` / `grid--flip`, the
  `wool`, `perforated` and `metal` plates, and the section-ground rhythm.
- New components (`components.css`, helpers in `ui.js`): `.statement` / `.statement-list`,
  `.process-spine`, `.person-row`, `.standards-register`, `.stat`, `.field*`, `.band__swatch`,
  plus `grid--contact`. No icons, no rounded cards, no new motion.
- Home: About on the editorial grid with the practice test pulled as a statement; Services bands
  carry per-discipline material swatches via `service-bands.js` / `service-plate.js`; Verification
  shows the standards count as a large figure.
- Work index split into intro and list zones; Work record's Condition and Approach paired on
  `grid--editorial`.
- Non-production builds are noindex (DEC-017).

### Tests

`validate-data.js` passed; `npm run build` — 8 routes; `test:smoke` passed;
`AWARE_ENV=production npm run generate` still fails only at the Q-08/Q-09 featured-record gate.
Browser-checked afterwards — see the browser review below.

### Commit

`feat: extend design system with editorial components`

---

## Phase 7 — Services

| Field | Value |
|---|---|
| **Date** | 2026-09-19 (rebuild; first build was reverted 2026-08-27 at client request) |
| **Status** | `COMPLETE FOR STRUCTURE` — evidence slots gated on case records |
| **Approval** | Contributes to Gate 04 |

Overview band (shared `service-bands.js`) plus four discipline sections with alternating
editorial composition. Copy is CONTENT_PLAN §5 E-01…E-05; parameters and standards read live from
`services.json` / `standards.json`. The sound-insulation "flanking" line is withheld (CLIENT TO
CONFIRM). Evidence renders the dev-fixture until a published case record matches a discipline.
Audiovisual stays unbuilt (Q-06). Parameter glossary not built (see DEC-016).

Commit: `feat: add acoustic services page`

---

## Phase 8 — About (practice and method)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `COMPLETE FOR STRUCTURE` |
| **Approval** | Contributes to Gate 04 |

Practice, People (both deck principals published, text-only rows, no titles — Q-24, no portraits —
Q-17), Approach triad, Method process spine, grouped Standards register (covers M-09 and M-11;
LEED/WELL/ISO 14001 sit under "Green and compliance"), single closing CTA. Omitted per gating:
Independence (Q-22), Instrumentation (Q-07). "Where we work" renders only from published projects.

Commit: `feat: add method standards and practice pages`

---

## Phase 9 — Contact, privacy and utility routes (structure only)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `IN PROGRESS` — structure done; submission endpoint and privacy copy remain |

Contact: two-column layout with the §5.6.1 field set (structural form, no submit handler yet),
direct phone/email from `settings.json`, two of three "what happens next" lines (third is CLIENT TO
CONFIRM). Privacy: scope preview only, no policy text (Q-30). 404: dust band per DESIGN_GUIDE §10.7.

Commit: `feat: add appointment, privacy and utility route structure`

### Next

Content intake (below), then Phase 3b.

---

## Content intake — list-tier project records (DEC-018)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `COMPLETE` for list-tier — case-tier proof still blocked on Q-08/Q-09 |
| **Approval** | Contributes to Gate 04 |

### Completed

- Verified the deck is fully extracted (36/36 slides, 88 images) and holds no project years or
  measured results.
- `data/projects.json`: 74 records — 10 existing seeds named and published, 64 new list-tier records
  from deck slides 29–34 and `LIST OF PROJECTS.xlsx`. 44 have a location; 30 are `null` (not stated).
- `data/sectors.json` (12 sectors) with a foreign-key check; `location` nullable for list-tier.
- `/work/`: sector filter (`work-filter.js`), sector labels on rows, no zero counter, image credits.
- Four exact-facility images optimised into `public/assets/projects/` with rights fields; the rest of
  the web research is not used (would misrepresent the engagement).
- `[hidden]` now wins over component `display` rules (`base.css`).

### Tests

`validate-data.js` — 74 projects pass; `npm run build` — 8 routes; `test:smoke` passed;
`AWARE_ENV=production npm run generate` still fails only at the Q-08/Q-09 featured-record gate.
The filter was then exercised in a real browser — see the browser review below.

### Open issues

Q-08/Q-09/Q-18 (proof), Q-01, Q-05, Q-06, Q-07, Q-22, Q-24, Q-27–Q-30. Lucknow and JW Marriott images
carry unverified licences (DEC-018). 30 records have no location; 2 (Pristine Design Studio, Great
Eastern Shipping Museum) could not be identified beyond the name.

### Commit

`feat: publish project record list from client deck and intake`

### Next

Phase 3b — lint, tests and CI.

---

## Browser review and layout fixes (start of Phase 3b)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `COMPLETE` |

First time the redesign and the 74-row Work index were viewed in a real browser (Playwright
Chromium, 1440 and 375 wide). Defects found and fixed:

- **Mobile overflow** on Home and Services: the phone tag strip (`overflow-x: auto`) widened its grid
  track. `.grid > *` and `.band__body` now shrink (`min-width: 0`), and the homepage hero body uses
  `minmax(0, 1fr)`. The hero's appearance is unchanged; only a 38px sideways scroll was removed.
- **Work index** was 12,500px of identical wide plates. List-tier rows are now compact index lines
  (120×64 thumbnail; 72×48 on phones); the page is about 8,600px.
- **Header clearance:** inner pages that open with a plain section now get the hero's top padding.
- **Services** discipline sections had no spacing between eyebrow, heading, standfirst and body; the
  left column is now a stack. Labels above lists get a small gap.
- **People** text-only rows leave half the row empty; they are now a name / biography split.

`tests/browser.smoke.mjs` (`npm run test:browser`) now asserts, at both widths for all 7 routes: no
console errors, no failed requests, no horizontal overflow, one `<h1>`, the noindex meta; plus the
filter (filter, URL state, back button, deep link) and the no-JavaScript list. Playwright is a new
devDependency. The remaining Phase 3b items (ESLint, no-hardcoded-facts, Vitest, CI) are still open.

Commits: `fix: resolve layout defects found in browser review` · `test: add browser smoke checks`.

## Web images published (DEC-019)

| Field | Value |
|---|---|
| **Date** | 2026-09-19 |
| **Status** | `COMPLETE` |

Published the web-research image set on the owner's direction: 55 images on 33 records (exterior and
interior side by side on each list row). Images are re-encoded to 1200px-wide WebP and JPEG with
metadata dropped and camera rotation applied first (an RNSIT photo came out sideways before that fix).
Nine Commons licences were verified against the Commons API; the rest are recorded as unverified.
Rows showing a related site carry a "Representative image · <site>" label. Cisco's interior was left
out because it is an advertising graphic, not a space. A contact-sheet review changed four alt texts
that had repeated the research notes rather than the picture.

`npm run test:browser` now also fails on any row photograph that does not decode and on a
representative row without its label.

## Visual redesign and Work restructure (DEC-020)

| Field | Value |
|---|---|
| **Date** | 2026-09-20 |
| **Status** | `COMPLETE` — pending client review |

Answered the client design review: a distinctive system (navy · crimson · gold, diffuser-skyline edges,
registration ticks, sound arcs) carried across every page; a fixed header and a heavier footer; the
numbered squares replaced; Work rebuilt as hero → six featured pages → explore-all with an overlay;
Services, About and Contact recomposed; Contact made an interactive four-step enquiry that sends a
pre-filled email. The earlier design restrictions (DEC-016, B12) and the image-labelling rule
(DEC-019) were lifted by the site owner and are recorded in DEC-020.

Reviewed at 1440px and 375px with Playwright screenshots of every route, then covered by
`npm run test:browser`. Open items: written Condition / Approach / Outcome text for the six
featured projects; client photography to replace the web-sourced set; the V-14 production gate.

## Mineral / material layer (DEC-021, part 1)

| Field | Value |
|---|---|
| **Date** | 2026-09-20 |
| **Branch** | `design/mineral-sound` (the sound dividers are on `design/sound-dividers`) |
| **Status** | `COMPLETE` — experimental, pending client review |

Adapted the earlier "Mineral / Material" draft into the DEC-020 system as richer stone bands, a fibre-hairline
texture with one pre-rendered grain, a mineral plate for projects without a photograph, a generic
"Illustrative build-up" diagram on Services, glass caption plates and ruled tables. The draft's problems were
fixed rather than copied: low-contrast text, the all-brown palette, repeated SVG-noise, numbering and every
invented figure (see DEC-021).

Verification: `validate:data`, `test:smoke`, `test:browser` and the new `test:contrast` (34 of 34 pairs, worst
grain and hairline pixel included) pass. Scroll frame times were compared against `main` in headless
Chromium: median and 95th-percentile frame time were identical, and switching the grain off changed the mean
by 0.5 ms (41.6 to 42.1 ms), so the grain has no measurable cost. Backdrop blur, not texture, dominates in
software rendering. Reviewed at 1440 and 375 with Playwright screenshots.

Open items for the client: whether the earth plates behind the discipline drawings suit the brand; whether
the Services material study and its layer names are acceptable; whether the plate stays as the fallback
or waits for photography; the deeper crimson used for italics on stone.

## Sound-themed dividers (DEC-021, part 2)

| Field | Value |
|---|---|
| **Date** | 2026-09-20 |
| **Branch** | `design/sound-dividers`, stacked on `design/mineral-sound` |
| **Status** | `COMPLETE` — experimental, pending client review |

Replaced the diffuser-skyline transitions with sound dividers built as inline SVG in `wave.js`: a smooth
oscilloscope wave as the default (every wave loops seamlessly forever, still when motion is off). The skyline and a continuous reverberation-decay divider were tried and then replaced by
waves too, so the site uses one family of dividers. Added
an octave-band axis in a few section heads instead of numbers. Traces draw in once on scroll; everything is
static under reduced motion and without JavaScript.

Direction changes during review: dividers must be continuous (the decay was redrawn from bars into one
unbroken curve) and the wave should be used in most places, with the bar-like decay only sparingly; then the decay and the last skylines were replaced too, for consistency.

Verification: `validate:data`, `test:smoke`, `test:contrast` and `test:browser` pass (13 routes at 1440 and
375 with no horizontal overflow and one h1 each, plus the new divider checks). Reduced-motion and
no-JavaScript states are asserted by the browser test; the live draw-in and drift were checked directly.

Direction change after review: every wave is an infinite loop, not only the hero ones. The first loop left
its far end empty as it drifted (an svg `max-width: 100%` cap in base.css); fixed, and covered by a test
that checks the drawing spans its box at every phase of the loop.

Open items for the client: whether the wave-everywhere rhythm is preferred to the skyline; whether the T60
mark and the octave axis read as intended or as noise; whether the constant motion is welcome or should be
limited to the hero.

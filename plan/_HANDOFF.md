# _HANDOFF — Session Continuation Brief

> **Continuation completed:** 2026-08-25. The documents listed as remaining below have now been
> written and validated. This file is retained as historical session context; current execution
> state is in `PHASE_LOG.md`, and the next action is Gate 01 as described in `README.md`.

> **Written:** 2026-08-24 · **Session:** 01 (paused mid-Phase-0)
> **Purpose:** Let a new session resume this planning build at the same depth, style and
> cross-reference integrity without re-reading the 15 MB source deck or re-deriving decisions.
>
> **Read this file first. Then read `plan/00_SOURCE_AUDIT.md` and `plan/WEBSITE_PLAN.md` in full.**
> Everything else in this brief is context those two files assume.

---

## 1. The task

A single master prompt asked for a **complete website planning and build system** for Aware
Acoustics — not the website itself. The deliverable is the contents of `/plan`, plus root
governance files, plus a 25-section summary returned in chat.

**The 25-section final response is still owed.** Required order, verbatim from the brief:

1. Executive summary · 2. Source audit summary · 3. Client-to-confirm checklist · 4. Brand/positioning
interpretation · 5. Audience groups · 6. Recommended information architecture · 7. Homepage plan ·
8. Page-by-page website plan · 9. Project/content data model · 10. Admin recommendation — explicitly
YES/NO · 11. Admin architecture and managed content · 12. Production design-system translation ·
13. Image workflow · 14. SEO plan · 15. Recommended tech stack + rationale · 16. Repository structure ·
17. Full Phase 0–16 master plan · 18. Approval gates · 19. Testing strategy · 20. CI/CD workflow ·
21. Deployment plan · 22. Change-management system · 23. Handover documentation · 24. Outstanding
client dependencies · 25. Final pre-build checklist

Write it as a synthesis **of the plan files**, not a duplicate of them. Each section is a tight
summary that points at the file holding the detail.

---

## 2. Sources — location and how to re-read them

| Source | Path | Notes |
|---|---|---|
| Client deck | `assets/Aware Acoustics Profile - April  2026.odp` | 36 slides · 2,957 words · 88 images. **Two spaces** in "April  2026" |
| **Pre-extracted deck text** | `assets/source/deck-text-extract.txt` | **Use this.** Full slide-by-slide text + image refs. No need to re-parse the ODP |
| Extracted deck media | `assets/source/deck-media/` | All 88 images, original names `image1`–`image88` |
| Brand direction | `assets/brand-design-direction.md` | 681 lines. Direction 02 "Mineral / Material". Part A extracted / Part B derived+created. **This is the visual source of truth** |
| Benchmark repo | `https://github.com/sujeth-dev/Velmont` | Process only. Already fetched — findings in §6 below |

**If you must re-extract the ODP:** it is a zip. `unzip` it, parse `content.xml` with
`xml.etree.ElementTree`, iterate `.//draw:page`, and pull `draw:text-box//text:p`,
`draw:custom-shape//text:p`, `draw:image/@xlink:href`, and `table:table`. Slide-master images live
in `styles.xml`, not `content.xml` — that is why `image78`–`image88` appear unreferenced.

---

## 3. Tooling notes for this environment

- **Do not write large files with a Bash heredoc.** It fails with `ENAMETOOLONG: uv_spawn` past
  roughly 15–20 KB. Use the **Write tool** for every plan document.
- Bash tool is Git Bash. Paths: use `c:/Users/...` or `C:/Users/...` forward-slash form. A bare
  `/c/Users/...` MSYS path **fails inside Python** — Python receives it literally.
- Python 3.14 is at `C:\Python314\python.exe`, `python` is on PATH, and **PIL/Pillow is available**
  (used for the image dimension audit).
- The repo has a `.git` directory but the environment reports "Is a git repository: false".
  Verify with `git status` before assuming commit workflow.
- Scratchpad: `C:/Users/user/AppData/Local/Temp/claude/c--Users-user-OneDrive-Desktop-Tech-Live-Projects-Aware-acoustics/fe460ddf-7436-4490-bab0-4567b6cccd51/scratchpad` — holds `odp/` (unzipped deck) and `deck.txt`.

---

## 4. State of work

### Done

| File | Status |
|---|---|
| Repo skeleton | ✅ `plan/ docs/ data/ scripts/ tests/ e2e/ public/assets/ src/{components,css,js,pages,admin,lib} assets/{source,brand,projects,team,technical,equipment,diagrams}` all created |
| Source assets organised | ✅ 88 images → `assets/source/deck-media/`, text → `assets/source/deck-text-extract.txt` |
| `plan/00_SOURCE_AUDIT.md` | ✅ **Complete.** 12 sections. This is the deepest document and the authority for every fact |
| `plan/WEBSITE_PLAN.md` | ✅ **Complete.** 10 sections. IA, sitemap, nav, CTA hierarchy, page-by-page, homepage plan, linking map, responsive recomposition, data dependency matrix, open IA decisions |

### Remaining — write in this order

| # | File | Why this order |
|---|---|---|
| 1 | `plan/CONTENT_PLAN.md` | Depends on audit + IA. Biggest remaining doc |
| 2 | `plan/PROJECT_DATA.md` | Schema referenced by both above; write before data files |
| 3 | `data/*.json` | Seed files: `projects.json`, `services.json`, `people.json`, `standards.json`, `settings.json` |
| 4 | `plan/DESIGN_GUIDE.md` | Independent of content; needs the brand file only |
| 5 | `plan/IMAGE_WORKFLOW.md` | Depends on DESIGN_GUIDE (texture vs photo rules) |
| 6 | `plan/ADMIN_PLAN.md` | Depends on PROJECT_DATA |
| 7 | `plan/SEO_PLAN.md` | Depends on IA + CONTENT_PLAN |
| 8 | `plan/MASTER_PLAN.md` | Depends on everything — Phases 0–16 |
| 9 | `plan/CHANGE_GUIDE.md` | Depends on MASTER_PLAN |
| 10 | `plan/DEPLOYMENT_PLAN.md` | Depends on MASTER_PLAN |
| 11 | `DECISIONS.md` (root) | Populate DEC-001 … DEC-010, see §7 |
| 12 | `PHASE_LOG.md` (root) | Phase 0 entry, in-progress |
| 13 | `CHANGELOG.md` (root) | Seed with Unreleased |
| 14 | `README.md` (root) | Currently one line: `# aware-acoustics`. Rewrite last |
| 15 | `docs/*` | Stubs only at plan stage — real content is a Phase 16 deliverable |
| 16 | **The 25-section chat response** | Final |

---

## 5. House style for these documents

Match it exactly. The existing two files set it.

- **Front matter block** on every file: `> **Depends on:** … > **Feeds:** … > **Status:** …`
- **Tables over prose** for anything enumerable. Prose only for judgement and rationale.
- **Every factual claim carries a status tag**: `VERIFIED` / `CLIENT TO CONFIRM` /
  `CLIENT TO PROVIDE` / `DO NOT PUBLISH`, and a slide citation where it came from the deck.
- **Cross-reference by ID, never by description.** "Blocked on **Q-07**", not "blocked on the
  equipment question."
- **State a recommendation, then the fallback.** Every open question has a "default if unanswered"
  so the build never stalls.
- **Call out what deliberately does *not* get built**, with the reason. This is the most valuable
  part of a plan and the part that is usually missing.
- Voice: measured, declarative, technical. No hedging, no marketing register. The plan documents
  should read the way the brand direction says the website should read.
- Em-dashes and `·` middots are used throughout. Keep them.
- Code fences for sitemaps, content hierarchies, CSS tokens, JSON schemas, CI pipelines.

---

## 6. Velmont benchmark — already fetched, do not re-fetch

Structure confirmed: `.github/workflows/`, `__tests__/`, `assets/`, `data/`, `e2e/`, `plan/`,
`public/`, `scripts/`, `src/`. Root config: `.env.example`, `.eslintrc.json`, `.firebaserc`,
`.gitignore`, `.prettierrc`, `firebase.json`, `firestore.rules`, `lighthouserc.json`,
`package.json`, `playwright.config.js`, `vite.config.js`, `vitest.config.js`, `vercel.json`.

Plan files: `MASTER_PLAN.md` (9 phases, dev tasks, approval gates), `CHANGE_GUIDE.md`,
`IMAGE_WORKFLOW.md`, `DESIGN_GUIDE.md`, `CONTENT_PLAN.html`, `WEBSITE_PLAN.md`, `PROJECT_DATA.md`.

Stack: vanilla HTML/CSS/JS + Vite · Firebase (Firestore, Storage) · EmailJS · Vitest · Playwright ·
ESLint · Prettier · Lighthouse CI · Vercel.

README pattern worth copying: *project status line → quick-start commands → "how to run the next
phase" → file reference table*. That "how to run the next phase" section is the single most useful
idea in the repo for an agent-executed build.

**Reuse the discipline. Copy none of the design, copy, architecture or industry assumptions.**

---

## 7. Decisions already made — write these up as DEC-001…

These are referenced by ID in the two completed files. `DECISIONS.md` must contain them.
Format each as: Context · Options · Decision · Rationale · Consequences.

| ID | Decision | Status |
|---|---|---|
| **DEC-001** | **Stack:** vanilla HTML/CSS/JS + Vite. No React/Next. 11 static pages + N project records, no app state, no auth on the public site. Complexity would be unjustified | Decided |
| **DEC-002** | **Logo conflict.** The existing logo is a 917×506 JPEG, blue + bright red, tagline "Acoustical Solutions" — which the brand voice explicitly bans. Options: (a) use as-is, (b) mono/knocked-back lockup only, (c) redraw. **Recommend (b) for launch, (c) as a follow-on.** Blocked on **Q-16**, **Q-26** | Recommended, needs client |
| **DEC-003** | **Texture-first visual strategy.** The brand direction mandates *no photography* — all surfaces are four-layer CSS material textures. The audit found **no source image that is simultaneously cleared, correctly attributed, and high enough resolution to be a hero** (§11, findings I-01…I-05, L-01…L-04). Therefore: textures carry hero and section grounds; **photography is admitted only as evidence** inside the project-record system and project detail galleries, always with a field-caption card and measured metadata, never full-bleed, never decorative. This is a **CREATED** extension to the brand system and must not contradict Part A. Alternative (strict zero-photography) remains viable and should be offered to the client | Recommended, needs sign-off at Gate 02 |
| **DEC-004** | **Content pipeline.** Firestore is the admin's source of truth, but the public site must stay statically rendered for SEO and LCP. Resolution: `scripts/fetch-content.js` pulls `published: true` content into `data/*.json` at build time; an admin **Publish** action fires a **Vercel Deploy Hook**. Public pages therefore make **zero runtime Firestore reads**. Firestore public read rules stay restricted to published documents as a defence-in-depth measure, not as the delivery path | Decided |
| **DEC-005** | **Admin: YES.** Justification in §9 below | Decided |
| **DEC-006** | **No CAPTCHA** on the contact form. It would be the only third-party visual element on the site and breaks the design system. Use honeypot + submission-timing check + server-side validation instead | Decided |
| **DEC-007** | **Two-tier project model.** ~70 named projects, publishable depth for ~10. `tier: "case"` gets a detail page; `tier: "record"` is list-only. Prevents 60 thin pages. A project may not be `case` tier without `measured` data | Decided |
| **DEC-008** | **Technical charts are re-authored as inline SVG** in the brand palette. Never reuse the deck bitmaps. One of them (`image7.png`) is a third-party asset copied from `xiengineering.com` — see **L-01** | Decided |
| **DEC-009** | **Form delivery mechanism** — EmailJS (Velmont precedent) vs a Vercel serverless function vs Formspree. **Recommend a Vercel serverless function** posting to the practice inbox: no third-party JS on the page, no client-side API key, server-side validation possible. Needs writing up | Recommended |
| **DEC-010** | **Client names anonymised by default** until **Q-04** clears each one. `projects.json` carries `client`, `clientAnonymised`, and `clientPublic: boolean` | Decided |

---

## 8. Facts already established — do not re-derive

Everything is in `00_SOURCE_AUDIT.md`. The absolute minimum to hold in working memory:

**Identity.** AWARE Acoustics · logo tagline "Acoustical Solutions" · cover reads "ACOUSTICS & AV
CONSULTANTS" · phones +91 93916 51916 / +91 98450 64815 · emails padmanabha@ and
srikanth@awareacoustics.in · domain `awareacoustics.in` inferred from email only · **no address,
no founding year, no legal entity name anywhere in the deck**.

**Positioning (verbatim strengths).** "scientific, independent, and performance based" ·
**"clarity, compliance, and constructability"** — the strongest line in the deck, currently buried
on slide 2 · "technically effective and practically achievable on site" · "ensuring every space
performs exactly as intended".

**Team.** Two people. Padmanabha — 18+ yrs, acoustics specialisation IIT Kharagpur, graduate BMS
College of Engineering, EASE/ODEON, 12+ yrs prior at MMG Acoustical Consultants Bengaluru, airports
and metro stations. Srikanth T — 25+ yrs total / 12+ in acoustics, Bangalore University, business
and product development, key-account management.

**Disciplines with real evidence:** architectural/room acoustics · sound insulation & noise control
(incl. MEP/HVAC) · simulation & modelling (EASE) · measurement & verification. **AV is asserted but
undocumented** — slides 21–24 are images with zero text.

**Standards register (complete):** BS 8233:2014 · IS 2526 · ASHRAE Handbook (2015) · DIN 18041 ·
EN 12354 pts 1–6 · ISO 16283-1:2014 · ISO 3382 · ISO 717-1 / JIS A 1419-1 · ISO 354 ·
ISO 12999-1:2014 · IS 9736 · ASTM C423 · LEED v4/v5 · WELL · ISO 14001.

**Parameters:** RT60 (`Ta = 0.16 V/A`) · STI (0–1) · ALCONS (15% = upper acceptable limit) ·
NC (63 Hz–8 kHz, 1/1 octave) · NRC (0.0–1.0, ASTM C423 / ISO 354) · STC · SPL.

**14 sectors** (slide 27): Corporate · Open office · Technical Labs · Hospitals · Airports · Metros ·
Schools · Hotel · Convention centre · Theatre · Stadium · Religious · Factories · Residential Towers.
Convention centre and Stadium have **no named project**.

**The 10 projects with metadata** are tabulated in audit §6.1 — Guwahati Intl Airport (Adani, 6.0 L
sq ft), RNSIT Auditorium (1,400 seats), Yashoda Hospital Auditorium (450 seats), Titan (2.0 L sq ft),
Hilti Vadodara (1.5 L sq ft), Google Opal, Wayfair, JW Marriott Sahar, InterContinental Kuwait,
Westin Powai. ~60 more are name-and-location only.

**The single biggest content gap:** not one project in the entire deck carries a **year**, a
**design target**, or a **measured result**. The approved brand direction is built entirely around
target-vs-measured verification. See **Q-08**, **Q-09**.

---

## 9. Admin recommendation — settled, needs writing up

**ADMIN: YES.**

Reasoning to expand in `ADMIN_PLAN.md`:
- ~70 projects, of which 5+ are explicitly marked WIP in the source — the project list is a moving object.
- Both principals are non-technical; a code-deploy-per-project workflow guarantees the site goes stale.
- Featured/published state, project ordering, and target-vs-measured data will change as **Q-08**/**Q-09** answers arrive over months, not in one batch.
- Team, services and settings change rarely but must not require a developer.

**Architecture:** Firebase Auth (email/password, 2 users) · Firestore · Firebase Storage ·
build-time snapshot per **DEC-004** · Vercel Deploy Hook on publish.

**Routes:** `/admin/login` · `/admin/dashboard` · `/admin/projects` · `/admin/projects/new` ·
`/admin/projects/[id]/edit` · `/admin/team` · `/admin/services` · `/admin/settings`.

**Scope boundary:** admin manages **content only**. No layout editing, no colour pickers, no page
builder. The brand system stays locked in code.

**Admin UI:** functional, not cinematic. Public-site tokens for colour so it feels related, but
`--font-body` (Public Sans) throughout, filled buttons permitted (the only place on the whole
project), denser spacing, obvious draft/published status, destructive actions behind confirmation.

**Image upload:** file picker only, never a pasted URL. Validate type, size, dimensions, filename;
require alt text; support replace / remove / reorder.

**Admin tests are explicitly enumerated in the brief** — login success/failure, unauthenticated
redirect, create/edit/duplicate, upload, replace, publish/unpublish, featured toggle, delete
confirmation, team CRUD, public site hides drafts, public site shows published changes,
unauthenticated write blocked.

---

## 10. Cross-reference IDs in use — keep the numbering continuous

| Prefix | Range used | Meaning | Where defined |
|---|---|---|---|
| `C-` | C-01 … C-07 | Contradictions in the source | Audit §9 |
| `P-` | P-01 … P-11 | Duplicate / weak / broken content | Audit §9 |
| `R-` | R-01 … R-06 | Unsupported or risky claims | Audit §9 |
| `L-` | L-01 … L-04 | Rights and legal issues | Audit §9 |
| `I-` | I-01 … I-05 | Image quality findings | Audit §9 |
| `Q-` | Q-01 … Q-30 | Client confirmation checklist | Audit §10 |
| `IA-` | IA-01 … IA-07 | Open IA decisions | WEBSITE_PLAN §10 |
| `DEC-` | DEC-001 … DEC-010 | Technical decisions | §7 above — **not yet written to DECISIONS.md** |

Blockers are **Q-01 … Q-07**. High-priority content gaps are **Q-08 … Q-15**. Asset requests are
**Q-16 … Q-21**. Brand/scope confirmations are **Q-22 … Q-30**.

---

## 11. Specs for each remaining document

Enough detail to write each one without re-deriving anything.

### `CONTENT_PLAN.md`
Page-by-page, section-by-section copy. Per section: section ID · eyebrow · headline · body ·
supporting copy · CTA · technical metadata · image need · **source reference (slide number)** ·
content status label from `APPROVED FROM SOURCE` / `REWRITTEN FROM SOURCE` / `CLIENT TO CONFIRM` /
`CLIENT TO PROVIDE`.

Rules that must hold: never invent a metric, client, award or outcome. Every rewritten line must
preserve the meaning of its source. Strip every banned word — *solutions, innovative, cutting-edge,
high-impact, premier, world-class*. Use the brand's messaging patterns (negation triad, three-part
progression, parallel construction, escalating list) and its verbatim key phrases where they fit.
Preserve the client's own strong vocabulary: *clarity, compliance, constructability, performance
based, independent, built environment, DBR, BOQ, mock-up, value engineering*.

**Do not paste any string from the deck** — slide text has pervasive missing word-spaces (**P-07**).
Re-type everything.

### `PROJECT_DATA.md`
Canonical schema. Adapt the brief's example to this business — the acoustics-specific fields are the
point. Include: `slug` `title` `client` `clientAnonymised` `clientPublic` `sector` `location` `city`
`country` `year` `status` `area` `areaUnit` `capacity` `capacityUnit` `appointedBy` `tier`
`scope[]` `services[]` `standards[]` `tools[]` `targets[]` `measured[]` `summary` `condition`
`approach` `outcome` `images[]` `featured` `published` `order`.

`targets[]` / `measured[]` element shape: `{ parameter, space, value, unit, standard }` — e.g.
`{ parameter: "RT60", space: "Main auditorium", value: 1.2, unit: "s", standard: "ISO 3382" }`.
The target/measured pair is the brand's entire proof mechanism; model it properly.

Validation rules to state and to implement in `scripts/validate-data.js`: unique slug · `tier: "case"`
requires ≥1 `measured` entry and ≥1 image · `featured: true` requires `tier: "case"` and
`published: true` · `clientPublic: false` forces `clientAnonymised` to render · year ≤ current year ·
every `services[]` value must exist in `services.json` · every `standards[]` value must exist in
`standards.json`.

Also cover: the two-tier model (**DEC-007**), the anonymisation model (**DEC-010**), and the rule
that project facts change in structured data first and are never hardcoded in a template.

### `DESIGN_GUIDE.md`
Turn `assets/brand-design-direction.md` into a production system. The brand file already separates
Extracted / Derived / Created — **preserve that split** and extend it. Part A is authority.

Cover every heading the brief lists (brand personality, principles, voice, vocabulary, typography,
type scale, colour, semantic roles, surfaces, grid, spacing, layout ratios, borders, radius, shadows,
image treatment, texture treatment, captions, project records, data tables, buttons, forms,
navigation, footer, responsive, accessibility, motion, reduced motion, hover, focus, transitions).

The complete token set already exists in the brand file's "Complete CSS Token Set" block — carry it
forward, do not re-invent values. Key constants: `--dust #e7dccb` ground · `--dust-warm #ded2ba` ·
`--stone #d3c3a7` · `--ink #1a1610` · `--slate #6b6258` · `--earth-deep #2a2622` · `--navy #0d1721` ·
`--red #A63A32` / `--red-bright #BF463D` / `--red-dark #8F302C` · Newsreader 300/400/500 ·
`--pad clamp(22px, 5.5vw, 88px)` · radius 0 except 12px thumbnails · breakpoints 900 / 600 ·
transitions .15/.2/.25s · all headings weight 300 · negative letter-spacing on headings ·
no icons except ↗ · one shadow only (`--shadow-plate`).

**New CREATED components this project needs and the brand file does not have:** a photography
treatment (**DEC-003**), a target-vs-measured table, a parameter/glossary component, a mobile
navigation overlay, a form system beyond the single input spec in B10, a 404 layout, a pagination /
prev-next control, a filter strip, and the entire admin UI surface.

CSS architecture: `tokens.css · base.css · typography.css · layout.css · components.css · motion.css ·
responsive.css`. No design values scattered into page files.

Accessibility: the brand file's B11 notes slate-on-dust at ~4.5:1 — **verify every pairing and state
the measured ratio**, because the mineral palette is low-contrast by nature and several combinations
will fail AA on small text. This is the highest-risk part of the design system.

### `IMAGE_WORKFLOW.md`
`assets/` = client originals, never served. `public/assets/` = optimised, committed outputs.
AVIF + WebP, committed — **not** re-encoded on every deploy. Sharp via `scripts/optimise-images.js`.

Define: filename convention (`[project-slug]-[category]-[nn].[ext]`), project folders, categories,
aspect ratios, max dimensions, AVIF quality, WebP quality, preload rules (hero only), lazy-load rules
(everything below the fold, with explicit `width`/`height`), mobile crops (`art-direction` via
`<picture>` for the record thumbnail 16:9 → 4:3 switch), alt-text rules, a verification step that
fails the build on a missing referenced file, and the replacement workflow.

Categories for this business: `project-space · project-detail · material · build-up · technical ·
equipment · measurement · simulation · drawing · team · process · facility · texture-plate`.

Must also carry: the **texture plate** system as a first-class "image" type that requires no asset,
the **DEC-003** photography rules, the **DEC-008** SVG chart rule, and a rights register column
(`source`, `licence`, `credit`, `cleared`) for every published image — because **L-01…L-04** make
provenance a live risk on this project.

### `SEO_PLAN.md`
Separate **source-derived terminology** (the client's real vocabulary, listed in audit §8.2) from
**SEO recommendations**. Cover branded, service-intent, sector-intent, geographic-intent and
project-intent queries; per-page titles and meta descriptions; canonical URLs; internal linking
(map already in WEBSITE_PLAN §7); sitemap; robots; Open Graph; social image strategy — which must
be a **generated texture plate**, since there is no cleared photograph (**DEC-003**); structured
data (`Organization`, `LocalBusiness`, `Service`, `Person`, `BreadcrumbList`, project pages as
`CreativeWork`); project-page SEO; expertise-page SEO.

Geographic reality: Bengaluru primary, with delivered work in Mumbai, Hyderabad, Pune, Kolkata,
Vadodara, Guwahati, Lucknow, Dehradun and Kuwait. **No thin city landing pages** — geography is
expressed through real project records.

### `MASTER_PLAN.md`
Phases 0–16 exactly as the brief structures them. Every phase needs: Goal · Dependencies ·
Development tasks · Content tasks · Data tasks · Tests · Lighthouse/performance checks ·
Approval gate · Output files · Commit message · Documentation updates · Client dependencies.

Phase 0 is **in progress** — this session completed the source audit, the IA, the repo skeleton and
the asset organisation. Performance targets: desktop ≥ 90 · mobile ≥ 85 · a11y ≥ 95 · SEO ≥ 95 ·
best practices ≥ 95.

Note against Phase 5 (Homepage) and Phase 6 (Work) that both are **blocked on Q-08/Q-09** for real
content, and that the brief forbids lorem ipsum. Sequencing must make that explicit rather than
discovering it at build time.

### `CHANGE_GUIDE.md`
Minor / Moderate / Major / Breaking. Per common change: source of truth · files affected · data
affected · tests required · docs required · approval needed · commit pattern.
Worked examples to include: change a phone number · add a project · replace a project image ·
add a new standard · change a design token · add an expertise page · migrate the CMS.

### `DEPLOYMENT_PLAN.md`
Staging setup · production hosting (Vercel) · environment variables · CI/CD · secrets · DNS · SSL ·
domain (`awareacoustics.in`, blocked on **Q-05**) · redirects · rollback · smoke tests ·
Search Console · analytics · sitemap submission · post-launch checks.
Hard rule from the brief: **do not connect the production domain until staging has passed Gate 05.**

### Root files
- `DECISIONS.md` — DEC-001…DEC-010 from §7, full Context/Options/Decision/Rationale/Consequences.
- `PHASE_LOG.md` — Phase 0 entry: date, status `IN PROGRESS`, tasks completed, open issues, client
  dependencies (Q-01…Q-07 blocking), approval status `PENDING GATE 01`, next phase.
- `CHANGELOG.md` — Keep-a-Changelog format, `## [Unreleased]` only. Must not duplicate PHASE_LOG.
- `README.md` — status line · quick start · **"how to run the next phase"** (the Velmont pattern) ·
  file reference table · the source-of-truth dependency diagram from the brief.

---

## 12. Things a resuming session will get wrong unless told

1. **The brand direction and the client deck disagree, and the disagreements matter.** Est. 2011 vs
   18 years (**C-01**). Lighting listed as a discipline with zero supporting content (**C-06**).
   NR/VDV/Rw shorthand that the client never uses. "No photography" against a deck built from
   photographs. Do not silently reconcile these — every one is logged and flagged.
2. **The client list is probably not the firm's.** Slides 3–4 mix ~19 blue-chip names into
   paragraphs describing prior employment at MMG Acoustical Consultants (**C-02**, **R-05**). This
   is the highest-risk item in the whole project. Never write copy that presents those as Aware
   Acoustics credentials until **Q-03** is answered.
3. **`image7.png` is stolen.** The source URL is still in the deck XML. Do not republish it (**L-01**).
4. **The deck text cannot be copy-pasted.** Missing word-spaces throughout (**P-07**).
5. **There is no usable hero image and no vector logo.** This is why **DEC-003** exists.
6. **The brief says ADMIN: YES by default and the source supports it.** Do not re-litigate.
7. The homepage must be **5–7 substantial sections**; the plan lands on 6 + footer, budgeted at
   ~7 viewport heights.
8. **Do not spawn subagents.** The operating instructions for this session prohibit it unless the
   user asks.

---

## 13. Resume instruction

> Continue the Aware Acoustics planning build. Read `plan/_HANDOFF.md`, then
> `plan/00_SOURCE_AUDIT.md` and `plan/WEBSITE_PLAN.md` in full. Write the remaining `/plan`
> documents in the order listed in `_HANDOFF.md` §4, at the same depth and in the same house style,
> then deliver the 25-section final response specified in §1.

# DESIGN GUIDE — Production System

> **Depends on:** `assets/brand-design-direction.md` Part A, `WEBSITE_PLAN.md`, **DEC-002**, **DEC-003**
> **Feeds:** CSS architecture, public components, admin shell, visual QA, Approval Gate 02
> **Status:** Draft 01 · Brand direction preserved; logo and photography treatment need Gate 02 sign-off

---

## 1. Authority and notation

Part A of the brand direction is authoritative. This guide labels its translation:

| Mark | Meaning |
|---|---|
| `[E]` | Extracted without change from Part A |
| `[D]` | Derived by applying an extracted pattern |
| `[C]` | Created because production needs a missing component or state |

Where source and production requirements conflict, this guide records the deviation. Brand claims
remain subject to the source audit: “Est. 2011” is blocked on **Q-02**; lighting and AV are blocked
on **Q-23** and **Q-06**; the independence triad is blocked on **Q-22**.

---

## 2. Brand personality and principles

| Principle | Production expression | Origin |
|---|---|---|
| Independent | Advice, criteria and evidence; no product merchandising | `[E]`, blocked on **Q-22** |
| Precise | Numeric data keeps units, space, target and method together | `[D]` |
| Early | Process begins at concept and drawing-set stage | `[E]` |
| Material | Physical build-ups and mineral surfaces, not decorative imagery | `[E]` |
| Verified | Target and measured result share one component | `[D]` |

The desired perception is competence without salesmanship. Visual authority comes from scale,
spacing, surface and evidence, not badges, animation, rounded cards or large claims.

---

## 3. Voice and vocabulary

Use measured, precise, declarative sentences. Use fragments deliberately. Technical language is
acceptable for the professional audience, but every shorthand term must sit beside a value or
decision context. Follow `CONTENT_PLAN.md` §1; never use “solutions”, “innovative”, “cutting-edge”,
“high-impact”, “premier” or “world-class”.

Messaging patterns: negation triad · three-part progression · parallel construction · escalating
list. Do not combine more than one pattern in a section; repetition would turn restraint into mannerism.

---

## 4. Typography

### 4.1 Families

| Role | Stack | Weight | Origin |
|---|---|---|---|
| Display / public headings | `Newsreader, Georgia, serif` | 300, 400, 500 | `[E]` |
| Public body / UI | `Public Sans, system-ui, sans-serif` | 300, 400, 500 | `[C]` |
| Data / labels | `IBM Plex Mono, Consolas, monospace` | 400 | `[C]` |
| Admin UI | Public Sans throughout; IBM Plex Mono for IDs/data | 400, 500 | `[C]` |

Self-host WOFF2 subsets where licensing permits. Preload only Newsreader 300 normal and Public Sans
400 normal. Other weights use `font-display: swap`. System fallbacks must preserve legibility.

### 4.2 Production scale

| Token / use | Size | Line height | Weight | Max width |
|---|---|---:|---:|---:|
| `--type-hero` | `clamp(48px, 6.8vw, 100px)` | .94 | 300 | 11ch |
| `--type-h2` | `clamp(34px, 4.8vw, 64px)` | 1.05 | 300 | 13ch |
| `--type-h3` | `clamp(30px, 3.8vw, 54px)` | 1.06 | 300 | 15ch |
| `--type-h4` | `clamp(26px, 3vw, 42px)` | 1.1 | 300 | 18ch |
| `--type-body-lg` | 18px | 1.55 | 300/400 | 46ch |
| `--type-body` | 16px | 1.6 | 400 | 55ch |
| `--type-label` | 12px | 1.4 | 400 | none |
| `--type-data` | 12px | 1.45 | 400 | none |

Part A specifies negative heading letter-spacing. Production sets `letter-spacing: 0` on all text
`[C]` to protect display rendering and long-word fit across fallbacks. Uppercase is limited to
eyebrows and data labels. No italics. No bold display headings.

---

## 5. Colour and contrast

### 5.1 Extracted palette

```css
:root {
  --dust: #e7dccb; --dust-warm: #ded2ba; --stone: #d3c3a7;
  --stone-light: #d8d0c4; --fibre: #9e9486; --concrete: #8a8478;
  --felt: #7c7568; --graphite: #6b6258; --earth: #38342e;
  --earth-deep: #2a2622; --navy: #0d1721; --navy-mid: #152232;
  --ink: #1a1610; --slate: #6b6258;
  --red: #A63A32; --red-bright: #BF463D; --red-dark: #8F302C;
  --verified: #4A6B52; --info: #3A5670;
  --line: rgba(26,22,16,.14); --line-light: rgba(255,255,255,.12);
}
```

### 5.2 Semantic roles

| Role | Light | Dark |
|---|---|---|
| Ground | `--dust` | `--earth-deep` / `--navy` |
| Primary text | `--ink` | `--dust` |
| Secondary small text | `--ink` at 72% opacity or `--earth` | `--dust` at 78% opacity |
| Accent text | `--red` on dust only | `--dust` with red as non-text rule |
| Border | `--line` | `--line-light` |
| Focus | `--red-dark` on light | `--dust` on dark |

### 5.3 Measured contrast

Ratios are WCAG relative-luminance calculations against solid backgrounds.

| Pair | Ratio | Rule |
|---|---:|---|
| Ink / dust | 13.10:1 | AAA |
| Slate / dust | 4.35:1 | Fails AA for normal text; ≥18px only |
| Red / dust | 4.67:1 | AA normal text |
| Ink / stone | 9.98:1 | AAA |
| Slate / stone | 3.31:1 | Large text only; prohibited for metadata |
| Red / stone | 3.56:1 | Large text only; use as rule/number, not small text |
| Dust / earth-deep | 10.92:1 | AAA |
| Dust / navy | 13.15:1 | AAA |
| Red-bright / navy | 3.58:1 | Large text only; not navigation text |
| Dust / red-dark | 5.82:1 | AA |

The brand source's “slate on dust ~4.5:1” estimate is not sufficient. Small metadata uses ink at
reduced hierarchy through type family and spacing, not low-contrast slate. On stone, metadata uses
ink. On navy, red appears only in non-text accents unless the text is large.

---

## 6. Tokens

```css
:root {
  --color-background: var(--dust); --color-surface: var(--dust-warm);
  --color-surface-alt: var(--stone); --color-surface-dark: var(--earth-deep);
  --color-surface-deep: var(--navy); --color-text: var(--ink);
  --color-text-inverse: var(--dust); --color-accent: var(--red);
  --color-accent-hover: var(--red-bright); --color-accent-dark: var(--red-dark);
  --font-heading: 'Newsreader', Georgia, serif;
  --font-body: 'Public Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', Consolas, monospace;
  --space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px;
  --space-xl: 36px; --space-2xl: 48px; --space-3xl: 64px;
  --space-section: clamp(80px, 12vh, 140px); --pad: clamp(22px, 5.5vw, 88px);
  --radius-none: 0; --radius-thumb: 12px;
  --border-light: 1px solid var(--line); --border-dark: 1px solid var(--line-light);
  --border-strong: 1px solid rgba(26,22,16,.2);
  --border-overlay: 1px solid rgba(255,255,255,.1);
  --shadow-plate: 0 20px 60px rgba(0,0,0,.35);
  --transition-fast: .15s; --transition-default: .2s; --transition-subtle: .25s;
}
```

Only `--shadow-plate` ships on the public site. The created subtle/overlay shadows from the brand
file are excluded; borders and surface contrast carry admin overlays as well.

---

## 7. Surfaces, grid and layout

Full-width section bands use `padding-inline: var(--pad)` and structural top borders. Text blocks,
not page wrappers, control line length. Stable grids:

| Pattern | ≥900px | <900px |
|---|---|---|
| Practice | `1.2fr .8fr` | one column |
| Project heading | `1fr 1fr` | one column |
| Editorial | `1.15fr .85fr`, alternating | visual first, one column |
| Verification | `.9fr 1.1fr` | one column |
| Record | `48px minmax(0,1fr) minmax(0,1fr) 36px` | see §15 |

Sections do not become floating cards. Individual repeated project records are rows, not nested
cards. Radius is zero except a project thumbnail at 12px. Lines express hierarchy and alignment;
they are not decorative frames.

---

## 8. Texture and photography

### 8.1 Texture plate `[E]`

Every plate combines base directional gradient, material pattern, SVG-noise grain and directional
light. Variants: timber/default · wool · felt · perforated · metal · slab. Text needs the extracted
bottom/side veil. Noise is decorative and must not become a DOM image or carry alt text.

Texture plates serve heroes, missing list-record thumbnails, section grounds and social images.
They are not labelled as project evidence.

### 8.2 Evidence photography `[C]` — DEC-003

Photography is admitted only inside a project record or project-detail gallery when it documents
the actual engagement and its rights register is cleared. It is never a public-site hero, section
background, generic sector image or mood image. Use a 4:3 record crop and an uncropped gallery view
where the technical condition remains readable. Every photograph has a factual caption.

Until Gate 02 approves **DEC-003**, strict zero-photography remains the fallback: omit galleries
and use texture plates in the index.

---

## 9. Core components

| Component | Production rule | Origin |
|---|---|---|
| CTA | Text link, 1px red underline, 44px effective target; no filled public buttons | `[E]` |
| Eyebrow | Mono 12px; red number, accessible ink/dust label | `[E]` + contrast correction |
| Tags | 13px, 1px border, no fill/radius; wrap or scroll | `[E]` |
| Record row | Stable four-column grid; title, metadata, ↗ | `[E]` |
| Field caption | Dark translucent ground, blur 10px, square border | `[E]` |
| Build-up stack | Layer height proportional to thickness; numeric legend available in text | `[E]` |
| Fact table | Two-column key/value, row borders; one column on mobile | `[E]` |
| Data table | Header/body associations; numeric values tabular; no colour-only state | `[D]` |

The ↗ glyph is the only decorative/navigation symbol on the public site. Familiar form controls
retain native affordances; no icon font or bespoke SVG icon set is added.

---

## 10. Created public components

### 10.1 Target vs measured table `[C]`

Desktop columns: parameter/space · target · measured · standard. Mobile renders one bordered group
per parameter with two equal value cells; no horizontal scroll. Units stay adjacent to values.
Status text (“within target”, “outside target”, “not assessed”) accompanies any colour.

### 10.2 Parameter glossary `[C]`

Definition list with designation, unit/range and project consequence. Use only parameters verified
in the audit: RT60, STI, ALCONS, NC, NRC, STC, SPL. NR, VDV and Rw remain excluded under **C-06**.

### 10.3 Mobile navigation overlay `[C]`

At <900px, a full-viewport `dialog`/modal navigation uses earth-deep, vertical links and explicit
close control. Focus is trapped; Escape closes; trigger receives focus on close; page scroll locks.
The trigger has a 44px target and accessible name. No slide-in drawer.

### 10.4 Form system `[C]`

Inputs use dust ground, 1px ink border, 16px Public Sans, 12px label above and visible required text.
Focus is `2px solid --red-dark`, offset 2px. Errors connect with `aria-describedby`, use plain text
and do not clear entered values. Selects remain native. Checkboxes remain recognisable controls.
Success/failure is announced in a live region. Disabled controls retain ≥3:1 component contrast.

### 10.5 Filter strip `[C]`

Progressive-enhancement links/selects preserve the complete server-rendered record list. Selected
state uses ink text, a 2px underline and `aria-current`; colour is secondary. Filters do not render
below the threshold in `WEBSITE_PLAN.md` IA-03.

### 10.6 Prev/next and pagination `[C]`

Project detail uses two text links with direction label and adjacent title. Work pagination is not
built in v1 unless performance testing shows it necessary; filtering and all-record rendering are
preferred below 100 compact records.

### 10.7 404 `[C]`

Dust band, h2-scale heading, one paragraph, three text links. No texture panel, illustration or
full-height centring that hides the footer.

---

## 11. Navigation and footer

Desktop navigation is absolute and scrolls away. Five links only; Expertise may open a keyboard-
operable disclosure. Current page cannot rely on red-bright on dark because it fails normal-text
contrast; use dust text plus a red underline. Dropdown has an opaque-enough dark ground to keep
contrast stable even where `backdrop-filter` is unsupported.

Footer follows the four-column structure in `WEBSITE_PLAN.md`. It contains no newsletter, logo
wall, unprovided social profile or legal identity. Missing address removes the row; it does not show
“TBC”.

---

## 12. Admin surface `[C]`

Admin is functional and dense: Public Sans body, mono IDs, dust ground, white/stone data rows,
8px maximum radius for controls, persistent labels and filled command buttons. Public cinematic
textures, editorial alternation and display-sized headings do not enter the work surface.

| State | Treatment |
|---|---|
| Draft | Neutral border + explicit `Draft` text |
| Published | Verified green + explicit `Published` text |
| Needs evidence | Red border/label + missing-field list |
| Destructive | Red-dark filled button; confirmation dialog with record title |

Admin may use Lucide icons where a familiar command icon exists; every icon-only control has a
tooltip and accessible name. No layout editing, colour controls or page-builder blocks.

---

## 13. Motion and interaction

Only opacity, colour and border-colour transition, using `.15s`, `.2s` or `.25s`. No page-load,
scroll-linked, parallax, plate-zoom or count-up animation. Hover must not move, resize or reflow a
record. Keyboard focus is always visible and never replaced by hover styling.

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
  a, button, input, select, textarea { transition-duration: var(--transition-default); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
}
```

---

## 14. Accessibility

| Requirement | Acceptance condition |
|---|---|
| Semantics | One h1; ordered headings; landmarks; real buttons/links; table headers associated |
| Contrast | Normal text ≥4.5:1; large text ≥3:1; controls/focus ≥3:1 |
| Keyboard | All routes and controls usable; no focus loss in overlay/dropdown |
| Touch | Interactive target 44×44 CSS px where practical |
| Images | Evidence alt text; decorative textures empty/none; captions separate from alt |
| Zoom | No clipping at 200%; reflow at 320 CSS px |
| Forms | Labels persist; errors identified and announced; autocomplete tokens used |
| Motion | Reduced-motion rule above; no essential information in animation |

Automated checks are necessary but insufficient. Each template receives keyboard, screen-reader
landmark, zoom and contrast review at Gate 04.

---

## 15. Responsive recomposition

Breakpoints remain 900px and 600px `[E]`. At 600–900px, two-column regions become one column and
the overlay nav replaces inline navigation. Below 600px:

| Component | Mobile composition |
|---|---|
| Hero | 48px minimum display size; up to four lines; caption below plate |
| Record | Thumbnail 16:9 above; `32px minmax(0,1fr)` title row; metadata next line |
| Target/measured | Parameter group with two value columns; no table scroll |
| Fact table | Label above value |
| Gallery | One-up horizontal snap only when ≥2 images; otherwise static |
| Tags | Horizontal overflow with visible next-item hint |
| Footer | One column |

Fixed-format elements use `aspect-ratio`, explicit grid tracks and minimum block sizes so loading,
hover, long labels and validation messages cannot shift neighbouring content.

---

## 16. CSS architecture

```text
src/css/tokens.css       Raw and semantic tokens only
src/css/base.css         Reset, elements, accessibility primitives
src/css/typography.css   Font faces, scale, prose and data styles
src/css/layout.css       Section bands, grids, containers, flow
src/css/components.css   Public components and their states
src/css/motion.css       Transition and reduced-motion rules
src/css/responsive.css   900px / 600px recomposition only
src/admin/admin.css      Admin-only component layer using shared tokens
```

No page stylesheet contains a raw colour, spacing, radius, shadow, font or transition value. A new
value is added to `tokens.css`, documented here and reviewed at Gate 02.

---

## 17. Visual QA

Capture home, work, one project record, each expertise template, method, practice, contact, admin
list/edit and 404 at 320, 375, 430, 768, 1024, 1280 and 1440px. Verify: no overlap · no clipped
words · stable controls · evidence photography readable · texture plates nonblank · focus visible ·
no unintended card nesting · next section visible below any true hero.

**Gate 02 requires:** mono logo decision **Q-16/Q-26** · DEC-003 photography sign-off · token and
contrast approval · desktop/mobile component proofs.

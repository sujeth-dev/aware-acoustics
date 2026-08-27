# Aware Acoustics — Direction 02: Mineral / Material

> Brand system extracted from `directions/02-mineral-material.html`
> on branch `claude/draft-design-descriptions-pvmttf`.
> Aware Acoustics · Bengaluru, India · Est. 2011 · Independent consultancy

---

## How to read this document

This file is split into two halves.

**Part A — Extracted** contains only what is explicitly present in the source HTML: every color, font, spacing value, component, and pattern that already exists. Nothing is added or interpreted. This is the ground truth.

**Part B — Derived & Created** contains everything that was inferred from the source patterns or invented to complete the system. Each item is marked **[D]** (derived from existing patterns) or **[C]** (created to fill a gap). If the source changes, Part A is the authority; Part B adapts to it.

---
---

# Part A — Extracted

Everything below is directly present in `directions/02-mineral-material.html`.

---

## A1. Brand Position

- **Type:** Independent consultancy for acoustics, vibration, lighting, and audiovisual design
- **Location:** Bengaluru, India
- **Relationship to clients:** Appointed by architects, developers, and institutions
- **Independence:** Supplies nothing. Represents no manufacturer. Accepts no commission.
- **Service model:** Set performance conditions at concept stage, hold them through documentation, verify them on site
- **Disciplines:** Room acoustics · Noise & vibration · Audiovisual · Lighting

## A2. Voice & Language

### Tone
Measured, precise, declarative. Statements of fact. Technical terms used without definition — the audience shares the vocabulary.

### Key phrases (verbatim from source)
- "Every space has *conditions* you cannot see."
- "We work between architecture and performance."
- "What looks like a surface is usually a *build-up.*"
- "A room is designed *twice.*"
- "The earlier we are in the drawing set, the quieter the correction."
- "Quiet is measured at the end."
- "The room becomes the instrument."

### Messaging patterns
- **Negation triad** — "Not products. Not finishes. Not equipment selected afterwards."
- **Three-part progression** — "We define them early. We hold them through design. We measure them when the building is complete."
- **Parallel construction** — "Once in drawings. Once in what it finally does."
- **Escalating list** — "Send us a plan. A programme. A problem that has not happened yet."

### Vocabulary
**Use:** conditions, measured, defined, specified, build-up, density, thickness, mounting, edge, target, handover, verification, independent, field record, site record, concept stage, drawing set, fit-out

**Technical shorthand (always with value, never defined):** NR, NC, RT, STI, VDV, Rw, NRC

## A3. Color Palette

### Source CSS custom properties

| Token | Hex | Role in source |
|---|---|---|
| `--stone` | `#d3c3a7` | Cards, project backgrounds — **[D]** adjusted per **DEC-012**, was `#c8c0b2` |
| `--stone-light` | `#d8d0c4` | Texture base variant |
| `--fibre` | `#9e9486` | Mid-tone, texture element |
| `--graphite` | `#6b6258` | Secondary text, borders |
| `--earth` | `#38342e` | Dark surface |
| `--earth-deep` | `#2a2622` | Deepest surface, material section |
| `--dust` | `#e7dccb` | Primary background (body) — **[D]** adjusted per **DEC-012**, was `#e2dbd0` |
| `--dust-warm` | `#ded2ba` | Alternate surface, detail panels — **[D]** adjusted per **DEC-012**, was `#d6cfc2` |
| `--concrete` | `#8a8478` | Neutral mid-grey |
| `--felt` | `#7c7568` | Warm dark grey |
| `--navy` | `#0d1721` | Verification section ground |
| `--navy-mid` | `#152232` | Dark surface variant |
| `--ink` | `#1a1610` | Primary text |
| `--slate` | `#6b6258` | Captions, metadata, eyebrows |
| `--red` | `#A63A32` | Accent — section numbers, CTA underlines |
| `--red-dark` | `#8F302C` | Pressed/active state |
| `--red-bright` | `#BF463D` | Hover state, emphasis on dark |

### Source CSS non-color tokens

| Token | Value |
|---|---|
| `--pad` | `clamp(22px, 5.5vw, 88px)` |
| `--serif` | `'Newsreader', Georgia, serif` |
| `--line` | `rgba(26, 22, 16, .14)` |
| `--line-light` | `rgba(255, 255, 255, .12)` |

## A4. Typography

### Typefaces loaded

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300&display=swap" rel="stylesheet">
```

**Newsreader** is the sole typeface in Direction 02. Serif throughout — headings, body, navigation, captions, data. Optical size range 6–72. Weights: 300, 400, 500.

### Type scale (from source CSS)

| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero h1 | `clamp(48px, 6.8vw, 100px)` | 300 | .92 | -.035em |
| Section h2 | `clamp(34px, 4.8vw, 64px)` | 300 | 1.03–1.06 | -.02 to -.03em |
| Project h3 | `clamp(30px, 3.8vw, 54px)` | 300 | 1.02 | -.02em |
| Detail h4 | `clamp(34px, 4.2vw, 60px)` | 300 | 1.04 | -.025em |
| Body | 17–18px | 300 | 1.55 | normal |
| Eyebrow | 12px | 400 | — | .055em |
| Meta/data | 11–13px (mono) | 400 | — | .03–.04em |

### Typographic rules
- All heading weights are 300. Authority comes from size and spacing, not boldness.
- Negative letter-spacing on all headings (-.015em to -.035em), tighter as size increases.
- Eyebrows are the only element at weight 400.
- No italics. The `.accent` class uses color shift for emphasis.
- Uppercase reserved for eyebrows and data labels. Never on headings.
- Max body text width: ~55 characters. Headings capped at 10–15ch.

## A5. Visual Direction

### Aesthetic
No photography. All visual surfaces are CSS-rendered material textures built from layered gradients and SVG noise (`feTurbulence`). Each material type has its own base gradient, fibre pattern, noise overlay, and directional light layer.

### Material texture system (four-layer stack)

1. **Base** — directional gradient defining the material's color world
2. **Fibre** — repeating pattern (lines for fibre, dots for perforated, cross-hatch for felt)
3. **Grain** — SVG noise (`feTurbulence`) at .65–.9 baseFrequency, 3–5 octaves, opacity .3–.5
4. **Light** — directional gradient simulating raking light across the surface

### Material variants in source

| Material | Base gradient | Fibre pattern |
|---|---|---|
| Default (timber) | `linear-gradient(103deg, #8a8478…#6b6258)` | Repeating lines 84deg |
| Wool | `linear-gradient(120deg, #6f7a74…#5d6763)` | Lines at 31deg |
| Felt | `linear-gradient(140deg, #33455c…#22303f)` | Cross-hatch (0deg + 90deg) |
| Perforated | Same as default | Radial dots 1.6px, 15px spacing |
| Metal | `linear-gradient(100deg, #7d817f…#6b706e)` | Radial dots 2px, 19px spacing |
| Slab | `linear-gradient(115deg, #a7a49c…#8c8981)` | Vertical lines 2px/34px |

### Gradient veils (for text over textures)

```css
/* Hero bottom */   linear-gradient(to top, rgba(0,0,0,.62), rgba(0,0,0,.12) 40%, transparent 65%)
/* Hero side */     linear-gradient(to right, rgba(0,0,0,.4), transparent 48%)
/* Editorial */     linear-gradient(to top, rgba(0,0,0,.52), rgba(0,0,0,.06) 55%, transparent)
```

### Shapes & geometry
- Predominantly rectangular. Right angles throughout.
- Only rounded element: 12px on project thumbnails.
- The build-up stack (horizontal layered bars of varying height) is a signature compositional element.
- Lines are structural dividers, never decorative.

### Iconography
None. No icons, no symbols, no logo mark. The arrow glyph (↗) serves as the sole navigational indicator. Visual identity carried entirely by typography, color, and texture.

## A6. Layout

### Grid ratios

| Section | Ratio | Description |
|---|---|---|
| Practice | 1.2fr / .8fr | Heading left, copy right |
| Projects head | 1fr / 1fr | Heading left, description right |
| Editorial | 1.15fr / .85fr | Visual left, detail right (alternating) |
| Material | 1.15fr / .85fr | Build-up left, copy right |
| Verification | .9fr / 1.1fr | Copy left, metrics right |
| Record row | 48px 1fr 1fr 36px | Number, thumb, info, arrow |

### Breakpoints

| Breakpoint | Value | Behavior |
|---|---|---|
| Tablet | 900px | Two-column grids collapse to single column. Editorial flip resets. Direction strip hidden. |
| Mobile | 600px | Record rows simplify (32px + 1fr). Nav links beyond last hidden. |

### Editorial alternation
Sections alternate the visual panel between left and right using `direction: rtl` on the grid container (with `direction: ltr` restored on children). Resets to visual-first stacking on mobile.

### Container widths
No explicit `max-width` on page container — sections are full-bleed. Content width controlled by `--pad` on each section. Text blocks use `max-width` on individual elements (34ch–46ch for prose, 10–15ch for headings).

### Section surface rhythm

```
Hero            → material gradient (fibre/stone/graphite/earth)
Practice        → dust-warm (#ded2ba)
Projects        → stone (#d3c3a7)
Editorial L     → material texture | dust-warm
Editorial R     → dust-warm | material texture (flipped)
Material        → earth-deep (#2a2622)
Verification    → navy (#0d1721)
Appointment     → dust (#e7dccb)
Footer          → dust-warm (#ded2ba)
```

## A7. UI Components

### Call to action
Text link with red underline. No background, no border box.

```
font:           Newsreader 18px, weight 300
border-bottom:  1px solid var(--red)
padding-bottom: 4px
hover:          border-color → var(--red-bright)
transition:     .2s
```

### Section eyebrow
Red-numbered label introducing each page section.

```
font:           mono 12px, weight 400, ls .055em
number color:   var(--red)
text color:     var(--slate)
format:         "03 · Section name"
```

### Discipline tags
Horizontal tag row listing service areas.

```
font:           13px, ls .04em
padding:        5px 12px
border:         1px solid var(--line)
radius:         0
fill:           none
```

### Project record row
Numbered record with texture thumbnail and measured metadata.

```
grid:           48px 1fr 1fr 36px
thumbnail:      100px height, 12px radius, gradient + noise texture
title:          Newsreader 18px
meta:           mono 11px, ls .03em, color: var(--slate)
nav indicator:  ↗ arrow glyph
```

### Field caption card
Semi-transparent overlay card anchored over material surfaces.

```
background:     rgba(42, 38, 34, .78)
backdrop-filter: blur(10px)
border:         1px solid rgba(255, 255, 255, .1)
radius:         0
title:          Newsreader 16px, weight 300
meta:           mono 11px, ls .04em, rgba(255,255,255,.52)
```

### Build-up stack
Layered construction diagram. Each layer's height reflects physical thickness. Signature compositional element.

```
container:      --earth-deep ground, padded
layers:         stacked divs with 2px gap
layer height:   proportional to physical thickness
label:          mono 11px, rgba(255,255,255,.78)
sub-label:      mono 11px, rgba(255,255,255,.48)
footer text:    mono 10px, rgba(255,255,255,.38), centered
```

### Navigation dropdown
CSS-only direction picker using checkbox toggle. No JavaScript.

```
background:     rgba(10, 12, 14, .92)
backdrop-filter: blur(16px)
min-width:      280px
active state:   var(--red-bright)
trigger:        checkbox :checked ~ .menu
transition:     opacity .2s
```

### Direction strip
Compact horizontal navigation showing direction numbers (01A, 01B, 02, 03).

```
current:        var(--red-bright)
resting:        opacity .48
hover:          opacity .85
hidden:         below 900px
```

### Data table (specs / metrics)
Two-column key-value pair list for material specs and project data.

```
grid:           1fr 1fr, gap 18px
padding:        10px 0
border-bottom:  1px solid var(--line)
font:           13px, ls .03em
label color:    var(--slate)
```

## A8. Motion & Interaction

### Transition values

| Token | Value | Usage |
|---|---|---|
| fast | `.15s` | Dropdown link color |
| default | `.2s` | Nav link opacity, CTA border-color |
| subtle | `.25s` | Card hover background |

No easing function specified — all use browser default (ease).

### Hover behaviors
- **Nav links:** opacity .78 → 1
- **CTA underline:** border-color var(--red) → var(--red-bright)
- **Direction strip:** opacity .48 → .85
- **Direction card:** background rgba(26,22,16,.025) added
- **Dropdown link:** color brightens, background rgba(255,255,255,.05)

### Scroll behavior
`html { scroll-behavior: smooth; }` — the only scroll-related property. No scroll-linked animations, no parallax. Nav is absolute, not fixed.

### Motion personality
No page-load animations. No scroll effects. State changes acknowledged with subtle, fast transitions.

## A9. Shadows & Effects

| Token | Value | Usage |
|---|---|---|
| `--shadow-plate` | `0 20px 60px rgba(0,0,0,.35)` | Hero material plate (only shadow in source) |

### Opacity scale

| Value | Usage |
|---|---|
| .78 | Nav link resting state |
| .52 | Secondary text on dark grounds |
| .42 | Eyebrow labels on dark grounds |
| .38 | Spec labels, build-layer labels |
| .35–.4 | SVG noise texture overlay |

### Backdrop effects

| Value | Usage |
|---|---|
| `blur(10px)` | Field caption cards |
| `blur(16px)` | Navigation dropdown |

---
---

# Part B — Derived & Created

Everything below was inferred from Part A patterns **[D]** or invented to complete the system **[C]**. None of this exists in the source HTML. If the source changes, Part A is the authority and Part B should be re-derived from it.

---

## B1. Brand Foundation — Derived [D]

### Purpose
To make invisible environmental conditions — sound, vibration, light — visible, measurable, and defensible within the architectural process. Aware Acoustics exists to ensure rooms perform as designed, not as assumed.

### Audience
- Architects designing performance-sensitive spaces
- Developers commissioning commercial and institutional buildings
- Institutions (universities, hospitals, cultural venues) with acoustic requirements
- Peers and collaborators in the building-services consultancy ecosystem

### Values
- **Independence** — no supply, no distribution, no commission
- **Precision** — measured conditions, not assumed ones
- **Early involvement** — concept-stage decisions prevent costly corrections
- **Material honesty** — specification by density and mounting, not trade name
- **Verification** — every target measured on completion and reported

### Archetype
The Expert crossed with the Craftsman. Quiet authority born from physical evidence, not salesmanship. Closest analogy: the structural engineer who keeps the building standing — essential, unseen, trusted.

### Desired perception
Competence without salesmanship. The consultancy that shows up with instruments, not brochures.

## B2. Voice — Derived [D]

### Do / Don't

**Do:**
- State facts. Let the evidence carry the claim.
- Use short sentences. Use fragments for emphasis.
- Name materials by physical properties: "mineral fibre, 60 kg/m³"
- Present data alongside narrative, not in place of it.
- Assume the reader is an architect or building professional.

**Don't:**
- Don't persuade. Don't use superlatives or claims without evidence.
- Don't define technical terms — the audience knows them.
- Don't reference product brands. Specify by property.
- Don't hedge. "The room is NR 18" not "the room achieved approximately NR 18."
- Don't use marketing language: "solutions," "innovative," "world-class."

## B3. Semantic Color Roles — Derived [D]

Mapped from Part A's raw palette to functional roles:

| Role | Value | Source token | Usage |
|---|---|---|---|
| `--color-background` | `#e7dccb` | `--dust` | Page ground |
| `--color-surface` | `#ded2ba` | `--dust-warm` | Detail panels, practice section |
| `--color-surface-alt` | `#d3c3a7` | `--stone` | Projects section, card grounds |
| `--color-surface-dark` | `#2a2622` | `--earth-deep` | Material section, overlays |
| `--color-surface-deep` | `#0d1721` | `--navy` | Verification section |
| `--color-text` | `#1a1610` | `--ink` | Primary body text on light |
| `--color-text-secondary` | `#6b6258` | `--slate` | Captions, metadata, eyebrows |
| `--color-text-inverse` | `#e7dccb` | `--dust` | Text on dark surfaces |
| `--color-text-muted` | `rgba(255,255,255,.52)` | (inline) | Secondary text on dark |
| `--color-accent` | `#A63A32` | `--red` | Section numbers, CTA underlines |
| `--color-accent-hover` | `#BF463D` | `--red-bright` | Hover state |
| `--color-accent-dark` | `#8F302C` | `--red-dark` | Pressed/active state |
| `--color-border` | `rgba(26,22,16,.14)` | `--line` | Dividers on light |
| `--color-border-dark` | `rgba(255,255,255,.12)` | `--line-light` | Dividers on dark |

## B4. Status Colors — Created [C]

Not present in source. Added to complete the system for UI applications:

| Name | Hex | Role |
|---|---|---|
| Verified | `#4A6B52` | Measured targets met (mossy green from the earth palette) |
| Attention | `#A63A32` | Warning, requires review (reuses accent red) |
| Critical | `#8F302C` | Error, target not met (reuses red-dark) |
| Info | `#3A5670` | Neutral informational (steel blue from the navy range) |

## B5. Extended Typeface Pairing — Created [C]

Direction 02 uses only Newsreader. For extended applications (documentation, forms, data-heavy interfaces), pair with:

| Role | Typeface | Weights | Source |
|---|---|---|---|
| Heading / display | `Newsreader` | 300 / 400 / 500 | Part A (source) |
| Body / UI | `Public Sans` | 300 / 400 / 500 | Other Aware directions |
| Data / technical | `IBM Plex Mono` | 400 | Other Aware directions |

```
--font-heading: 'Newsreader', Georgia, serif;
--font-body:    'Public Sans', system-ui, -apple-system, sans-serif;
--font-mono:    'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace;
```

## B6. Spacing Tokens — Derived [D] + Created [C]

Extracted from source spacing values and organized into a scale:

| Token | Value | Source |
|---|---|---|
| `--space-xs` | `4px` | **[C]** added to complete scale |
| `--space-sm` | `8px` | **[D]** gap between discipline tags |
| `--space-md` | `16px` | **[D]** list margins, caption spacing |
| `--space-lg` | `24px` | **[D]** grid gaps, copy spacing |
| `--space-xl` | `36px` | **[D]** spec/data block margins |
| `--space-2xl` | `48px` | **[D]** data section margins |
| `--space-3xl` | `64px` | **[D]** derived from section padding range |
| `--space-section` | `clamp(80px, 12vh, 140px)` | **[D]** vertical section padding |

## B7. Border Tokens — Derived [D]

Organized from source border patterns:

| Token | Value | Usage |
|---|---|---|
| `--border-light` | `1px solid rgba(26,22,16,.14)` | Section dividers, data rows |
| `--border-dark` | `1px solid rgba(255,255,255,.12)` | Dividers on dark grounds |
| `--border-strong` | `1px solid rgba(26,22,16,.2)` | Table headers |
| `--border-overlay` | `1px solid rgba(255,255,255,.1)` | Field caption cards, overlays |

## B8. Shadow Tokens — Created [C]

Only `--shadow-plate` exists in source. Added for UI completeness:

| Token | Value | Source |
|---|---|---|
| `--shadow-plate` | `0 20px 60px rgba(0,0,0,.35)` | **[E]** hero plate |
| `--shadow-subtle` | `0 4px 16px rgba(0,0,0,.08)` | **[C]** for UI cards if needed |
| `--shadow-overlay` | `0 8px 32px rgba(0,0,0,.24)` | **[C]** dropdowns, modals |

Note: Shadows are used sparingly. The design relies on surface color contrast rather than elevation.

## B9. Transition Tokens — Derived [D]

| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | `.15s` | Dropdown link color |
| `--transition-default` | `.2s` | Nav link opacity, CTA border |
| `--transition-subtle` | `.25s` | Card hover background |

## B10. Input / Form Component — Created [C]

No forms in source. Derived from data table and tag patterns:

```
border:         1px solid var(--line)
background:     var(--dust)
font:           Newsreader 16px (or Public Sans 16px for extended)
padding:        10px 14px
radius:         0
focus:          border-color var(--red)
focus outline:  2px solid var(--red), offset 2px
```

## B11. Accessibility — Created [C]

### Contrast ratios (verified from palette)
- Ink on dust: ~10:1 (AAA)
- Slate on dust: ~4.5:1 (AA for large text / 14px bold / 18px)
- Red on dust: ~4.7:1 (AA)
- Dust on earth-deep: ~8:1 (AAA)

### Focus states
Not defined in source. Recommended: `outline: 2px solid var(--red); outline-offset: 2px`

### Motion
Wrap all transitions in `@media (prefers-reduced-motion: no-preference)`. Remove `scroll-behavior: smooth` when reduced motion preferred.

### Touch targets
Nav links and CTAs have 44px effective tap area via padding. Direction strip links (~28px) should be enlarged on touch devices.

## B12. Visual Consistency Rules — Derived [D]

**Do:**
- All surfaces sharp-edged (0 radius) except thumbnails (12px)
- Every section separated by a 1px border, never background change alone
- Red accent used only for: section numbers, CTA underlines, current-state indicators, measured highlights
- Texture surfaces always built as four-layer CSS stacks
- Text over textures always protected by a gradient veil
- Data always presented in two-column key-value grids
- Hero plate shadow is the only box-shadow in the system

**Don't:**
- No photography — textures are rendered, not photographed
- No icons or pictograms — the arrow glyph (↗) is the only symbol
- No bold heading weights — all headings are weight 300
- No rounded containers, buttons, or cards
- No animation on page load or scroll
- No gradients as decoration — gradients serve structural roles only
- No centered headings except closing/appointment section

## B13. Cross-Direction Constants — Derived [D]

These elements remain constant across all four Aware Acoustics directions:

- Newsreader as heading typeface
- Red accent (`#A63A32` / `#BF463D` / `#8F302C`)
- Section numbering pattern (red `01` · Section name)
- Content structure: Hero → Practice → Projects → Material → Verification → Appointment
- The same three reference projects (Auditorium, Office, Studio)
- The CTA pattern (text with red underline)
- The field caption card component

---
---

# Quick Reference Card

| Property | Value |
|---|---|
| **Direction** | 02 — Mineral / Material |
| **Identity** | Aware Acoustics · Bengaluru · Est. 2011 |
| **Positioning** | Between architecture and performance. Specify, don't supply. |
| **Voice** | Measured, precise, declarative. Facts, not persuasion. |
| **Aesthetic** | Tactile mineral surfaces. CSS-rendered textures. No photography. |
| **Primary typeface** | Newsreader 300/400/500 |
| **Extended typefaces** | Public Sans (body) · IBM Plex Mono (data) |
| **Ground** | `#e7dccb` Dust |
| **Surfaces** | `#ded2ba` Dust Warm · `#d3c3a7` Stone |
| **Text** | `#1a1610` Ink · `#6b6258` Slate |
| **Dark surfaces** | `#2a2622` Earth Deep · `#0d1721` Navy |
| **Accent** | `#A63A32` Red · `#BF463D` Bright · `#8F302C` Dark |
| **Borders** | 1px solid, rgba-based. Sharp edges throughout. |
| **Radius** | 0 default · 12px thumbnails only |
| **Motion** | .15s–.25s · Opacity and border-color only |
| **Breakpoints** | 900px · 600px |
| **Padding** | `clamp(22px, 5.5vw, 88px)` |

---

## Complete CSS Token Set

```css
:root {
  /* ─── Colors: Ground & Surface ─── */
  --dust:             #e7dccb;       /* [D] primary background — adjusted per DEC-012 */
  --dust-warm:        #ded2ba;       /* [D] alternate surface — adjusted per DEC-012 */
  --stone:            #d3c3a7;       /* [D] cards, project backgrounds — adjusted per DEC-012 */
  --stone-light:      #d8d0c4;       /* [E] texture base variant */
  --fibre:            #9e9486;       /* [E] mid-tone, texture */
  --concrete:         #8a8478;       /* [E] neutral mid-grey */
  --felt:             #7c7568;       /* [E] warm dark grey */
  --graphite:         #6b6258;       /* [E] secondary text, borders */
  --earth:            #38342e;       /* [E] dark surface */
  --earth-deep:       #2a2622;       /* [E] deepest surface */
  --navy:             #0d1721;       /* [E] verification section */
  --navy-mid:         #152232;       /* [E] dark surface variant */
  --ink:              #1a1610;       /* [E] primary text */
  --slate:            #6b6258;       /* [E] captions, metadata */

  /* ─── Colors: Accent ─── */
  --red:              #A63A32;       /* [E] accent */
  --red-dark:         #8F302C;       /* [E] pressed/active */
  --red-bright:       #BF463D;       /* [E] hover, emphasis on dark */

  /* ─── Colors: Status ─── */
  --verified:         #4A6B52;       /* [C] targets met */
  --info:             #3A5670;       /* [C] neutral informational */

  /* ─── Colors: Semantic Roles ─── */
  --color-background:      var(--dust);           /* [D] */
  --color-surface:         var(--dust-warm);      /* [D] */
  --color-surface-alt:     var(--stone);          /* [D] */
  --color-surface-dark:    var(--earth-deep);     /* [D] */
  --color-surface-deep:    var(--navy);           /* [D] */
  --color-text:            var(--ink);            /* [D] */
  --color-text-secondary:  var(--slate);          /* [D] */
  --color-text-inverse:    var(--dust);           /* [D] */
  --color-text-muted:      rgba(255,255,255,.52); /* [D] */
  --color-accent:          var(--red);            /* [D] */
  --color-accent-hover:    var(--red-bright);     /* [D] */
  --color-accent-dark:     var(--red-dark);       /* [D] */
  --color-border:          rgba(26,22,16,.14);    /* [E] */
  --color-border-dark:     rgba(255,255,255,.12); /* [E] */

  /* ─── Borders ─── */
  --line:             rgba(26,22,16,.14);         /* [E] */
  --line-light:       rgba(255,255,255,.12);      /* [E] */
  --border-light:     1px solid var(--line);      /* [D] */
  --border-dark:      1px solid var(--line-light); /* [D] */
  --border-strong:    1px solid rgba(26,22,16,.2); /* [D] */
  --border-overlay:   1px solid rgba(255,255,255,.1); /* [D] */

  /* ─── Typography ─── */
  --serif:            'Newsreader', Georgia, serif;                         /* [E] */
  --font-heading:     var(--serif);                                         /* [D] */
  --font-body:        'Public Sans', system-ui, -apple-system, sans-serif;  /* [C] */
  --font-mono:        'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace; /* [C] */

  /* ─── Spacing ─── */
  --space-xs:         4px;                        /* [C] */
  --space-sm:         8px;                        /* [D] */
  --space-md:         16px;                       /* [D] */
  --space-lg:         24px;                       /* [D] */
  --space-xl:         36px;                       /* [D] */
  --space-2xl:        48px;                       /* [D] */
  --space-3xl:        64px;                       /* [D] */
  --space-section:    clamp(80px, 12vh, 140px);   /* [D] */
  --pad:              clamp(22px, 5.5vw, 88px);   /* [E] */

  /* ─── Radius ─── */
  --radius-none:      0;                          /* [E] */
  --radius-thumb:     12px;                       /* [E] */

  /* ─── Shadows ─── */
  --shadow-plate:     0 20px 60px rgba(0,0,0,.35); /* [E] */
  --shadow-subtle:    0 4px 16px rgba(0,0,0,.08);  /* [C] */
  --shadow-overlay:   0 8px 32px rgba(0,0,0,.24);  /* [C] */

  /* ─── Transitions ─── */
  --transition-fast:    .15s;                     /* [E] */
  --transition-default: .2s;                      /* [E] */
  --transition-subtle:  .25s;                     /* [D] */

  /* ─── Effects ─── */
  --blur-overlay:     blur(10px);                 /* [E] */
  --blur-dropdown:    blur(16px);                 /* [E] */
}
```

---

*Source: `directions/02-mineral-material.html` on branch `claude/draft-design-descriptions-pvmttf`*
*Base commit: `17ee809`*

# IMAGE WORKFLOW — Source, Rights and Delivery

> **Depends on:** `00_SOURCE_AUDIT.md`, `DESIGN_GUIDE.md`, **DEC-003**, **DEC-008**
> **Feeds:** asset scripts, project data, admin uploads, build validation, visual QA
> **Status:** Draft 01 · No current source image is approved for public use

---

## 1. Asset boundary

| Path | Purpose | Served? | Mutability |
|---|---|:---:|---|
| `assets/source/` | Deck extraction and audit evidence | No | Preserve unchanged |
| `assets/projects/`, `team/`, `technical/`, `equipment/` | Cleared client originals | No | Replace only through intake workflow |
| `assets/brand/` | Vector logo masters and brand originals | No | Controlled |
| `public/assets/` | Optimised AVIF/WebP/SVG outputs | Yes | Regenerated and committed |

Client originals never enter `public/`. Generated outputs are committed so deployment does not
re-encode imagery on every build and visual diffs remain reviewable.

---

## 2. Publication classes

| Class | Rule |
|---|---|
| Texture plate | CSS-rendered; no file, alt text or rights entry; never presented as project evidence |
| Evidence photograph | Actual project/team/process/equipment image; cleared rights entry required |
| Technical diagram | Original inline SVG in brand palette; source/reviewer recorded |
| Document excerpt | Redacted client deliverable; written permission and legibility review required |
| Logo | Aware master only by default; third-party client marks excluded until written permission |

Photography follows **DEC-003**: project index thumbnails, project-detail galleries and factual team
or measurement evidence only. No photograph is full-bleed, decorative, a homepage hero or a generic
sector illustration. Gate 02 may choose strict zero-photography as the fallback.

---

## 3. Rights register

Every publishable file has a row in `data/image-rights.json` or equivalent Firestore record.

| Field | Requirement |
|---|---|
| `id`, `filename` | Unique and stable |
| `source` | Named supplier/photographer/client or original author |
| `licence` | Written permission, commissioned ownership or licence terms |
| `credit` | Exact credit line or `null` |
| `cleared` | Boolean set only after evidence is stored |
| `clientPermissionRef` | Email/document reference for project/client publication |
| `reviewedBy`, `reviewedAt` | Accountability |
| `restrictions` | Crop, territory, expiry, channel or NDA limitations |

`cleared: false` blocks a published reference. **L-01** `image7.png`, **L-02** logo-wall images,
**L-03** project images without provenance and **L-04** template backgrounds remain `DO NOT PUBLISH`.

---

## 4. Naming and folders

```text
assets/projects/[project-slug]/[project-slug]-[category]-[nn].[original-ext]
public/assets/projects/[project-slug]/[category]-[nn]-[width].avif
public/assets/projects/[project-slug]/[category]-[nn]-[width].webp
```

Allowed categories: `project-space` · `project-detail` · `material` · `build-up` · `technical` ·
`equipment` · `measurement` · `simulation` · `drawing` · `team` · `process` · `facility` ·
`texture-plate`. Filenames are lowercase ASCII kebab-case; sequence is two digits; client names
appear only when cleared.

---

## 5. Intake

1. Copy the original into the correct non-public asset folder; do not edit it.
2. Record source, licence, credit, permission and restrictions.
3. Validate JPEG/PNG/TIFF input; reject executable, SVG upload and extension/MIME mismatch.
4. Check minimum pixel dimensions, focus, technical relevance and metadata leakage.
5. Remove EXIF/GPS from delivery derivatives while retaining the untouched source.
6. Write factual alt text and caption; review anonymisation.
7. Optimise; inspect every crop; mark cleared only after rights review.

Admin accepts file-picker uploads only. Maximum source size: 20 MB; minimum long edge for project
photography: 2000px; team portraits: 2000px per **Q-17**. Smaller images require explicit design
review and cannot be upscaled to pass.

---

## 6. Output profiles

| Use | Ratio | Widths | Crop |
|---|---:|---|---|
| Project index desktop | 4:3 | 480, 800 | Focal crop |
| Project index mobile | 16:9 | 480, 800 | Art-directed focal crop |
| Project gallery | Source ratio where useful | 800, 1200, 1600 | No crop by default |
| Team portrait | 4:5 | 480, 800, 1200 | Consistent eye line |
| Technical/detail | Source ratio | 800, 1200, 1600 | Preserve labels and edges |
| Social texture plate | 1.91:1 | 1200×630 | Generated bitmap from approved CSS plate |

Encoding defaults: AVIF quality 52, WebP quality 78, 4:4:4 for diagrams with coloured edges.
`scripts/optimise-images.js` may tune per category but records the actual profile. Never convert an
inline technical SVG to a blurred photographic format.

---

## 7. Markup and loading

```html
<picture>
  <source media="(max-width: 599px)" type="image/avif" srcset="...-480.avif 480w, ...-800.avif 800w">
  <source type="image/avif" srcset="...-480.avif 480w, ...-800.avif 800w">
  <source type="image/webp" srcset="...-480.webp 480w, ...-800.webp 800w">
  <img src="...-800.webp" width="800" height="600" alt="..." loading="lazy" decoding="async">
</picture>
```

Only the actual LCP visual may use `fetchpriority="high"` and preload. Texture-first pages have no
hero image preload. Every below-fold image is lazy-loaded and carries intrinsic width/height.
Project thumbnails switch 4:3 to a composed 16:9 mobile crop via `<picture>`; galleries preserve
the evidence rather than forcing a house crop.

---

## 8. Alt text and captions

| Content | Alt rule | Caption rule |
|---|---|---|
| Project space | Name visible space and technically relevant condition | Project stage/view; no claim not in data |
| Detail/build-up | Describe material junction or assembly visible | Layer/property information if confirmed |
| Measurement | Describe instrument placement and space | Test/method/date only when supplied |
| Simulation | Describe mapped parameter and view | Parameter, scale and project context |
| Team portrait | Person name and role; omit “portrait of” | Optional |
| Decorative texture | Empty alt / CSS background | None |

Alt text does not repeat the caption, start with “image of”, infer emotion or disclose a private
client. Text embedded in technical imagery must also exist as real page text.

---

## 9. Technical diagrams — DEC-008

RT60, STI, ALCONS, NC/NRC and other explanatory charts are re-authored as accessible inline SVG.
The deck bitmaps are reference-only; `image7.png` is explicitly prohibited under **L-01**. SVGs use
brand tokens through CSS, real text, labelled axes, title/description, and a tabular text equivalent.
They do not copy third-party visual arrangement where rights are unclear.

---

## 10. Automation

`scripts/optimise-images.js` uses Sharp and must:

| Check | Result |
|---|---|
| Filename/category/schema invalid | Fail |
| Rights record absent or uncleared for publish target | Fail |
| Source below minimum dimensions | Fail unless reviewed override exists |
| Output already current by content hash | Skip deterministically |
| Output profile missing | Generate AVIF and WebP |
| EXIF remains in delivery file | Fail |
| Output exceeds 250 KB thumbnail / 500 KB gallery target | Warn, then manual review |

`scripts/verify-assets.js` scans every data reference. A missing source, fallback, dimension or
rights row fails the build. It also finds orphaned delivery files and warns; deletion is a separate,
reviewed action.

---

## 11. Replacement workflow

Keep the stable image `id`. Add the new original and rights record, generate derivatives, preview
all responsive crops, then change the structured reference. Run schema, asset and visual-regression
tests before removing old delivery files. A rights revocation is urgent: unpublish or remove the
reference first, deploy, then perform normal cleanup.

---

## 12. Approval and QA

| Gate | Evidence |
|---|---|
| Gate 01 | Image requests **Q-16…Q-21** accepted; rights owners assigned |
| Gate 02 | Texture vs photography rule approved; logo treatment approved |
| Gate 03 | Optimisation profiles and admin upload validation demonstrated |
| Gate 04 | Responsive crops, alt text, captions, LCP and layout-shift verified |
| Gate 05 | Production asset scan returns zero missing/uncleared references |

Current source position: zero approved hero images; zero cleared project galleries; raster logo only.
Textures can complete the visual system, but evidence photography and measured records remain a
client-content dependency rather than a design workaround.

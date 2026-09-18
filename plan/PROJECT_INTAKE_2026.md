# PROJECT INTAKE 2026 — Organising `LIST OF PROJECTS.xlsx` into the Work data model

> **Depends on:** `PROJECT_DATA.md` (schema, DEC-007 tiers, DEC-010 anonymisation), `WEBSITE_PLAN.md` §5.2/§5.3
> (`/work/` index and record rules), `IMAGE_WORKFLOW.md` (rights clearance), `00_SOURCE_AUDIT.md` §4/§6
> **Feeds:** `data/projects.json`, the `assets/source/web-research/` intake pass, a future `data/sectors.json`
> **Status:** Draft 01 · Intake plan only — no record in this file is published data

---

## 1. What this file is

`LIST OF PROJECTS.xlsx` is a client/project name list — 8 category headers, ~54 names, no facts
beyond a name. Per `PROJECT_DATA.md` §8, **a spreadsheet is never an alternate source of truth**;
it has to be mapped through the same schema and validation contract as everything else before it
can touch `data/projects.json`. This file is that mapping, done once, so the research pass and the
eventual data entry both work from the same plan instead of improvising per project.

Nothing here is publishable on its own. Every row still needs the same evidence `data/projects.json`
already requires — year, scope, and (for a `case` record) a measured result and a cleared image —
per **DEC-007** and **Q-08/Q-09/Q-04/Q-18** in `DEFERRED.md`.

---

## 2. Dedup against the existing seed set first

Seven names in the spreadsheet already have a seed record in `data/projects.json`, sourced from the
original deck audit. These are **the same engagement**, not a new project — the intake must update
the existing record (add corroborating facts, never a second slug) rather than create a duplicate.

| Spreadsheet name | Category | Existing slug | Existing client field |
|---|---|---|---|
| Google | Corporate | `technology-workplace-bengaluru-01` | Google India |
| Titan | Corporate | `corporate-campus-bengaluru-01` | Titan Company |
| RNS IT | Auditorium | `education-auditorium-bengaluru` | RNS Institute of Technology |
| Marriott | Hospitality | `hospitality-property-mumbai-01` | JW Marriott Sahar |
| Westin | Hospitality | `hospitality-property-mumbai-02` | Westin / West Inn |
| Intercontinental Kuwait | Hospitality | `hotel-ballroom-kuwait` | InterContinental Hotel |
| Guwahati Intl | Airport | `international-airport-assam` | Adani Group |

`scripts/validate-data.js` V-02 (unique slugs) is the backstop, but catch it at intake time —
matching on `client` substring before writing a new record is cheap; untangling two records for one
engagement later is not.

---

## 3. Sector mapping

The deck's 14-sector taxonomy (`00_SOURCE_AUDIT.md` §4) is descriptive, not a page plan — per
**WEBSITE_PLAN.md** §1, sectors are a filter facet on `/work/`, never a standalone page. The
spreadsheet's 8 category headers are coarser than that taxonomy and in three places mix sectors
under one heading, so mapping is per-project, not per-column.

| Spreadsheet category | Sector key(s) used | Note |
|---|---|---|
| CORPORATE | `corporate` | Clean 1:1 |
| AUDITORIUM | `education` (4 of 6) · `religious` (1) · `cultural-and-heritage` (1) | Reva/RNS IT/Somaiah/GPR are campus auditoriums → `education`. Sachidananda Ganapathi Ashram → `religious`. HN Science Centre → `cultural-and-heritage`, not `education` — it is a public science museum, not a teaching campus |
| HOSPITALITY | `hospitality` | Clean 1:1 |
| RESIDENTIAL | `residential` (2 of 3) · `retail-and-mixed-use` (1) | Inorbit Mall is a shopping mall, not a residential tower — the spreadsheet groups it here by proximity/developer, not typology |
| TECH LABS | `technical-labs` | Clean 1:1. Godrej and ABB each already appear once under CORPORATE — same client, a **different** project instance in each category, so both get their own record, not a merge |
| BANKS | `banking` | Clean 1:1 |
| AIRPORT | `airport-and-transport` | Clean 1:1 |
| OTHERS | `specialist-acoustic` (recording studio) · `cultural-and-heritage` (museum) | No shared sector; kept as two singletons rather than inventing an `other` bucket that never gets a second member |

`residential`, `technical-labs`, `banking`, `religious`, `cultural-and-heritage`, `retail-and-mixed-use`
and `specialist-acoustic` are **new** sector keys — the current 10 seed records only exercise
`corporate`, `education`, `healthcare`, `hospitality` and `airport-and-transport`. Recommend
formalising the full key list in a small `data/sectors.json` (mirroring `services.json`) once this
intake lands, so `sector` becomes a foreign key like `services[]` already is, rather than a free
string. Until then, `scripts/validate-data.js` has nothing to check `sector` against — this table
is the interim source of truth for spelling.

---

## 4. Research tiering — flagship vs listed-only

Per your instruction: full treatment (facts + one exterior + one interior reference image) for up
to 5–6 projects per category; everything past that is named only. Categories with 6 or fewer names
get full treatment for all of them — the cap only bites Corporate and Hospitality.

| Category | Flagship (full research) | Listed only |
|---|---|---|
| Corporate (21) | Google, Microsoft, L&T, Cisco, Siemens, ABB | Anaplan, Caterpillar, Trimont, Exxon Mobil, Swarn Tata, Godrej, Adani, Salesforce, VMware, Samsung, Biocon, Qualcomm, Texas Instruments, Intel, Titan |
| Auditorium (6) | All 6 — Reva University, RNS IT, Somaiah University, GPR Engg College, Sachidananda Ganapathi Ashram, HN Science Centre | — |
| Hospitality (10) | Marriott, Hyatt, Westin, Hilton, ITC Coorg, Intercontinental Kuwait | Grand Oberoi, Marie Gold, HICC, IHG |
| Residential (3) | All 3 — Aditya Birla, Kalpataru, Inorbit Mall | — |
| Tech Labs (6) | All 6 — Alexa, Johnson & Johnson, Godrej, ETV, ABB, Citadel | — |
| Banks (3) | All 3 — Equitas, HDFC, Standard Chartered | — |
| Airport (3) | All 3 — Dehradun, Lucknow, Guwahati Intl | — |
| Others (2) | All 2 — Pristine Recording Studio, Great Eastern Shipping Museum | — |

35 flagship, 19 listed-only. Titan and Google are flagship-eligible but already have seed records
(§2) — their research feeds the *existing* slug rather than opening a new one.

**Listed-only rows are not zero-effort forever.** They stay a bare name + category until either a
listed-only item is promoted (client evidence arrives, or it turns out to be commercially
significant) or the whole list gets a second research pass. Recording them now, even unresearched,
prevents the spreadsheet from being lost as "we'll deal with it later" — see `DEFERRED.md`
convention.

---

## 5. What the research pass may and may not produce

This intake runs *before* Q-04/Q-08/Q-09/Q-18 are answered, so its output cannot become a
`published` record. Concretely:

| Artefact | Where it lives | Status |
|---|---|---|
| Company/project facts (industry, likely building type, location if identifiable) | `assets/source/web-research/<category>/<slug>/notes.md` | Reference only — a human still confirms before it becomes `data/projects.json` prose |
| Exterior + interior reference image | `assets/source/web-research/<category>/<slug>/exterior.jpg` + `interior.jpg` | **Not rights-cleared.** Third-party/web-sourced. Never copied into `assets/projects/` or referenced by an `images[]` entry per `IMAGE_WORKFLOW.md` — that requires a rights-register row and `cleared: true`, which nothing web-sourced can carry |
| New `data/projects.json` records | Not created by this pass | Blocked on Q-04/Q-08/Q-09 regardless of research depth — a confirmed sector and a plausible city are not a year, a scope, or a client-cleared name |

The research pass moves projects from "a name on a spreadsheet" to "a name with a sector, a
plausible location, and a moodboard reference" — it does not and cannot move them to `published`.
That gate stays exactly where `PROJECT_DATA.md` §9 already put it.

---

## 6. Order numbering, once records are actually written

The 10 seed records occupy `order: 10`–`100`. When this intake's facts are eventually confirmed and
turned into real records, give each category its own hundred-block starting at `500` so the founding
seed set stays visually first and every category has room to insert without renumbering:

```text
500–599  Corporate          900–999   Tech Labs
600–699  Auditorium        1000–1099  Banks
700–799  Hospitality       1100–1199  Airport
800–899  Residential       1200–1299  Others
```

Slugs follow the existing `[typology]-[city]-[nn]` anonymised pattern from `WEBSITE_PLAN.md` §2
(e.g. `corporate-campus-bengaluru-02`) unless `clientPublic` is later set `true` for that record,
per **DEC-010**. Exact slugs are cut at data-entry time, once the research pass has a confirmed city
— several Banks/Tech Labs entries currently have no city in the source at all.

---

## 7. Sequence

1. Web-research pass populates `assets/source/web-research/` for the 35 flagship projects (this
   session).
2. A human reviews notes + images per project; anything worth pursuing gets logged against
   Q-04/Q-08/Q-09/Q-18 as a real client-evidence request, not left implicit.
3. Only once evidence exists does a project move into `data/projects.json` as `tier: record`,
   `published: false`, `clientPublic: false` — the same safe default the existing 10 seeds use.
4. Promotion to `tier: case` / `published: true` follows the existing rules in `PROJECT_DATA.md` §3
   and §6, unchanged by this intake.

# Web research — reference images and facts (published under DEC-019)

> **Companion to:** `plan/PROJECT_INTAKE_2026.md` (the organisation plan this folder executes)
> **Governed by:** `plan/IMAGE_WORKFLOW.md` — every image below is uncleared and must never be
> copied into `assets/projects/`, `public/`, or referenced from `data/projects.json` until a rights
> register entry exists and `cleared: true` is set.

> **Update 2026-09-19 (DEC-019):** the owner directed that this set be published. 55 of these images are
> now on `/work/`, processed into `public/assets/projects/`, each labelled and credited in `data/projects.json`.
> The rights caveats below still stand: publication is on the owner's direction, not a rights clearance.

> **Update 2026-09-20:** a second pass (17 more projects, people-free replacements) is in
> `additions-2026-09-20/`, with a source, licence and credit table. Same caveat: published on the owner's direction, not a rights clearance.

## What this is

A research pass over `LIST OF PROJECTS.xlsx` (2026-09-18): for 35 "flagship" projects across 8
categories, one exterior photo, one interior photo (where findable), and a `notes.md` of public
facts — company/institution, likely building, city, source URLs. Everything here is press,
marketing, or contributor photography pulled from the open web. None of it is Aware Acoustics'
own project photography, and none of it has documented usage rights.

**Do not:** copy a file from here into `assets/projects/` or `public/assets/`, reference one from
`data/projects.json`'s `images[]`, or present any of it as evidence of a real engagement without
first getting the actual client-supplied photography this site's `IMAGE_WORKFLOW.md` requires.

## Status by category

| Category | Flagship items | notes.md | Exterior found | Interior found | Duplicates of existing `data/projects.json` records |
|---|---:|---:|---:|---:|---|
| `airport/` | 3 | 3 | 3 | 3 | Guwahati → `international-airport-assam` |
| `auditorium/` | 6 | 6 | 6 | 4 | RNSIT → `education-auditorium-bengaluru` |
| `banks/` | 3 | 3 | 3 | 0 | — |
| `corporate/` | 6 | 6 | 6 | 5 | — |
| `hospitality/` | 6 | 6 | 5 | 6 | JW Marriott → `hospitality-property-mumbai-01`; Westin → `hospitality-property-mumbai-02`; Intercontinental Kuwait → `hotel-ballroom-kuwait` |
| `others/` | 2 | 2 | 0 | 0 | — (neither facility could be positively identified — see below) |
| `residential/` | 3 | 3 | 3 | 3 | — |
| `tech-labs/` | 6 | 6 | 6 | 3 | — |
| **Total** | **35** | **35** | **32** | **24** | 4 projects (7 name-matches) |

Corporate and Hospitality each also have a `README.md` listing the remaining listed-only names
(15 and 4 respectively) that got no research this pass, per `PROJECT_INTAKE_2026.md` §4.

## Known caveats — read before reusing any of this

A few entries are weaker matches than the rest; each is called out in its own `notes.md`, but the
ones worth knowing about before anyone builds on this folder:

- **`others/`** — neither Pristine Recording Studio nor Great Eastern Shipping Museum could be
  identified from the name alone. No images were downloaded (skipped rather than substituted with
  an unrelated lookalike). Needs the client to confirm the actual facility name/city.
- **`banks/hdfc/`** — the exterior shown is a different HDFC branch (T-Hub, Hyderabad), not the
  bank's actual HQ tower; no reusable photo of the HQ exists. Flagged in its `notes.md`.
- **`auditorium/gpr-engineering-college/`** and **`hospitality/hyatt/`, `itc-coorg/`,
  `intercontinental-kuwait/`** — best-guess identifications where the spreadsheet name doesn't map
  to an unambiguous, currently-trading property. Each `notes.md` says so explicitly.
- **`corporate/l-and-t/`** — building identified (A. M. Naik Tower, Powai) differs from the Mahape
  location mentioned in earlier project audits; may be a different L&T site entirely.
- No interior photo exists for any of the 3 Banks entries, or for Godrej/ETV (Tech Labs) — searched
  and confirmed absent, not simply unresearched.

## Next step

Per `PROJECT_INTAKE_2026.md` §7: a human reviews this material, decides which flagship projects are
worth pursuing for real client evidence, and logs that against Q-04/Q-08/Q-09/Q-18 in `DEFERRED.md`.
Nothing here should be typed into `data/projects.json` until that evidence — not this research —
exists.

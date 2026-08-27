# PROJECT DATA — Canonical Content Model

> **Depends on:** `00_SOURCE_AUDIT.md`, `WEBSITE_PLAN.md`, `CONTENT_PLAN.md`, **DEC-004**, **DEC-007**, **DEC-010**
> **Feeds:** `data/*.json`, Firestore, admin forms, page generation, schema tests
> **Status:** Draft 01 · Schema ready; content gated by **Q-03**, **Q-04**, **Q-08**, **Q-09**, **Q-18**

---

## 1. Authority and flow

Project facts are structured data first. During planning, committed JSON is the reviewable seed.
After admin launch, Firestore becomes the editing source; `scripts/fetch-content.js` snapshots only
published records into `data/*.json` at build time. Public pages make no runtime Firestore reads.

```text
Client evidence → admin / reviewed JSON → Firestore → build snapshot → validation → static pages
```

Templates own presentation only. A project title, result, year, client name or standard must never
be repeated as a literal in a page template.

---

## 2. Project schema

```json
{
  "slug": "auditorium-bengaluru",
  "title": "Auditorium, Bengaluru",
  "client": "Client legal or trading name",
  "clientAnonymised": "An education campus",
  "clientPublic": false,
  "sector": "education",
  "location": "Bengaluru, Karnataka, India",
  "city": "Bengaluru",
  "country": "India",
  "year": null,
  "status": "unknown",
  "area": null,
  "areaUnit": null,
  "capacity": 1400,
  "capacityUnit": "seats",
  "appointedBy": null,
  "tier": "record",
  "scope": ["Auditorium acoustics"],
  "services": ["architectural-acoustics"],
  "standards": [],
  "tools": [],
  "targets": [],
  "measured": [],
  "summary": null,
  "condition": null,
  "approach": null,
  "outcome": null,
  "images": [],
  "featured": false,
  "published": false,
  "order": 100
}
```

### 2.1 Field rules

| Field | Type | Required | Rule |
|---|---|:---:|---|
| `slug` | string | Yes | Unique lowercase kebab-case; permanent after publication |
| `title` | string | Yes | Facility/project label; use anonymised title when name is not cleared |
| `client` | string/null | Yes | Internal truth; never rendered when `clientPublic: false` |
| `clientAnonymised` | string | Yes | Specific but non-identifying: “A global technology campus” |
| `clientPublic` | boolean | Yes | Defaults false per **DEC-010** |
| `sector` | string | Yes | One controlled sector key |
| `location` | string | Yes | Display-ready city/region/country |
| `city` / `country` | string | Yes | Normalised for filtering and schema |
| `year` | integer/null | Yes | Four digits; not later than build year |
| `status` | enum | Yes | `unknown`, `in-progress`, `completed` |
| `area` / `capacity` | number/null | Yes | Never parse formatted deck strings at runtime |
| `areaUnit` | enum/null | Yes | `sq-ft`, `sq-m`; required when `area` is present |
| `capacityUnit` | enum/null | Yes | `seats`, `people`; required when `capacity` is present |
| `appointedBy` | string/null | Yes | Architect, PMC, developer or other appointing party; **Q-08** |
| `tier` | enum | Yes | `record` or `case` per **DEC-007** |
| `scope` | string[] | Yes | Exact project deliverables; at least one item |
| `services` | string[] | Yes | Keys that exist in `services.json`; at least one |
| `standards` | string[] | Yes | Keys that exist in `standards.json` |
| `tools` | string[] | Yes | Project-specific, not the firm's general capability |
| `targets` / `measured` | result[] | Yes | Empty for incomplete records; paired for case records |
| `summary` | string/null | Yes | 140–220 characters; list/index use |
| `condition` / `approach` / `outcome` | string/null | Yes | Evidence-based case narrative only |
| `images` | image[] | Yes | Cleared published derivatives, never `assets/source/` paths |
| `featured` / `published` | boolean | Yes | Defaults false |
| `order` | integer | Yes | Ascending; gaps of 10 permit insertion |

### 2.2 Result shape

```json
{
  "parameter": "RT60",
  "space": "Main auditorium",
  "value": 1.2,
  "unit": "s",
  "standard": "iso-3382"
}
```

Targets and measured values pair on `parameter + space + unit`. A `case` record requires at least
one complete pair. The measured entry may cite a different test standard only when the distinction
is explicit in client evidence. Values remain numeric; symbols and precision are presentation rules.

### 2.3 Image shape

```json
{
  "id": "auditorium-bengaluru-project-space-01",
  "category": "project-space",
  "src": "/assets/projects/auditorium-bengaluru/project-space-01.avif",
  "fallback": "/assets/projects/auditorium-bengaluru/project-space-01.webp",
  "width": 1600,
  "height": 1200,
  "alt": "View from the rear seating rows toward the auditorium stage",
  "caption": "Main auditorium after completion",
  "source": "Client supplied",
  "licence": "Permission recorded in rights register",
  "credit": null,
  "cleared": true,
  "order": 10
}
```

Only `cleared: true` images may be referenced by a published record. `src` and `fallback` must both
exist under `public/assets/`. Source originals stay outside the served tree.

---

## 3. Two-tier publication model — DEC-007

| Tier | Index row | Detail route | Minimum data |
|---|:---:|:---:|---|
| `record` | Yes when published | No | title · anonymised client · sector · location · scope · service |
| `case` | Yes when published | Yes | record minimum + year + condition + approach + outcome + ≥1 target/measured pair + ≥1 cleared image |

The source names roughly 70 engagements but none carries the complete proof set. Seed records are
therefore `record`, `featured: false`, `published: false`. Promotion is an editorial act backed by
evidence, not a visual setting.

---

## 4. Client anonymisation — DEC-010

| State | Rendered client | Rendered title | Structured data |
|---|---|---|---|
| `clientPublic: true` | `client` | Cleared project/facility title | Public name allowed |
| `clientPublic: false` | `clientAnonymised` | Anonymised facility/typology title | No private client value emitted |

The private `client` value may exist in Firestore for administration, but the build snapshot must
strip it from public JSON when `clientPublic` is false. Hiding it with CSS is prohibited. A client
logo is a separate rights decision and is not implied by `clientPublic: true`.

---

## 5. Supporting schemas

### 5.1 Service

| Field | Type | Rule |
|---|---|---|
| `id`, `slug` | string | Same unique controlled key |
| `name` | string | Public discipline name |
| `summary` | string | One sentence, source-grounded |
| `parameters` | string[] | Only verified parameters |
| `standards` | string[] | Foreign keys to standards |
| `published` | boolean | False for reserved AV until **Q-06** |
| `order` | integer | Navigation/display order |

### 5.2 Person

| Field | Type | Rule |
|---|---|---|
| `id`, `name`, `role`, `bio` | string | Role/full name gated by **Q-24** |
| `experienceYears` | integer/null | Individual experience only; never firm age |
| `credentials`, `tools` | string[] | Explicitly sourced |
| `email`, `phone` | string/null | Routing gated by **Q-28** |
| `portrait` | image/null | Omit component when absent |
| `published`, `order` | boolean, integer | Publishing controls |

### 5.3 Standard

| Field | Type | Rule |
|---|---|---|
| `id`, `designation` | string | Stable key and display label |
| `subject` | string | Plain-language subject, no certification implication |
| `category` | enum | `design`, `measurement`, `green` |
| `services` | string[] | Foreign keys to services |
| `editionStatus` | enum | `confirmed`, `client-to-confirm` |
| `published`, `order` | boolean, integer | Display controls |

### 5.4 Settings

One object holds `tradingName`, `legalName`, `entityType`, `foundedYear`, `address`, `city`,
`country`, `phones[]`, `emails[]`, `domain`, `enquiryEmail`, `social[]`, `privacyEnabled`,
`defaultSeo`, and `updatedAt`. Unknown legal and contact fields are `null`, never guessed.

---

## 6. Validation contract

`scripts/validate-data.js` runs locally, in CI and after every Firestore snapshot.

| ID | Validation | Severity |
|---|---|---|
| V-01 | JSON parses; expected root type and required fields exist | Fail |
| V-02 | Project and supporting-record IDs/slugs are unique | Fail |
| V-03 | Slugs match `^[a-z0-9]+(?:-[a-z0-9]+)*$` | Fail |
| V-04 | `tier: case` has ≥1 measured entry, a matching target and ≥1 cleared image | Fail |
| V-05 | `featured: true` requires `tier: case` and `published: true` | Fail |
| V-06 | `clientPublic: false` requires `clientAnonymised`; public export contains no `client` | Fail |
| V-07 | `year` is four digits and ≤ current build year | Fail |
| V-08 | Every service key exists in `services.json` | Fail |
| V-09 | Every standard key exists in `standards.json` | Fail |
| V-10 | Image paths are rooted in `/assets/`, files exist, dimensions are positive, rights are cleared | Fail for published; warn for draft |
| V-11 | Target/measured pairs share parameter, space and unit; values are finite numbers | Fail |
| V-12 | Area/capacity has a matching unit | Fail |
| V-13 | A published case has condition, approach, outcome and year | Fail |
| V-14 | Fewer than 2 featured case records in production | Fail |
| V-15 | Two or three featured case records in production | Warn |
| V-16 | More than 4 featured case records | Fail |

Development fixtures may bypass V-14 only when `NODE_ENV !== "production"`; no content rule may
be bypassed in production.

---

## 7. Firestore collections and public snapshot

```text
projects/{slug}
services/{id}
people/{id}
standards/{id}
settings/site
users/{uid}                 admin role only
publishEvents/{eventId}     audit trail
```

The admin writes Firestore. A publish action validates the selected document, records actor and
timestamp, then calls a Vercel Deploy Hook. The build reads with service credentials, writes a
sanitised snapshot and renders static pages. Public runtime reads remain zero per **DEC-004**.

Snapshot sanitation must:

1. Include only `published: true` records.
2. Remove private `client` when `clientPublic: false`.
3. Remove internal notes, draft asset references and audit metadata.
4. Sort deterministically by `order`, then `title`.
5. Fail before rendering when any V-01…V-16 production rule fails.

---

## 8. Change and migration rules

| Change | Required action |
|---|---|
| Correct a project fact | Edit structured record; retain audit note; rebuild |
| Promote record to case | Supply all case minimums; validate; editorial approval; publish |
| Clear a client name | Record written permission; set `clientPublic`; rebuild |
| Revoke permission | Set `clientPublic: false`; confirm sanitised snapshot; rebuild immediately |
| Rename a published slug | Add permanent redirect; keep old slug in migration record |
| Add a service/standard | Add supporting record first, then project foreign keys |
| Change schema | Version migration script, fixture, tests and admin form together |

No spreadsheet or page-builder export becomes an alternate source of truth. Bulk imports must map
through the same schema and validation contract.

---

## 9. Seed-data limitations

The initial `data/*.json` files record only facts the audit can support. They are planning fixtures,
not approval to publish. Specifically:

| Limitation | Required resolution |
|---|---|
| All project years absent | **Q-08** |
| All targets and measured values absent | **Q-09** |
| Client publication permission absent | **Q-04** |
| Named-client attribution partly unsafe | **Q-03** / **C-02** |
| Project-image rights absent | **Q-18** / **L-03** |
| Wayfair/Google area assignment ambiguous | **Q-11** / **C-03** |
| Powai property identity ambiguous | **Q-12** / **C-04** |

The safe default is `clientPublic: false`, `tier: record`, `featured: false`, `published: false`.

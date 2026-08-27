# WEBSITE_PLAN — Information Architecture

> **Depends on:** `00_SOURCE_AUDIT.md`
> **Feeds:** `CONTENT_PLAN.md`, `SEO_PLAN.md`, `MASTER_PLAN.md`
> **Status:** Draft 01 · Gated by **Approval Gate 01**

---

## 1. Strategic position

The deck is a 36-slide capability presentation organised by *topic taught*. A website appointed by
architects is browsed by *decision made*. These are different orders.

A prospective client — an architect two weeks from issuing a tender, a developer with an NC
complaint, a PMC assembling a consultant panel — arrives with one of four questions:

1. **Have you done this before, in my sector?** → Work
2. **Can you do the specific thing I need?** → Services
3. **Will you stand behind it?** → Standards, inside About
4. **Who am I actually hiring?** → About

The IA below answers those four questions in five pages plus a conversion route (**DEC-011**
collapses the original four-question/four-page mapping into Services and About; Standards
"stand behind it" content now lives inside About rather than a standalone Method page). Nothing
else earns a page.

### What deliberately does *not* become a page

| Deck content | Decision | Reason |
|---|---|---|
| Vision / Mission (slide 6) | Absorbed into Practice, rewritten | Corporate-template register (**R-01**); a standalone page invites the marketing voice the brand bans |
| RT60 / STI / ALCONS / NC / NRC explainers (slides 9–14) | Become an **inline glossary component** used across the Services page | Six thin definition pages would be keyword-spam; the brand voice explicitly does not define terms for their own sake, it uses them with values |
| One page per sector (14 sectors) | **No.** Sectors become a *filter facet* on `/work` and a strip on the homepage | 14 thin pages, 12 of which have no unique content. Revisit only when a sector has 3+ publishable projects with outcomes |
| Green norms (slide 7) | Section within `/about` | Not a service, a policy |
| LEED / WELL parameters (slide 19) | Section within `/about`, cross-linked from Services | Compliance evidence, not a service line |
| Client logo wall (slide 28) | **Excluded until Q-04 is cleared** | Rights risk **L-02** |
| AV / Digital Workplace (slides 21–24) | **Held.** Placeholder route reserved, not built | No text exists to build from (**Q-06**) |

---

## 2. Site map — DEC-011

```text
/                                   Home
│
├── /work/                          Work index — all publishable projects
│   └── /work/[slug]/               Project record (case-tier projects only)
│
├── /services/                      Single page, 4 in-page sections (anchors):
│                                      #architectural-acoustics
│                                      #sound-insulation-and-noise-control
│                                      #simulation-and-modelling
│                                      #measurement-and-verification
│                                    [#audiovisual RESERVED — blocked on Q-06]
│
├── /about/                         Firm + people (ex-Practice) and process,
│                                    standards, equipment (ex-Method), merged
│
├── /contact/                       Appointment
│
├── /privacy/                       Privacy & data handling (CLIENT TO CONFIRM Q-30)
└── /404/
```

**Total at launch: 7 pages + N project records.** Collapsed from the original 11-route IA
(**DEC-011**, 2026-08-27): `/expertise/` and its 4 discipline sub-pages become in-page sections
of `/services/`; `/method/` and `/practice/` merge into `/about/`. `/privacy/` and `/404/` are
kept as necessary utility pages, not part of the cut.

### Route conventions

| Rule | Value |
|---|---|
| Trailing slash | Yes, canonical with trailing slash |
| Case | Lowercase kebab-case only |
| Project slug | `[client-or-facility]-[typology]` where the client name is cleared, else `[typology]-[city]` — e.g. `guwahati-international-airport`, `rnsit-auditorium`, `technology-campus-bangalore` |
| Reserved | `/admin/*` — never in sitemap, always `noindex` |

---

## 3. Navigation

### Primary (desktop)

```text
Aware Acoustics          Work    Services    About    Contact
```

Four items. Services links to `/services/`; the 4 disciplines are in-page anchors reachable from
a lightweight in-page jump list on that page, not a nav dropdown — the header dropdown pattern
described below no longer applies now that Expertise is not a nav-level item (**DEC-011**). Per
the brand direction, navigation is **absolute, not fixed** — it scrolls away with the hero and
does not follow the reader.

| Behaviour | Spec |
|---|---|
| Resting link | `opacity: .78` |
| Hover | `opacity: 1`, `--transition-default` (.2s) |
| Current page | `--red-bright` on dark grounds, `--red` on light |
| Below 900px | Collapses to a full-screen overlay panel — **not** a slide-in drawer. Dark ground (`--earth-deep`), items at hero-adjacent scale, sharp edges, no icons except the ↗ glyph |
| Hamburger | Two 1px rules, not three. No icon font. 44px tap target |

### Footer

Concise, per brand direction. Four columns collapsing to one below 600px.

```text
Aware Acoustics              Work            Services                 Bengaluru, India
Independent acoustic         About           Architectural            [address — Q-01]
consultancy.                 Contact         Sound insulation         +91 …
                                              Simulation               …@awareacoustics.in
                                              Measurement
                                                                      © 2026 · Privacy
```

No newsletter. No social icons unless **Q-29**/LinkedIn is provided. No sitemap link.

---

## 4. CTA hierarchy

One primary conversion, one secondary, one tertiary. Never more than one primary CTA visible.

| Tier | Action | Wording | Where |
|---|---|---|---|
| **Primary** | Start an appointment conversation | "Send us a drawing set" / "Start a conversation" | Home §06, every Services section foot, every project record foot, Contact |
| **Secondary** | Deepen into proof | "See the work" · "How we verify" | Home §03/§05, Services bodies |
| **Tertiary** | Direct contact | Phone / email as plain text links | Footer, Contact |

CTA form per brand: text with a 1px `--red` underline. **No filled buttons anywhere on the public
site.** (Filled buttons exist only in `/admin` — see `ADMIN_PLAN.md`.)

---

## 5. Page-by-page plan

Content for each section is specified in `CONTENT_PLAN.md`. This document defines structure,
dependencies and intent.

---

### 5.1 `/` — Home

| Field | Value |
|---|---|
| **Purpose** | Establish that this is an independent technical consultancy that sets acoustic targets and proves them, and route to proof |
| **Audience** | Architect / PMC / developer, first visit, 40–90 seconds |
| **Conversion goal** | Reach `/work` or `/contact` |
| **Structured data dependency** | `projects.json` (featured, published, max 4) · `services.json` |
| **SEO purpose** | Brand + primary category term ("acoustic consultants Bangalore") |
| **Sections** | 6 + footer — see §6 below |

---

### 5.2 `/work/` — Work index

| Field | Value |
|---|---|
| **Purpose** | Demonstrate range and depth; let a visitor find their own sector fast |
| **Audience** | Evaluating a shortlist; sector-motivated |
| **Conversion goal** | Enter a project record, then `/contact` |
| **Data dependency** | `projects.json` — **all** records where `published: true`, both tiers |
| **CTA** | Per-record ↗ into detail (case tier only); page-foot primary CTA |
| **Internal links** | → project records · → `/services/#[discipline]` via each record's service tags · → `/about` |
| **Images** | One 4:3 record thumbnail per case-tier project. List-tier records render a **texture plate**, not a placeholder photo |

**Content hierarchy**

```text
01 · Work                          [eyebrow]
H1 · Work                          Short standfirst, 2 lines max
Filter strip                       Sector · Discipline  (see rule below)
Record rows                        Numbered, 48px 1fr 1fr 36px grid
   case-tier    → thumbnail, title, client, location, year, ↗ link
   list-tier    → texture plate, title, location, sector — NOT a link
Counter line                       "68 projects · 9 records published"
Appointment CTA
```

**Filtering rule.** Filters ship **only** if ≥ 12 published projects and ≥ 4 sectors have ≥ 2
projects each. Below that threshold a filter row is furniture that makes a small list look smaller.
Implement as a progressively-enhanced query-param filter (`/work/?sector=airports`), server-rendered
list intact with JS off. Filter state must not be the canonical URL.

**Two-tier decision.** The source names ~70 projects but carries publishable depth for ~10.
Generating 70 detail pages would create 60 thin pages — an SEO liability and a credibility one.
See `PROJECT_DATA.md` §3 for the `tier` field.

---

### 5.3 `/work/[slug]/` — Project record

| Field | Value |
|---|---|
| **Purpose** | Prove one engagement end to end: what the condition was, what was specified, what was measured |
| **Audience** | Late-stage evaluation, technically literate |
| **Conversion goal** | `/contact` with a named reference |
| **Data dependency** | One `projects.json` entry, `tier: "case"`, `published: true` |
| **SEO purpose** | Long-tail sector + typology + city intent |
| **Structured data** | `CreativeWork` / `Project` schema — see `SEO_PLAN.md` §7 |

**Content hierarchy**

```text
Hero plate                    Cover image OR material texture · project title over gradient veil
Field caption card            Client · Location · Year · Area/Capacity
Fact table                    Two-column key-value: sector, area, stage, scope, appointed by
01 · Condition                What the room or site presented
02 · Approach                 What was specified, and why. Build-up stack where relevant
03 · Verification             TARGET vs MEASURED table — the payload section
04 · Standards & tools        Tag row: standards applied, software used
Gallery                       2–6 images, each with a field caption
Prev / Next                   Adjacent published case-tier records
Appointment CTA
```

**Section 03 is the reason this page exists.** If a project has no `measured` data it must not be
`tier: "case"`. It stays a list-tier record. This rule is enforced in `scripts/validate-data.js`
and tested in `tests/schema.test.js`.

---

### 5.4 `/services/` — Single page, DEC-011

| Field | Value |
|---|---|
| **Purpose** | Show the four disciplines as one coherent practice, not a service menu |
| **Audience** | Scoping an appointment; unsure which discipline they need |
| **Conversion goal** | `/contact` |
| **Data dependency** | `services.json` |
| **SEO purpose** | Category hub; internal link equity distribution |

**Layout note.** Per brand principle, **avoid a 2x2 card grid**. Use four full-width horizontal
bands, alternating ground (`--dust` / `--dust-warm`), each band: red section number, discipline
name at h2 scale, a 34ch statement, a mono tag row of the parameters that discipline works in,
and a jump link to its in-page anchor further down. This reuses the editorial alternation pattern
in the brand source (para A6) rather than importing a SaaS convention.

**Four in-page sections** (`#architectural-acoustics`, `#sound-insulation-and-noise-control`,
`#simulation-and-modelling`, `#measurement-and-verification`), each following this template:

| Slug | Covers (all `VERIFIED` in audit) |
|---|---|
| `architectural-acoustics` | Room acoustics, RT60 and reverberation control, absorption and NRC selection, speech intelligibility (STI, ALCONS), auditoria and assembly spaces, IS 2526, DIN 18041 |
| `sound-insulation-and-noise-control` | Partition and floor STC, sound insulation layouts, floor STC marking, MEP/HVAC noise and vibration control, NC criteria, speech privacy, BS 8233, ASHRAE, EN 12354 |
| `simulation-and-modelling` | EASE, ODEON, 3D modelling, SPL distribution and hot-spot mapping, clarity metrics, frequency response, treatment and geometry scenario testing |
| `measurement-and-verification` | Field measurement to ISO 16283-1, ISO 3382, ISO 354, ISO 717-1, ISO 12999-1; ambient noise assessment; environmental noise survey; compliance reporting; LEED/WELL evidence |

```text
0N . [Discipline]              [eyebrow, anchor target]
H2                             Discipline name
Standfirst                     One-sentence definition in house voice, 46ch
The condition                  What goes wrong without it -- 2 short paras
What we do                     Deliverable list, mono-labelled, NOT bullet marketing
Parameters                     Glossary component -- the metrics this discipline works in,
                               each with unit, range and what "good" is
Standards                      Tag row from standards.json, filtered by discipline
Evidence                       2-3 related project records pulled from projects.json
                               by services[] match. Falls back to a text list if < 2.
```

**Cross-linking requirement:** every section must link to >= 1 project record and to `/contact`.
Sibling-discipline cross-links become in-page jump links (same page, no navigation).
[/services/audiovisual anchor RESERVED -- blocked on Q-06]

---

### 5.5 `/about/` — Practice + Method merged, DEC-011

| Field | Value |
|---|---|
| **Purpose** | Answer "who am I hiring," make independence concrete, and convert "we're technical" into an auditable process -- the page that wins panel selections |
| **Audience** | Decision-maker doing due diligence before a call; PMC/technical reviewer/procurement |
| **Conversion goal** | `/contact` |
| **Data dependency** | `people.json`, `standards.json` |
| **SEO purpose** | Brand + "independent acoustic consultant Bengaluru" + named-principal searches; standards-name long-tail (`ISO 16283 measurement India`, `BS 8233 consultant`) |

**Content hierarchy** — Practice content first, Method content follows on the same page:

```text
01 . Practice
H1                             Positioning statement
The practice                   What the firm is, who appoints it, when it is appointed
Independence                   The negation triad          <- BLOCKED on Q-22
Where we work                  Regions + a compact list of cities with project counts
02 . People                    Two records: portrait, name, role, experience, biography,
                               credentials, contact. NOT cards -- full-width editorial rows,
                               alternating image side, matching the brand's editorial pattern
03 . Approach                  Clarity . Compliance . Constructability -- the three-part
                               progression, sourced verbatim in substance from slide 2
04 . Method
H2 . A room is designed twice
Process spine                  Five stages, vertical numbered spine, not a horizontal stepper:
                               01 Concept -- set the targets
                               02 Design -- model, specify, document (DBR, drawings)
                               03 Tender -- review BOQ, drawings, submissions
                               04 Site -- mock-up review, constructability
                               05 Handover -- measure, report, verify
05 . Simulation                What is modelled and why it de-risks the design stage
06 . Instrumentation           Equipment register        <- BLOCKED on Q-07
07 . Standards register        Full table from standards.json, grouped design/measurement/green
08 . Green norms               Sustainability approach -- recycled/renewable, low-VOC, ISO 14001,
                               proximate supplier sourcing
09 . Compliance                LEED and WELL parameter tables with WELL point values
Appointment CTA
```

Portraits are `CLIENT TO PROVIDE` (**Q-17**). Until supplied, the people rows render **without an
image slot** — a text-only editorial row. They do **not** render a grey placeholder box.

Section 06 (Instrumentation) renders only when `standards.json` / `equipment.json` has entries.
Until **Q-07** is answered the section is omitted entirely — **never** shipped with placeholder
copy.

---

### 5.6 `/contact/` — Appointment

| Field | Value |
|---|---|
| **Purpose** | Convert, and qualify the enquiry before the first call |
| **Audience** | Ready to talk |
| **Conversion goal** | Form submission or direct contact |
| **Data dependency** | `settings.json` |
| **SEO purpose** | `LocalBusiness` structured data, NAP consistency |

**Content hierarchy**

```text
01 . Appointment
H1                             "Send us a plan. A programme. A problem that has not happened yet."
Standfirst                     What to send and what happens next
Two-column                     Form (1.1fr) | Direct contact + office (.9fr)
Form fields                    See 5.6.1
Direct routes                  Phone(s), email(s), who to contact for what   <- Q-28
Office                         Address                                       <- Q-01
What happens next              Three numbered lines setting response expectation
```

#### 5.6.1 Form fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | Yes | |
| Organisation | text | Yes | Architect / PMC / developer practice name |
| Email | email | Yes | Validated |
| Phone | tel | No | India format hint, not enforced |
| Project location | text | No | City |
| Project type | select | Yes | From `services.json` sectors: Corporate . Auditorium / assembly . Healthcare . Education . Hospitality . Airport / transport . Residential . Industrial . Other |
| Project stage | select | Yes | Concept . Design development . Tender . Under construction . Complete / remedial |
| Message | textarea | Yes | |
| Consent | checkbox | Yes | Data-handling consent, links `/privacy` (**Q-30**) |

**Project stage is the most valuable field on the site.** It tells the practice immediately whether
this is a design appointment or a remedial callout — a different conversation and a different fee.
It also directly serves the brand line *"The earlier we are in the drawing set, the quieter the
correction."*

Spam protection: honeypot field + timing check + server-side validation. **No CAPTCHA** — it would
be the only third-party visual element on the site and breaks the design system. See `DEC-006`.

---

### 5.7 `/404/`

Brand-consistent, not a joke page. Eyebrow `— · Not found`, an h2-scale line, and three links:
Work, Services, Contact. Dust ground. No illustration.

---

## 6. Homepage plan

Six substantial sections plus footer.

---

### 01 — Hero

| Field | Value |
|---|---|
| Ground | Material texture plate (fibre/stone/graphite/earth), four-layer CSS stack, `--shadow-plate` |
| Veil | Bottom + side gradient veils per brand §A5 |
| H1 | Positioning line — 3 lines max, `clamp(48px, 6.8vw, 100px)`, weight 300 |
| Sub | One sentence, 46ch, on the veil |
| Discipline tags | Room acoustics · Noise & vibration · Simulation · Measurement (bordered tag row, no fill) |
| CTA | Primary, red underline |
| Field caption card | Bottom-right — the practice's location and standing (`Bengaluru, India · Est. [Q-02]`) |
| **Establishes** | Company · positioning · visual world · strongest promise · primary CTA |

**No photograph in the hero.** See `DEC-003`. The texture plate is the strongest asset the project
currently owns outright, and it is the one visual the brand direction fully specifies.

---

### 02 — About / Positioning

| Field | Value |
|---|---|
| Ground | `--dust-warm` |
| Grid | 1.2fr / .8fr — heading left, copy right (brand §A6 Practice ratio) |
| Eyebrow | `01 · About` |
| H2 | The "we work between architecture and performance" idea, in client-sourced language |
| Copy | Three short paragraphs: **what** they do · **when** they enter · **why** they are appointed |
| Detail panel | The negation triad — what the practice does not do (**Q-22**) |
| CTA | Secondary → `/about/` |
| **Answers** | What do they do · where do they enter projects · why appoint them |

---

### 03 — Selected Work

| Field | Value |
|---|---|
| Ground | `--stone` |
| Grid | Head 1fr/1fr (heading left, description right); then record rows |
| Eyebrow | `02 · Selected work` |
| Content | **Exactly 4** featured project records, `featured: true` + `published: true` + `tier: "case"` |
| Record row | 48px number · thumbnail · title+meta · ↗ (brand §A7) |
| Meta line | mono 11px — Client · Location · Year · one headline measured value |
| Fallback | If fewer than 4 case-tier projects exist at build, the section renders what exists and the build **warns**; below 2 it **fails**. See `scripts/validate-data.js` |
| CTA | Secondary → `/work/` |
| **Shows** | Strongest proof, real projects only |

---

### 04 — Services / Capability

| Field | Value |
|---|---|
| Ground | Editorial alternation — texture panel / `--dust-warm`, flipping per band |
| Eyebrow | `03 · Services` |
| Content | Four horizontal bands, one per discipline. **Not a card grid** |
| Per band | Number · discipline name (h3 scale) · 34ch statement · mono parameter tags · ↗ |
| CTA | Secondary → `/services/` |
| **Explains** | The four major disciplines, in the practice's own technical register |

---

### 05 — Evidence / Verification

| Field | Value |
|---|---|
| Ground | `--navy` `#0d1721` — the brand's designated verification ground |
| Grid | .9fr / 1.1fr — copy left, metrics right (brand §A6 Verification ratio) |
| Eyebrow | `04 · Verification` |
| H2 | "Quiet is measured at the end." |
| Copy | The design→simulate→specify→verify chain, 3 short paragraphs |
| Metrics block | Target vs measured, two-column data grid, from real project data. **This block requires Q-09.** Until answered, the section renders the *process* and the *standards register count*, and the numeric block is omitted |
| Standards strip | Mono row of standard designations: ISO 16283-1 · ISO 3382 · BS 8233 · ASHRAE · DIN 18041 · EN 12354 · LEED · WELL |
| CTA | Secondary → `/about/` |
| **Shows** | Standards · process · testing · verification · outcomes |

---

### 06 — Appointment

| Field | Value |
|---|---|
| Ground | `--dust` |
| Alignment | Centred — the one place the brand permits a centred heading |
| Eyebrow | `05 · Appointment` |
| H2 | The escalating-list line: "Send us a plan. A programme. A problem that has not happened yet." |
| CTA | **Primary**, red underline → `/contact/` |
| Secondary | Phone and email as plain links |

---

### Footer

`--dust-warm`. Four columns → one below 600px. See §3.

---

### Homepage section budget

| Section | Ground | Est. viewport heights |
|---|---|---|
| 01 Hero | texture | 1.0 |
| 02 About | dust-warm | 0.9 |
| 03 Selected work | stone | 1.4 |
| 04 Services | alternating | 1.6 |
| 05 Verification | navy | 1.1 |
| 06 Appointment | dust | 0.6 |
| Footer | dust-warm | 0.4 |
| **Total** | | **~7.0** |

Target: under 8 viewport heights on desktop. Anything longer and section 06 is never reached.

---

## 7. Internal linking map

```text
Home ──┬─→ /work/ ──────→ /work/[slug] ──┬─→ /services/#[discipline]
       │        ↑                        ├─→ /about/
       │        └────────────────────────┤
       ├─→ /services/ ─→ /services/#[d] ──┤
       │                      ↕ siblings   │
       ├─→ /about/ ←──────────────────────┘
       └─→ /contact/ ←── every page foot
```

**Rules**
- Every page links to `/contact/` exactly once in body content (footer links do not count).
- Every project record links to ≥ 1 Services section (`/services/#[discipline]`) via its
  `services[]` tags.
- Every Services section links to ≥ 1 project record via reverse lookup on `services[]`.
- `/about/` is linked from every Services section and from the homepage verification section.
- No page is more than **2 clicks** from home.
- Orphan check runs in E2E (`e2e/links.spec.js`).

---

## 8. Responsive recomposition

Mobile is not the desktop grid stacked. Per breakpoint:

| Component | ≥900px | 600–900px | <600px |
|---|---|---|---|
| Nav | 5 inline links | Overlay panel | Overlay panel |
| Hero H1 | 100px, 3 lines | 64px, 3 lines | 48px, 4 lines, tighter leading |
| Hero field caption | Anchored bottom-right over plate | Below plate, full width | Below plate, full width |
| Editorial bands | 1.15fr/.85fr, alternating | Single column, visual first | Single column, visual first |
| Record row | 48px 1fr 1fr 36px | 48px 1fr 1fr 36px | 32px 1fr — **meta drops to a second line**, thumbnail becomes a 16:9 strip above |
| Fact table | 2-col key/value | 2-col | Single column, label above value, tighter row padding |
| Target/measured table | 3-col (param, target, measured) | 3-col | **2-col, stacked per parameter** — never a horizontal scroll for the payload data |
| Gallery | 2-up | 2-up | 1-up, `scroll-snap` carousel |
| Discipline tags | Single row | Wraps | Horizontal scroll strip, `overflow-x: auto` |
| Standards register | Full table | Full table | Grouped accordion by category |
| Footer | 4 columns | 2 columns | 1 column |

Test viewports: **320 · 375 · 430 · 768 · 1024 · 1280 · 1440+**, plus landscape at 430 and 768.

---

## 9. Structured-data dependency matrix

| Page | projects.json | services.json | people.json | standards.json | settings.json |
|---|:---:|:---:|:---:|:---:|:---:|
| `/` | ● featured | ● | | ○ names | ● |
| `/work/` | ● all published | ○ filters | | | ● |
| `/work/[slug]` | ● one | ○ tags | | ○ tags | ● |
| `/services/` | | ● | | | ● |
| `/services/#[d]` | ● by service | ● | | ● by discipline | ● |
| `/about/` | ○ counts | ○ | ● | ● | ● |
| `/contact/` | | ○ sectors | ○ routing | | ● |
| `/404/` | | | | | ● |

● required · ○ optional

**No page hardcodes a project fact, a person's detail, a standard designation, or a contact
detail.** Every one of those comes from `data/`. Enforced by `tests/no-hardcoded-facts.test.js`,
which greps the built HTML for known values (phone numbers, emails, project titles) appearing in
source templates rather than data.

---

## 10. Open IA decisions

| ID | Decision | Blocked on | Default if unanswered |
|---|---|---|---|
| IA-01 | Does `/services/#audiovisual` exist? | **Q-06** | **No.** Anchor reserved, not built. "AV" dropped from all identity copy |
| IA-02 | Does a lighting discipline exist? | **Q-23** | **No.** Brand direction corrected to three disciplines |
| IA-03 | Does `/work/` ship with filters? | Count of publishable projects | **No filters** below 12 published |
| IA-04 | Are client names shown or anonymised? | **Q-04** | **Anonymised.** `projects.json` carries both `client` and `clientAnonymised`; a per-project `clientPublic` boolean selects |
| IA-05 | Does the site carry a client logo wall? | **Q-04** | **No** |
| IA-06 | Is `/privacy/` in scope? | **Q-30** | **Yes** — required once a form collects personal data |
| IA-07 | Separate `/careers/`? | Client request | Not in scope for v1 |

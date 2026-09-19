# DECISIONS

> Durable technical, content and design decisions for the Aware Acoustics website.
> Status changes require a new decision or an explicit superseding note; do not silently rewrite history.

---

## DEC-001 — Public-site stack

**Status:** Decided · 2026-08-24

**Context.** The public site contains 11 fixed pages plus generated project records. It has no
public authentication, shared application state or interaction that needs a component runtime.

**Options.** Vanilla HTML/CSS/JS with Vite · React/Next · another SPA framework.

**Decision.** Use vanilla HTML/CSS/JS with Vite.

**Rationale.** Static rendering, small scripts and build-time data meet the IA and performance
targets with less runtime and maintenance overhead.

**Consequences.** Shared template helpers and strict data validation are required. React/Next
patterns and client-side page rendering are out of scope unless a later requirement justifies a
superseding decision.

---

## DEC-002 — Logo conflict

**Status:** Recommended · Client decision required under **Q-16**, **Q-26**

**Context.** The only logo is a 917×506 blue/red JPEG with “Acoustical Solutions”. It conflicts with
the mineral palette, banned vocabulary and production asset needs.

**Options.** Use as-is · use a mono/knocked-back lockup · commission a redraw.

**Decision.** Recommend a mono/knocked-back lockup for launch and a redraw as a follow-on.

**Rationale.** It protects launch scope while avoiding the strongest visual/verbal contradiction.

**Consequences.** A vector/mono master is required. Until approved, use a text wordmark in proofs;
do not trace the JPEG and present it as an authorised redraw.

---

## DEC-003 — Texture-first visual strategy

**Status:** Recommended · Gate 02 sign-off required

**Context.** Brand Part A mandates no photography. The deck contains no hero image that is both
cleared and production resolution; however, real project imagery can evidence completed work.

**Options.** Strict zero photography · photography-led site · texture-first with constrained evidence photography.

**Decision.** CSS material textures carry heroes and section grounds. Cleared photography may
appear only in project records/galleries with captions and measured metadata, never full-bleed or decorative.

**Rationale.** The system stays recognisably Mineral / Material while admitting useful proof and
respecting the current rights gap.

**Consequences.** Every image needs rights metadata and an evidence purpose. Strict zero photography
remains the fallback if Gate 02 rejects this created extension.

---

## DEC-004 — Build-time content snapshot

**Status:** Decided · 2026-08-24

**Context.** Admin users need managed content, but public pages need static SEO, stable LCP and no
runtime database dependency.

**Options.** Runtime Firestore reads · committed JSON only · Firestore source with build snapshot.

**Decision.** Firestore is the admin source of truth. `fetch-content.js` writes a sanitised
`data/*.json` snapshot at build time; publishing triggers a Vercel Deploy Hook.

**Rationale.** Editors gain a CMS while public delivery remains static and cacheable.

**Consequences.** Publication completes only after a successful build. Public runtime Firestore
reads are zero. Firestore still restricts reads to published records as defence in depth.

---

## DEC-005 — Admin required

**Status:** Decided · 2026-08-24

**Context.** Roughly 70 projects, WIP records, evolving proof fields and non-technical principals
make code-only content maintenance likely to fail.

**Options.** No admin/code edits · external generic CMS · constrained custom Firebase admin.

**Decision.** Build the constrained Firebase admin in `ADMIN_PLAN.md`.

**Rationale.** Project publication and evidence will change over months. Rare team/service/settings
updates should also avoid developer dependency.

**Consequences.** Content is editable; layout and brand controls are not. Authentication, rules,
backups, audit and training enter project scope.

---

## DEC-006 — No CAPTCHA

**Status:** Decided · 2026-08-24

**Context.** The contact form needs spam resistance without introducing a third-party visual and
tracking surface into the public design.

**Options.** Visual CAPTCHA · invisible CAPTCHA · honeypot/timing/server validation/rate limits.

**Decision.** Use honeypot, submission timing, server-side validation and rate limiting; no CAPTCHA.

**Rationale.** The controls are accessible, privacy-conscious and visually consistent.

**Consequences.** Abuse monitoring and tuning are operational responsibilities. A severe abuse
pattern may require a new decision with evidence.

---

## DEC-007 — Two-tier project model

**Status:** Decided · 2026-08-24

**Context.** The deck names roughly 70 projects but supports publishable depth for about ten and
contains no measured result for any of them.

**Options.** Detail page for every project · publish only a few projects · record/case tiers.

**Decision.** `record` entries appear only in the Work list; `case` entries receive detail pages.
A project cannot become `case` without measured data and a cleared image.

**Rationale.** Range can be shown without generating thin, repetitive pages or false proof.

**Consequences.** Validation enforces promotion criteria. Record-tier items are not links to empty pages.

---

## DEC-008 — Re-author technical charts

**Status:** Decided · 2026-08-24

**Context.** Deck charts are compressed bitmaps, visually inconsistent and in one case copied from
a third party (**L-01**).

**Options.** Reuse bitmaps · omit technical visuals · create original inline SVG charts.

**Decision.** Re-author required charts as accessible inline SVG in the production palette.

**Rationale.** Original vectors improve rights position, clarity, responsiveness and accessibility.

**Consequences.** Technical review and text equivalents are required. Deck bitmaps are reference-only.

---

## DEC-009 — Contact delivery

**Status:** Recommended · Provider/inbox confirmation pending **Q-28…Q-30**

**Context.** Form delivery needs validation and abuse controls without client-side credentials or
third-party page scripts.

**Options.** EmailJS · Formspree · Vercel serverless function posting to the practice inbox.

**Decision.** Use a Vercel serverless function.

**Rationale.** It keeps API credentials and validation server-side and adds no third-party public UI.

**Consequences.** A delivery provider, rate limit, privacy/retention policy and monitoring must be
configured. The function stores no message body in routine logs.

---

## DEC-010 — Client anonymisation default

**Status:** Decided · 2026-08-24

**Context.** Client attribution is partly mixed with prior-employer history and no per-project name
permission is documented (**C-02**, **Q-03**, **Q-04**).

**Options.** Publish all names · remove all projects · store private/public names with a permission flag.

**Decision.** Default every project to `clientPublic: false`; store `client`,
`clientAnonymised` and the permission flag.

**Rationale.** The internal record stays accurate while the public site avoids misrepresentation and NDA risk.

**Consequences.** Public snapshots strip private names from JSON, HTML, metadata, asset names and
structured data. Permission to name a client does not grant permission to use its logo.

---

## DEC-011 — IA simplified to five pages

**Status:** Decided · 2026-08-27

**Context.** The original IA (`WEBSITE_PLAN.md`, `DEC-011`'s predecessor state) held 11 routes:
Home, Work index + records, Expertise overview + 4 discipline pages, Method, Practice, Contact,
Privacy, 404. Client direction requested a simpler five-section site — Home, Work, Services,
About, Contact — while keeping necessary utility pages (privacy, 404, generated project-record
slugs).

**Options.** Keep 11 routes · collapse to 5 named sections with content folded in · drop the
folded content entirely.

**Decision.** Collapse to: **Home · Work (+ `/work/[slug]/` records) · Services · About ·
Contact**, plus `/privacy/` and `/404/` kept as necessary fillers.
- `/expertise/` and its four discipline sub-pages become four in-page anchor sections on a single
  `/services/` page (`#architectural-acoustics`, `#sound-insulation-and-noise-control`,
  `#simulation-and-modelling`, `#measurement-and-verification`).
- `/method/` and `/practice/` merge into a single `/about/` page — practice/people content first,
  process/standards/equipment content follows on the same page.
- No content is dropped, only re-housed. All prior gating (**Q-06** AV, **Q-07** equipment,
  **Q-17** portraits, **Q-22** independence, **Q-24** roles) still applies to the same content,
  now inside `/services/` or `/about/` instead of a standalone route.

**Rationale.** Client-requested simplification. Five named sections match how the client thinks
about the site; per-discipline and Method/Practice depth were adding route count without being
requested.

**Consequences.** Primary nav becomes `Work · Services · About · Contact` (four items, was five
with an Expertise dropdown). SEO loses four discrete discipline `<title>` targets — those become
H2-level in-page anchors sharing `/services/`'s single title, a minor rankings tradeoff accepted
for simplicity (**SEO_PLAN.md** §9). Internal linking rules, structured-data mapping (`Service`,
`Person`), and Phase 7/8 outputs in `MASTER_PLAN.md` are updated to match. `WEBSITE_PLAN.md`,
`CONTENT_PLAN.md`, `MASTER_PLAN.md` and `SEO_PLAN.md` updated same day.

---

## DEC-012 — Beige saturation lift

**Status:** Decided · 2026-08-27

**Context.** Client referenced karika.in/about as a brighter, more visible beige than the site's
source-extracted `--dust`/`--dust-warm`/`--stone` tokens. Measuring both in HSL showed karika's
beige (`#d9ccb0`, dominant background, 114 uses in their stylesheet) is not lighter than the
current tokens — it's more saturated (~35% vs. 17–24%) at nearly the same warm-tan hue (~40°).
Two candidates were built holding hue and lightness constant and lifting saturation only, so
existing contrast ratios and the brand's earth-tone character were not put at risk. Reviewed
side by side in a published swatch comparison.

**Options.** Keep current tokens · Candidate A (Subtle Lift, S≈32%) · Candidate B (Karika Match,
S≈36%, matching the referenced site's saturation level).

**Decision.** Candidate B — Karika Match.

| Token | Was | Now |
|---|---|---|
| `--dust` | `#e2dbd0` | `#e7dccb` |
| `--dust-warm` | `#d6cfc2` | `#ded2ba` |
| `--stone` | `#c8c0b2` | `#d3c3a7` |

**Rationale.** Matches the brightness/visibility the client asked for while holding lightness
constant, keeping existing contrast pairings intact and the palette's warm-tan hue unchanged.

**Consequences.** These three tokens move from `[E]` (extracted verbatim from source) to `[D]`
(derived — adjusted from the source pattern) in `brand-design-direction.md`. Updated in
`brand-design-direction.md`, `plan/DESIGN_GUIDE.md`, `plan/_HANDOFF.md`. No other token changed;
`--stone-light`, `--earth`, `--earth-deep`, `--ink`, `--red` family and all dark-ground tokens are
untouched. Contrast re-verification is still owed once real components exist in Phase 2/10 — the
hue/lightness-hold approach should keep prior ratios intact, but does not substitute for the
Phase 10 accessibility pass.

---

## DEC-013 — Trimmed critical path to Homepage

**Status:** Decided · 2026-08-27

**Context.** As originally scoped, `MASTER_PLAN.md` gated Phase 5 (Homepage) behind Phase 2
(full production design system — tokens plus a complete component lab with contrast/focus/
keyboard/reduced-motion audits and a 320–1440 screenshot regression suite), Phase 3 (full build
foundation plus a complete CI pipeline — Vitest/Playwright/Lighthouse/ESLint workflows), and
Phase 4 (the entire Firebase/Firestore/Storage admin system and publish pipeline) via Gate 03.
Client feedback: too much infrastructure sat between approved content and the first visible page,
when `data/*.json` is already validated and sufficient to start building against.

**Options.** Keep the original gated sequence · trim by removing hardening work outright ·
split each phase into a blocking slice (what a static page literally needs to exist) and a
deferred slice (hardening/tooling/admin that doesn't gate rendering), reordering only *when* work
happens, not *whether* it happens.

**Decision.** Split, not cut:
- **Phase 2a** (tokens/base/type CSS) blocks Phase 5. **Phase 2b** (component lab, full
  accessibility/responsive audit suite) moves to Phase 10, verified against real built pages.
- **Phase 3a** (Vite scaffold, templates, JSON loading) blocks Phase 5. **Phase 3b** (ESLint,
  Vitest/Playwright/Lighthouse CI) runs incrementally through Phases 5–9, hardens at Phase 9/13.
- **Phase 4** (Firebase admin, entire) comes off the critical path. Homepage and every static page
  read `data/*.json` directly, exactly as already committed — Firestore is the long-term admin
  source of truth (**DEC-004**) but not a prerequisite for a static build. Phase 4 runs any time
  before Gate 04, in parallel with page-building.
- Gate 02's scope narrows to 2a. Gate 03 no longer blocks Phase 5–9; it still gates Gate 04's
  admin-workflow sign-off and production launch.

**Rationale.** Nothing about *what* gets built changes — every task in Phases 2, 3 and 4 still
happens. Only the sequencing changes: a static vanilla-HTML/CSS/JS site (**DEC-001**) does not
need a finished CMS or a finished CI pipeline to render a page from JSON that already validates.

**Consequences.** `MASTER_PLAN.md` §2 (gates table), new §2.1, and the Phase 2/3/4/5 tables
updated same day. No other phase numbering changed — Phase 6–16 references elsewhere are still
valid. Risk accepted: Phase 3b/9 hardening happens after pages exist rather than before, so a
systemic CSS or build issue could surface across more pages before being caught — mitigated by
the no-hardcoded-facts test and build-smoke check staying in the 3a blocking slice.

---

## DEC-014 — Proceed on verified facts, generic where absent, revisit at end

**Status:** Decided · 2026-08-27

**Context.** Several open items (logo vector/colour, **Q-01**, **Q-06**, **Q-07**) don't need to
block build start. For each, client direction: use whatever is already verified in the deck; where
nothing is verified, stay generic and defer full resolution rather than blocking or inventing.

**Decision, applied per item:**

| Item | What's in the deck | Action now | Revisit when |
|---|---|---|---|
| **Logo file** | Finalised raster PNG supplied | Use the PNG as-is for header/footer/favicon. Do not wait on a vector. | Vector (SVG/AI/EPS) arrives — swap in, no other change needed |
| **Logo/palette colour (DEC-002)** | Logo red/gold run brighter than `--red`; no gold token exists | **Leave all colour tokens exactly as they are.** Logo runs slightly off-palette; that is normal and not being fixed speculatively. | Only if the client actively asks the site accent to match the logo |
| **Q-01 legal entity** | Nothing — audit confirms legal name, entity type, CIN/GSTIN, and registered address are all `CLIENT TO PROVIDE` with no source value anywhere | Keep using the verified trading name **"Aware Acoustics"** everywhere (already `settings.tradingName`). Legal name, entity type, address, and the footer legal line stay omitted — not invented, not guessed | Client supplies the legal facts — before Gate 06 / production launch at the latest, since it's legally expected on an Indian business site |
| **Q-06 AV service** | Cover descriptor "ACOUSTICS & AV CONSULTANTS"; slides 31–32 confirm "audio and acoustic simulation" delivered on the Guwahati, Dehradun and Lucknow airport projects. Slides 21–24 (AV/Digital Workplace) have zero body text and are likely template stock (audit line 556) | Updated `data/services.json`'s `audiovisual` entry summary to state the one verified fact. **Still `published: false`** — a single verified line item isn't a substantiated service with scope/deliverables/tools, and the deck's own AV slides look unreliable. Not shown in nav or Services page yet | Client provides written AV scope/deliverables/tools — then flip `published: true` and build out the section properly |
| **Q-07 equipment** | Nothing — audit confirms no meter make, model, IEC class or calibration status is stated anywhere in the deck | No change. Instrumentation section on `/about/` stays omitted entirely, per existing rule (never ships with placeholder copy) | Client provides the equipment register |

**Rationale.** None of these five items block a static page from rendering. Where the deck already
verifies a fact, use it. Where it doesn't, inventing a placeholder is exactly what the brief
prohibits — omission is the correct generic state, not a stand-in value.

**Consequences.** `data/services.json` updated. No page, token, or nav change results from this
decision — everything listed stays exactly as safe/omitted as before, just with a clearer paper
trail for whoever picks each item up. Tracked together here so the five don't need separate
one-off decisions each time they resurface.

**Update · 2026-08-27, same day.** Client confirmed the practice is based in **Bengaluru**. This
narrows the Q-01 row above: city is now a verified fact, not an unknown. `settings.city` set to
`"Bengaluru"`. Footer location and the homepage hero caption ("Bengaluru, India · Est. 2011") now
render — both city and founding year are confirmed — instead of being omitted. What Q-01 still
covers, unchanged: legal name, entity type, CIN/GSTIN, and the full registered street address
needed for the footer legal line and `LocalBusiness` structured data (NAP). Updated
`CONTENT_PLAN.md` (G-06, H-01) and `SEO_PLAN.md` (§4, §10) accordingly.

---

## DEC-015 — Typeface swap: Spectral + JetBrains Mono

**Status:** Decided · 2026-08-27

**Context.** Part A source direction specified Newsreader as the sole public typeface, IBM Plex
Mono for data/meta rows. Client reviewed a live comparison of six alternative pairings rendered
against real homepage copy and brand tokens, and picked a direction other than the source default.

**Options presented.** Keep Newsreader/IBM Plex Mono (current) · Fraunces + Space Mono ·
Spectral + JetBrains Mono · Zilla Slab + IBM Plex Mono · Instrument Serif display + Jost body ·
Newsreader (unchanged) + JetBrains Mono only.

**Decision.** Spectral (headings, body, navigation, captions — replacing Newsreader everywhere it
was used) + JetBrains Mono (data/meta rows — replacing IBM Plex Mono).

**Rationale.** Client preference, chosen directly against the live specimen comparison.

**Consequences.** `--serif` in `src/css/tokens.css` moves from `[E]` (Part A source, literal
Newsreader) to `[D]` (deliberate departure), same convention as DEC-012's beige tokens — the "was"
value stays noted inline so the source record isn't silently lost. `--font-mono` likewise moves
from `[C]` to `[D]`. `src/components/document.js`'s `FONTS` constant updated to load Spectral +
JetBrains Mono from Google Fonts instead. `src/css/typography.css`'s header comment updated to
describe the departure rather than claim Newsreader is still in force. All weight/spacing rules in
`typography.css` (all headings weight 300, size/spacing carries authority, not boldness) are
unchanged — only the face changed, not the type-scale logic. Static pages regenerated via
`npm run generate` to pick up the new font link. `--font-body` (Public Sans, reserved for the
admin layer) is untouched — this decision does not affect Phase 4.

**Separately confirmed, no code change:** the logo wordmark ("Aware Acoustics" text in
`assets/finalised logo @5x.png`) is visually consistent with **Poppins** (Regular or Light) —
identified by comparison, not a verified font file. This is a different, independent typeface from
the site's own Spectral — the logo is a fixed external asset and was never expected to match the
site's type system, same logic as DEC-002/DEC-014's logo colour handling.

**Note, 2026-08-27.** The Services page (Phase 7, commit `45ff97c`) that this decision was
originally numbered alongside — and its own DEC-015 "Parameter glossary as structured data" — was
reverted at the client's request (held back from the remote for now; nothing wrong with the work
itself). This decision was renumbered from DEC-016 back to DEC-015 once that removed the
collision. When Phase 7 is rebuilt, the parameter-glossary decision will need a fresh number, not
a re-use of this one.

---

## DEC-016 — Page redesign: activate the brand's own devices, add restrained components

**Status:** Decided · 2026-09-19

**Context.** Client feedback: the built pages read as basic and not brand-oriented. Audit found the
cause was not a thin brand system: `grid--editorial`/`grid--flip`, three of seven plate variants
and the section-ground rhythm were defined but never used, and four of eight routes were one-line
stubs (Services had been reverted by the client's request; About and Contact were never reached).

**Options.** (a) Stay inside brand rules B12/A8 — activate the existing devices, add components in
the same spirit. (b) Revisit banned patterns (animation, rounded cards, icons). Client chose (a):
"the same basic design style, built on a creative, professional, modern and brand-kit-oriented
approach." Homepage hero is explicitly left as-is.

**Decision.** Redesign all eight routes except the hero. New components, all sharp-edged, no icons,
no motion beyond existing opacity/border/colour transitions: `.statement` / `.statement-list`,
`.process-spine`, `.person-row` (image-optional, on `grid--editorial`/`grid--flip`),
`.standards-register`, `.stat`, `.field*` form controls, `.band__swatch`. Each discipline gets a
fixed material plate (`service-plate.js`: wool, slab, perforated, metal) so its identity is the
same wherever it appears. Services and Home share `service-bands.js`.

**Deviations recorded, not hidden.**
- Form fields are underline-style in `--serif`, not `DESIGN_GUIDE.md` §10.4's boxed 16px Public
  Sans: Public Sans is deliberately not loaded on the public site (`typography.css`), and B12 bans
  filled/rounded controls. Focus uses the global `:focus-visible` ring.
- Homepage Appointment keeps `--dust` (WEBSITE_PLAN §6 spec) — an early idea to texture it was
  dropped; the ground rhythm already varies.
- 404 stays a dust band with no texture (DESIGN_GUIDE §10.7); a dark variant was tried and reverted.
- About carries one body CTA (M-12); P-06's alternate CTA is unused (CONTENT_PLAN §1: one per page).
- Withheld per CONTENT_PLAN status labels: the sound-insulation "flanking" condition line
  (`CLIENT TO CONFIRM before body use`) and Contact "Next 03" (response time not supplied).
- Parameter glossary (§10.2) is still not built — parameters render as tag rows from
  `services.json`; it needs its own decision number when built.

**Consequences.** Services structure exists again in the repo; it stays committed but the
placeholders in its evidence slots remain until case records exist.

---

## DEC-017 — Non-production builds are noindex

**Status:** Decided · 2026-09-19

**Context.** Vercel is connected to the repository, so a push to `main` deploys the dev-content
build (`npm run build`), which carries visible "Placeholder — content pending" markers. A
`*.vercel.app` production URL is crawlable.

**Decision.** Any build without `AWARE_ENV=production` emits `<meta name="robots" content="noindex,
nofollow">` (`document.js`) and a `robots.txt` with `Disallow: /` (`vite.config.js`). The production
build emits `Allow: /`; sitemap and canonicals arrive with the Phase 11 SEO pass and Q-05.

**Consequences.** Nothing to remember at launch — `build:production` flips both automatically.

---

## DEC-018 — Content intake: list-tier publication from the deck and spreadsheet

**Status:** Decided · 2026-09-19

**Context.** The site owner supplied the client deck (`Aware Acoustics Profile - April 2026.odp`,
extracted in full) and `LIST OF PROJECTS.xlsx`, said the client names are cleared for public use
(closing Q-04), and directed that the intake proceed and that web images be used.

**Verified before deciding.** The deck holds project names, cities, some seat counts and areas and a
few WIP/Completed statuses on slides 29–34. It holds **no project year, design target or measured
result** (the only year-like tokens are standard editions, 2014/2015). So the material supports
`tier: "record"` rows, not `tier: "case"` records (DEC-007), and Q-08/Q-09 stay open.

**Decision.**
- `data/projects.json` is the de-duplicated union of deck slides 29–34 and the spreadsheet: the 10
  existing seeds updated in place (slugs kept; named; `clientPublic: true`; `published: true`) plus 64
  new list-tier records, 74 in total, `order` in the category blocks from the intake plan.
- Only stated facts are entered. Location is `null` where neither source gives one (30 records).
  Scope defaults to "Acoustics consultancy" (DEC-014 "generic where absent"); services default to
  architectural acoustics only, the least claim.
- Name-matches merged, not duplicated: Google/Opal, Titan, RNS IT, JW Marriott Sahar, Westin/West Inn,
  InterContinental Kuwait, Guwahati; Biocon and Qualcomm (spreadsheet and deck cafeteria entries); the
  deck's "Western Lake, Powai" is treated as the same engagement as West Inn until told otherwise.
  Same client in two categories stays two records (ABB, Godrej).
- `data/sectors.json` added; `sector` is now a foreign key checked by `data.js` and
  `validate-data.js`. `location` may be `null` for list-tier records.
- Sector filter built on `/work/` (the threshold in WEBSITE_PLAN §5.2 is now met), progressively
  enhanced by `src/js/work-filter.js`; rows carry a real sector label; the counter never prints
  "0 measured records".

**Images.** Web-sourced images are used at the site owner's direction, overriding `IMAGE_WORKFLOW.md`'s
rights-clearance rule for these four records only, and each is logged in its `images[]` entry with
source URL, credit and licence, `cleared: true` recording the owner's decision. Only images that show
the *exact named facility* are used: Guwahati (CC0) and Dehradun (CC BY-SA 4.0) airports, Lucknow
Terminal 3 (press image) and JW Marriott Mumbai Sahar (hotel photograph). The last two carry
"licence not verified" and are the residual copyright exposure. Credits print on `/work/`. Not used:
research images that show a different property (Google Ananta vs the Opal project, Hilton Chennai vs
Hilton Olympia Kuwait, an HDFC branch vs the HQ) or a campus entrance rather than the space worked on
(Reva, RNSIT, Sachidananda, HN Science Centre), because each would misrepresent the engagement.

**Consequences.** `/work/` lists 74 projects with sector filtering. Home Selected Work, Home
Verification numbers, Services evidence and the production build stay gated on Q-08/Q-09 — the
data cannot supply case-tier proof. The permission record for client names is this decision plus the
owner's statement; `PROJECT_DATA.md` §4 asks for a written record per project, to be kept on file.

---

## DEC-019 — Publish the web-research image set, labelled as representative

**Status:** Decided · 2026-09-19 · supersedes the "Images" paragraph of DEC-018

**Context.** DEC-018 published images for four records only. The site owner's standing instruction was
web images, one exterior and one interior per project, and directed that all of the researched set
(`assets/source/web-research/`) be published. That set was built as reference only: `IMAGE_WORKFLOW.md`
requires a cleared rights entry, and many of its buildings were best-guess matches for a client name
rather than a confirmed project site (Kalpataru Avana for "Kalpataru", Hilton Chennai for Hilton Olympia
Kuwait, Google Ananta for Opal).

**Decision.**

- 55 images across 33 records are published: every researched image except Cisco's interior, which is
  a promotional graphic of a woman and children with copy text and shows no site.
- Each image records `source`, `licence`, `credit`, `depicts` (the site actually shown) and
  `representative`. `cleared: true` records the owner's direction; it is not a rights finding.
- `representative: true` (35 images) means the photograph shows a related site, not a confirmed project
  site. Those rows print "Representative image · <site shown>" on the row itself, not only in the credits.
- Licences are recorded as found. Nine Commons images were checked against the Commons API and carry
  real open licences (CC BY-SA 2.0/3.0/4.0, CC0); with the two airport exteriors recorded earlier, 11 of
  the 55 are openly licensed. The other 44 are press, marketing, listing or video-thumbnail images whose
  licence is **not verified**; they carry the owner's direction only.
- `/work/` states that none of the photographs is Aware Acoustics project photography and credits each
  source. Alt text describes what the picture shows, including people, renders and thumbnails.
- `validate-data.js` fails a representative image that does not name what it depicts; the browser test
  fails any row photograph that does not decode and any representative row missing its label.

**Consequences.** The residual copyright exposure grows from two images to 44. Several images are
weak as portfolio material (a YouTube thumbnail with title text, a ceremony photo, a staff group photo,
a street shot for HDFC). Replacing each with client-supplied photography, via `IMAGE_WORKFLOW.md` §5,
remains the route to removing both the exposure and the "representative" labels. Two research folders
(`others/`) have no image because the facility could not be identified.

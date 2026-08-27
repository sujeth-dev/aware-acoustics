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

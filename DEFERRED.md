# DEFERRED — Pick-up-anytime register

Everything here was deliberately set aside, not forgotten or blocking. Each row says what was
done instead, why it's safe to leave, and exactly what un-blocks it. Pick any row up whenever —
nothing else in the plan depends on doing these in order.

Full reasoning for each lives in `DECISIONS.md`; this file is the scan-it-in-30-seconds index.

---

## Waiting on the client

| # | Item | Current state | Unblocks when | Decision |
|---|---|---|---|---|
| 1 | **Q-01 — legal entity** | Trading name "Aware Acoustics" used everywhere; city confirmed as Bengaluru. Legal name, entity type, CIN/GSTIN and registered street address still not in any source — footer legal line and `LocalBusiness` structured data (NAP) stay omitted | Client supplies legal name, entity type, CIN/GSTIN, registered address | DEC-014 (+ update) |
| 2 | **Q-06 — AV service** | `data/services.json` → `audiovisual` entry states the one verified fact (audio/acoustic simulation on 3 airport projects), stays `published: false`. Not in nav, not on Services page | Client provides written AV scope, deliverables, tools | DEC-014 |
| 3 | **Q-07 — equipment register** | Nothing in the deck to use. Instrumentation section on `/about/` stays fully omitted, no placeholder | Client provides make/model/IEC class/calibration per instrument | DEC-014 |
| 4 | **Vector logo** | Raster PNG (1261×724) in use now for header/footer/favicon | Client supplies SVG/AI/EPS — swap in, no other change needed | DEC-014 |
| 5 | **Q-08 / Q-09 — project proof** | All 10 seeded projects at `tier: record`, `year: null`, 0 targets/measured, 0 images, `published: false`. Homepage Selected Work / Verification use marked dev fixtures | Client supplies year, status, scope + target/measured pairs for ≥2 (4 recommended) projects | PROJECT_DATA.md, CONTENT_PLAN.md H-03/H-05 |
| 6 | **Q-04 — client naming permission** | Every project defaults to `clientPublic: false` / anonymised descriptor | Client gives written per-project permission to use the real name | DEC-010 |
| 7 | **Q-16… Q-21 — photography, portraits, samples** | Texture plates stand in for project photography (design-system choice, not a placeholder hack); portraits render as text-only rows; instrumentation/sample-deliverable images have no substitute | Client supplies cleared photography per `IMAGE_WORKFLOW.md` §5 | DEC-003 |
| 8 | **Firebase / Vercel ownership** | Phase 4 (admin) not started; not needed for any page to render | Client creates client-owned Firebase project + Vercel team, names admin users | MASTER_PLAN.md Phase 4, DEPLOYMENT_PLAN.md §2 |

## Deferred by our own plan, not the client

| # | Item | Current state | Unblocks when | Decision |
|---|---|---|---|---|
| 9 | **Logo/palette colour reconciliation** | Logo's red/gold run brighter than site tokens; left exactly as-is on purpose — logos commonly run slightly off a site's UI palette | Only if we/client actively decide the site accent should match the logo | DEC-002, DEC-014 |
| 10 | **Phase 2b — full design-system hardening** | Contrast/focus/keyboard/reduced-motion audit, 320–1440 screenshot regression suite, full component lab | Scheduled for Phase 10, once real pages exist to test against | DEC-013 |
| 11 | **Phase 3b — full CI pipeline** | ESLint, Vitest/Playwright/Lighthouse configs, CI workflow | Runs incrementally through Phases 5–9, hardens fully at Phase 9/13 | DEC-013 |
| 12 | **Phase 4 — admin/CMS** | Entire Firebase Auth/Firestore/Storage/publish-pipeline phase | Any time before Gate 04, parallel to page-building — not a prerequisite for any page | DEC-013 |

---

**Convention going forward:** when a new item gets deliberately set aside instead of resolved,
add a row here (client-blocked vs. self-deferred) alongside its `DECISIONS.md` entry. When an item
resolves, move the row's essential fact into the relevant plan doc / `data/*.json` and delete the
row — don't let this file accumulate closed items.

# MASTER PLAN — Phase 0–16

> **Depends on:** All planning documents, data seeds and decisions **DEC-001…DEC-010**
> **Feeds:** implementation, approvals, phase logging, CI/CD, handover
> **Status:** Draft 01 · Phase 0 in progress · **PENDING GATE 01**

---

## 1. Delivery contract

This plan builds 5 static public routes plus data-generated case records and a constrained content
admin (**DEC-011**). Public rendering uses vanilla HTML/CSS/JS with Vite (**DEC-001**). Firestore is the managed
source; validated JSON snapshots feed the static build (**DEC-004**).

| Quality target | Threshold |
|---|---:|
| Lighthouse performance | Desktop ≥90 · Mobile ≥85 |
| Accessibility | ≥95 |
| SEO | ≥95 |
| Best practices | ≥95 |
| Core Web Vitals | LCP ≤2.5s · CLS ≤0.1 · INP ≤200ms at p75 |
| Browser width QA | 320 · 375 · 430 · 768 · 1024 · 1280 · 1440+ |

No lorem ipsum, invented measurement, placeholder client logo or uncleared source image enters a
review build presented as finished. Development fixtures are visibly marked and excluded from
production.

---

## 2. Approval gates

| Gate | After phase | Approval scope | Blocking condition |
|---|---:|---|---|
| **Gate 01 · Content + IA** | 1 | Audit, IA, copy direction, data requests | **Q-01…Q-07** unresolved; client-risk decisions unacknowledged |
| **Gate 02 · Design system** | 2a (2b deferred) | Core tokens, type, logo, photography rule | **Q-16/Q-26**, **DEC-003** sign-off. Full contrast/focus/motion/screenshot-regression suite (2b) moves to Phase 10 and does **not** block Homepage |
| **Gate 03 · Technical foundation** | 4 (runs parallel to 5–9) | Stack, data pipeline, admin/auth/security, environments | Firebase/Vercel ownership and roles unresolved. Required before Gate 04's admin-workflow sign-off and before launch — **not** before page-building starts |
| **Gate 04 · Feature + content** | 9 | All public templates, real content, forms, admin workflow | Homepage/Work proof absent; **Q-08/Q-09** |
| **Gate 05 · Staging acceptance** | 14 | QA, accessibility, performance, SEO, UAT, launch runbook | Any P0/P1 defect or threshold failure |
| **Gate 06 · Production acceptance** | 15 | Domain, live smoke tests, monitoring, ownership | Gate 05 not signed; rollback unavailable |

**Production domain connection is prohibited before Gate 05 passes.**

### 2.1 Critical path to Homepage — DEC-013

Client feedback (2026-08-27): too much infrastructure sat between the approved content/IA and the
first visible page. Phases 2–4 as originally scoped bundled build-blocking setup together with
hardening and admin work that a static site does not need in order to render. Split:

| Phase | Blocking slice (must exist before Phase 5) | Deferred slice (moves later, does not block) |
|---|---|---|
| **Phase 2** | Core tokens/base/type CSS only — enough to style real markup | Full contrast/focus/keyboard/reduced-motion audit and the 320–1440 screenshot regression suite → **Phase 10** |
| **Phase 3** | Vite scaffold, page templates, shared layout, JSON loading with runtime guards — enough to run a dev server and build | Vitest/Playwright/Lighthouse CI workflow, ESLint config, bundle-budget enforcement → runs incrementally alongside Phases 5–9, hardens fully at **Phase 9/13** |
| **Phase 4** | Nothing — Homepage reads `data/*.json` directly, exactly as committed today. Firestore is the long-term admin source (**DEC-004**), not a prerequisite for a static build | Entire phase (Firebase Auth/Firestore/Storage, admin UI, publish pipeline) moves off the critical path, run any time before Gate 04 |

**Revised rule: Phase 5 (Homepage) starts as soon as Phase 2's tokens and Phase 3's scaffold exist.**
It does not wait on Gate 02's full sign-off, Gate 03, or any part of Phase 4. Phases 6–9 (Work,
Services, About, Contact) follow the same rule. The full design-system hardening pass, the CI/test
pipeline, and the admin/Firebase build proceed in parallel with or after page-building, converging
before **Gate 04**.

Nothing else about phase content changes — Phase 2, 3 and 4's task tables below still describe the
complete scope of each phase. This section only reorders *when* each slice is required.

---

## Phase 0 — Source audit and repository foundation

| Field | Plan |
|---|---|
| Goal | Establish evidence, risks, sources, repo structure and decision registry |
| Dependencies | Client deck · brand direction · process benchmark |
| Development tasks | Create repository skeleton; organise source assets; add plan/data/script/test boundaries |
| Content tasks | Audit all 36 slides and 88 images; extract facts; identify contradictions, rights and gaps |
| Data tasks | Define status tags and cross-reference IDs; extract deck text/media |
| Tests | Source counts; file inventory; no production code tests |
| Performance | N/A |
| Approval gate | Contributes to Gate 01; currently `IN PROGRESS` |
| Outputs | `00_SOURCE_AUDIT.md` · `WEBSITE_PLAN.md` · `_HANDOFF.md` · repository skeleton |
| Commit | `docs: audit sources and establish planning foundation` |
| Documentation | `PHASE_LOG.md` Phase 0; source locations in README |
| Client dependencies | Blocking **Q-01…Q-07**; high-priority **Q-08…Q-15** |

Completed: full audit, IA, asset organisation and skeleton. Remaining: client acknowledgement and
Gate 01 package delivery.

---

## Phase 1 — Content system and project data

| Field | Plan |
|---|---|
| Goal | Turn the audit and IA into approved page copy, schemas and safe seed data |
| Dependencies | Phase 0 |
| Development tasks | Implement `validate-data.js`; define fixtures and production failure rules |
| Content tasks | Page/section copy; banned-word pass; client confirmation pack |
| Data tasks | Seed projects, services, people, standards and settings; default anonymisation |
| Tests | JSON parse; schema/foreign key/slug/client/tier/result checks |
| Performance | Measure initial JSON payload; keep snapshot deterministic |
| Approval gate | **Gate 01 · Content + IA** |
| Outputs | `CONTENT_PLAN.md` · `PROJECT_DATA.md` · `data/*.json` · decisions and open-question pack |
| Commit | `docs: define content and structured project data` |
| Documentation | Update phase log, decision links and README next-phase command |
| Client dependencies | **Q-01…Q-15**, **Q-22…Q-30**; written permission records |

Gate 01 may approve direction while content remains gated, but Phase 5 and Phase 6 production content
cannot start without **Q-08/Q-09**. The brief prohibits lorem ipsum; this plan does not convert
missing proof into sample prose.

---

## Phase 2 — Production design system (split 2a/2b, **DEC-013**)

| Field | Plan |
|---|---|
| Goal | Translate Mineral / Material into accessible tokens, components and responsive proofs |
| Dependencies | Gate 01 direction approval · brand Part A |
| Development tasks | **2a (blocking Phase 5):** token/base/type CSS, texture plate base recipes. **2b (deferred to Phase 10):** full component lab, layout/motion/responsive component set |
| Content tasks | Test real long headings, technical units, missing-image states — runs against real pages once they exist, not a speculative lab |
| Data tasks | Bind project/result fixtures to component proofs |
| Tests | **2a:** none blocking. **2b, moved to Phase 10:** contrast, focus, keyboard, reduced motion, 320–1440 screenshots, overflow scan |
| Performance | Font subset/preload test; texture paint cost; no unnecessary image LCP |
| Approval gate | **Gate 02 · Design system** — scope narrowed to 2a; 2b verified at Phase 10/Gate 05 |
| Outputs | CSS architecture (tokens/base/type) now; public component lab · admin UI proof · visual baseline at Phase 10 |
| Commit | `feat: establish mineral production design system` |
| Documentation | Update `DESIGN_GUIDE.md`; record token deviations |
| Client dependencies | **Q-16**, **Q-17**, **Q-26**; **DEC-003** approval |

---

## Phase 3 — Build foundation and CI (split 3a/3b, **DEC-013**)

| Field | Plan |
|---|---|
| Goal | Create reproducible Vite build, lint/test/format commands and environment boundaries |
| Dependencies | Phase 2a tokens · **DEC-001** — no longer waits on the full Gate 02 |
| Development tasks | **3a (blocking Phase 5):** package/Vite init, page templates, router conventions, shared layout, JSON loading with runtime guards. **3b (deferred, runs incrementally through 5–9, hardens at Phase 9/13):** ESLint, Vitest/Playwright/Lighthouse configs, CI workflow, error handling polish |
| Content tasks | Wire global navigation/footer from structured settings |
| Data tasks | Load JSON with typed runtime guards; sanitised public export boundary |
| Tests | **3a:** build smoke only. **3b:** unit runner · formatter · ESLint · no-hardcoded-facts test |
| Performance | Establish Lighthouse baseline and bundle budgets — 3b, once pages exist to measure |
| Approval gate | Part of Gate 03 — 3b only; 3a is a prerequisite for Phase 5, not a gate |
| Outputs | `package.json` · base shell now; Vite/Vitest/Playwright/Lighthouse configs · CI workflow through Phase 9 |
| Commit | `build: add application foundation and quality pipeline` |
| Documentation | `.env.example` · local setup · CI command table |
| Client dependencies | Hosting/source-control organisation access |

---

## Phase 4 — Content pipeline and admin (off critical path, **DEC-013**)

| Field | Plan |
|---|---|
| Goal | Implement secure content editing and build-time publication path |
| Dependencies | Phase 3a scaffold · `PROJECT_DATA.md` · **DEC-004/005** — runs any time before Gate 04, in parallel with Phases 5–9, not before them |
| Development tasks | Firebase Auth/Firestore/Storage; admin routes/forms; publish endpoint; deploy hook; snapshot script |
| Content tasks | Configure validation help and evidence-gap labels |
| Data tasks | Collections, rules, indexes, migrations, seed import and sanitation |
| Tests | Emulator auth/rules; CRUD; upload; case gate; publish/unpublish; hook security; draft exclusion |
| Performance | Admin lazy chunks; public build proves zero runtime Firestore requests |
| Approval gate | **Gate 03 · Technical foundation** |
| Outputs | Admin shell · Firebase config/rules · fetch/import scripts · publish audit trail |
| Commit | `feat: add managed content and static publish pipeline` |
| Documentation | Admin architecture, environment ownership, backup/restore runbook |
| Client dependencies | Named users · Firebase/Vercel client ownership · publish role decision |

---

## Phase 5 — Homepage

| Field | Plan |
|---|---|
| Goal | Build six-section first screen-to-appointment narrative |
| Dependencies | Phase 2a tokens · Phase 3a scaffold · approved copy · ≥2 case records for production (**DEC-013** — no longer waits on Gate 03) |
| Development tasks | Hero, about, selected work, services, verification, appointment, footer |
| Content tasks | Final home copy; real project records and target/measured proof |
| Data tasks | Featured query max four; standards strip; settings binding |
| Tests | Section order · CTA count · featured thresholds · no private-client leakage · responsive screenshots |
| Performance | LCP/CLS baseline; texture paint and font loading; desktop ≥90/mobile ≥85 |
| Approval gate | Contributes to Gate 04 |
| Outputs | Home template and component tests |
| Commit | `feat: build evidence-led homepage` |
| Documentation | Phase log; copy deviations; visual baseline |
| Client dependencies | **BLOCKED FOR REAL CONTENT on Q-08/Q-09**; **Q-01/Q-02/Q-22** affect sections |

Development may use clearly marked local fixtures. Phase acceptance cannot use them.

---

## Phase 6 — Work index and project records

| Field | Plan |
|---|---|
| Goal | Publish the two-tier work system without thin or misattributed pages |
| Dependencies | Phase 5 patterns · project schema · cleared evidence |
| Development tasks | Index rows, threshold filters, case template, gallery, prev/next, empty/fail states |
| Content tasks | Edit conditions, approaches, outcomes and captions from client evidence |
| Data tasks | Promote qualifying records; pair targets/results; rights references; redirects |
| Tests | Tier routing · filters with JS off · anonymisation surfaces · asset existence · cross-links |
| Performance | Image profiles; gallery lazy load; work-list DOM/bundle budget |
| Approval gate | Contributes to Gate 04 |
| Outputs | `/work/` · generated `/work/[slug]/` · project fixtures/tests |
| Commit | `feat: publish structured work records` |
| Documentation | Project-entry workflow and permission register |
| Client dependencies | **BLOCKED FOR REAL CONTENT on Q-08/Q-09** plus **Q-03/Q-04/Q-18** |

---

## Phase 7 — Services

| Field | Plan |
|---|---|
| Goal | Build single Services page with four verified discipline sections (**DEC-011**) |
| Dependencies | Gate 03 · service/standard data · Phase 6 reverse links |
| Development tasks | Horizontal-band overview; detail template; parameter glossary; evidence fallback |
| Content tasks | Finalise four discipline copy sets; exclude unsupported shorthand |
| Data tasks | Service/standard relations and project reverse lookup |
| Tests | ≥2 sibling section links, About link, project evidence/fallback, unique metadata |
| Performance | Shared template/CSS; no duplicate route bundles |
| Approval gate | Contributes to Gate 04 |
| Outputs | `/services/` with four in-page discipline sections |
| Commit | `feat: add acoustic services page` |
| Documentation | Update service and glossary maintenance notes |
| Client dependencies | **Q-06** determines held AV route; **Q-23** excludes lighting by default |

---

## Phase 8 — About (practice and method)

| Field | Plan |
|---|---|
| Goal | Make process, standards, independence and people auditable |
| Dependencies | Standards/people data · design components |
| Development tasks | Process spine, standards table/accordion, compliance tables, people rows, geographic counts |
| Content tasks | Equipment section only with verified register; biographies without unsafe client attribution |
| Data tasks | Standards edition status; roles/portraits; published-city counts |
| Tests | Standards accuracy · no certification implication · mobile accordion · text-only portrait fallback |
| Performance | Keep register HTML compact; defer noncritical portraits |
| Approval gate | Contributes to Gate 04 |
| Outputs | `/about/` (practice + method merged, **DEC-011**) |
| Commit | `feat: add method standards and practice pages` |
| Documentation | Standards update and people-edit workflows |
| Client dependencies | **Q-07**, **Q-22**, **Q-24**, **Q-25**, **Q-27** |

---

## Phase 9 — Contact, privacy and utility routes

| Field | Plan |
|---|---|
| Goal | Deliver a secure, accessible appointment path and complete utility routes |
| Dependencies | **DEC-006/009** · verified legal/contact settings |
| Development tasks | Contact form/serverless function; honeypot/timing/rate limit; privacy and real 404 |
| Content tasks | Routing, response expectation, consent and counsel-approved privacy text |
| Data tasks | Settings/NAP; minimal submission payload and retention configuration |
| Tests | Validation · spam controls · injection · success/failure · keyboard · no sensitive logging |
| Performance | No CAPTCHA/third-party form JS; endpoint latency and failure fallback |
| Approval gate | **Gate 04 · Feature + content** |
| Outputs | `/contact/` · `/privacy/` · `/404/` · API function |
| Commit | `feat: add secure appointment and privacy routes` |
| Documentation | Form operations, abuse response and data-retention runbook |
| Client dependencies | **Q-01**, **Q-28**, **Q-29**, **Q-30**; practice inbox access |

---

## Phase 10 — Responsive and accessibility hardening

| Field | Plan |
|---|---|
| Goal | Verify recomposition and WCAG 2.2 AA behaviour across every template |
| Dependencies | All public templates |
| Development tasks | Fix reflow, overlay focus, table composition, target sizes, errors and reduced motion |
| Content tasks | Long-word/technical-value review; alt/caption review |
| Data tasks | Edge fixtures: longest titles, null assets, multiple results, anonymised records |
| Tests | Axe + manual keyboard/screen-reader/zoom/contrast at required widths and landscape |
| Performance | Confirm fixes do not add layout shift or blocking JS |
| Approval gate | Contributes to Gate 05 |
| Outputs | Accessibility report and regression suite |
| Commit | `fix: harden responsive and accessible interactions` |
| Documentation | Known limitations and manual QA evidence |
| Client dependencies | Review of technical pronunciation/labels and image descriptions |

---

## Phase 11 — SEO and discoverability

| Field | Plan |
|---|---|
| Goal | Implement canonical metadata, structured data and crawl controls |
| Dependencies | Final route/content/data set · **Q-05** |
| Development tasks | Metadata, JSON-LD, sitemap, robots, redirects, social texture renderer |
| Content tasks | Unique descriptions; anonymised project titles; no thin geography pages |
| Data tasks | Organisation/NAP graph, lastmod, case-only URLs |
| Tests | Structured-data validation · canonical/status/crawl checks · metadata uniqueness · leak scan |
| Performance | Social assets excluded from page payload; SEO Lighthouse ≥95 |
| Approval gate | Contributes to Gate 05 |
| Outputs | SEO files, graph generators, redirects and tests |
| Commit | `feat: add technical SEO and structured data` |
| Documentation | Search Console and monthly review checklist |
| Client dependencies | **Q-01**, **Q-05**, **Q-16** and project permissions |

---

## Phase 12 — Image production and visual regression

| Field | Plan |
|---|---|
| Goal | Produce cleared responsive assets and lock visual baselines |
| Dependencies | Gate 02 treatment · **Q-16…Q-21** assets |
| Development tasks | Sharp optimiser, SVG charts, asset verifier, social plate renderer |
| Content tasks | Rights, alt text, captions, redaction and technical review |
| Data tasks | Image records and project references |
| Tests | Missing/uncleared asset fail · EXIF scan · crop screenshots · SVG accessibility |
| Performance | AVIF/WebP budgets, preload audit, LCP and CLS |
| Approval gate | Contributes to Gate 05 |
| Outputs | `public/assets/` derivatives, rights register, image scripts |
| Commit | `assets: add cleared responsive evidence media` |
| Documentation | Update image register and replacement workflow |
| Client dependencies | Cleared originals and permission evidence **Q-16…Q-21** |

---

## Phase 13 — Full quality and security verification

| Field | Plan |
|---|---|
| Goal | Run the complete automated and manual release suite |
| Dependencies | Phases 3–12 complete |
| Development tasks | Fix defects only; freeze features; dependency/security review |
| Content tasks | Proofread, factual spot-check, banned-word and attribution audit |
| Data tasks | Production snapshot validation, backup restore rehearsal |
| Tests | Unit · integration · emulator · E2E · links · forms · visual · security headers · browsers |
| Performance | Lighthouse CI thresholds and Web Vitals lab runs on representative mobile |
| Approval gate | Readiness for staging UAT |
| Outputs | Test report, defect log, release candidate |
| Commit | `test: verify release candidate across quality gates` |
| Documentation | Release checklist and residual-risk log |
| Client dependencies | Timely factual sign-off on release-candidate content |

---

## Phase 14 — Staging and user acceptance

| Field | Plan |
|---|---|
| Goal | Validate the release candidate in production-like hosting without touching the live domain |
| Dependencies | Phase 13 clean · staging environments and content |
| Development tasks | Deploy staging; headers; env/secrets; smoke/rollback; admin publish rehearsal |
| Content tasks | Client reviews every route, client name, metric, image and contact route |
| Data tasks | Final migration rehearsal; staging backup; production import manifest |
| Tests | UAT scripts · device/browser · form delivery · deploy hook · rollback · external link scan |
| Performance | Staging Lighthouse and real-network checks meet thresholds |
| Approval gate | **Gate 05 · Staging acceptance** |
| Outputs | Signed UAT, launch candidate, rollback point, DNS change set |
| Commit | `chore: prepare gate-05 staging release` |
| Documentation | Completed launch runbook and owner/contact list |
| Client dependencies | Written Gate 05 approval; DNS access; production inbox; legal approval |

No production-domain connection occurs during this phase before Gate 05 is signed.

---

## Phase 15 — Production launch

| Field | Plan |
|---|---|
| Goal | Connect production safely, verify the live system and retain rollback |
| Dependencies | Signed Gate 05 · backups · DNS/hosting access |
| Development tasks | Production deploy; DNS switch; SSL; redirects; headers; monitoring; rollback if required |
| Content tasks | Final visible-content/contact check; no launch-day rewriting |
| Data tasks | Production Firestore import and snapshot; admin accounts; backup |
| Tests | Live smoke, forms, auth, publish, sitemap, robots, canonicals, 404, key devices |
| Performance | Live Lighthouse; Web Vitals collection begins |
| Approval gate | **Gate 06 · Production acceptance** |
| Outputs | Live site, verified admin, monitoring and rollback record |
| Commit | `release: launch aware acoustics website` |
| Documentation | Launch timestamp, DNS values, deployed commit, incidents, acceptance |
| Client dependencies | Availability during launch window and acceptance authority |

---

## Phase 16 — Handover and maintenance

| Field | Plan |
|---|---|
| Goal | Transfer ownership, knowledge and repeatable operations to the client |
| Dependencies | Gate 06 · stable production period |
| Development tasks | Close temporary access; confirm backups/alerts; archive migration tooling as appropriate |
| Content tasks | Admin training using real add/edit/unpublish tasks |
| Data tasks | Export baseline; retention schedule; owner list |
| Tests | Client completes project publish and rollback/escalation drill; restore evidence checked |
| Performance | 7-day and 30-day Web Vitals/search review scheduled |
| Approval gate | Handover acceptance |
| Outputs | `docs/ADMIN_GUIDE.md` · `docs/CONTENT_GUIDE.md` · `docs/OPERATIONS.md` · `docs/HANDOVER.md` |
| Commit | `docs: complete client handover and operations guides` |
| Documentation | Credential ownership map, renewal calendar, maintenance SLA and change process |
| Client dependencies | Named ongoing owner, billing acceptance and training attendance |

---

## 3. Global testing strategy

| Layer | Scope |
|---|---|
| Static | Format, lint, JSON/schema, banned terms, hardcoded facts, missing assets, link graph |
| Unit | Sanitation, pairing, routes, metadata, form validation, publish state |
| Integration | Firestore rules/auth/storage, snapshot, deploy hook, serverless form |
| E2E | Public journeys, filters, project links, form, admin CRUD/publish, draft exclusion |
| Visual | Required widths, light/dark surfaces, textures, long data, upload/form states |
| Manual | Keyboard, screen reader, 200% zoom, device testing, content/legal/rights review |
| Performance | Lighthouse CI per representative template; image/font/bundle budgets |
| Security | Dependency audit, secret scan, headers, abuse tests, rule denial, log review |

---

## 4. Commit and documentation discipline

One phase may contain multiple atomic commits, but the phase commit wording above names its closing
checkpoint. Every phase updates `PHASE_LOG.md`; user-facing changes update `CHANGELOG.md`; durable
technical choices update `DECISIONS.md`; operating changes update the relevant plan/runbook.

A phase is complete only when its tasks, tests, output files, documentation and approval condition
are complete. Passing code with missing client evidence is not phase completion.

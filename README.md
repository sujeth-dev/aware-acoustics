# Aware Acoustics

**Status:** Planning package complete · Phase 0/1 `IN PROGRESS` · awaiting **Gate 01 — Content + IA**.

This repository contains the planning and future implementation system for the Aware Acoustics
website. It is not yet a production website. The current safe deliverables are the source audit,
information architecture, content/data model, design translation and Phase 0–16 delivery plan.

## Quick start

```powershell
node scripts/validate-data.js
```

The command validates the planning seed data. A production-mode run deliberately fails until at
least two evidence-complete featured case records exist:

```powershell
$env:NODE_ENV = 'production'
node scripts/validate-data.js
Remove-Item Env:NODE_ENV
```

## Run the next phase

1. Read `plan/00_SOURCE_AUDIT.md` §10 and obtain written answers to **Q-01…Q-07**.
2. Review `plan/CONTENT_PLAN.md`, `plan/WEBSITE_PLAN.md` and `plan/PROJECT_DATA.md` with the client.
3. Record answers in the audit/data sources; resolve IA-01…IA-07 and relevant decisions.
4. Record Gate 01 approval in `PHASE_LOG.md`.
5. Begin Phase 2 from `plan/MASTER_PLAN.md`; do not start production Homepage or Work content while
   **Q-08/Q-09** remain unanswered.
6. One commit per phase, pushed to `origin/main` immediately after — mandatory from Phase 5
   (Homepage) onward. See `plan/MASTER_PLAN.md` §2.2.

## Sources of truth

```text
Client deck + brand direction
            ↓
00_SOURCE_AUDIT.md
       ├── WEBSITE_PLAN.md ── CONTENT_PLAN.md ── SEO_PLAN.md
       ├── PROJECT_DATA.md ── data/*.json ── validate-data.js
       └── DESIGN_GUIDE.md ── IMAGE_WORKFLOW.md
                     ↓
        ADMIN_PLAN.md + DEPLOYMENT_PLAN.md
                     ↓
               MASTER_PLAN.md
```

If a fact is not in the source audit or a recorded client answer, it does not enter public content.
Project facts, people, standards and contact details change in structured data, never templates.

## File reference

| File | Purpose |
|---|---|
| `plan/00_SOURCE_AUDIT.md` | Authority for facts, contradictions, rights and client questions |
| `plan/WEBSITE_PLAN.md` | IA, routes, page structure, links and responsive composition |
| `plan/CONTENT_PLAN.md` | Section copy, status and source/dependency mapping |
| `plan/PROJECT_DATA.md` | Canonical schemas, publication and anonymisation rules |
| `plan/DESIGN_GUIDE.md` | Production design system and accessibility rules |
| `plan/IMAGE_WORKFLOW.md` | Asset intake, rights, optimisation and delivery |
| `plan/ADMIN_PLAN.md` | Admin recommendation, content scope, security and publishing |
| `plan/SEO_PLAN.md` | Search intent, metadata, structured data and crawl controls |
| `plan/MASTER_PLAN.md` | Full Phase 0–16 execution and approval gates |
| `plan/CHANGE_GUIDE.md` | Change classes and worked maintenance procedures |
| `plan/DEPLOYMENT_PLAN.md` | Environments, CI/CD, launch, rollback and operations |
| `DECISIONS.md` | Durable DEC-001… records, reasoning included |
| `DEFERRED.md` | Everything deliberately set aside — client-blocked or self-deferred — scan-in-30-seconds index, pick up any row any time |
| `PHASE_LOG.md` | Execution state and approval history |
| `CHANGELOG.md` | User-visible changes by release |
| `data/*.json` | Safe planning seeds; not approved public content |

## Critical launch blocks

- `image7.png` and other uncleared deck assets remain `DO NOT PUBLISH`.
- No project has a year, target or measured result; Homepage and Work proof require **Q-08/Q-09**.
- Do not connect `awareacoustics.in` until **Q-05** and staging **Gate 05** are complete.

See `DEFERRED.md` for the full list of open items and exactly what unblocks each one.

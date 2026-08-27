# ADMIN PLAN — Content Operations

> **Depends on:** `PROJECT_DATA.md`, `DESIGN_GUIDE.md`, **DEC-004**, **DEC-005**
> **Feeds:** admin implementation, Firestore rules, deployment pipeline, admin tests
> **Status:** Draft 01 · Recommendation approved in principle; account and Firebase ownership pending

---

## 1. Recommendation

**ADMIN: YES.**

The practice has roughly 70 named projects, at least five described as work in progress, and a
proof model that will mature as **Q-08/Q-09** answers arrive. Requiring a developer deployment for
every project, publication change or contact update would make the site stale. Two non-technical
principals need a small, constrained content system.

The admin manages content only. It does not manage layout, colour, typography, navigation,
components or page composition. The brand system remains locked in code.

---

## 2. Managed content

| Collection | Operations | Frequency | Approval requirement |
|---|---|---:|---|
| Projects | Create · edit · duplicate · publish · unpublish · feature · archive | High | Evidence validation + publication authority |
| People | Edit biography, role, contact, portrait, order | Low | Principal approval |
| Services | Edit summary, parameters, standards, order | Low | Technical review |
| Standards | Add/edit designation, subject, category, edition status | Medium | Technical review; **Q-27** |
| Settings | Contact routes, address, legal identity, SEO defaults | Low | Business-owner approval |
| Images | Upload · replace · reorder · remove; rights metadata | Medium | Rights clearance |

Not built: WYSIWYG page builder · free-form HTML · design-token controls · client-logo wall manager ·
blog/news CMS · analytics dashboard · CRM · proposal/fee workflow · public user accounts.

---

## 3. Architecture

```text
Admin browser
  ├─ Firebase Auth — email/password, two named accounts
  ├─ Firestore — canonical managed content
  ├─ Firebase Storage — originals/controlled uploads
  └─ Publish action → protected server endpoint → Vercel Deploy Hook
                                              ↓
Build service → fetch-content.js → sanitised data/*.json → validate-data.js → static public site
```

The public site performs zero runtime Firestore reads per **DEC-004**. The admin SDK/service account
exists only in the build/server environment. Browser code never receives service credentials or the
Vercel hook URL.

---

## 4. Routes and access

| Route | Purpose |
|---|---|
| `/admin/login` | Authentication and password-reset route |
| `/admin/dashboard` | Drafts, evidence gaps, recent publishes, build status |
| `/admin/projects` | Searchable/filterable project list |
| `/admin/projects/new` | Create record |
| `/admin/projects/[id]/edit` | Edit, validate, preview, publish |
| `/admin/team` | People records |
| `/admin/services` | Service records |
| `/admin/settings` | Standards and site settings, separated by tabs |

All `/admin/*` routes are `noindex`, absent from sitemap and protected by route guards plus backend
rules. Unauthenticated requests redirect to login and return to the intended route after success.

---

## 5. Roles and security

| Role | Capability |
|---|---|
| `owner` | All content, users, publish, destructive archive/delete, settings |
| `editor` | Create/edit content, upload, preview; publish only if client chooses shared authority |

Launch default: two individually named accounts; no shared login. Require email verification,
strong passwords and MFA where Firebase plan/capability permits. Session expiration and revocation
follow Firebase defaults; account removal immediately revokes access.

Firestore rules deny by default, allow reads/writes only to authenticated active users with an
authorised role, and validate key field types where practical. Storage rules restrict MIME, size,
user role and project-scoped paths. Server-side validation remains authoritative.

---

## 6. Project editor

The form follows `PROJECT_DATA.md` order and groups information by editorial decision:

| Tab | Fields / behaviour |
|---|---|
| Identity | Internal title · public/anonymised title · client · permission toggle · sector · location |
| Facts | Year · status · area/capacity · appointing party · scope · services |
| Evidence | Standards · tools · paired target/measured rows |
| Narrative | Summary · condition · approach · outcome with character guidance |
| Images | File picker · rights fields · alt · caption · order · replace/remove |
| Publishing | Tier · featured · published · order · validation summary · preview |

Target/measured entry is a paired row, not two unrelated repeaters. Selecting parameter and space
creates both values with one unit; a user cannot publish a measured result without its target.

`tier: case` is disabled until the case minimum is met. `featured` is disabled until case +
published. The UI explains the missing fields by name; it never silently changes user choices.

---

## 7. Image upload

File picker only; pasted URLs and raw SVG uploads are rejected. Validate MIME and extension,
20 MB source maximum, minimum dimensions, safe filename and image decode. Require source, licence,
cleared status, alt text and category. Replace preserves the stable image ID; remove warns when the
asset is referenced. Reorder uses accessible move-up/move-down commands as well as optional drag.

Optimisation runs in a trusted server/build task according to `IMAGE_WORKFLOW.md`; the browser does
not become the only source of derivatives.

---

## 8. Publishing workflow

```text
Draft → Validate → Preview → Publish requested → Firestore transaction
      → publishEvents audit row → protected deploy-hook call → Build queued
      → Snapshot + validation → Staging/production deploy → Status returned
```

| State | Meaning |
|---|---|
| Draft | Editable, never included in public snapshot |
| Ready | Validation passes; still private |
| Published | Marked for next/current public build |
| Build failed | Firestore state retained; previous deployment remains live |
| Archived | Hidden from normal lists; retained for audit/restore |

Publication is not complete when Firestore writes; it is complete when the deployment passes smoke
tests. Dashboard shows queued/building/succeeded/failed with deployment link and timestamp.

Unpublish triggers the same deploy path. A rights or attribution emergency prioritises unpublish,
then rebuild, then content correction.

---

## 9. Preview and conflicts

Preview renders the actual public component set against a draft payload on an authenticated route.
It does not write `published: true`. The editor stores `updatedAt` and version; a save against a
newer version is rejected with a compare/reload message to prevent last-write loss.

Autosave is not built in v1. Explicit Save Draft is predictable for two editors and avoids making
partially entered rights or measurement data look durable.

---

## 10. Audit, recovery and deletion

Every create, update, publish, unpublish, archive and delete records actor, time, record ID, action
and changed field names. Sensitive values and credentials are not copied into logs. Firestore
scheduled exports/backups are enabled before production content entry.

Project “delete” is archive by default. Permanent deletion is owner-only, requires the project title
to be re-entered, checks inbound references and is unavailable for a currently published record.
Images use the same reference check. Restore from archive remains possible.

---

## 11. Admin visual system

Use the created admin layer in `DESIGN_GUIDE.md`: Public Sans, restrained dust/white/stone surfaces,
mono identifiers, compact tables and 8px maximum control radius. Filled buttons are permitted here
for clear commands. Familiar actions use Lucide icons with accessible names and tooltips. Status is
always text plus colour. Destructive controls are visually separated.

Required states: loading · empty · validation error · permission denied · offline/save failure ·
deploy queued · deploy failed · session expired. No public-site texture plate appears behind a form.

---

## 12. Validation and tests

| Test | Expected result |
|---|---|
| Login success / failure / reset | Correct state and no account enumeration |
| Unauthenticated route | Redirect to login; return route preserved |
| Unauthorised write | Firestore and server both reject |
| Create / edit / duplicate | Schema-valid record; duplicate gets unique draft slug |
| Concurrent edit | Stale save rejected |
| Image upload / replace / remove / reorder | Rights and reference rules enforced |
| Case promotion | Blocked without measured pair and cleared image |
| Publish / unpublish | Audit event + deploy hook; public snapshot changes after success |
| Featured toggle | Only published case; max four |
| Delete | Confirmation, reference check, published block |
| Team/service/settings CRUD | Role rules and validation enforced |
| Draft visibility | Public site never includes drafts |
| Firestore rules | Anonymous read/write and unauthorised write blocked |
| Hook protection | URL absent from client bundle/logs; request authenticated server-side |

Use Firebase Emulator Suite in CI for auth/rules/integration tests. Playwright covers the editor
workflow and keyboard interaction. Unit tests cover schemas, sanitation and publish-state logic.

---

## 13. Environment and ownership

Required configuration: Firebase web config (public identifiers) · service-account credentials in
build environment · Firebase project IDs for dev/staging/production · Vercel deploy-hook URL in
server secret store · authorised admin emails/UIDs. Use separate Firebase projects or strict
environment separation; production data is never a developer fixture.

Client must own the Firebase and Vercel organisations, billing, recovery email and named accounts.
Developer personal accounts are invited, not owners of record.

---

## 14. Approval gate

Before implementation, approve: two named users and role split · client ownership of Firebase ·
publish authority · archive/retention policy · rights-record responsibility · deploy-hook workflow.

Before launch, demonstrate a complete create → preview → publish → build → public update cycle, an
unpublish cycle, a blocked invalid case record and an unauthenticated write rejection.

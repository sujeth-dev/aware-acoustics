# CHANGE GUIDE — Scope and Maintenance

> **Depends on:** `MASTER_PLAN.md`, `PROJECT_DATA.md`, `DESIGN_GUIDE.md`, `DEPLOYMENT_PLAN.md`
> **Feeds:** maintenance requests, estimates, approvals, release notes
> **Status:** Draft 01

---

## 1. Change classes

| Class | Definition | Approval |
|---|---|---|
| Minor | Content/data correction within an existing field or component | Content owner |
| Moderate | New record, asset, route content or component state within current architecture | Content + technical owner |
| Major | New page type, discipline, integration or design-system extension | Gate review; client sponsor |
| Breaking | Schema/CMS/hosting/domain/auth change or removal of public contract | Migration and rollback approval |

Urgency does not change classification. A revoked image licence is operationally urgent but follows
the same rights, deploy and verification controls.

---

## 2. Required change record

Every request names: objective · source of truth · affected files/collections · evidence/permission ·
test scope · documentation · approver · deployment target · rollback. Commit form:

```text
<type>(<scope>): <imperative outcome>
```

Types: `fix`, `feat`, `content`, `data`, `assets`, `design`, `build`, `test`, `docs`, `security`.

---

## 3. Common changes

| Change | Class | Source of truth | Files/data | Tests | Docs / approval | Commit |
|---|---|---|---|---|---|---|
| Phone/email | Minor | `settings/site` | Snapshot, footer/contact/schema | Data validation · page smoke · link action | Contact owner · changelog | `content(contact): update enquiry routes` |
| Add project record | Moderate | `projects/{slug}` | Project data; optional assets | Schema · link · anonymisation · visual | Permission/evidence · phase log | `content(work): add [project] record` |
| Promote project to case | Moderate | Project + evidence | Narrative, result pairs, rights-cleared image | Full V-04/V-13 · SEO · screenshots | Technical/content approval | `content(work): publish [project] case record` |
| Replace project image | Moderate | Image/rights record | Source and delivery derivatives | Rights · asset existence · crop · CLS | Rights owner · image register | `assets(work): replace [project] [category] image` |
| Add standard | Moderate | `standards/{id}` | Standard + service/project foreign keys | Schema · method/expertise rendering | Technical reviewer | `data(standards): add [designation]` |
| Change design token | Major | `tokens.css` + guide | Shared CSS and visual baselines | Contrast · all templates · responsive visual | Gate 02-equivalent review · decision if semantic | `design(tokens): revise [role]` |
| Add expertise page | Major | Audit/client evidence + service data | IA, content, service, route, SEO, sitemap, tests | Links · metadata · accessibility · visual | Sponsor + technical/content approval | `feat(expertise): add [discipline]` |
| Migrate CMS | Breaking | Migration plan | Admin, schemas, auth, pipeline, secrets, runbooks | Parallel export/import · parity · security · rollback | Client owner + architecture decision | `build(content): migrate from Firebase to [system]` |

---

## 4. Worked procedures

### 4.1 Change a phone number

Verify who owns the number and its routing. Edit `settings/site` in admin, preview Contact/footer,
publish, wait for successful static build, test `tel:` link on mobile and JSON-LD. Do not edit page
templates. Update changelog only if externally meaningful.

### 4.2 Add a project

Create a draft record with safe anonymisation. Record written client-name permission separately.
Choose `record` unless year, narratives, target/measured pair and cleared image meet case minimums.
Validate, preview all metadata/alt text, publish and check reverse links. A named deck entry is not
automatic publication permission.

### 4.3 Replace a project image

Preserve the stable image ID, retain the new original, update rights evidence, generate AVIF/WebP,
inspect desktop/mobile crops and switch the structured reference. Deploy before deleting old public
derivatives. For rights revocation, unpublish/remove first.

### 4.4 Add a standard

Confirm exact designation, edition, subject and whether the firm works to it. Add the standard
record, then its service/project foreign keys. Validate Method and relevant Expertise pages. Never
word the relationship as accreditation unless separately evidenced.

### 4.5 Change a design token

Change the semantic/raw token in `tokens.css`, not individual selectors. Measure affected contrast,
capture every surface/template at representative widths and update `DESIGN_GUIDE.md`. A palette or
type-family change is a major brand decision, not a quick CSS correction.

### 4.6 Add an expertise page

Require a sourced capability definition, deliverables, parameters/standards and at least one proof
route. Update IA, copy, service data, nav disclosure, sitemap, metadata, structured data and sibling
links. Without that evidence, reserve the route and do not build it; this is the current AV fallback.

### 4.7 Migrate the CMS

Write the next sequential decision record with context, options and consequences. Freeze schema, export/checksum Firestore,
build an idempotent transformer, import to a non-production target, compare record counts and public
HTML, rehearse rollback, then cut over the build pipeline. Preserve slugs, published states, rights
records and audit history. Do not combine CMS migration with a visual redesign.

---

## 5. Impact map

| Source changes | Downstream checks |
|---|---|
| Project | Work index/detail · Home featured · Expertise evidence · Practice counts · sitemap/JSON-LD |
| Service | Expertise routes · project foreign keys · Contact project types · internal links |
| Person | Practice · Contact routing · Person JSON-LD |
| Standard | Method · Expertise tags · project results · metadata |
| Settings | Nav/footer · Contact · Organization/LocalBusiness · canonical host |
| Image | Work/Home/Practice · social metadata · rights and asset verifier |
| Token/component | Every route plus admin where shared |

---

## 6. Release and rollback

Minor/moderate content changes deploy through the admin publish hook to staging/production policy.
Major/breaking changes use a reviewed branch, staging UAT and explicit release window. Every deploy
keeps the previous Vercel deployment address. Data-changing releases take a backup/export first and
document backward compatibility. Rollback code and content together when their schemas differ.

---

## 7. Documentation rule

`CHANGELOG.md` records user-visible change. `PHASE_LOG.md` records execution. `DECISIONS.md` records
durable choices. Plan files change when the operating contract changes. Avoid duplicating the same
narrative across all four; link by ID and commit.

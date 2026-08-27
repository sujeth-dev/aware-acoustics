# DEPLOYMENT PLAN — Staging, Production and Operations

> **Depends on:** `MASTER_PLAN.md`, `ADMIN_PLAN.md`, `SEO_PLAN.md`, **DEC-004**, **DEC-009**
> **Feeds:** CI/CD configuration, Gate 05/06 runbooks, handover
> **Status:** Draft 01 · Production domain blocked on **Q-05** and Gate 05

---

## 1. Environments

| Environment | Host/data | Purpose | Domain |
|---|---|---|---|
| Local | Vite + Firebase emulators + fixtures | Development and automated tests | `localhost` |
| Preview | Vercel branch deployment + non-production Firebase | Per-change review | Generated URL, protected where possible |
| Staging | Stable Vercel project + staging Firebase | UAT, publish rehearsal, performance | Client-approved staging hostname |
| Production | Production Vercel + production Firebase | Public site/admin | `awareacoustics.in` only after **Q-05** |

Environment data, credentials, Storage and deploy hooks never cross. Production exports are not
copied to local devices unless an approved, minimised support case requires it.

---

## 2. Hosting and ownership

Vercel hosts static public output, admin bundles and the contact/publish serverless functions.
Firebase provides Auth, Firestore and Storage. The client owns both organisations, billing,
recovery addresses and DNS. Named developers receive least-privilege access and are removed at
handover.

`awareacoustics.in` is inferred from source email only. **Q-05** must confirm ownership, registrar,
DNS provider, current records and authorised change contact.

---

## 3. Environment variables and secrets

| Variable class | Scope | Secret? |
|---|---|:---:|
| `VITE_FIREBASE_*` public web config | Admin client by environment | No, but environment-specific |
| `FIREBASE_PROJECT_ID` | Build/server | No |
| `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Build/server | Yes |
| `VERCEL_DEPLOY_HOOK_URL` | Publish server only | Yes |
| `CONTACT_TO_EMAIL`, provider/API credentials | Contact function only | Yes |
| `PUBLIC_SITE_URL` | Build | No |
| Analytics/Search verification tokens | Production build | Treat as controlled config |

Secrets live in Vercel/Firebase secret stores, never `.env.example`, source, client bundle, logs or
screenshots. Rotate on suspected exposure, staff departure and handover. Preview builds do not gain
production service credentials.

---

## 4. CI/CD

```text
Pull request
  → install locked dependencies
  → format/lint
  → unit + schema + security-rule tests
  → build sanitised preview snapshot
  → E2E + accessibility + link + visual tests
  → Lighthouse CI
  → Vercel preview

Protected main merge
  → repeat required checks
  → staging deploy
  → smoke tests
  → manual production promotion after applicable gate
```

Admin publish calls a protected server endpoint that triggers the configured deployment target.
The build runs `fetch-content.js`, sanitation, `validate-data.js`, asset verification, static render
and smoke checks. Validation failure leaves the previous deployment live and reports failure to the
admin dashboard.

Production deployment requires protected-branch checks and authorised approver. No direct upload of
hand-edited build output.

---

## 5. Staging acceptance — Gate 05

| Area | Acceptance |
|---|---|
| Content | Every public fact, client name, result and image approved |
| Function | Navigation, filters, contact, admin CRUD/publish/unpublish work |
| Security | Auth/rules deny anonymous writes; secrets absent; headers pass |
| Accessibility | Automated + manual WCAG 2.2 AA review complete |
| Performance | Lighthouse thresholds met on representative pages |
| SEO | Canonical test host controlled, metadata/JSON-LD/sitemap/robots validated |
| Operations | Backup, deploy, smoke and rollback rehearsed |
| Ownership | Client accounts, billing, recovery and named approvers confirmed |

**Hard rule:** do not add, switch or proxy the production domain until written Gate 05 acceptance.

---

## 6. DNS and SSL

Before launch, export current DNS records and reduce TTL only within registrar/provider policy and
the launch window. Determine apex/`www` canonical host, preserve MX/SPF/DKIM/DMARC records, add only
the required Vercel records and verify certificate issuance before redirect enforcement.

Do not replace an entire DNS zone to connect the website. Email continuity is a launch-critical
check because contact addresses use the same domain. Restore TTL after stability.

Vercel-managed SSL is preferred. Enforce HTTPS and HSTS only after successful HTTPS verification;
choose a conservative HSTS rollout before considering preload.

---

## 7. Redirects and headers

| Rule | Behaviour |
|---|---|
| HTTP / alternate host | Single 301 to canonical HTTPS host |
| Missing trailing slash | Single 301 to canonical trailing-slash route |
| Renamed project slug | Explicit 301 to exact successor |
| Removed content without equivalent | 410 where intentional or true 404; no home redirect |
| Admin/preview | `noindex`; auth/protection |

Headers: Content-Security-Policy tuned to self-hosted assets and required Firebase/form endpoints ·
`Referrer-Policy: strict-origin-when-cross-origin` · `X-Content-Type-Options: nosniff` · frame
protection through CSP `frame-ancestors` · restrictive Permissions Policy. Admin and public CSP may
differ; neither uses unsafe wildcard origins without a recorded reason.

---

## 8. Contact delivery — DEC-009

Use a Vercel serverless function with server-side schema validation, honeypot, minimum submission
time, rate limiting and safe text encoding. Deliver to the confirmed practice inbox; retain only
operational logs without message body or unnecessary personal data. Return generic errors to avoid
address/config disclosure. No CAPTCHA or third-party page script per **DEC-006**.

Provider and retention remain configuration decisions under **Q-28…Q-30**. Test real delivery,
spam folder behaviour, reply-to safety and failure fallback before Gate 05.

---

## 9. Production launch sequence

1. Freeze release candidate; record commit, deployment and production data checksum.
2. Confirm Gate 05 signature, rollback owner, backups, DNS export and launch contacts.
3. Deploy production application without changing the public domain; run host smoke tests.
4. Import/verify production content and admin accounts; keep public publication controlled.
5. Apply explicit DNS records; preserve mail records; verify SSL and canonical redirects.
6. Run live smoke suite: home, all fixed routes, case route, 404, contact delivery, admin auth,
   publish/unpublish, sitemap, robots, JSON-LD and key devices.
7. Check logs, Web Vitals, certificate and email continuity; obtain Gate 06 acceptance.

No launch-day feature or copy expansion. Defects are fixed or the release is rolled back.

---

## 10. Rollback

Vercel retains the previous known-good deployment for immediate promotion. DNS rollback uses the
record export and exact prior values. Application rollback must account for Firestore/schema
compatibility; take an export before migrations and use forward-compatible migrations where possible.

Rollback triggers: contact loss · widespread 5xx/blank output · auth/rule exposure · private-client
leakage · broken canonical host/SSL · material regression with no rapid isolated fix. Record who
called rollback, time, symptom, deployment and follow-up. A failed new build does not replace the
current deployment.

---

## 11. Smoke tests

| Surface | Test |
|---|---|
| Public | 200s, nav, one body Contact link, images/assets, no console errors |
| Work | Published-only, anonymisation, case route, filters, prev/next |
| Form | Validation, abuse controls, delivery, fallback, privacy link |
| Admin | Login, draft edit, validation, publish status, unauthorised rejection |
| SEO | Canonicals, metadata, JSON-LD, sitemap, robots, 404 status |
| Performance | Home, Work, case, Expertise, Contact thresholds |
| Security | HTTPS, headers, CSP report/error, secret/client-bundle scan |

Automate the stable subset; retain a short manual checklist for delivery, DNS and client-visible
content.

---

## 12. Search, analytics and post-launch

After canonical stability, verify Google Search Console, submit sitemap, inspect live URLs and
monitor coverage. Enable the approved privacy-respecting analytics configuration under **Q-30**;
never send form contents or personal values.

| Window | Checks |
|---|---|
| First hour | Errors, SSL, DNS, contact delivery, auth, core routes |
| 24 hours | Crawl access, sitemap, Web Vitals, form/spam behaviour, email continuity |
| 7 days | Search coverage, performance, 404s, admin use, backups |
| 30 days | Query/landing patterns, enquiries, content gaps, dependency/security updates |

---

## 13. Backup and recovery

Enable scheduled Firestore exports and Storage backup/version policy appropriate to the client plan.
Keep source repository and Vercel history. Quarterly, restore into a non-production environment and
verify counts, representative assets, users/roles procedure and a full static build. A backup that
has not been restored is not accepted as a recovery plan.

---

## 14. Handover

Transfer organisation ownership, domain/DNS, billing, recovery methods, production secrets,
monitoring recipients and renewal dates. Do not include secret values in handover documents; record
where they live and who can rotate them. Remove temporary developer access after acceptance.

Required runbooks: deploy/publish · rollback · form failure · rights takedown · backup/restore ·
domain/SSL renewal · user access · incident escalation.

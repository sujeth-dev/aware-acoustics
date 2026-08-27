# SEO PLAN — Search, Metadata and Structured Data

> **Depends on:** `00_SOURCE_AUDIT.md`, `WEBSITE_PLAN.md`, `CONTENT_PLAN.md`, `PROJECT_DATA.md`, **DEC-003**
> **Feeds:** templates, metadata data, structured data, sitemap, launch checks
> **Status:** Draft 01 · Keyword direction ready; legal identity, domain and project proof gated

---

## 1. Principle

Search visibility is built from real disciplines, standards, locations and project records. It is
not built from city-page multiplication or generic “best consultant” copy. Source-derived language
and SEO recommendations remain separate so search intent never becomes an invented capability.

---

## 2. Source-derived terminology

| Cluster | Terms supported by source | Evidence |
|---|---|---|
| Category | independent acoustic consultancy · built environment · architectural acoustics · industrial acoustics · environmental noise | Slides 1, 2, 8 |
| Design | acoustic design guidelines · DBR · detailed acoustic drawings · floor STC marking · sound insulation layouts · MEP noise and vibration control | Slide 20 |
| Review/site | tender drawings · BOQ · material submissions · mock-up review · value engineering · compliance reporting | Slide 20 |
| Simulation | EASE · ODEON · 3D acoustic modelling · RT · STI · ALCONS · SPL · frequency response | Slides 3, 15, 18 |
| Measurement | RT60 · speech intelligibility · speech privacy · ambient noise · NC curve · airborne sound insulation | Slides 9–17 |
| Standards | BS 8233 · IS 2526 · ASHRAE · DIN 18041 · EN 12354 · ISO 16283-1 · ISO 3382 · ISO 717-1 · ISO 354 · ASTM C423 · LEED · WELL | Slides 5, 14, 19 |
| Sectors | Corporate · education · healthcare · airports · metros · hospitality · auditoria · residential · industrial · religious | Slides 27–34 |

Lighting, NR, VDV and Rw are excluded under **C-06**. AV query targeting is held under **Q-06**.

---

## 3. Recommended query groups

These are research hypotheses to validate in Search Console and a keyword tool after launch; they
are not source claims.

| Intent | Query patterns | Destination |
|---|---|---|
| Branded | Aware Acoustics · Aware acoustic consultants | Home / About |
| Category | acoustic consultant Bengaluru/Bangalore · independent acoustics consultant India | Home / About |
| Service | auditorium acoustic consultant · room acoustics design · HVAC noise consultant · acoustic simulation consultant · sound insulation testing | Services page |
| Standard | ISO 16283 field measurement India · ISO 3382 reverberation measurement · BS 8233 consultant · IS 2526 auditorium acoustics | About / relevant Services section |
| Sector | airport acoustics consultant · hospital auditorium acoustics · corporate office acoustic design | Work filtered views / real project records |
| Geographic | acoustics consultant Bengaluru · project-specific city + service | Home and real records only |
| Project | `[cleared facility] acoustics` · `[typology] [city] acoustic design` | Case record |

No “near me”, superlative, price, product-supply or installer targeting. The practice is consultancy,
not supply/installation, subject to **Q-22** confirmation.

---

## 4. Page metadata

Titles target 45–60 characters where natural; descriptions 140–160 characters, but clarity wins
over exact count. All values are unique and generated from structured data when factual.

| Route | Title pattern | Description direction |
|---|---|---|
| `/` | `Acoustic Consultants Bengaluru | Aware Acoustics` | Independent consultancy; design, simulation, documentation, measurement |
| `/work/` | `Acoustic Consultancy Work | Aware Acoustics` | Published sectors and project evidence; no client count until safe |
| `/work/[slug]/` | `[Public project title] Acoustic Record | Aware Acoustics` | Typology, city, actual scope and measured parameter only |
| `/services/` | `Acoustic Consultancy Services | Aware Acoustics` | Four verified disciplines, one page (**DEC-011**) |
| `/services/#architectural-acoustics` | In-page H2, not a separate `<title>` | RT60, STI, NRC, auditoria and room performance |
| `/services/#sound-insulation-and-noise-control` | In-page H2, not a separate `<title>` | STC, NC, MEP noise, partitions and field testing |
| `/services/#simulation-and-modelling` | In-page H2, not a separate `<title>` | EASE/ODEON, geometry, RT, STI and SPL |
| `/services/#measurement-and-verification` | In-page H2, not a separate `<title>` | ISO-aligned field measurement and compliance reporting |
| `/about/` | `Independent Acoustic Consultancy | Aware Acoustics` | Team, approach, process, standards and operating geography (practice + method merged, **DEC-011**) |
| `/contact/` | `Contact Aware Acoustics | Bengaluru` | Project-stage enquiry and verified direct routes |
| `/privacy/` | `Privacy | Aware Acoustics` | Data-handling statement |

Until **Q-01** confirms Bengaluru as the practice address, location in title/description is a draft
recommendation and must not become LocalBusiness NAP.

---

## 5. Canonical, crawl and index rules

| Rule | Requirement |
|---|---|
| Canonical origin | HTTPS production domain, blocked on **Q-05** |
| URL style | Lowercase, kebab-case, trailing slash |
| Redirects | HTTP→HTTPS, `www` decision→canonical host, non-trailing→trailing, retired slugs→nearest exact replacement |
| Parameters | Work filters canonicalise to `/work/`; do not index filter combinations |
| Draft/admin | `noindex, nofollow`; auth remains primary protection |
| Record tier | Listed on `/work/`; no detail URL, therefore no thin indexable page |
| Case tier | Index only when published and schema-valid |
| 404 | Real 404 status; noindex; never soft-404 redirect |

`robots.txt` permits public assets/pages, disallows `/admin/` and preview routes, and names the XML
sitemap. Robots rules do not protect secrets.

---

## 6. Sitemap and internal links

Generate `sitemap.xml` at build time from fixed public routes plus published case records. Use
`lastmod` only from meaningful content updates, not every build. Exclude admin, preview, filters,
drafts, record-only project names and 404.

Enforce the `WEBSITE_PLAN.md` §7 map: every Services section links to at least one real project
when available and to About; every case links to relevant Services section(s) and About; every
page has one body Contact route. No public page is more than two clicks from home.

---

## 7. Structured data

JSON-LD is server-rendered and generated from sanitised data. It must match visible content.

| Type | Route | Required fields / caveat |
|---|---|---|
| `Organization` | All via global graph | name, URL, logo after **Q-16**, legal name/address after **Q-01** |
| `LocalBusiness` / appropriate professional service subtype | Home/Contact | Publish only after verified physical address and phone routing; no invented hours |
| `Service` | Services page, per discipline section | name, description, provider, areaServed grounded in real work |
| `Person` | About | name, role after **Q-24**, affiliation; no prior-employer clients |
| `BreadcrumbList` | All non-home routes | Visible hierarchy only |
| `CreativeWork` | Published case records | public title, description, location, date only when known, images only when cleared |

There is no broadly recognised Schema.org `Project` type suitable for this use; use `CreativeWork`
with conservative properties rather than inventing a custom type. Do not add aggregate ratings,
awards, reviews, certifications or FAQ schema without corresponding approved content.

---

## 8. Project-page SEO

A case record earns an indexable route only with year, scope, condition, approach, target/measured
evidence and a cleared image. Its title and h1 use public/anonymised naming consistently. Copy must
state what was actually delivered, not general sector capability. Standards and tools are emitted
only when tied to that project.

For anonymised work, target typology + city intent, e.g. “Corporate workplace acoustic design,
Bengaluru”; never leak the private client in URL, metadata, JSON-LD, alt text, asset filename or
source map. **DEC-010** sanitation tests cover all six surfaces.

---

## 9. Services-page SEO

Each discipline section owns one distinct intent cluster and avoids repeating the same capability
paragraph. Parameter glossary entries support the discipline but do not become separate thin URLs
or duplicate `<title>` tags — the page has a single title; disciplines are H2-level anchors, not
routes. Standards link to About; project evidence links back by `services[]`. Add a discipline only
when it has sourced scope, deliverables and proof; this keeps AV held under IA-01/**Q-06**.

---

## 10. Geography

Bengaluru is the recommended primary market pending **Q-01**. Real delivered-work locations include
Mumbai, Hyderabad, Pune, Kolkata, Vadodara, Guwahati, Lucknow, Dehradun, other Indian locations and
Kuwait. Geography is expressed through the About-page practice summary and published project records.

Do not create city landing pages in v1. Reconsider only when a city has at least three publishable
case records, distinct local content and a real business reason. A list of city names without local
evidence is doorway-page behaviour and weakens trust.

---

## 11. Open Graph and social images

Default social media uses a generated 1200×630 texture plate with wordmark, page title and restrained
field caption. It is a committed bitmap derivative, not a runtime screenshot. This avoids unclear
photography rights per **DEC-003**. A case record may use a cleared project image with a protected
crop; otherwise it inherits the texture plate.

Required tags: `og:type`, title, description, canonical URL, image, image dimensions, site name,
locale; matching Twitter card tags. Logo JPEG is not used as the social image.

---

## 12. Technical SEO and performance

| Check | Target |
|---|---|
| Render | Meaningful HTML with JS disabled; static metadata and JSON-LD |
| LCP | ≤2.5 s at 75th percentile; no unnecessary hero image |
| CLS | ≤0.1; intrinsic media dimensions and stable font metrics |
| INP | ≤200 ms; small progressive-enhancement scripts |
| Status | Correct 200/301/404; no redirect chains |
| Mobile | 320px reflow; no payload-table horizontal scroll |
| Lighthouse | SEO ≥95, performance desktop ≥90/mobile ≥85, a11y/best practices ≥95 |

Fonts are self-hosted/subset where permitted, CSS is split by architecture not duplicated per page,
and public pages make zero runtime Firestore calls.

---

## 13. Measurement and governance

Connect Google Search Console after domain verification; submit sitemap only after Gate 05. Use a
privacy-respecting analytics choice approved under **Q-30**. Track organic landing page, enquiry
submission, phone/email activation and project-to-contact path. Do not record message contents or
personal form values in analytics.

Monthly review: crawl/index coverage · query/page pairs · Core Web Vitals · broken links · duplicate
titles · structured-data errors · anonymisation leakage · project content opportunities. Search
recommendations update copy only through `CONTENT_PLAN.md` and structured sources.

---

## 14. Launch checklist

| Item | Gate |
|---|---|
| Domain/canonical/redirect host confirmed | **Q-05** |
| Legal identity, address and NAP confirmed | **Q-01** |
| Logo and social plate approved | **Q-16**, Gate 02 |
| Client names and project images cleared | **Q-03**, **Q-04**, **Q-18** |
| Case routes meet proof threshold | **Q-08**, **Q-09** |
| Unique metadata and one h1 per template | Gate 04 |
| XML sitemap/robots/canonicals validated | Gate 05 |
| JSON-LD matches visible content | Gate 05 |
| Search Console ownership and sitemap submission | Post-launch |

No SEO launch workaround can override missing legal identity, publication rights or measured proof.

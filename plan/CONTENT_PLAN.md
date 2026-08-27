# CONTENT PLAN — Page Copy and Content Governance

> **Depends on:** `00_SOURCE_AUDIT.md`, `WEBSITE_PLAN.md`
> **Feeds:** `PROJECT_DATA.md`, `SEO_PLAN.md`, page templates, Approval Gate 01
> **Status:** Draft 01 · Gated by **Q-01…Q-09**, **Q-16…Q-22**, **Q-24**, **Q-28…Q-30**

---

## 1. Content rules

This document specifies launch copy, not finished visual layouts. Source interpretation remains in
`00_SOURCE_AUDIT.md`; structure remains in `WEBSITE_PLAN.md`. Copy must change here first, then in
structured data where applicable. A template must never become the source of a fact.

| Rule | Requirement |
|---|---|
| Evidence | No invented metric, year, result, award, client relationship, certification or outcome |
| Attribution | Client names remain anonymised until **Q-03** and **Q-04** are cleared |
| Voice | Measured, declarative, technical; short paragraphs; active verbs |
| Banned words | solutions · innovative · cutting-edge · high-impact · premier · world-class |
| Preferred vocabulary | clarity · compliance · constructability · performance based · independent · built environment · DBR · BOQ · mock-up · value engineering |
| Source handling | Re-type and edit source meaning; never paste malformed deck strings (**P-07**) |
| Technical terms | Use with a value, standard or decision consequence; do not use as decoration |
| CTA | One body-level appointment CTA per page; no more than one primary CTA in view |
| Missing content | Omit the component or show a precise request; never publish placeholder copy |

### 1.1 Status labels

| Label | Meaning | May ship? |
|---|---|---:|
| `APPROVED FROM SOURCE` | Verbatim fact or faithful line with no unresolved risk | Yes |
| `REWRITTEN FROM SOURCE` | Meaning preserved, wording rebuilt for the website | Yes, after Gate 01 |
| `CLIENT TO CONFIRM` | Source exists but attribution, scope or accuracy is unresolved | No |
| `CLIENT TO PROVIDE` | Required fact or asset is absent | No |

### 1.2 Messaging architecture

| Layer | Message | Source and status |
|---|---|---|
| Category | Independent acoustic consultancy for the built environment | Slide 2 · `REWRITTEN FROM SOURCE` |
| Promise | Acoustic performance is set, designed and verified | Slides 2, 15, 17, 20 · `REWRITTEN FROM SOURCE` |
| Difference | Clarity, compliance and constructability | Slide 2 · `APPROVED FROM SOURCE` |
| Method | Define · model · specify · review · measure | Slides 15, 17, 20 · `REWRITTEN FROM SOURCE` |
| Proof | Target against measured result | Required by brand direction · **Q-09** · `CLIENT TO PROVIDE` |
| Boundary | Supplies nothing. Represents no manufacturer. Accepts no commission. | Brand direction · **Q-22** · `CLIENT TO CONFIRM` |

**Do not publish:** “Acoustics & AV Consultants” until **Q-06**; “Est. 2011” until **Q-02**;
“Acoustical Solutions” in web copy until **Q-26**; any blue-chip client wall until **Q-04**.

---

## 2. Global copy

| ID | Element | Copy | Status · source |
|---|---|---|---|
| G-01 | Wordmark text fallback | Aware Acoustics | `APPROVED FROM SOURCE` · slides 2–36 |
| G-02 | Practice descriptor | Independent acoustic consultancy | `REWRITTEN FROM SOURCE` · slides 2, 8 |
| G-03 | Primary CTA | Send us a drawing set | `REWRITTEN FROM SOURCE` · lifecycle evidence, slide 20 |
| G-04 | Secondary CTA, work | See the work | `REWRITTEN FROM SOURCE` |
| G-05 | Secondary CTA, method | How we verify | `REWRITTEN FROM SOURCE` · slides 15, 17 |
| G-06 | Footer location | Bengaluru, India | `CLIENT TO CONFIRM` · **Q-01** |
| G-07 | Footer legal line | © [year] [legal entity]. Privacy. | `CLIENT TO PROVIDE` · **Q-01**, **Q-30** |
| G-08 | Direct contact | +91 93916 51916 · +91 98450 64815 · named emails | `APPROVED FROM SOURCE` · slide 35; routing blocked on **Q-28** |

Navigation labels are `Work · Services · About · Contact` (**DEC-011**). Do not add
`Industries`, `Insights`, `News`, `Careers` or `Clients` at launch.

---

## 3. Home `/`

### H-01 · Hero

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | Independent acoustic consultancy | `REWRITTEN FROM SOURCE` · slides 2, 8 |
| Headline | **Performance is specified. Then measured.** | `REWRITTEN FROM SOURCE` · slides 15, 17, 20 |
| Body | We set acoustic criteria, model the design, document what must be built and verify the result on site. | `REWRITTEN FROM SOURCE` · slides 15, 17, 20 |
| Tags | Room acoustics · Noise & vibration · Simulation · Measurement | `APPROVED FROM SOURCE` · slides 15–17, 20 |
| CTA | Send us a drawing set | `REWRITTEN FROM SOURCE` |
| Caption | Bengaluru, India · Est. [year] | `CLIENT TO CONFIRM` · **Q-01**, **Q-02** |
| Image need | CSS texture plate only; no photograph | **DEC-003** |

Technical metadata: `Organization` name and canonical URL from `settings.json`; headline stays
under 58 characters for stable line breaks. Fallback before **Q-01/Q-02**: omit the caption card.

### H-02 · About

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 01 · About | `REWRITTEN FROM SOURCE` |
| Headline | **Between the drawing and the room as built.** | `REWRITTEN FROM SOURCE` · slides 2, 20 |
| Body 01 | Aware Acoustics works with architects, project managers, developers and engineers to define acoustic performance within architectural and MEP design. | `REWRITTEN FROM SOURCE` · slide 2 |
| Body 02 | The appointment can begin with criteria and simulation, continue through DBR, drawings, BOQ and submissions, and close with site measurement and compliance reporting. | `REWRITTEN FROM SOURCE` · slides 15, 17, 20 |
| Body 03 | The test is practical: clarity in the document, compliance in the calculation, constructability on site. | `REWRITTEN FROM SOURCE` · slide 2 |
| Detail | We supply nothing. We represent no manufacturer. We accept no commission. | `CLIENT TO CONFIRM` · **Q-22** |
| CTA | About the practice | `REWRITTEN FROM SOURCE` |

Fallback if **Q-22** is unanswered: omit the detail panel; do not soften it into an unverified
“independent advice” claim beyond the independence already stated in the deck.

### H-03 · Selected work

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 02 · Selected work | `REWRITTEN FROM SOURCE` |
| Headline | **The record is the result.** | `REWRITTEN FROM SOURCE` · brand direction |
| Intro | A selection of rooms, workplaces and transport projects, each published with its design condition, scope and measured evidence. | `CLIENT TO PROVIDE` · **Q-08**, **Q-09** |
| Records | Exactly four `featured`, `published`, `case` records | `CLIENT TO PROVIDE` · **Q-08**, **Q-09**, **Q-18** |
| CTA | See all work | `REWRITTEN FROM SOURCE` |

This section is blocked for launch content. It must not be populated from the ten shallow deck
records. Build may proceed with data fixtures in development; production build fails below two
publishable case records.

### H-04 · Services

| ID | Discipline | Statement | Status · source |
|---|---|---|---|
| H-04A | Architectural acoustics | Shape reverberation, clarity and speech intelligibility around the use of the room. | `REWRITTEN FROM SOURCE` · slides 9–14 |
| H-04B | Sound insulation & noise control | Set the separation, background-noise and MEP criteria before they become site corrections. | `REWRITTEN FROM SOURCE` · slides 13, 16, 20 |
| H-04C | Simulation & modelling | Test geometry, materials and source behaviour before physical construction. | `REWRITTEN FROM SOURCE` · slide 15 |
| H-04D | Measurement & verification | Measure the completed condition against the stated criterion and report compliance. | `REWRITTEN FROM SOURCE` · slides 17, 20 |

Section copy: eyebrow `03 · Services`; headline **Four disciplines. One performance brief.**;
CTA `See all services`. Parameters render from `services.json`, not from this prose.

### H-05 · Verification

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 04 · Verification | `REWRITTEN FROM SOURCE` |
| Headline | **Quiet is measured at the end.** | Brand direction · `APPROVED FROM SOURCE` |
| Body 01 | Design intent is translated into criteria: RT60, STI, STC, NC or the parameter appropriate to the space. | `REWRITTEN FROM SOURCE` · slides 9–17 |
| Body 02 | Simulation tests the design before construction. Documentation carries the requirement into tender and site review. | `REWRITTEN FROM SOURCE` · slides 15, 20 |
| Body 03 | Field measurement closes the loop. The measured value is reported against the target and the governing standard. | `REWRITTEN FROM SOURCE` · slides 17, 20 |
| Metric table | One real target/measured pair from a published case | `CLIENT TO PROVIDE` · **Q-09** |
| Standards | ISO 16283-1 · ISO 3382 · BS 8233 · ASHRAE · DIN 18041 · EN 12354 · LEED · WELL | `APPROVED FROM SOURCE` · slides 5, 14, 19 |
| CTA | How we verify | `REWRITTEN FROM SOURCE` |

Fallback before **Q-09**: publish the process and standards strip only. Never show demonstration
numbers, industry averages or invented “example” results on the production site.

### H-06 · Appointment

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 05 · Appointment | `REWRITTEN FROM SOURCE` |
| Headline | **Send us a plan. A programme. A problem that has not happened yet.** | Brand direction · `APPROVED FROM SOURCE` |
| CTA | Start a conversation | `REWRITTEN FROM SOURCE` |
| Secondary | Phone and email from `settings.json` | slide 35 · routing blocked on **Q-28** |

---

## 4. Work

### W-01 · Work index `/work/`

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 01 · Work | `REWRITTEN FROM SOURCE` |
| Headline | **Work held to a number.** | `REWRITTEN FROM SOURCE` · slides 9–17 |
| Standfirst | Project records organised by sector, discipline and the evidence available to publish. | `REWRITTEN FROM SOURCE` |
| Count | `[n] projects · [n] measured records` | Derived from published data |
| Empty filter | No published records match this selection. Clear filters. | `REWRITTEN FROM SOURCE` |
| Page CTA | Discuss a project | `REWRITTEN FROM SOURCE` |

Case-tier row metadata order: public client or anonymised descriptor · city · year · one measured
headline. Record-tier order: location · sector · scope. Never label a record “case study” without
measured evidence. Client logos do not appear.

### W-02 · Project record `/work/[slug]/`

| ID | Section | Copy rule | Status / dependency |
|---|---|---|---|
| W-02A | Hero | Project title; public client or anonymised descriptor; location; year | `PROJECT_DATA`; **Q-04**, **Q-08** |
| W-02B | Facts | Sector · area/capacity · status · scope · appointed by | `CLIENT TO PROVIDE` · **Q-08** |
| W-02C | 01 · Condition | State the room/site condition and design risk in 60–100 words | `CLIENT TO PROVIDE` · no inference from photographs |
| W-02D | 02 · Approach | State criteria, modelling, documentation and site decisions in 100–160 words | `CLIENT TO PROVIDE` |
| W-02E | 03 · Verification | Target/measured rows; no prose substitutes for missing values | `CLIENT TO PROVIDE` · **Q-09** |
| W-02F | 04 · Standards & tools | Render only values tied to this engagement | `CLIENT TO PROVIDE` · **Q-08** |
| W-02G | Gallery | 2–6 cleared images with factual captions | `CLIENT TO PROVIDE` · **Q-18** |
| W-02H | CTA | Bring us the next drawing set | `REWRITTEN FROM SOURCE` |

Project narrative template:

```text
Condition: [space/use] required [parameter/criterion] while [constraint].
Approach: Aware Acoustics [modelled/specified/reviewed/measured] [actual scope].
Verification: The target was [value + unit]. The measured result was [value + unit],
recorded under [standard/method].
```

The template is a collection form, not publishable copy. Empty clauses are never rendered.

---

## 5. Services `/services/` — DEC-011, single page, four in-page sections

### E-01 · Overview band

Eyebrow `01 · Services`; headline **Acoustic performance, from criterion to handover.**;
standfirst: “Four connected disciplines carry the brief from the first target to the final
measurement.” Each band uses H-04A…H-04D and links to its in-page anchor (`#architectural-acoustics`
etc.) rather than a separate route. All are `REWRITTEN FROM SOURCE` from slides 9–17 and 20.

### E-02 · Architectural acoustics

| Field | Copy | Status · source |
|---|---|---|
| Standfirst | Room geometry, absorption and use are resolved against a stated acoustic criterion. | `REWRITTEN FROM SOURCE` · slides 9–14 |
| Condition | Reverberation is not a finish-selection problem. Volume, occupancy, geometry and absorption act together; a room can be quiet and still fail speech. | `REWRITTEN FROM SOURCE` · slides 9–12 |
| What we do | Set RT60 and intelligibility criteria · assess geometry · select absorption by frequency · document treatment · review mock-ups · verify after completion | `REWRITTEN FROM SOURCE` · slides 9–12, 20 |
| Parameters | RT60 · STI · ALCONS · NRC | `APPROVED FROM SOURCE` · slides 9–14 |
| Standards | IS 2526 · DIN 18041 · ISO 3382 · ISO 354 · ASTM C423 | `APPROVED FROM SOURCE` · slides 5, 14 |
| Related | Simulation & modelling · Measurement & verification | Required internal links |

### E-03 · Sound insulation and noise control

| Field | Copy | Status · source |
|---|---|---|
| Standfirst | Separation, background noise and vibration criteria are coordinated with architecture and MEP. | `REWRITTEN FROM SOURCE` · slides 2, 13, 16, 20 |
| Condition | A partition rating alone does not resolve flanking, services penetrations or plant noise. The criterion must survive the junction, the detail and the installation. | `REWRITTEN FROM SOURCE` · slides 13, 20; “flanking” `CLIENT TO CONFIRM` before body use |
| What we do | Set STC and NC criteria · mark floor separations · review wall and door build-ups · coordinate HVAC noise and vibration control · assess environmental noise · test airborne separation | `REWRITTEN FROM SOURCE` · slides 13, 16, 17, 20 |
| Parameters | STC · NC · ambient noise · speech privacy | `APPROVED FROM SOURCE` · slides 13, 17, 20 |
| Standards | BS 8233:2014 · ASHRAE Handbook · EN 12354 · ISO 16283-1 · ISO 717-1 / JIS A 1419-1 | `APPROVED FROM SOURCE` · slide 5 |
| Related | Architectural acoustics · Measurement & verification | Required internal links |

### E-04 · Simulation and modelling

| Field | Copy | Status · source |
|---|---|---|
| Standfirst | Predictive models test the room before the room exists. | `REWRITTEN FROM SOURCE` · slide 15 |
| Condition | Geometry, source position, material behaviour and background noise change how sound reaches a listener. Late correction is expensive because those decisions are already built. | `REWRITTEN FROM SOURCE` · slide 15 |
| What we do | Build 3D acoustic models · assign absorption and reflection data · model loudspeaker and source positions · review RT, SPL, clarity and frequency response · test treatment and geometry options | `REWRITTEN FROM SOURCE` · slides 15, 18 |
| Parameters | RT60 · STI · ALCONS · SPL | `APPROVED FROM SOURCE` · slides 15, 18 |
| Tools | EASE · ODEON | `APPROVED FROM SOURCE` · slides 3, 15, 18; licence details **Q-07** |
| Related | Architectural acoustics · Measurement & verification | Required internal links |

### E-05 · Measurement and verification

| Field | Copy | Status · source |
|---|---|---|
| Standfirst | The completed condition is measured, compared and reported. | `REWRITTEN FROM SOURCE` · slides 17, 20 |
| Condition | A specification describes intent. Measurement establishes whether the installed room, partition or system meets it. | `REWRITTEN FROM SOURCE` · slides 17, 20 |
| What we do | Measure reverberation · evaluate STI and speech privacy · assess ambient and environmental noise · analyse NC curves · test airborne sound insulation · report compliance | `REWRITTEN FROM SOURCE` · slides 16, 17, 20 |
| Parameters | RT60 · STI · NC · STC · ambient noise | `APPROVED FROM SOURCE` · slides 9–17 |
| Standards | ISO 16283-1 · ISO 3382 · ISO 717-1 · ISO 354 · ISO 12999-1 · IS 9736 | `APPROVED FROM SOURCE` · slides 5, 14 |
| Equipment | Omit until make, model, class and calibration are provided | `CLIENT TO PROVIDE` · **Q-07** |
| Related | Sound insulation & noise control · Simulation & modelling | Required internal links |

Every discipline section ends with eyebrow `Appointment`, headline **Set the criterion before the
detail closes.**, CTA `Send us a drawing set`. Evidence modules require at least one published
project with a matching service; until then they render a compact project-name list, not empty cards.

---

## 6. About `/about/` — DEC-011, Practice + Method merged

### P-01 · Hero

Eyebrow `01 · About`; headline **Independent in advice. Accountable in measurement.**
`REWRITTEN FROM SOURCE` · slides 2, 8, 17

| ID | Section | Copy / requirement | Status · source |
|---|---|---|---|
| P-02 | The practice | Aware Acoustics advises architects, PMCs, developers and engineers across design, tender, site review and handover. | `REWRITTEN FROM SOURCE` · slides 2, 20 |
| P-03 | Independence | Supplies nothing. Represents no manufacturer. Accepts no commission. | `CLIENT TO CONFIRM` · **Q-22**; omit if unanswered |
| P-04 | Where we work | Project counts by country and city, derived only from published data | Derived from `projects.json` |
| P-05 | Approach | **Clarity.** State the criterion. **Compliance.** Work to the applicable standard. **Constructability.** Carry the intent through the detail and site. | `REWRITTEN FROM SOURCE` · slide 2 |
| P-06 | CTA | **Meet the brief before it becomes a correction.** · Start a conversation | `REWRITTEN FROM SOURCE` |

### P-07 · People

| Person | Publishable copy | Status · source |
|---|---|---|
| Padmanabha | An acoustic consultant with more than 18 years of technical consultancy experience. His background covers environmental and mechanical acoustics, detailed design, reports, drawings, BOQs and multidisciplinary coordination. He studied acoustics at IIT Kharagpur and is a graduate of BMS College of Engineering. He works with EASE, ODEON and 3D acoustic modelling. | `REWRITTEN FROM SOURCE` · slide 3; surname/title **Q-24** |
| Srikanth T | A business and product-development professional with more than 25 years of total experience, including more than 12 years in acoustics. His work spans building, environmental and product acoustics, design consultancy, testing, measurement and key-account management. He is a graduate of Bangalore University. | `REWRITTEN FROM SOURCE` · slide 4; title **Q-24** |

Do not attach the blue-chip client lists to either biography until **Q-03** resolves prior-employer
attribution. Portrait slots do not render until **Q-17** is supplied.


---

### Method content (same page, follows People/Approach)

| ID | Section | Copy / requirement | Status · source |
|---|---|---|---|
| M-01 | Method sub-hero | Eyebrow `04 · Method`; headline **A room is designed twice.** Standfirst: “First as a target and model. Then as a built condition that can be measured.” | `REWRITTEN FROM SOURCE` · slides 15, 17, 20 |
| M-02 | 01 · Concept | **Set the targets.** Translate use, programme and compliance requirements into acoustic criteria. | `REWRITTEN FROM SOURCE` · slides 2, 5, 9–14 |
| M-03 | 02 · Design | **Model. Specify. Document.** Test geometry and material choices; issue the DBR, detailed drawings and sound-insulation layouts. | `REWRITTEN FROM SOURCE` · slides 15, 20 |
| M-04 | 03 · Tender | **Keep the criterion intact.** Review tender drawings, BOQ, material and sample submissions. | `REWRITTEN FROM SOURCE` · slide 20 |
| M-05 | 04 · Site | **Review what will be built.** Assess mock-ups, updated layouts and constructability before repetition. | `REWRITTEN FROM SOURCE` · slides 2, 20 |
| M-06 | 05 · Handover | **Measure the completed condition.** Report the result against the target and applicable standard. | `REWRITTEN FROM SOURCE` · slides 17, 20 |
| M-07 | Simulation | Models account for reflection, absorption and diffraction, and test RT, SPL, intelligibility and response before construction. | `REWRITTEN FROM SOURCE` · slide 15 |
| M-08 | Instrumentation | Equipment make/model/class/calibration table | `CLIENT TO PROVIDE` · **Q-07**; omit until supplied |
| M-09 | Standards | Grouped register from `standards.json`; no certification language | `APPROVED FROM SOURCE` · slides 5, 14, 19 |
| M-10 | Green norms | Prefer recycled or renewable acoustic materials, low-VOC products and proximate compliant sourcing where the project permits. | `REWRITTEN FROM SOURCE` · slide 7 |
| M-11 | Compliance | LEED and WELL parameter tables; edition labels await **Q-27** | `CLIENT TO CONFIRM` · slides 7, 19 |
| M-12 | CTA | **Bring the criterion into the room early.** · Start a conversation | `REWRITTEN FROM SOURCE` |


Do not build a certification-badge strip. Working to a standard is not accreditation (**R-02**,
audit §7.5).

---

## 7. Contact `/contact/`

| Field | Copy / requirement | Status · source |
|---|---|---|
| Eyebrow | 01 · Appointment | `REWRITTEN FROM SOURCE` |
| Headline | **Send us a plan. A programme. A problem that has not happened yet.** | Brand direction · `APPROVED FROM SOURCE` |
| Standfirst | Include the project type, location and current stage. A drawing set, room schedule or acoustic brief gives the conversation a useful starting point. | `REWRITTEN FROM SOURCE` · slide 20 |
| Direct route | Named phone and email routing | `CLIENT TO CONFIRM` · **Q-28**, **Q-29** |
| Office | Legal/office address | `CLIENT TO PROVIDE` · **Q-01** |
| Next 01 | We review the project stage and scope. | `REWRITTEN FROM SOURCE` |
| Next 02 | We identify the criteria, information and site inputs required. | `REWRITTEN FROM SOURCE` |
| Next 03 | We respond through the route confirmed for the practice. | `CLIENT TO CONFIRM` · response time not supplied |
| Success | Your project note has been sent. | `REWRITTEN FROM SOURCE` |
| Failure | The message could not be sent. Use the email or phone route shown here. | `REWRITTEN FROM SOURCE` |

Field labels follow `WEBSITE_PLAN.md` §5.6.1. Consent copy: “I agree that Aware Acoustics may use
these details to respond to this enquiry.” Link to `/privacy/`; both require **Q-30**. Do not add
marketing consent, newsletter opt-in, file upload or CAPTCHA in v1.

---

## 8. Utility pages

### U-01 · Privacy `/privacy/`

The page is required if the form ships. Legal copy is `CLIENT TO PROVIDE` / professional counsel
to approve under **Q-30**. Minimum sections: data collected · purpose · lawful basis/consent ·
retention · processors · security · access/correction/deletion route · contact. Do not fabricate a
retention period or name a data controller until **Q-01**.

### U-02 · 404

| Field | Copy | Status |
|---|---|---|
| Eyebrow | — · Not found | `REWRITTEN FROM SOURCE` |
| Headline | **This address does not resolve.** | `REWRITTEN FROM SOURCE` |
| Body | Continue through the work, the services or the appointment route. | `REWRITTEN FROM SOURCE` |
| Links | Work · Services · Contact | Approved IA |

No joke copy, search box, illustration or automatic redirect.

---

## 9. Structured-content ownership

| Content type | Source of truth | Never hardcode in |
|---|---|---|
| Project facts and narratives | `projects.json` / Firestore | Work templates, homepage |
| Discipline labels, summaries, parameters | `services.json` / Firestore | Services templates |
| People and contact routes | `people.json` / Firestore | About, footer, contact |
| Standards and subjects | `standards.json` / Firestore | About, Services |
| Legal name, address, phones, email, domain | `settings.json` / Firestore | Any page template |
| Interface and page copy | This document, then templates | JSON records unless editable by admin |

---

## 10. Approval checklist

| Check | Gate condition |
|---|---|
| Source integrity | Every factual line maps to an audit slide or a client answer |
| Attribution | **Q-03** and per-project **Q-04** resolved before client names publish |
| Positioning | **Q-02**, **Q-06**, **Q-22**, **Q-26** resolved |
| Proof | At least two case records satisfy **Q-08**, **Q-09**, **Q-18** for launch; four recommended |
| Contact/legal | **Q-01**, **Q-05**, **Q-28**, **Q-30** resolved |
| Assets | Logo **Q-16**; project images **Q-18**; portraits may fall back to text-only |
| Vocabulary | Banned-word scan returns zero in public copy |
| Empty states | Every gated component has an omit/fail rule; no placeholder reaches production |

**Gate 01 recommendation:** approve the copy direction and data requests now. Do not approve final
launch copy until the blockers above have written answers.

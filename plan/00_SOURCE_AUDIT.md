# 00 — SOURCE AUDIT

> **Status:** Draft 01 · Awaiting client confirmation
> **Audited:** 2026-08-24
> **Sources audited:**
> 1. `assets/Aware Acoustics Profile - April  2026.odp` — 36 slides, 2,957 words, 88 embedded images
> 2. `assets/brand-design-direction.md` — Direction 02 "Mineral / Material", 681 lines
> 3. `https://github.com/sujeth-dev/Velmont` — process benchmark only
>
> **Authority rule:** This file is the only place the raw source is interpreted. Every downstream
> document (`CONTENT_PLAN`, `PROJECT_DATA`, `SEO_PLAN`) cites this file. If a fact is not here,
> it does not go on the website.

---

## Legend

| Tag | Meaning |
|---|---|
| `VERIFIED` | Explicitly stated in the deck, unambiguous |
| `CLIENT TO CONFIRM` | Present in source but ambiguous, contradictory, or attribution unclear |
| `CLIENT TO PROVIDE` | Required for the website, absent from all sources |
| `DO NOT PUBLISH` | Present in source but carries legal, factual, or rights risk |

---

## 1. Company

| Field | Value | Status |
|---|---|---|
| Trading name | AWARE Acoustics | `VERIFIED` (slides 2–36 running header) |
| Logo tagline | "Acoustical Solutions" | `VERIFIED` (logo raster, `image1.jpeg`) |
| Cover descriptor | "ACOUSTICS & AV CONSULTANTS" | `VERIFIED` (slide 1) |
| Cover sub-descriptors | "Professional Acoustic Consultancy Services" · "Architectural & Industrial Acoustics \| Environmental Noise" | `VERIFIED` (slide 1) |
| Legal entity name | — | `CLIENT TO PROVIDE` |
| Entity type (Pvt Ltd / LLP / Proprietorship) | — | `CLIENT TO PROVIDE` |
| CIN / GSTIN | — | `CLIENT TO PROVIDE` |
| Founding year | Not stated in deck. Brand direction asserts **Est. 2011**. | `CLIENT TO CONFIRM` — see Contradiction C-01 |
| Registered / office address | — | `CLIENT TO PROVIDE` |
| City | Bengaluru implied (all bios, most projects) — never stated as the firm's base | `CLIENT TO CONFIRM` |
| Operating regions | India-wide (Bangalore, Mumbai, Hyderabad, Pune, Kolkata, Vadodara, Kurnool, Chikkamagaluru, Ambur, Guwahati, Lucknow, Dehradun, Visakhapatnam) + Kuwait | `VERIFIED` by project list |
| Phone 1 | +91 93916 51916 | `VERIFIED` (slide 35) |
| Phone 2 | +91 98450 64815 | `VERIFIED` (slide 35) |
| Email 1 | padmanabha@awareacoustics.in | `VERIFIED` (slide 35) |
| Email 2 | srikanth@awareacoustics.in | `VERIFIED` (slide 35) |
| Domain | `awareacoustics.in` — inferred from email addresses only. No URL appears anywhere in the deck. | `CLIENT TO CONFIRM` (ownership + DNS control) |
| General enquiry inbox | — | `CLIENT TO PROVIDE` (e.g. `studio@` / `enquiries@`) |
| Social profiles | None in deck | `CLIENT TO PROVIDE` (LinkedIn strongly recommended) |
| Business hours | — | `CLIENT TO PROVIDE` |

**Which phone belongs to whom is not stated.** `CLIENT TO CONFIRM` — required before a contact page can route enquiries.

---

## 2. Positioning

### What the company actually does — `VERIFIED`

Independent acoustic consultancy for the built environment. It analyses, designs and optimises
acoustic performance, and verifies compliance against national and international standards
(slide 2). It does not supply, install or manufacture — the deck describes only consultancy,
design documentation, review, measurement and reporting deliverables.

### Who buys / who appoints — `VERIFIED`

Slide 2 names the appointing parties directly: **architects, project management consultants,
developers, and engineers.** Acoustic performance is integrated into "architectural and MEP designs."

### What stage they enter — `VERIFIED`

Full lifecycle, evidenced by the service list (slide 20): design guidelines and DBR at design stage
→ tender drawings and BOQ review → material and sample submission evaluation → on-site mock-up
reviews → post-completion testing and compliance reporting. Slide 15 adds simulation "at early
design stages" and "before physical construction."

### How they differentiate — `VERIFIED`

Four differentiators are explicitly claimed:
1. **Independence** — "scientific, independent, and performance based" (slide 2); "independent acoustic consultancy" (slide 8).
2. **Simulation-led design** — EASE / ODEON / 3D acoustic modelling, used predictively (slides 15, 18).
3. **Measurement and verification** — own instrumentation, field testing to ISO methods (slide 17).
4. **Constructability** — "clarity, compliance, and constructability — ensuring that recommended solutions are both technically effective and practically achievable on site" (slide 2). This is the most distinctive claim in the entire deck and is currently buried on page 2.

### What they do not do — `DERIVED, CLIENT TO CONFIRM`

The deck never states a negative boundary. The brand direction does, forcefully: *"Supplies nothing.
Represents no manufacturer. Accepts no commission."* That is a strong, marketable claim **but it
appears in no client source.** It must be confirmed in writing before publication.

---

## 3. Services / Expertise

All items below are explicitly listed. Grouping is a **recommendation**, flagged as such.

### 3.1 Design & Documentation — `VERIFIED` (slide 20)
- Acoustic design guidelines & documentation
- DBR (Design Basis Report) & detailed acoustic drawings
- Floor STC marking & sound insulation layouts
- MEP noise & vibration control recommendations
- Value engineering suggestions

### 3.2 Review & Tender Support — `VERIFIED` (slide 20)
- Proposed & updated interior layout reviews
- Tender drawings & BOQ specifications review
- Material & sample submissions evaluation
- On-site mock-up reviews
- Acoustic testing & measurement reports
- Final DBR & compliance reporting

> Note: the heading "Review & Tender Support:" appears **twice** on slide 20, splitting one list
> into two. The second group is post-tender / site-stage work, not tender support. See Problem P-04.

### 3.3 Acoustic Simulation & Modelling — `VERIFIED` (slide 15)
- Predictive modelling of sound propagation, noise levels and acoustic performance
- Accounts for reflections, absorption, diffraction
- Software: **EASE**; inputs: material absorption/reflection coefficients, stage layouts, loudspeaker positions, source characteristics
- Outputs listed: RT, SPL distribution across seating, hot-spot identification, reflections, clarity metrics, frequency response
- Deliverables listed: acoustic treatment suggestions, geometry adjustments, system integration, validation by measurement
- Stated benefits: optimise sound quality and speech intelligibility; identify issues at early design stage; support cost-effective design

### 3.4 Noise Survey & Assessment — `VERIFIED` (slide 16)
- Analysis of noise pollution sources
- Environmental impact evaluation
- Compliance with local regulations
- Data-driven mitigation recommendations

### 3.5 Measurement & Testing — `VERIFIED` (slide 17, "Instrumentation")
- Reverberation Time (RT60)
- Speech Transmission Index (STI)
- Speech privacy between adjacent spaces
- Ambient noise level assessment
- Speech intelligibility evaluation
- Acoustic simulation & modelling
- Noise Criteria (NC) curve analysis

### 3.6 Green Building & Wellness Compliance — `VERIFIED` (slides 7, 19)
- LEED acoustic performance parameters: HVAC background noise levels; partition sound insulation (STC); RT60; ambient noise criteria (NC)
- WELL acoustic parameters with point values: adequate wall construction (2), proper door specifications (1), RT60 compliance (1), sound-absorbing ceiling systems (1), sound-absorbing vertical surfaces (1), sound masking systems (2), impact-noise-reducing flooring (1)
- Sustainability approach: recycled and renewable insulation/acoustic materials; low-VOC and environmentally safe products; sustainable design strategies; materials compliant with ISO 14001, LEED and equivalent; geographically proximate green-compliant suppliers to reduce carbon footprint

### 3.7 Audiovisual / Digital Workplace — `CLIENT TO CONFIRM` — **major gap**

Slide 1 markets the firm as "ACOUSTICS & **AV** CONSULTANTS." Slides 21–24 are titled
"Audio Visual and Digital Transformation," "Digital Workplace Framework," and "A Day in Life of An
Employee Workplace." **These four slides contain no body text whatsoever** — they are full-bleed
images only (`image22`–`image27`). Slide 32 describes Guwahati Airport as "Audio **and** Acoustic
Simulation," and slide 31 lists Dehradun and Lucknow airports the same way, so AV work is real.

**But there is no written AV service definition, no AV deliverable list, no AV tool list.**
A website cannot market a discipline it cannot describe. See Client Confirmation Checklist item **Q-06**.

---

## 4. Sectors — `VERIFIED` (slide 27, "Core Expertise: Acoustic Solutions")

Fourteen sectors, each with a supporting thumbnail:

Corporate · Open office area · Technical Labs · Hospitals · Airports · Metros · Schools ·
Hotel · Convention centre · Theatre · Stadium · Religious · Factories · Residential Towers

**Cross-check against the project lists:** Corporate, Open office, Hospitals, Airports, Metros,
Schools, Hotel, Theatre/Auditoria, Religious, Residential, Technical Labs and Factories/Industrial
all have named projects. **Convention centre** and **Stadium** have no named project (HICC is listed
under Hospitality and is marked WIP; RNSIT is a combined indoor sports hall / auditorium).
`CLIENT TO CONFIRM` before either is presented as a capability with proof.

---

## 5. Team

Only two people appear. No org chart, no support staff, no headcount.

### 5.1 PADMANABHA — `VERIFIED` (slide 3)

| Field | Value | Status |
|---|---|---|
| Name | Padmanabha | `VERIFIED` (given name only) |
| Full name / surname | — | `CLIENT TO PROVIDE` |
| Role title | Not stated. Deck says "The principal consultant is specialized in Acoustics…" | `CLIENT TO CONFIRM` — recommend "Principal Consultant" |
| Experience | "over 18 years of experience in technical acoustical consultancy" | `VERIFIED` |
| Specialisation | Acoustics, **IIT Kharagpur** | `VERIFIED` |
| Degree | Graduate degree, **BMS College of Engineering** | `VERIFIED` |
| Software | EASE, ODEON, advanced 3D acoustic modelling tools | `VERIFIED` |
| Prior employment | 12+ years at **MMG Acoustical Consultants, Bengaluru** | `VERIFIED` |
| Domain experience | Noise & vibration studies, environmental and mechanical acoustics, detailed design, technical reports, drawings, BOQs, multidisciplinary coordination | `VERIFIED` |
| Sector experience | Major Indian airports, multiple underground metro stations | `VERIFIED` (unnamed — see `CLIENT TO PROVIDE` in §6.4) |
| Standards familiarity | LEED, ASTM, ISO, BSI, ASHRAE | `VERIFIED` |
| Portrait | `image2.png`, 649×866 — passport-style ID photograph on flat blue background | **Unusable.** `CLIENT TO PROVIDE` |
| Email | padmanabha@awareacoustics.in | `VERIFIED` |
| LinkedIn | — | `CLIENT TO PROVIDE` |

> **Attribution warning.** Slide 3's client list ("Adani, Microsoft, VMware, Google, Cisco, Adobe,
> MBRDI") sits in the same paragraph as the MMG employment history. It is not clear whether these
> were delivered under Aware Acoustics or under MMG. See Contradiction **C-02**.

### 5.2 SRIKANTH T — `VERIFIED` (slide 4)

| Field | Value | Status |
|---|---|---|
| Name | Srikanth T | `VERIFIED` |
| Role title | Not stated. Described as Business and Product Development. | `CLIENT TO CONFIRM` |
| Total experience | "over 25 years of overall professional experience" | `VERIFIED` |
| Acoustics experience | "12+ years dedicated to the acoustics domain" | `VERIFIED` |
| Degree | Graduate, **Bangalore University** | `VERIFIED` |
| Expertise | Business and product development; niche acoustical product development and consultancy; technical and design consultancy; acoustics engineering; customer relationship management | `VERIFIED` |
| Activity | End-to-end product development; acoustical design consultancy; testing & measurement | `VERIFIED` |
| Specialisation | Building Acoustics, Environmental Noise & Product Acoustics, aligned to international standards | `VERIFIED` |
| Key accounts managed | Google, Dell, Microsoft, Bank of America, IBM, Atlassian, Intel, GSK, Amazon, Bank of New York, Standard Chartered Bank, Novo Nordisk, IIM Visakhapatnam, IIT Hyderabad | `VERIFIED` as *stated* — attribution unclear, see **C-02** |
| Portrait | `image3.png`, 660×851 — same ID-photo treatment | **Unusable.** `CLIENT TO PROVIDE` |
| Email | srikanth@awareacoustics.in | `VERIFIED` |

> Slide 4 contains an orphan paragraph consisting of a single period (`.`) and multiple missing
> word-spaces ("expertise inBusiness", "Withover 25 years"). The bio must be re-typed, not copied.

### 5.3 Missing team information — `CLIENT TO PROVIDE`
- Surnames and formal role titles for both principals
- Professional memberships (ISA / ASA / IOA / INCE) — none claimed in the deck
- Whether any additional staff, associates or site engineers exist
- Whether the firm holds any corporate certification (ISO 9001 etc.) — none claimed

---

## 6. Projects

The deck names **~70 projects** across slides 28–34, in four different formats with inconsistent
depth. Only 10 carry any structured metadata. Full extraction below.

### 6.1 Key projects with metadata — `VERIFIED`

| # | Project | Client / Group | Location | Sector | Area / Capacity | Scope | Source |
|---|---|---|---|---|---|---|---|
| 1 | Guwahati International Airport | Adani Group | Assam, India | Airport | 6.0 L sq ft | Acoustics and audio consultancy; audio and acoustic simulation | Slides 31, 32 |
| 2 | RNS Institute of Technology Auditorium | RNSIT | Bangalore | Education / Auditorium | 1,400 seats | Auditorium acoustics | Slides 30, 32 |
| 3 | Yashoda Hospital Auditorium | Yashoda Hospital | Hyderabad | Healthcare / Auditorium | 450 seats | Auditorium acoustics | Slides 30, 32 |
| 4 | TITAN Company | Titan | Bangalore | Corporate | 2.0 L sq ft | Acoustics design & consultancy | Slides 29, 32 |
| 5 | Hilti | Hilti | Vadodara, Gujarat | Corporate | 1.5 L sq ft | Acoustics consultancy services | Slides 29, 34 |
| 6 | Google Opal | Google India | Bangalore | Corporate | 4.0 **or** 3.0 L sq ft | Acoustics consultancy services | Slides 29, 34 — see **C-03** |
| 7 | Wayfair | Wayfair | Bangalore | Corporate | 3.0 **or** 4.0 L sq ft | Acoustics consultancy services | Slide 34 — see **C-03** |
| 8 | JW Marriott Sahar | Marriott | Mumbai | Hospitality | — | Acoustics consultancy services · Completed | Slides 31, 33 |
| 9 | InterContinental Hotel | InterContinental | Kuwait | Hospitality | — | Ballroom acoustics · Completed | Slides 29, 31, 33 |
| 10 | Westin / West Inn | — | Mumbai (Powai) | Hospitality | — | Acoustics consultancy services | Slides 31, 33 — see **C-04** |

### 6.2 Corporates & experience centres — name/location only `VERIFIED` (slide 29)

VMware ORR, Bangalore (design **and testing** consultancy) · VMware Kalyani Vista KV-2.0, Bangalore ·
L&T Corporate Office, Mahape, Mumbai · Microsoft Corporate Office ("luxury building"), Bangalore ·
Google India Opal, Bangalore · eBay, Bangalore · ICICI Prudential Life Insurance, Mumbai ·
D. E. Shaw Software Pvt Ltd, Hyderabad · DNV GL, Pune · Standard Chartered Bank, Kolkata ·
Hilti, Gujarat · Pristine Design Studio (recording studio) · InterContinental Hotel Ballroom, Kuwait ·
Hilton Olympia Hotel Ballroom, Kuwait · Titan, Bangalore · Texas Instruments, Bangalore ·
Intel SRR4, Bangalore · ZenQ, Hyderabad · Johnson & Johnson, Bangalore and Hyderabad ·
Razorpay, Bangalore *(deck: "Rozarpay")* · Swaram TATA, Bangalore

### 6.3 Auditoria & assembly — `VERIFIED` (slide 30)

RNSIT Auditorium, multipurpose hall, 1,400-seat · Reva University College Amphitheatre,
1,500 seats + 1,400 atrium, Bangalore · Yashoda Hospital Auditorium, Hyderabad ·
GPR Engineering College seminar hall, 500 seats, Kurnool, Andhra Pradesh ·
Gland Pharma Auditorium, Hyderabad · Gaudium School Auditorium, Hyderabad ·
HN Science Centre Auditorium, Gauribidanur, Karnataka · T. Abdul Wahid School Auditorium,
1,000 seats, Ambur · Kuvempu Kalamandira, Chikkamagaluru, Karnataka · ITI Theatre, KR Puram,
Bangalore · L&T Multipurpose Hall · Vipassana Meditation Centre Pagoda, Mumbai ·
Sachidananda Ganapathy Ashram Meditation Hall & Auditorium

### 6.4 Airports & transport — `VERIFIED` (slides 3, 31)

Dehradun Airport — audio and acoustic simulation · Lucknow International Airport — audio and
acoustic simulation · Guwahati International Airport (Adani Group) — acoustics and audio consultancy

**"Multiple underground metro stations"** (slide 3) — **no station or system is named.**
This is a strong credential rendered unusable by omission. `CLIENT TO PROVIDE`.

### 6.5 Hospitality — `VERIFIED` (slide 31)

JW Marriott Juhu, Mumbai — WIP · InterContinental, Kuwait — Completed · Hyatt, Bangalore — WIP ·
Grand Oberoi — WIP · ITC Coorg — Completed, **"Indirect"** · JW Marriott Sahar, Mumbai — Completed ·
Western Lake, Powai, Mumbai · Marriott Hotel, Vashi, Mumbai · HICC — WIP · West Inn, Powai, Mumbai ·
Marie Gold, Hyderabad

> "Indirect" against ITC Coorg presumably means sub-consultant or supplied-through. It must be
> defined or the project must be dropped — an ambiguous credit is a liability. `CLIENT TO CONFIRM`.

### 6.6 Cafeterias & town halls — `VERIFIED` (slide 31)

Qualcomm Cafeteria, Bangalore (via M Moser) · Biocon Cafeteria, Bangalore ·
PayPal Cafeteria / Town Hall, Bangalore · ABB Cafeteria / Town Hall

### 6.7 Residential — `VERIFIED` (slide 30 table)

Kalpataru Real Estate · Aditya Birla · Inorbit — Rahejas

### 6.8 Project data that is missing for **every single project** — `CLIENT TO PROVIDE`

No project anywhere in the deck carries: **year**, **project stage/status** (except 5 hospitality
entries), **design target values**, **measured/achieved values**, **standards applied per project**,
**architect or PMC credit**, or **permission to publish the client name**.

This is the single largest content gap. The brand direction's entire value proposition —
*"Quiet is measured at the end"*, target vs measured — depends on data the deck does not contain.
See Checklist **Q-08** and **Q-09**.

---

## 7. Technical Information

### 7.1 Standards register — `VERIFIED` (slides 5, 14, 19)

**Design standards**

| Standard | Subject |
|---|---|
| BS 8233:2014 | Sound insulation & noise control in buildings |
| IS 2526 | Acoustical design of auditoriums & conference halls |
| ASHRAE Handbook (2015) | HVAC noise & vibration control |
| DIN 18041 | Acoustic quality in small & medium-sized rooms |
| EN 12354 (Parts 1–6) | Prediction of building acoustic performance |

**Measurement & testing standards**

| Standard | Subject |
|---|---|
| ISO 16283-1:2014 | Airborne sound insulation — field measurement |
| ISO 3382 | Reverberation time measurement |
| ISO 717-1 / JIS A 1419-1 | Rating of airborne sound insulation |
| ISO 354 | Sound absorption measurement |
| ISO 12999-1:2014 | Measurement uncertainty in building acoustics |
| IS 9736 | Acoustics terminology for buildings |
| ASTM C423 | Sound absorption / NRC, reverberation chamber |

**Green building & wellness**

| Standard | Subject |
|---|---|
| LEED v4 / v5 | Acoustic performance (EQ credit) |
| WELL Building Standard | Sound mapping & acoustic comfort |
| ISO 14001 | Environmental management — material compliance |

Also named without a specific number: **ASTM**, **ISO**, **BSI**, **ASHRAE** (slide 3).

### 7.2 Acoustic parameters the firm works in — `VERIFIED`

| Parameter | Definition given in deck | Slide |
|---|---|---|
| RT60 | Time for sound energy to decay 60 dB. Sabine: `Ta = 0.16 V/A`, where Ta = reverberation time (s), V = room volume (m³), A = total absorption (m² Sabine) | 9 |
| Reverberation control | Achieved by strategic placement of absorbers on walls, ceilings, floors; material selected on NRC | 10 |
| STI | Speech Transmission Index, 0–1 scale; accounts for noise, reverberation, sound masking, filtering, signal degradation | 11 |
| ALCONS | Articulation Loss of Consonants, %. 0% = excellent; ~10% = reduced clarity; **15% = upper limit of acceptable**. Drivers: background noise, reverberation, speaker quality, listener hearing | 12 |
| NC | Noise Criteria — 1/1-octave band background measurement, 63 Hz–8 kHz, plotted against standard NC curves | 13 |
| NRC | Noise Reduction Coefficient, 0.0–1.0, average absorption across mid-frequency octave bands. 0.0 = fully reflective; 0.5 = ~50% absorbed; 1.0 = high absorption. Per ASTM C423 / ISO 354 in a reverberation chamber | 14 |
| STC | Partition sound insulation rating; floor STC marking | 19, 20 |
| SPL | Sound pressure level distribution across seating, hot-spot identification | 15 |

> **Note:** the brand direction's vocabulary list includes **NR**, **VDV** and **Rw**. None of these
> appear anywhere in the client deck. Do not use them in copy until confirmed. See **C-06**.

### 7.3 Software — `VERIFIED`

| Tool | Evidence |
|---|---|
| **EASE** (Enhanced Acoustic Simulator for Engineers) | Slides 15, 18 — described at length. Models RT, STI, ALCONS, SPL, speech intelligibility; evaluates treatment scenarios |
| **ODEON** | Slide 3 — named in principal's bio only |
| "Advanced 3D acoustic modelling tools" | Slide 3 — unspecified |

`CLIENT TO CONFIRM`: licence status of EASE and ODEON, and whether any others are in use
(CATT-Acoustic, INSUL, SoundPLAN, CadnaA, Dirac, ArrayCalc, Bose Modeler).

### 7.4 Instrumentation — `CLIENT TO CONFIRM` — **significant gap**

Slide 17 is titled "Instrumentation" and shows three photographs (`image15.jpg`, `image16.png`,
`image17.png`) alongside a list of **measurements performed** — not equipment owned. No meter make,
model, class, or calibration status is stated anywhere.

For a firm whose differentiator is measurement, this is a material omission. Required:
- Sound level meter make/model and **IEC 61672 Class 1 or Class 2**
- Calibrator and calibration certificate / traceability
- Omnidirectional source, dodecahedron, tapping machine, vibration transducers if held
- Analysis software (e.g. dBBati, Dirac, Brüel & Kjær / Norsonic / NTi suites)

See Checklist **Q-07**.

### 7.5 Certifications held by the firm — **none claimed**

The deck lists standards the firm *works to*. It claims **no** certification, accreditation, NABL
recognition, or professional-body membership. Do not imply otherwise anywhere on the website.
`CLIENT TO CONFIRM` whether any exist.

---

## 8. Existing Messaging

### 8.1 Verbatim taglines and claims

| Line | Slide | Verdict |
|---|---|---|
| "ACOUSTICS & AV CONSULTANTS" | 1 | Usable only if AV is substantiated (**Q-06**) |
| "Professional Acoustic Consultancy Services" | 1 | Generic — rewrite |
| "Architectural & Industrial Acoustics \| Environmental Noise" | 1 | Accurate, usable as a capability strap |
| "Acoustical Solutions" (logo lockup) | logo | Conflicts with brand voice — see **C-05** |
| "scientific, independent, and performance based" | 2 | Strong. Keep the substance |
| "clarity, compliance, and constructability" | 2 | **Strongest line in the deck.** Promote |
| "technically effective and practically achievable on site" | 2 | Strong. Keep |
| "ensuring every space performs exactly as intended" | 8 | Strong, brand-compatible |
| "high-impact sound, noise, and vibration solutions using cutting-edge measurement systems" | 8 | "high-impact" and "cutting-edge" are unsupported superlatives — rewrite |
| "To be a premier provider of acoustic solutions…" (Vision) | 6 | Marketing register, conflicts with brand voice — rewrite or omit |
| "To deliver engineering-driven acoustic solutions that enhance human comfort and speech clarity through innovative design…" (Mission) | 6 | Same. "innovative" is banned by the brand voice |

### 8.2 Vocabulary actually used by the client

acoustic comfort · compliance · constructability · performance based · independent · scientific ·
built environment · MEP · DBR · BOQ · mock-up · value engineering · simulation · measurement ·
speech intelligibility · speech clarity · speech privacy · sound insulation · noise control ·
reverberation · absorption · background noise · noise pollution · mitigation

### 8.3 Tone assessment

The deck is **two documents fighting each other.** Slides 2, 5, 9–20 are precise, technical and
declarative — very close to the approved brand voice. Slides 1, 6, 8 and the logo tagline are
generic corporate-template marketing ("premier provider", "cutting-edge", "high-impact", "innovative",
"solutions"). The technical register is the authentic one and should govern the website.

---

## 9. Problems Found in the Source

### Contradictions

| ID | Issue | Resolution required |
|---|---|---|
| **C-01** | Brand direction states **Est. 2011**. The deck states **18 years' experience** for the principal and **12 years** at a prior employer, and never gives a founding year. 2011 → 15 years; 18 years → 2008; 12 years at MMG ending at founding → founding ≈ 2014. The three numbers cannot all be right. | Client must state the **firm's founding year** and, separately, **each individual's years of experience**. Never merge the two on the website. |
| **C-02** | Slides 3–4 present ~19 blue-chip client names (Google, Microsoft, Amazon, IBM, Intel, GSK, Bank of America, Novo Nordisk…) inside paragraphs that also describe **prior employment at MMG Acoustical Consultants**. Slide 29's project list overlaps only partially. | Client must split the list into **(a) delivered by Aware Acoustics** and **(b) delivered by an individual at a previous employer**. Group (b) may only appear in a personal bio, worded as prior-employment experience. Publishing (b) as firm credentials is a misrepresentation risk. |
| **C-03** | Slide 34 shows three projects (Wayfair-Bangalore, Google Opal-Bangalore, Hilti-Vadodara) and three unlabelled data blocks (1.5 L sq ft/Vadodara, 4.0 L sq ft/Bangalore, 3.0 L sq ft/Bangalore). Hilti→Vadodara is inferable; **Wayfair and Google Opal cannot be told apart.** | Client must assign 4.0 L and 3.0 L sq ft to the correct project. |
| **C-04** | Three probably-related hospitality entries: "Western Lake – Pawai" (slide 31), "West Inn Powai, Mumbai" (slide 31), "West In Mumbai" (slide 33). Likely all **The Westin, Powai, Mumbai**. | Confirm the correct property name and whether these are one project or several. |
| **C-05** | The logo tagline is **"Acoustical Solutions."** The approved brand voice explicitly bans the word *"solutions"* as marketing language. The logo is also **blue and bright red**, against a mineral/earth palette with `#A63A32` accent. | Decision required: keep the logo as-is and accept the mismatch, restrict it to a mono/knocked-back lockup, or commission a redraw. Logged as **DEC-002**. |
| **C-06** | Brand direction lists **NR, VDV, Rw** as house technical shorthand, and names **Lighting** and **Audiovisual** as disciplines. The deck contains **no lighting content at all**, no VDV, no Rw, and no NR (it uses NC). | Confirm whether lighting is a real service. If not, the brand direction's discipline list must be corrected before it drives navigation. |
| **C-07** | RNSIT is described as "Multipurpose Hall 1400-seater" (slide 30) and "Indoor Sports Hall – 1400 Seater Auditorium" (slide 32). | Confirm the room type. |

### Duplicate and weak content

| ID | Issue |
|---|---|
| **P-01** | Slide 16 contains two paragraphs that say the same thing in different words ("We analyze noise pollution sources and evaluate their impact…" / "Through data-driven analysis, we identify noise pollution sources and assess their environmental impact…"). |
| **P-02** | Slide 8 contains three overlapping service paragraphs covering the same ground. |
| **P-03** | `image12.png` (NC curve chart) is reused on slide 13 and again on slide 19 where the subject is LEED/WELL parameters — one chart doing duty for two unrelated arguments. |
| **P-04** | Slide 20's heading "Review & Tender Support:" is repeated, splitting one list into two mislabelled halves. |
| **P-05** | Slide numbering skips **Page 07** (slide 6 = Page 06, slide 7 = Page 08). |
| **P-06** | Deck file metadata title is **"Blue and White Clean Modern Professional Company Business Profile Presentation"** — an unmodified stock template. |
| **P-07** | Pervasive missing word-spaces from a bad paste ("expertise inBusiness", "Withover 25 years", "L&TMultipurposeHall", "RevaUniversityCollegeAmphitheater"). Slide 30 and 31 lists are almost entirely unspaced. **No copy may be pasted from the deck without re-typing.** |
| **P-08** | Slide 4 contains an orphan paragraph consisting of a single "." |
| **P-09** | Misspellings to correct: "Rozarpay" → Razorpay · "GoogleOpel" → Google Opal · "Cafetaria" → Cafeteria · "JW Marriot" → JW Marriott · "Gauribidanuru" → Gauribidanur · "Sachidananda" spelling to confirm · "Amphitheater/Amphitheatre" to be made consistent. |
| **P-10** | ASHRAE Handbook cited as **2015** — several editions out of date in 2026. Cite the edition actually used. |
| **P-11** | LEED cited as "v4 / v5". Confirm which version the firm actually works to. |

### Unsupported or risky claims

| ID | Claim | Risk |
|---|---|---|
| **R-01** | "premier provider of acoustic solutions" (slide 6) | Unverifiable superlative. Do not publish. |
| **R-02** | "cutting-edge measurement systems" (slide 8) | Unsupported — no equipment is named anywhere. Do not publish until **Q-07** is answered. |
| **R-03** | "high-impact … solutions" (slide 8) | Marketing filler, banned by brand voice. |
| **R-04** | "a pioneer in the field" (slide 3, re: MMG) | A claim about a **third party and former employer**. Remove. |
| **R-05** | "prestigious clients such as Adani, Microsoft, VMware, Google, Cisco, Adobe, MBRDI" | See **C-02**. Attribution and publication permission both unresolved. |
| **R-06** | "Luxury building" (Microsoft, slide 29) | Meaningless as a project descriptor. Remove or replace with real scope. |

### Rights and legal issues — `DO NOT PUBLISH` without clearance

| ID | Issue |
|---|---|
| **L-01** | **`image7.png` is a copied third-party asset.** The deck's own XML retains the source URL `https://xiengineering.com/wp-content/uploads/2023/03/graphic-1024x300.png`, and the file is exactly 1024×300. It is used on slide 11 to illustrate STI. **This must not be republished.** Redraw the STI scale as an original inline SVG. |
| **L-02** | Slide 28 contains a wall of **~23 third-party client logos** (`image44`–`image66`: Google, Microsoft, Intel, Amazon, IBM, Atlassian, GSK, Standard Chartered, etc.). Publishing customer trademarks requires each client's permission, and most corporate fit-out work is under NDA. **Do not publish a logo wall** until written permission exists per logo. |
| **L-03** | Project photographs (`image68`–`image77`, `image82`–`image88`) have **no stated provenance**. `image68` (949×498) is a building exterior of a type usually supplied by an architectural photographer. Ownership, licence and property releases are all unknown. |
| **L-04** | The slide-master backgrounds (`image82`–`image88`, 1500–1800 px interiors) are likely **stock imagery from the PowerPoint template** (see **P-06**), not the firm's projects. They must not be presented as project work. |

### Image quality findings

| Finding | Detail |
|---|---|
| **I-01** | **Most deck imagery is below production resolution.** Of 88 embedded images, only 9 exceed 1500 px on the long edge, and 40 are under 400 px. The named "Key Projects" photographs (`image68`–`image77`) are 698–1008 px wide — too small for a hero, marginal for a 2× project card. |
| **I-02** | Team portraits are ID photographs on a flat blue studio background — incompatible with the brand's material world at any crop. |
| **I-03** | The only logo asset is a **917×506 JPEG on a white background** — raster, no transparency, no vector. A vector master is required. |
| **I-04** | All technical charts (NC curves, STI scale, ALCONS table, RT graph) are **bitmap screenshots**, several with visible compression artefacts, none in the brand palette, one of them third-party (**L-01**). All must be re-authored as inline SVG. |
| **I-05** | Sector thumbnails (`image30`–`image43`, 200–700 px) are illustrative stock-type images, not the firm's projects. Do not present as work. |

---

## 10. Client Confirmation Checklist

> This checklist gates **Approval Gate 01**. Content and IA cannot be signed off while any
> **BLOCKER** remains open.

### Blockers — the website cannot launch without these

| ID | Question | Why it blocks |
|---|---|---|
| **Q-01** | What is the **legal entity name, type, and registered address**? | Required for the footer, contact page, and structured data. Legally expected on an Indian business site. |
| **Q-02** | What year was **Aware Acoustics founded**? (separate from any individual's years of experience) | Resolves **C-01**. Drives "Est." usage, About copy, and Organization schema. |
| **Q-03** | Split the client list: which engagements were delivered **by Aware Acoustics**, and which by an individual **at a previous employer**? | Resolves **C-02**. Publishing prior-employer work as firm credentials is a misrepresentation risk. |
| **Q-04** | For each project to be published, do we have **written permission to name the client**? Which are under NDA? | Resolves **L-02**. Determines whether `/work` shows client names or anonymised descriptors ("A global technology campus, Bangalore"). |
| **Q-05** | Do you **own or control the domain `awareacoustics.in`**, and who holds the DNS? | Determines whether launch is a DNS switch or a domain acquisition. |
| **Q-06** | **Is AV an active service?** If yes, provide a written scope, deliverables, and tools. If no, "ACOUSTICS & AV CONSULTANTS" must be dropped from the identity. | Resolves the largest positioning gap. Slides 21–24 have zero text. |
| **Q-07** | **What measurement equipment do you own?** Make, model, IEC 61672 class, calibration date and traceability. | Resolves **R-02**. Measurement is a headline differentiator that is currently unevidenced. |

### High priority — needed for a credible `/work` section

| ID | Question |
|---|---|
| **Q-08** | For the 8–12 projects you want featured: **completion year**, **status**, **appointing party** (architect/PMC/developer), and **scope actually delivered**. |
| **Q-09** | For at least 3–4 flagship projects: the **design targets** (RT60, NC, STC, STI) and the **measured values achieved at handover**. Without target-vs-measured data the brand's central promise cannot be demonstrated. |
| **Q-10** | Which **metro stations** and which **airports** (beyond Guwahati, Lucknow, Dehradun)? Naming them converts a vague claim into a credential. |
| **Q-11** | Resolve **C-03**: which of Wayfair / Google Opal is 4.0 L sq ft and which is 3.0 L sq ft? |
| **Q-12** | Resolve **C-04**: the correct Powai/Westin property name(s), and whether these are one project or three. |
| **Q-13** | What does **"Indirect"** mean against ITC Coorg? Sub-consultant? Through a contractor? |
| **Q-14** | Resolve **C-07**: is RNSIT a multipurpose hall, an indoor sports hall, or both? |
| **Q-15** | Confirm the **spelling of every project and client name** to be published (see **P-09**). |

### Assets required — `CLIENT TO PROVIDE`

| ID | Asset | Spec |
|---|---|---|
| **Q-16** | **Vector logo** (SVG, AI or EPS), plus a mono / knock-out version | Resolves **I-03**. Without this there is no usable brand mark. |
| **Q-17** | **Professional portraits** of both principals | Resolves **I-02**. Minimum 2000 px long edge, neutral or on-site background, consistent treatment for both. |
| **Q-18** | **High-resolution project photography** for featured projects | Minimum 2400 px wide, with photographer credit and written licence. Resolves **I-01**, **L-03**. |
| **Q-19** | **Instrumentation / on-site photography** — the team measuring, meters in position, dodecahedron in a hall | Highest-value missing asset. Directly evidences the measurement differentiator and is the one image type texture cannot substitute. |
| **Q-20** | **Anonymised sample deliverables** — a DBR page, an acoustic drawing, an EASE screenshot, a measurement report page | Proves the actual product. Must be redacted of client-identifying detail. |
| **Q-21** | **Original EASE simulation exports** (SPL maps, RT plots) at high resolution | Replaces low-quality bitmap screenshots and is genuinely differentiating imagery. |

### Confirmations — brand and scope

| ID | Question |
|---|---|
| **Q-22** | Confirm the independence claim in writing: *"We supply nothing. We represent no manufacturer. We accept no commission."* Is that literally true? |
| **Q-23** | Is **lighting** a service? The brand direction says yes; the deck says nothing. Resolves **C-06**. |
| **Q-24** | Confirm role titles for both principals, and whether any other staff should appear. |
| **Q-25** | Do you hold any **certification, accreditation or professional membership** (ISO 9001, NABL, ISA, IOA, INCE)? |
| **Q-26** | Approve or reject retiring the tagline **"Acoustical Solutions"** in web copy. Resolves **C-05**. |
| **Q-27** | Which **edition of the ASHRAE Handbook** and which **LEED version** do you actually work to? Resolves **P-10**, **P-11**. |
| **Q-28** | Preferred **enquiry destination**: a shared inbox, or route by phone/email to the relevant principal? |
| **Q-29** | Do you want a **general enquiry inbox** created (e.g. `enquiries@awareacoustics.in`)? |
| **Q-30** | Should the site carry a **privacy policy** and, given the contact form, a data-handling statement? (Recommended: yes.) |

---

## 11. Source Image Inventory

Extracted to `assets/source/deck-media/` (88 files). Full text extraction at
`assets/source/deck-text-extract.txt`.

| Range | Content | Usable? |
|---|---|---|
| `image1` | Aware Acoustics logo, 917×506 JPEG on white | Reference only — vector required (**Q-16**) |
| `image2`–`image3` | Team portraits, ID-photo style | No — replace (**Q-17**) |
| `image4`–`image12` | RT / STI / ALCONS / NC technical charts | No — redraw as SVG. **`image7` is third-party (L-01)** |
| `image13`–`image14` | Noise survey photographs, 267–299 px | No — too small |
| `image15`–`image17` | Instrumentation photographs, 569–823 px | Marginal — reshoot (**Q-19**) |
| `image18`–`image21` | EASE screenshots and drawing samples | Low-res — request originals (**Q-20**, **Q-21**) |
| `image22`–`image29` | AV / digital-workplace graphics, some 1920×1080 | Provenance unknown — likely template stock |
| `image30`–`image43` | Sector thumbnails, 200–700 px | No — illustrative stock, not project work (**I-05**) |
| `image44`–`image66` | Client logo wall, ~23 marks | **Do not publish** (**L-02**) |
| `image67` | Residential client logo strip, 2077×291 | Same restriction |
| `image68`–`image77` | Key project photographs, 698–1008 px | Provenance and resolution both fail (**L-03**, **I-01**) |
| `image78`–`image88` | Slide-master decoration and backgrounds | Template stock — **do not present as project work** (**L-04**) |

**Net position: there is currently no image in the source material that is cleared, correctly
attributed, and high enough resolution to serve as a website hero.** This finding drives **DEC-003**
(texture-first visual strategy) and makes **Q-18** / **Q-19** commercially urgent.

---

## 12. Audit Conclusion

**What exists and is strong:** a precise, well-evidenced technical capability set; a substantial
and geographically broad project list; a complete and current standards register; a clear
differentiator ("clarity, compliance, constructability"); genuine simulation and measurement
capability; two experienced principals; blue-chip sector coverage.

**What is missing and matters most:** project *outcomes*. The deck proves the firm has done a lot
of work; it never once shows what that work achieved. Not one target value, not one measured
result, not one before/after. The approved brand direction is built entirely around measured
verification, and the source cannot yet support it.

**What must be fixed before anything is written:** the attribution of the client list (**C-02**),
the founding year (**C-01**), and the AV question (**Q-06**). All three change what the website
is allowed to say about who the firm is.

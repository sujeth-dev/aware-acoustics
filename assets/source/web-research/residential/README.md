# Residential — Web Research Summary (RESEARCH ONLY, NOT FOR PUBLICATION)

This folder holds public-web reference material (facts + moodboard images) for three spreadsheet
entries grouped under "Residential Segment" in the source deck. **None of this is rights-cleared.**
No content here may be copied into `data/projects.json`, `public/`, or `assets/projects/` — see
`plan/IMAGE_WORKFLOW.md` and `plan/PROJECT_DATA.md` for the actual publication/clearance workflow.

## Status by item

| Item | Specific project identified | Exterior image | Interior image | Notes |
|---|---|:---:|:---:|---|
| Aditya Birla | Birla Niyaara (Tower SILAS), Worli, Mumbai — Birla Estates | Saved (`exterior.webp`) | Saved (`interior.webp`) | Developer marketing renders, not photos of the built tower. Specific tower not confirmed as the actual Aware engagement. |
| Kalpataru | Kalpataru Avana, Parel, Mumbai — Kalpataru Ltd. | Saved (`exterior.jpg`) | Saved (`interior.jpg`) | Completed tower (OC received); images from a listing portal and the developer site. Specific tower not confirmed as the actual Aware engagement. |
| Inorbit Mall | Inorbit Mall, Malad, Mumbai — K Raheja Corp | Saved (`exterior.jpg`) | Saved (`interior.jpg`) | **See typology flag below.** Images from Wikimedia Commons (CC BY-SA); interior image is only 800px wide, below the preferred 1200px minimum — best available. |

No "listed only" leftovers: all three items have a `notes.md` and both an exterior and an interior
reference image saved.

## Typology mismatch — Inorbit Mall is not residential

The source deck lists these three under one "Residential Segment" bullet:

> Kalpataru Real Estate / Aditya Birla / In orbit — Rahejas

**Inorbit Mall is a retail shopping mall (developed and operated by K Raheja Corp), not a
residential tower or township.** The spreadsheet/deck mis-groups it alongside two genuinely
residential developers (Kalpataru, Birla Estates). This should be corrected at the data-entry stage:
Inorbit Mall belongs in a retail/commercial category, not residential. See
`assets/source/web-research/residential/inorbit-mall/notes.md` for the full flag and sourcing.

## Common caveats (apply to all three)

- All images are press/marketing photography or developer renders sourced from public web pages
  (developer sites, real-estate listing portals, Wikimedia Commons). **Rights are not cleared** for
  any of them; they are reference-only for internal moodboard use.
- None of the three specific projects identified here (Birla Niyaara, Kalpataru Avana, Inorbit Mall
  Malad) is confirmed as the exact property Aware Acoustics worked on — the source deck names only
  the developer/brand, not a specific tower or location. Client confirmation is required before any
  of this is treated as factual project history.
- Per `plan/PROJECT_DATA.md`, safe defaults for any future structured record derived from this
  research are `clientPublic: false`, `tier: record`, `featured: false`, `published: false`.

# Project snaps.pptx — source extraction, 2026-10-09

**Source file:** `Project snaps.pptx` (repository root, 2.2 MB, 14 slides, supplied by the site owner)
**Extraction:** `ppt/media/*` copied unchanged, renamed only to give each file its true extension
(the deck's `image1` arrived with a Facebook CDN query string as its filename).
**Status:** reference evidence, kept unmodified. Nothing in this folder is served. The prepared,
colour-corrected and shaped masters are in `assets/projects/_from-deck-2026-10-09/`, and 19 of the 22
frames were published to `public/assets/projects/` on 2026-10-09 under **DEC-022**.

This is the first image set that comes from the practice itself rather than from web research
(`assets/source/web-research/`, DEC-019). It is therefore the route `IMAGE_WORKFLOW.md` §5 describes
for removing the "generic stand-in" and `representative: true` labels — but see **Rights** below: the
deck is a collected set, not a folder of the practice's own photography, and at least one frame is
demonstrably lifted from a news site.

## Slide → project mapping

| Slide | Deck caption | Images | Matching record in `data/projects.json` |
|---|---|---|---|
| 1 | "Projects Snaps" (title) | — | — |
| 2 | L&T TC4 Building Chennai — "A 13-storey structure with 667,417 sqm built-up area" | image1 | **none** — new project |
| 3 | Anaplan office - Gurugram | image2, image3 | `anaplan` (city currently `null`) |
| 4 | Trimont Hyderabad | image4 | `trimont` (city currently `null`) |
| 5 | CISCO Bangalore — "Building 11, 14, 15 & CISCO Hyderabad & Pune" | image5 | `cisco` (city currently `null`) |
| 6 | VM Ware Bangalore | image6, image7 | **ambiguous** — `vmware-orr-bengaluru` or `vmware-kalyani-vista-bengaluru` |
| 7 | Johnson & Johnson Hyderabad | image8, image9 | `johnson-and-johnson-bengaluru-hyderabad` |
| 8 | Razon Pay | image10, image11 | `razorpay-corporate-office-bengaluru` |
| 9 | Google Opel | image12, image13 | `technology-workplace-bengaluru-01` (Google India Opal, `showcaseRank: 3`) |
| 10 | Microsoft Luxar | image14 | `microsoft-corporate-office-bengaluru` |
| 11 | Microsoft Helium & Angkor | image15 | `microsoft-corporate-office-bengaluru` |
| 12 | Mercedes Benz | image16, image17, image18 | **none** — new project |
| 13 | Target | image19, image20 | **none** — new project |
| 14 | Wayfair Angkor | image21, image22 | `technology-workplace-bengaluru-02` (Wayfair, Bengaluru) |

Deck spellings "Razon Pay", "Google Opel" and "Luxar" are read as Razorpay, Google Opal and Luxor.
"Angkor" appears on both slide 11 (Microsoft) and slide 14 (Wayfair), which suggests a shared building
name rather than a client-specific one; this is unresolved.

## Rights

The deck carries no credits. The frames are visibly of mixed origin and **none of them is confirmed as
the practice's own photography**:

- **image3** is a `cxotechbot.com` news graphic, complete with masthead, "GCC NEWS" badge, headline
  ("Anaplan Opens First APAC Customer Experience Center in Gurugram") and site URL. The building photo
  inside it has been cropped out for the prepared derivative; the uncropped original is kept here.
  The underlying photograph remains third-party press material with no verified licence, and its
  lighting, signage rendering and planting suggest it may itself be a render or synthetic image.
- **image1**, **image12** and **image14** are architectural renders, not photographs.
- **image21** and **image22** show Wayfair facilities in the United States (US street signage, a "$25"
  parking board, left-hand drive), not the Bengaluru office the record describes.
- The remainder are interior and exterior photographs consistent with the captioned sites, but with no
  photographer, date or permission recorded.

Treating these as cleared therefore rests on the same basis as DEC-019: the site owner's direction, not
a rights finding. The exposure is **not** worse than the web-research set it would replace, and for the
generic stand-ins it is a clear gain in truthfulness — but it is not the clean client-supplied
photography that `IMAGE_WORKFLOW.md` §5 contemplates. Asking the owner for the photographers' names, or
for the original full-resolution files, is the step that would settle it.

## Resolution

Every frame is small. The largest is 1280×720; the median is about 0.2 megapixels. Currently published
images run from 859×540 up to 1920×1281, so several of these would be a **downgrade in pixels even where
they are an upgrade in truth**. Per-image figures are in
`assets/projects/_from-deck-2026-10-09/MANIFEST.json`.

| Deck key | Format | Pixels | Note |
|---|---|---|---|
| image1 | JPEG | 637×637 | square render |
| image2 | JPEG | 543×368 | |
| image3 | JPEG | 800×1040 | 800×740 after cropping the news chrome |
| image4 | JPEG | 420×280 | identifiable staff at desks |
| image5 | JPEG | 415×737 | portrait |
| image6 | JPEG | 381×524 | heavily colour-shifted |
| image7 | JPEG | 738×414 | |
| image8 | JPEG | 387×516 | |
| image9 | JPEG | 738×414 | |
| image10 | JPEG | 515×388 | identifiable staff at desks |
| image11 | PNG | 960×639 | |
| image12 | JPEG | 440×454 | |
| image13 | JPEG | 399×501 | same room as the published `…-01-project-space-03` |
| image14 | JPEG | 1280×720 | largest frame in the deck |
| image15 | JPEG | 960×720 | |
| image16 | JPEG | 387×516 | |
| image17 | JPEG | 678×452 | |
| image18 | JPEG | 678×452 | hexagonal acoustic ceiling baffles clearly visible |
| image19 | JPEG | 299×168 | **rejected** — below usable size |
| image20 | JPEG | 567×352 | |
| image21 | JPEG | 275×183 | **rejected** — below usable size, and a US site |
| image22 | JPEG | 447×447 | **rejected** — a US site, not Bengaluru |

No frame has been upscaled. Upscaling would invent detail the deck does not contain.

## What the deck adds beyond images

- **Three projects absent from the data entirely:** L&T TC4 Chennai, Mercedes Benz, Target.
- **Cities for three records that currently have none:** Anaplan → Gurugram, Trimont → Hyderabad,
  Cisco → Bengaluru (plus Hyderabad and Pune).
- **Building-level scope for Cisco:** Buildings 11, 14 and 15 at Bengaluru, plus Hyderabad and Pune.
- **Microsoft building names:** Luxor, Helium, Angkor.
- **A correction to an existing record.** The published `johnson-and-johnson-bengaluru-hyderabad`
  images are labelled "Johnson & Johnson Institute, Chennai" — the wrong city for the record. The deck
  supplies genuine Hyderabad frames.
- **A verification.** Deck image13 and the published
  `technology-workplace-bengaluru-01-project-space-03` show the same room — the same LED pixel ceiling,
  amphitheatre stair and columns. That image is currently marked `representative: true` and
  `depicts: "Google Ananta campus"`. The deck shows it is the Opal site after all, so the flag and the
  `depicts` string are both wrong and can be corrected without touching the file.

## Unresolved, needs the owner

1. **L&T TC4 Chennai area.** The slide says "667,417 sqm". That is 7.18 million sq ft for a 13-storey
   building, which is not plausible; 667,417 **sq ft** is. Not recorded until confirmed.
2. **Which VMware record** slide 6 belongs to — ORR, Kalyani Vista, or both.
3. **Whether Microsoft Luxor, Helium and Angkor** are one record or should be split.
4. **Images with identifiable staff** (image4 Trimont, image10 Razorpay). The DEC-019 addendum
   excludes images chosen for their people; these are workplaces shown in use rather than staff
   portraits, but faces are legible and no consent is recorded.

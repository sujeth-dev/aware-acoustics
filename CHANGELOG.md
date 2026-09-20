# Changelog

All notable user-facing changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases will
follow semantic versioning once implementation begins.

## [Unreleased]

### Added

- Complete planning system for source, content, data, design, imagery, admin, SEO, delivery and change management.
- Safe structured-data seeds and executable validation rules.
- Core design tokens, base styles and the Newsreader type scale.
- Vite build with generated routes for Home, Work, Services, About, Contact, Privacy and 404.
- Homepage: hero, about, selected work, services, verification and appointment sections.
- Work index and the project-record template, including the target-versus-measured table.
- Services page: overview plus four discipline sections with per-discipline material identity.
- About page: practice, people, approach, method process, and the grouped standards register.
- Contact page layout and enquiry form structure (submission not yet connected); privacy scope preview.
- Editorial components: statement, process spine, people row, standards register, stat, form fields.
- Work index lists 74 named projects from the client deck and project list, with a sector filter and sector labels.
- 33 project rows carry credited exterior and interior photographs (55 images). Rows showing a related site rather than the project are labelled "Representative image"; source, licence and credit are printed on `/work/`.

### Added (image sourcing pass, 2026-09-20)

- Every project now has images: 74 of 74, 133 in total. 18 projects that had none received a photograph of the project or a related site of the same client, and 23 received a generic exterior and interior chosen by the site owner's direction (recorded as `Generic image: …; not the project site` in `depicts`, and `representative: true`). Each image records its source, licence and credit. Two (Kuvempu Kalamandira and Intel SRR4) come from the practice's own former website, recovered from the Internet Archive.
- Images that centred on people (a staff group photo, a ribbon-cutting, a ceremony, a video thumbnail with title text, a person in the foreground) were replaced with exterior or interior views. Where no substitute was found the image was removed (ABB technical lab, second image; HN Science Centre, second image). Frames were cropped where a person sat at the edge.
- Hero images: the Guwahati airport showcase now uses a 1920 px landscape view of the terminal canopy (it previously fell back to a 1050 px portrait), Dehradun airport adds a 1920 px concourse view, and Google Ananta is re-cut at 1920 px. Hero picks are unchanged in code: the widest landscape image of each showcase project.
- Working copies of non-Commons images and a source table for this pass are in `assets/source/web-research/additions-2026-09-20/`.

### Changed (DEC-020 visual redesign)

- New visual system: deep navy, crimson and gold with beige paper bands; Spectral, Manrope and JetBrains Mono; diffuser-skyline section edges, registration ticks, sound arcs and ruled grids. The numbered 01–04 squares are replaced by four discipline signature drawings.
- Fixed header (transparent over a hero, navy glass once scrolled) with the logo on a beige tab; new footer with a crimson call band and an outlined wordmark.
- Work page restructured: image hero, six featured projects each with their own page, and "Explore all work" (sector filter, search, show-more) opening every other project in an overlay. The image disclaimer and credits list are gone from the page; CC BY / CC BY-SA credits sit inside the project view.
- Home, Services, About and Contact recomposed with a distinct layout per section. Contact is now a four-step enquiry with a live summary that sends a pre-filled email.
- Data: optional `showcaseRank` on a project marks the six featured projects; `validate-data.js` checks it.
- Motion added (reveal, hero crossfade, ticker), gated by `prefers-reduced-motion`.
- `npm run test:browser` now covers the featured pages, explorer, overlay, no-JavaScript fallback, contact flow and scroll reveal.

### Changed

- Home and Work pages recomposed with editorial alternation and per-discipline materials; homepage hero unchanged.
- Non-production builds are marked noindex and serve a disallow-all robots file.

### Security

- Client attribution and image-rights risks are blocked from publication by default.

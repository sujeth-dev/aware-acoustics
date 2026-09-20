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

### Changed (DEC-020 visual redesign)

- New visual system: deep navy, crimson and gold with beige paper bands; Spectral, Manrope and JetBrains Mono; diffuser-skyline section edges, registration ticks, sound arcs and ruled grids. The numbered 01–04 squares are replaced by four discipline signature drawings.
- Fixed header (transparent over a hero, navy glass once scrolled) with the logo on a beige tab; new footer with a crimson call band and an outlined wordmark.
- Work page restructured: image hero, six featured projects each with their own page, and "Explore all work" (sector filter, search, show-more) opening every other project in an overlay. The image disclaimer and credits list are gone from the page; CC BY / CC BY-SA credits sit inside the project view.
- Home, Services, About and Contact recomposed with a distinct layout per section. Contact is now a four-step enquiry with a live summary that sends a pre-filled email.
- Data: optional `showcaseRank` on a project marks the six featured projects; `validate-data.js` checks it.
- Motion added (reveal, hero crossfade, ticker), gated by `prefers-reduced-motion`.
- `npm run test:browser` now covers the featured pages, explorer, overlay, no-JavaScript fallback, contact flow and scroll reveal.

### Changed (DEC-021 mineral / material layer)

- Stone and lighter-stone bands with a fibre-hairline texture and one pre-rendered 6 KB grain, applied to Home (About, Services), Services, About, Work and the project view. Navy stays dominant; crimson and gold stay the accents.
- Projects without a photograph now show a mineral plate (four tonal variants) instead of the navy waveform plate, on Work cards and in the project view.
- Services gains a "material study": a generic layer stack captioned "Illustrative build-up" beside a ruled table. It names layers only and carries no figure.
- Glass caption plates over the Home About photograph and the Work feature rows; feature rows gain a Scope / Disciplines / Year table from project data.
- New `npm run test:contrast` checks every new colour pair, including the worst grain and hairline pixel (34 of 34 pass). Stone-band text uses `--slate-mineral` and `--red-mineral` because the existing tokens fall below 4.5:1 there.
- `reveal.js` sweeps on scroll so an element skipped by the observer is no longer left hidden.

### Changed (DEC-021 sound-themed dividers)

- Section dividers are now sound-related inline SVG: a smooth oscilloscope wave (default; every wave loops seamlessly forever, paused offscreen, still under reduced motion), one continuous reverberation-decay divider per page with a -60 dB line and a T60 tick, and no diffuser skyline left: the footer and the Services material study use waves too.
- Each divider is a single closed path in the section's own ground, so it is gap-free at any width and against any ground above.
- Traces draw in once when scrolled into view; static under reduced motion and without JavaScript.
- An octave-band axis (125 to 4k Hz) replaces section numbers in a few section heads.
- `npm run test:browser` checks the divider states, full-width gap-free rendering and that no SVG-noise grain, waveform plate or build-up figure has returned.

### Changed

- Home and Work pages recomposed with editorial alternation and per-discipline materials; homepage hero unchanged.
- Non-production builds are marked noindex and serve a disallow-all robots file.

### Security

- Client attribution and image-rights risks are blocked from publication by default.

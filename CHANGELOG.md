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

### Changed

- Home and Work pages recomposed with editorial alternation and per-discipline materials; homepage hero unchanged.
- Non-production builds are marked noindex and serve a disallow-all robots file.

### Security

- Client attribution and image-rights risks are blocked from publication by default.

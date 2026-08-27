# Test fixtures

Synthetic data used only to exercise templates that no real record can reach yet.

**Nothing in this directory is client content, and nothing here is read by the site build.**
`scripts/generate-pages.js` loads `data/*.json` only. These files exist so the `/work/[slug]/`
template can be rendered and inspected while every real project is still gated on Q-08/Q-09.

Values are obviously synthetic (`FIXTURE` labels, round numbers) precisely so that a fixture can
never be mistaken for a measured result. Do not copy a value from here into `data/`.

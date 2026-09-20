/**
 * index.js — the route table.
 *
 * Static routes are declared once. Two families of project routes are derived
 * from data, each gated by the evidence it needs:
 *   - showcase pages (/work/<slug>/) for projects with a showcaseRank, built by
 *     work-feature.js from the facts and images the record holds;
 *   - case-record pages for published case-tier records (DEC-007), built by
 *     work-record.js, so an evidence page can never exist without its evidence.
 * A project is never both: a showcase slug wins.
 */

import { homePage } from "./home.js";
import { workPage } from "./work.js";
import { workFeaturePage } from "./work-feature.js";
import { workRecordPage } from "./work-record.js";
import { servicesPage } from "./services.js";
import { aboutPage } from "./about.js";
import { contactPage } from "./contact.js";
import { privacyPage } from "./privacy.js";
import { notFoundPage } from "./not-found.js";
import { caseProjects, showcaseProjects } from "../lib/data.js";

export function allPages(data) {
  const showcase = showcaseProjects(data);
  const showcaseSlugs = new Set(showcase.map((project) => project.slug));
  const records = caseProjects(data).filter((project) => !showcaseSlugs.has(project.slug));

  return [
    homePage(data),
    workPage(data),
    servicesPage(data),
    aboutPage(data),
    contactPage(data),
    privacyPage(data),
    notFoundPage(data),
    ...showcase.map((project) => workFeaturePage(project, data, showcase)),
    ...records.map((project) => workRecordPage(project, data, records))
  ];
}

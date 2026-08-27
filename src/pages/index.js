/**
 * index.js — the route table.
 *
 * Static routes are declared once; project-record routes are derived from
 * published case-tier records only (DEC-007), so a record page can never exist
 * without the evidence its template renders.
 */

import { homePage } from "./home.js";
import { workPage } from "./work.js";
import { workRecordPage } from "./work-record.js";
import { servicesPage } from "./services.js";
import { aboutPage } from "./about.js";
import { contactPage } from "./contact.js";
import { privacyPage } from "./privacy.js";
import { notFoundPage } from "./not-found.js";
import { caseProjects } from "../lib/data.js";

export function allPages(data) {
  return [
    homePage(data),
    workPage(data),
    servicesPage(data),
    aboutPage(data),
    contactPage(data),
    privacyPage(data),
    notFoundPage(data),
    ...caseProjects(data).map((project) => workRecordPage(project, data))
  ];
}

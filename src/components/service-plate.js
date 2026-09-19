/**
 * service-plate.js — deliberate material-plate assignment per discipline.
 *
 * Not decorative: each texture is chosen to echo the discipline's own
 * physical material logic, so the same identity appears everywhere that
 * discipline does (home services band, /services/ discipline section).
 */
const SERVICE_PLATES = {
  "architectural-acoustics": "wool",             // absorptive room treatment
  "sound-insulation-and-noise-control": "slab",  // mass, separation
  "simulation-and-modelling": "perforated",      // precision, digital modelling
  "measurement-and-verification": "metal"        // instrumentation
};

export function servicePlate(serviceId) {
  return SERVICE_PLATES[serviceId] ?? "felt";
}

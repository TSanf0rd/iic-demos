/* ---------------------------------------------------------------------------
 * rl3_real_parts.js
 *
 * Real RL-3 refresh parts, read directly from Hussmann's live Performance Parts
 * store (serial MY25H067107, Model # RL-3*M000000652-2025-08-28, FO# 882867).
 *
 * WHY THIS EXISTS
 * demo2 currently runs on placeholder parts (HUS-FST-KIT-A etc.). Those are
 * fine as logic, but a judge who cross-checks a part number against the real
 * store finds nothing. These are real: real part numbers, real descriptions,
 * real prices, real "Replaces Part(s)" chains. Every number on screen now
 * survives "where did that come from?"
 *
 * WHAT IS REAL vs ILLUSTRATIVE
 *   REAL (from the screenshots):
 *     - partNumber, description, price
 *     - replaces[]  (the "Replaces Part(s)" supersession chains)
 *     - the resolved-case identity fields (serial, model, factoryOrder)
 *   ILLUSTRATIVE (assigned for the demo, must be labeled as such):
 *     - kit assignment + kit names  -- real Hussmann kit SKUs come from George;
 *       these are descriptive placeholders, NOT invented part numbers.
 *     - refreshScope flag           -- which parts a refresh targets. Reasonable
 *       per Vivek's 80/20 exterior-wear profile, but confirm with George.
 *
 * The Python parallel for how this is shaped: a list of dicts. Each object is
 * one record; the keys are the fields. resolveBOM() reads `replaces` the way a
 * dict lookup would -- "does any raw line match a number this part replaces?"
 * ------------------------------------------------------------------------- */

// Resolved-case identity -- the header the fitment gate should show after lookup.
// NOTE: the real store's Ship Date field read "2025-00-28" (month 00 -- a data
// bug in their system). Don't render a broken date; use Model # + FO# as identity.
const RESOLVED_CASE = {
  serial:       "MY25H067107",
  model:        "RL-3",
  modelFull:    "RL-3*M000000652-2025-08-28",  // real build identifier
  factoryOrder: "882867",
  description:  "Reach-In Merchandiser",
};

// The real refresh parts. `replaces` is the supersession chain resolveBOM nets out.
const RL3_PARTS = [
  {
    partNumber: "0428562",
    description: "Door Gasket, Reach-In Case, Black, Fits 30 in x 67 in",
    price: 58.00,
    replaces: ["1003357"],
    refreshScope: true,
    kit: "door_rebuild",
  },
  {
    partNumber: "0428627",
    description: "Closer, Left Hand Innovator Door, 67 in Height",
    price: 119.00,
    replaces: ["0428627001", "0441148", "0441148000", "100531779"],
    refreshScope: true,
    kit: "door_rebuild",
  },
  {
    partNumber: "0522314",
    description: "Innovator Door, Reach-In Case, Black, Left Hand, 30 in",
    price: 1465.00,
    replaces: ["0415937", "0415937-P", "0415937000", "0415937P", "100531648", "29S8491BL"],
    refreshScope: true,
    kit: "door_rebuild",
  },
  {
    partNumber: "0428585",
    description: "Socket, Top Hinge Pin, Black, Innovator Door",
    price: 53.00,
    replaces: ["0206221"],
    refreshScope: true,
    kit: "door_rebuild",
  },
  {
    partNumber: "0428586",
    description: "Socket, Bottom Hinge Pin, Black, Innovator Door",
    price: 56.00,
    replaces: ["0207616", "0428586000", "0428586001"],
    refreshScope: true,
    kit: "door_rebuild",
  },
  {
    partNumber: "0560316",
    description: "Gasket, .906 in x 1/2 in x 200 in, with Adhesive Tape",
    price: 24.00,
    replaces: [],
    refreshScope: true,
    kit: "case_seal",
  },
  {
    partNumber: "0331774",
    description: "Gasket Donut, RL End, 146 in Length",
    price: 64.00,
    replaces: ["0331774001", "0386877", "0511231", "0511303"],
    refreshScope: true,
    kit: "case_seal",
  },
  {
    partNumber: "0394752",
    description: "Bumper Joint, Lower, 701 Black",
    price: 28.00,
    replaces: ["0394752-F", "0394752000", "0394752F", "0394752PLM", "100030423", "100502618"],
    refreshScope: true,
    kit: "case_seal",
  },
];

// Illustrative kit definitions. Descriptive names, NOT invented SKUs.
// Replace with George's real kit part numbers before any external use.
const RL3_KITS = {
  door_rebuild: { label: "Door Rebuild Kit (illustrative)" },
  case_seal:    { label: "Case Seal Kit (illustrative)" },
};

/* The raw BOM the resolver starts from: current parts PLUS the legacy numbers
 * they supersede, so resolveBOM has real supersessions to net out. This is the
 * honest version of the demo -- the strikes cancel REAL replaced part numbers,
 * not invented ones. */
const RL3_RAW_BOM = [
  // current part          // legacy line the store says it replaces
  { line: "0428562", qty: 4 },   { line: "1003357",  qty: 4 },   // → nets to 0428562
  { line: "0522314", qty: 2 },   { line: "0415937",  qty: 2 },   // → nets to 0522314
  { line: "0428585", qty: 2 },   { line: "0206221",  qty: 2 },   // → nets to 0428585
  { line: "0428586", qty: 2 },   { line: "0207616",  qty: 2 },   // → nets to 0428586
  { line: "0428627", qty: 2 },
  { line: "0560316", qty: 1 },
  { line: "0331774", qty: 2 },
  { line: "0394752", qty: 6 },
];

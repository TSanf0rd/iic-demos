# demo2 master build — real RL-3 case, Performance Parts shell, AI-driven refresh

Work in ~/dev/iic-demos on demo2_parts_matching.html. Data: rl3_real_parts.js
(repo root). This is the flagship demo for the 7/30 CIO/CISO presentation. It
must render offline (double-click, no network).

PHASED BUILD. Do ONE phase, run the verification block, STOP, report, wait for
approval, commit. Do not start the next phase unprompted.

## The framing this demo must land (read before building)
The point of matching Hussmann's existing tools is ADOPTION. Employees already
use the QR lookup and Performance Parts. This demo must read as "the familiar
tool, with AI features added" — an enhanced version of what they already know,
not a new system to learn. Echo Performance Parts' LAYOUT and VOCABULARY (filter
rail, part cards, breadcrumb, detail tabs). Keep the project's own restraint so
it reads as "their next version," not a pixel clone.

## Source of truth
Every part number, description, price, and Replaces-chain comes from
rl3_real_parts.js (read from the live Performance Parts store, serial
MY25H067107). Never invent, round, or alter these. If a phase needs a value not
in that file, STOP and ask — do not invent it. This rule has already prevented
several credibility errors; keep it absolute.

## PROTECTED — byte-identical across every phase
resolveBOM, groupIntoKits, filterRefreshParts, reconcileKits, getCaseRefresh,
the ranker. Every phase changes DATA and PRESENTATION, never pipeline logic.
Verify byte-identical each phase.

## Global hard constraints (every phase)
- Offline: no external URLs in href/src/@import, no web fonts, no CDN.
- No gradients (except the 2 known .conf-fill, which are being retired later).
- No emoji. Inline SVG only.
- If you touch tokens: --mono must not exist standalone; rename to --font-mono
  and update every reference in the same edit. Dangling var() fails silently.
- No "REV" anywhere (real system has none). No Ship Date (real field malformed).
- Case identity = Model # (RL-3*M000000652-2025-08-28) + Factory Order # (882867).

---

## Phase 0 — read and report, NO edits
Report the data structures, the two screens, the reveal sequence, and where the
resolved-case header, parts list, and quote render. Propose how each phase maps
onto the existing structure. STOP.

## Phase 1 — Performance Parts shell + real case identity + 208 baseline
- Reskin the results screen to echo Performance Parts' layout: left filter rail,
  main part-card list, breadcrumb, search bar showing the serial. Familiar shell.
- Resolved-case header: Model # + Factory Order # + serial. No Rev, no Ship Date.
- The 208 baseline is a DISPLAYED COUNT, not 208 built rows: "Performance Parts
  returns 208 orderable parts for this serial." This is the "before" number the
  pipeline reduces from.
- Visible source label: "Baseline data from Hussmann Performance Parts (serial
  MY25H067107)."
- STOP and report. This is also the checkpoint to confirm the Phase-2 scope
  interpretation below before any parts are built.

## Phase 2 — refresh scopes: 2 active, rest "coming soon"
INTERPRETATION TO CONFIRM AT THE PHASE-1 STOP: the customer's refresh covers two
SCOPES — Doors and Bumpers/Seals — which together contain all 8 real parts from
rl3_real_parts.js (grouped into the 2 kits). The OTHER case systems are shown as
greyed "coming soon" outlines: Lighting, Controls & Electrical, Refrigeration &
Air Handling, Shelves & Merchandising.

- ACTIVE scopes (Doors, Bumpers/Seals): the 8 real parts render as real cards
  with prices and Replaces-chains, fully interactive (clickable → Phase 4 drawer).
- GREYED scopes (the 4 above): render as outline/ghost cards, visibly present but
  dimmed, labeled. Clicking one shows "Coming soon" — nothing more. These are the
  production roadmap made visible; do NOT build real content behind them.
- The smart survey flags the active refresh set. The visible beat: 208 → the
  refresh scope, shown as a collapse/tally consistent with the reveal sequence.
- Prices, descriptions, Replaces-chains exact from the data file. STOP and report.

## Phase 3 — filter rail: 3 real (AI-driven), rest AI-managed
Render the FULL Performance Parts filter rail (all ~20 categories visible) so it
looks like the real tool. Only THREE are wired, and the AI drives them:
- Category → Doors, Glass & Components + Hardware & Fittings
- Application → Door / Low Temp
- OEM Usage → Hussmann
When the survey runs, these three HIGHLIGHT (visibly light up) to show the AI
selected them — this is "the AI did the filtering the quoter used to do by hand,"
shown on the rail they recognize. The narrowing is DISPLAY-DRIVEN along this one
AI path: the survey result tells the panel which rows to highlight and which
subset to show. It does NOT evaluate 208 parts live (there is no 208-row dataset).

The other ~17 categories: a judge CAN click them, but they show an "AI-managed"
state (a short inline note that the pipeline manages this filter), not silent
no-ops and not filtering on invented attribute values. Do not fabricate attribute
values for parts to make more filters bite. STOP and report.

## Phase 4 — part-detail drawer (the centerpiece)
Clicking an active part opens a drawer that MIRRORS the real store's fields AND
ADDS three the store cannot show. Build both halves distinctly — the contrast is
the enhancement.

Mirrors the real store (from the part-detail screenshots):
- Part # + full description
- A single STATIC part image (placeholder ok; label the image seam in a comment).
  NOT a spinner (that's Phase 6).
- List Price vs contract price (e.g. gasket $100 list / $58 contract)
- In Stock + availability count + "Ships in 1-2 business days"
- Replaces Part(s) chain
- Tabs: Specifications (OEM Compatibility, Mounting, Type, Application, Enriched
  Color, UOM), Dimensions (L/W/H, Weight), Reference Materials (I/O manual link).
  Only render spec rows the data file actually has; omit rather than invent.

ADDS what the store structurally cannot (style these as the pipeline's
contribution — this is where the pencil/annotation styling belongs):
1. WHY FLAGGED — the survey's refresh-candidacy reason (e.g. "Door seal wear —
   high-frequency refresh item"). Illustrative reason text, labeled as survey
   output. Keep it honest and general; do not claim a specific failure mode.
2. KIT MEMBERSHIP — which kit this part rolls into (kit field; names illustrative).
3. SUPERSESSION RESOLVED — that the pipeline ACTED: "Legacy 1003357 on the prior
   BOM — superseded, netted automatically."
STOP and report.

## Phase 5 — netting + kits + quote with ROI line
- resolveBOM nets the real supersession pairs (raw BOM in the data file pairs
  current parts with legacy numbers they replace). Struck lines cancel the REAL
  legacy numbers.
- Kits group per the kit field. Names labeled illustrative.
- Quote totals add a savings line: sum(list) vs sum(contract) — what the pipeline
  saves by quoting at contract price, not list. Derived from real prices; no
  invented percentage.
- Order: created in Oracle via Adaptia, ORD-2026-xxxxx (Oracle = destination,
  Adaptia = integration layer; keep both in that relationship).
- Fold this into the existing reveal sequence so it plays as one motion. STOP.

## Phase 6 — STRETCH: 3D spinner (only if 1-5 done and approved)
Replace the Phase 4 static image with drag-to-spin ONLY if convincing offline
with available assets. A single image with a rotate transform is an unconvincing
imitation — if that's all it would be, do NOT ship it; keep the static image.
Explicitly optional, last, time-boxed.

---

## Verification block — after EVERY phase, report each with counts
1. every var(--x) resolves to :root
2. --mono standalone: 0
3. linear-gradient count (report)
4. external URLs in href/src/@import: 0
5. \uXXXX outside <script>: 0
6. border-radius: only var(--radius), var(--radius-lg), 999px, 50%
7. every part number + price on screen matches rl3_real_parts.js exactly
8. no "REV" anywhere; no Ship Date anywhere
9. the 6 protected functions byte-identical
Report as a list with counts. Do not summarize as "all clean." STOP.

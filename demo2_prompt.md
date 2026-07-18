# Task: redesign demo2_parts_matching.html — case → parts → quote → order, one surface

You are working in ~/dev/iic-demos. Target file: `demo2_parts_matching.html` (~2,115 lines).
This is the ONE demo that gets shown live at an internal Hussmann presentation on 7/30
to the CIO and CISO. Total slot is 15 minutes for a team of six, so this file has roughly
90 seconds of stage time. It must render by double-clicking with the network unplugged.

## Before you change anything

1. Read the whole file. Report its current structure: what screens exist, what
   `resolveBOM` and `groupIntoKits` do, where the `:root` block is.
2. Check whether `quote_engine.html`'s functionality is ALREADY inside this file.
   Grep this file for the function names defined in `quote_engine.html`. Report
   hits per name. Do not assume either way.
   - If already integrated: leave `quote_engine.html` alone, it is a superseded fragment.
   - If not: the quote and order stages must be ABSORBED into this file as new
     sections of the same continuous document. Do not link out to another file.

Report findings and STOP. Wait for confirmation before editing.

---

## Hard constraints — violating any of these fails the task

1. **No network requests.** No `<link>` to fonts.googleapis.com. No `@import url(http...)`.
   No `<script src="http...">`. No `<img src="http...">`. Everything inline.
2. **No web fonts.** Only fonts that ship on stock Windows and macOS.
3. **No gradients.** Remove every `linear-gradient`. Replace with the solid color
   nearest the gradient's midpoint.
4. **No emoji.** Icons, if any, are inline SVG.
5. **This file already declares `--mono`.** If you introduce `--font-mono`, RENAME the
   declaration and update every `var(--mono)` reference in the same edit. Do not leave
   both names. A dangling `var()` fails silently — it falls back to the inherited value
   and the page still renders, just wrong. This exact regression already happened in
   this repo and cost 10 dangling references.
6. **Preserve the existing `resolveBOM` and `groupIntoKits` logic.** Their arithmetic is
   validated and reconciles. You are redesigning how their output is PRESENTED, not
   recomputing it. If a displayed number is not derived from those functions, it does
   not go on screen.

---

## Design tokens — use these exactly, derive nothing

```css
:root {
  /* Hussmann brand — non-negotiable */
  --navy:   #0B2D4D;
  --navy-2: #143D63;
  --blue:   #1E6BB8;

  /* Document surface — cool, not warm. Engineering vellum under fluorescent light.
     The previous warm cream (#FAF9F6 / #F5F3EE) and gold (#C99A2E) are DELETED.
     They were not brand colors. Do not reintroduce them. */
  --paper:   #E8EBE9;
  --surface: #FFFFFF;
  --ink:     #14181A;
  --ink-2:   #5A625F;
  --ink-3:   #8A928F;
  --rule:    #C2C8C6;
  --rule-2:  #DBDFDD;

  /* The ONLY warm color on the page. This is a tool color, not a brand color:
     it is the red pencil an engineer marks up a drawing with. It appears ONLY
     where the AI has made a decision. Never use it for chrome, headers, buttons,
     or emphasis. If you are reaching for it to make something "pop", stop. */
  --pencil: #B0342C;

  --green: #2E7D46;   /* availability confirmed only */
  --amber: #B4600A;   /* availability at risk only */

  --font-display: "Arial Narrow", "Helvetica Neue Condensed", Arial, sans-serif;
  --font:         "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
  --font-mono:    Consolas, "SF Mono", Menlo, monospace;

  --radius:    8px;
  --radius-lg: 14px;
}
```

**Type rules:**
- `--font-display` is uppercase, `letter-spacing: 0.12em`, `font-weight: 400`. Section
  headers, wordmark, column labels. This is the vernacular of a title block on an
  engineering drawing, and it is deliberately not a font anyone reaches for.
- `--font-mono` for every part number, quantity, price, quote ID, order ID. Data is
  monospace so columns align. No exceptions.
- `--font` for prose only.
- **Never set a serif.** Georgia is banned in this file.

**Radius:** `--radius` for cards and inputs, `--radius-lg` for the outer panel.
`999px` ONLY on pill badges. `50%` only on circular dots. Delete 4px/5px/7px/9px.

---

## The interaction model

Model this on an auto-parts catalog's fitment flow (AutoZone), translated to Hussmann
refrigeration. Take the MODEL, not the look. **No orange. Do not imitate their chrome.**
The result should look like a Hussmann engineering document that happens to be shoppable.

### 1. Fitment gate — nothing is shoppable until the case is resolved
An auto-parts site will not sell you a part until it knows your vehicle. Same here.

Selector row, `--font-display` labels: **Store → Case line → Model → Rev**.
Until all four resolve, the surface is empty and inert. Empty state is an invitation,
not an apology: "Identify the case to build a quote." No parts, no prices, no cart.

Once resolved, the case identity **persists in the header for the rest of the flow**
and is never re-asked. That persistence IS the gate paying off.

### 2. Verdict lines, not spec tables
Every part line carries a verdict naming the case back to the user:
**"FITS M5-8 REV C"** — `--font-display`, small, uppercase.

Not a compatibility column. Not a checkmark. A verdict.

Where `resolveBOM` or `groupIntoKits` made a call, annotate in `--pencil`:
- `MERGE → 03` — duplicate line accumulated
- `COVERED BY KIT 9K-77310 — LINE REMOVED` — kit substitution
- `NOT REFRESH SCOPE` — filtered by category

These annotations are the signature of this product: the AI's reasoning, made visible
as markup on a document. Struck lines get a 1.5px `--pencil` rule drawn across them;
part number, description, and qty drop to `--ink-3`.

### 3. Availability is part of the line, not a footnote
- `IN STOCK — 3 AT DC-STL, SHIPS TODAY` in `--green`
- `2 OF 4 AVAILABLE — 6 DAY LEAD` in `--amber`

Sourced from Adaptia. **Label the API seam honestly** with an inline JS comment: this
is simulated data standing in for an Adaptia call. Never present simulated availability
as live.

### 4. One continuous surface — this is the thesis
No page break, no "proceed to quoting", no handoff, no tabs. Scrolling down the SAME
document, in order:

```
CASE RESOLVED → BOM MARKUP → PARTS IN SCOPE → KITS → QUOTE LINES
  → TOTALS → APPROVE → PO ISSUED → ADAPTIA ORDER ID
```

Quote and order are state changes on the same document, not navigations. Shawn Freeman
validated a 14-step manual quoting process; a demo that makes you click through steps
is quietly agreeing with the status quo. If the user has to click "next", the argument
is lost.

### 5. Totals reconcile visibly
Show the reduction as a tally that adds up: raw lines → resolved → in scope → kits.
If a judge counts the struck lines, the arithmetic must be correct.

---

## Stage-time requirement — this file has ~90 seconds

There is ONE affordance that plays the entire story: resolve the case, and everything
downstream runs in a single orchestrated sequence while the presenter talks over it.
No step-by-step clicking. No "and now if I scroll here."

The sequence, once the case resolves:
- Pencil annotations draw in, line by line, ~170ms stagger, at reading speed so the
  room can FOLLOW the reasoning.
- Strikes draw left-to-right: `transform: scaleX(0→1)`, `transform-origin: left`,
  ~320ms, `cubic-bezier(.4,0,.2,1)`.
- Annotations fade in as their strike completes.
- Tally updates after the last strike lands.
- Kits assemble, quote lines total, PO issues, Adaptia order ID appears.

Total runtime target: under 20 seconds unattended. Add a "Replay" control.

**No other motion in the file.** No hover lifts. No spring easing. No fade-in-on-scroll.
No pulsing. No skeleton shimmer. If you are adding an animation that is not this
sequence, you are adding noise. Wrap all motion in
`@media (prefers-reduced-motion: reduce)`.

**Legibility at 15 feet on a projector.** Nothing below 12px. Data columns must align.

---

## Wordmark — use the real logo

The real Hussmann wordmark is at `hussmann_logo_clean.svg` in the repo root.

**Inline its contents directly into the HTML.** Do not use `<img src="...">` — these
demos must survive being moved or emailed as a single file, and a relative src breaks
the moment the HTML travels without its neighbours.

The SVG is already prepared: no `<style>` block, no Illustrator class names, and every
path is `fill="currentColor"`. That means it inherits `color` from its parent element.
Do not add a fill to the SVG or its paths. Set the color on the container instead:

```css
.wordmark { color: #FFFFFF; }          /* on navy */
.wordmark svg { height: 20px; width: auto; display: block; }
```

`viewBox="0 0 175 19.1"` — roughly 9:1. Set `height` and let `width` follow; never set
both, and never set a fixed pixel width. It is a wordmark, not a square.

Once the logo is present, do not also set "HUSSMANN" in type anywhere in the header.
One wordmark, one place.

Never fetch a logo over the network.

---

## Copy

Sentence case. Active voice. Name things the way a Hussmann sales rep would: "case",
"refresh scope", "kit", "lead time", "PO" — not "SKU", "item", "entity". Buttons say
what happens: "Approve quote" produces "Quote approved". No exclamation marks. No
"simply", "just", "seamless", "unlock".

---

## Verify before you report

1. Every `var(--x)` resolves to a declaration inside this file's `:root`.
2. Zero occurrences of `--mono` as a standalone token name.
3. Zero `linear-gradient`.
4. Zero external URLs in `href`, `src`, or `@import`.
5. Zero `\uXXXX` escapes outside `<script>` blocks. (JS resolves these at parse time;
   the HTML parser does not, and prints all six characters on screen. Same characters,
   two parsers, two meanings. This bug shipped in this exact file before.)
6. `border-radius` values are only: `var(--radius)`, `var(--radius-lg)`, `999px`, `50%`.
7. `resolveBOM` and `groupIntoKits` outputs are unchanged.

Report counts for each. Do not summarize as "all clean".

Then STOP. Do not touch any other file in the repo.

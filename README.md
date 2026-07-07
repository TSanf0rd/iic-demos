# AI-Powered Refresh Pipeline — Interactive Demos

Two proof-of-concept prototypes built for Hussmann's **Intern Ideation & Innovation Challenge (IIC), Team 2**. Together they demonstrate an AI-assisted workflow for the commercial refrigeration **refresh** business — from quoting a repair to tracking the resulting order.

> **All data is simulated.** Every order, part number, price, serial number, and email in these demos is fabricated for demonstration purposes. Nothing connects to a live Hussmann system.

---

## 🔗 Live Demos

> **Note:** Replace `YOUR-USERNAME` and `YOUR-REPO` below with your actual GitHub Pages address (found under **Settings → Pages** in your repository).

| | Demo | Live Link |
|---|---|---|
| **Landing page** | Links to both demos | `https://YOUR-USERNAME.github.io/YOUR-REPO/` |
| **Demo 2** | AI Parts Matching & Auto-Quote | `https://YOUR-USERNAME.github.io/YOUR-REPO/demo2_parts_matching.html` |
| **Demo 3** | Live Order Tracking | `https://YOUR-USERNAME.github.io/YOUR-REPO/demo3_order_tracking.html` |

Local files in this repo: [`index.html`](./index.html) · [`demo2_parts_matching.html`](./demo2_parts_matching.html) · [`demo3_order_tracking.html`](./demo3_order_tracking.html)

---

## What Each Demo Does

### Demo 2 — AI Parts Matching & Auto-Quote

The problem it solves: a quoter today jumps across ~5 tools and takes 7–10 days to build a refresh quote. This demo compresses that to minutes by matching parts to a case automatically and letting the quoter approve the result.

**How the "AI" works (the honest design):**
- A **deterministic rules layer** expands a component into its always-required parts (a bumper always needs a bracket, hanger, and fastener kit). This is a rule, not a prediction — fully explainable.
- An **AI ranking layer** then scores each candidate part with a **confidence score** computed from two signals: whether it's an exact model match, and how often it was used in past quotes.
- **Confidence (fit) is kept separate from availability (stock)** — a part can be the right match *and* be backordered.

### Demo 3 — Live Order Tracking

The problem it solves: once a refresh order is placed, status lives in scattered spreadsheets, and a sales rep fields "where's my order?" emails all day. This demo centralizes tracking and adds an AI assistant.

**Key features:**
- **Dashboard** of all active orders with color-coded status.
- **Customer View** — a FedEx-style progress tracker.
- **Internal View** — a risk banner, an **interactive supply-chain map** (see where each part is manufactured and where the delay is), a part-level table, and a **Copilot assistant** that reads a customer email, answers with grounded order status, drafts a reply, and recommends which specialist to loop in.

---

## How to Use This Version

### Demo 2 — walkthrough

1. Open the Demo 2 link.
2. On the **Identify the case** screen, click one of the sample serial-number chips (e.g. `HSM-D5X-081247-2017`) — or type it and press **Look up case**.
3. The case resolves and a **component picker** appears. Choose **Bumper Refresh**, **Door Refresh**, or **Panel Refresh**.
4. The results catalog shows candidate parts per category, each with a **confidence bar** and an **"AI Recommended"** ribbon on the top pick.
   - Click any **confidence %** to see *how the score was computed* (base + history bonus).
   - Click **Select for quote** on a different card to override the AI's pick — watch the overall confidence donut recalculate honestly.
5. Click **Generate Quote**, then **Approve & Push to Oracle** to see the order confirmation (which hands off to Demo 3).

> **Try the contrasts:** pick **Door Refresh** to see the backordered-part advisory, or the **competitor** serial chip to see the two-tier "all-makes" handling.

### Demo 3 — walkthrough

1. Open the Demo 3 link — you land on the **order dashboard**.
2. Click the **Walmart** order (marked *At Risk*).
3. Toggle to the **Internal View** tab.
4. In the internal view you'll see:
   - a **red "ship date in jeopardy"** banner,
   - the **supply-chain map** — click a facility (e.g. Monterrey) to isolate its routes; click empty space to reset,
   - the **parts table** with the backordered part highlighted,
   - the **Copilot assistant** — click **Ask Copilot about this order**, then **Draft a reply** (a sanitized customer email) and **Draft intro** (loops in the recommended specialist).
5. Compare with a healthy order (e.g. **Kroger**) — note that Copilot recommends **no** contact there, because it's a routine status question.

---

## Project Files

| File | What it is |
|---|---|
| `index.html` | Landing page linking both demos |
| `demo2_parts_matching.html` | Demo 2 — self-contained single file |
| `demo3_order_tracking.html` | Demo 3 — self-contained single file |

Each demo is a **single self-contained HTML file** — all HTML, CSS, and JavaScript are bundled together with **no external dependencies** (no CDNs, no fonts, no map tiles, no API calls). This is deliberate: it guarantees the demos load instantly and can't break from a network hiccup during a live presentation.

---

## Technical Notes

- **Hosting:** GitHub Pages (static file hosting). The browser runs everything client-side.
- **No secrets in code:** the AI features are *simulated* locally. There are no API keys anywhere in these files — appropriate for a public, static site, where any embedded key would be publicly readable. In production, live AI calls would route through a backend proxy that holds the key server-side.
- **In-tenant production path:** the production version is designed to run inside Hussmann's Microsoft 365 tenant (Fabric for data, Power Apps / Power BI for the UI, Microsoft 365 Copilot + Copilot Studio for the assistant), inheriting existing Entra ID authentication and security controls.

---

## Status

Both demos are functionally complete and deployed. Data assumptions (part-matching rules, facility-to-part mapping, serial/part formats, historical-usage figures) are **pending validation** and are isolated in single data tables for easy correction.

*Intern Ideation & Innovation Challenge · Team 2 · July 2026 · Proof of concept.*

# Design System — Akuuva

## Product Context

- **What this is:** B2B land title intelligence platform — a "credit bureau for Indian land" that quantifies property risk into a 0–850 score, backed by automated data sourcing and advocate co-signature.
- **Who it's for:** Institutional buyers — BFSI credit committees, PE funds, real estate developers doing portfolio due diligence. Not homebuyers.
- **Space/industry:** Indian proptech / legal intelligence / financial data infrastructure.
- **Project type:** Marketing site (current) · expanding to more marketing pages (pricing, how it works, about) before product UI.

---

## Aesthetic Direction

- **Direction:** Industrial/Documentary — warm parchment paper meets institutional financial printer.
- **Decoration level:** Minimal — typography and color carry all the weight. No illustrations, no stock photos, no decorative blobs.
- **Mood:** The product should feel like a highly credible report printed on quality stock, not a startup SaaS tool. Authority with warmth. Deeds and documents, not dashboards and widgets.
- **The key bet:** Every other Indian proptech/fintech uses white or light-blue backgrounds. The parchment (`#F5F1E8`) reads as *document substrate* — it is doing conceptual work, not just being aesthetically distinctive. This is a moat. Protect it.
- **No imagery rule:** Zero stock photos. Zero illustrations. The score card widget is the product demo. The comparison table is the pitch. Copy must carry its weight.

---

## Typography

Three fonts. Each has a non-overlapping role.

- **Display/Hero:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — An optically-sized variable serif. Upright weight-700 for headlines. Italic weight-300 for taglines and pull quotes. Evokes legal documents, deeds, institutional credibility with warmth. `opsz` axis active (9–144). `letter-spacing: -0.03em` on display sizes.
- **Body/UI:** [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) — IBM's own workhorse. Clean, authoritative, reads legibility at small sizes. Not overused in this category. `weight: 300, 400, 500, 600`. Body: 16px / line-height 1.75.
- **Data/Labels:** [DM Mono](https://fonts.google.com/specimen/DM+Mono) — For all data labels, ALR scores, case IDs, timestamps, section eyebrows. `font-variant-numeric: tabular-nums` always active. `letter-spacing: 0.04–0.12em` depending on size.
- **Code:** DM Mono (same as data).

**Font loading (production):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,600;1,9..144,700&family=IBM+Plex+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap">
```

**Type scale:**

| Level | Font | Size | Weight | Letter-spacing | Line-height |
|-------|------|------|--------|---------------|-------------|
| H1 | IBM Plex Sans | `clamp(36px, 4vw, 52px)` | 900 | -1.5px | 1.04 |
| H2 | IBM Plex Sans | `clamp(24px, 2.8vw, 36px)` | 800 | -0.5px | 1.1 |
| H3 | IBM Plex Sans | 24px | 700 | -0.3px | 1.2 |
| H4 | IBM Plex Sans | 18px | 600 | normal | 1.3 |
| Tagline | Fraunces italic | `clamp(18px, 2.2vw, 26px)` | 300 | -0.02em | 1.25 |
| Body | IBM Plex Sans | 16px | 400 | normal | 1.75 |
| Small | IBM Plex Sans | 13px | 400 | normal | 1.6 |
| Label | DM Mono | 10px | 500 | 0.1em (uppercase) | — |
| Data | DM Mono | 10–14px | 400–500 | 0.04–0.08em | — |

**Rules:**
- `text-wrap: balance` on all headings.
- `text-wrap: pretty` on body paragraphs.
- `font-variant-numeric: tabular-nums` on all numeric data.
- No italic Fraunces below 16px.
- No DM Mono for body copy — only labels, data, and eyebrows.

---

## Color

```css
:root {
  /* Backgrounds — warm document palette */
  --bg:        #F5F1E8;  /* Parchment — primary page bg */
  --bg2:       #EDE9DF;  /* Parchment 2 — alternating section bg */
  --bg3:       #E5E0D5;  /* Parchment 3 — subtle hover/active */
  --white:     #FFFFFF;  /* Cards, score card, explicit white */

  /* Brand accents */
  --terra:     #C96A3D;  /* Primary CTA, rules, highlights. Own this color. */
  --terra2:    #B05A30;  /* Terra hover/active state */

  /* Institutional depth */
  --navy:      #0A192F;  /* Hero sections, dark surfaces, primary text */
  --navy2:     #0D2137;  /* Navy hover state */

  /* Semantic — land risk signals */
  --emerald:   #1A7A5E;  /* Positive: clear title, verified, no encumbrances */
  --emerald2:  #22C55E;  /* Bright emerald — progress bars, live indicators */
  --spark:     #3ED598;  /* Live/active indicators against dark backgrounds */
  --amber:     #B45309;  /* Caution: pending, under review, incomplete */
  --danger:    #991B1B;  /* Risk: litigation found, encumbrance detected */

  /* Text hierarchy */
  --ink:       #0A192F;  /* Primary text — same as navy for unity */
  --mid:       #4A6080;  /* Secondary text — body copy */
  --sub:       #7A8FA8;  /* Tertiary text — labels, hints, metadata */

  /* Structure */
  --rule:      #E2E8F0;  /* Primary dividers, card borders */
  --rule2:     #CBD5E1;  /* Stronger dividers, input borders */

  /* Links */
  --link:         #1A7A5E;  /* Emerald — trustworthy, document-like */
  --link-visited: #7A4E2D;  /* Terra-dark — distinguishes visited state */
  --link-hover:   #C96A3D;  /* Terra — interactive feedback */

  /* Dark mode surfaces (for hero sections and final CTA) */
  --dark-bg:     #0A192F;
  --dark-bg2:    #0D2137;
  --dark-surface:#1A2D45;
  --dark-rule:   rgba(255, 255, 255, 0.08);
  --dark-text:   #E0E0E0;  /* Off-white, never pure white */
  --dark-sub:    rgba(255, 255, 255, 0.4);
}
```

**Color rules:**
- Terra (`#C96A3D`) is the ONLY primary CTA color. Never use navy or emerald for buttons.
- Parchment (`#F5F1E8`) is the default page background. Do not use white as default bg.
- Emerald signals are positive land outcomes only — not generic "success."
- Amber signals are caution/pending only — not generic warnings.
- Dark sections (hero, final CTA) use navy bg with off-white text (`#E0E0E0`).
- Accent desaturation in dark context: use `rgba(62,213,152,0.8)` spark instead of full `#3ED598` against dark.

---

## Spacing

8px base unit. Comfortable density — institutional documents breathe.

```css
--sp-2xs: 2px;
--sp-xs:  4px;
--sp-sm:  8px;
--sp-md:  16px;
--sp-lg:  24px;
--sp-xl:  32px;
--sp-2xl: 48px;
--sp-3xl: 64px;
```

- Section padding: `64px` top/bottom, `52px` left/right (or clamp equivalent).
- Card internal padding: `24–28px`.
- Max content width: `1200px`.
- No arbitrary spacing values — always multiples of 8.

---

## Layout

- **Approach:** Hybrid — editorial-bold for hero sections, grid-disciplined for data sections.
- **Grid:** 12-column at desktop (1280px+), 8-column at tablet (768px), single column at mobile (375px).
- **Max content width:** `1200px` with auto margins.
- **Hero rule:** First viewport reads as one composition. Brand + headline + one supporting line + one CTA group + one product widget. Nothing else.
- **Section rule:** One job per section. One headline, one supporting sentence, one content element. No sections that try to do two things.

**Border radius hierarchy:**
```css
--r-sm:   4px;   /* Badges, small tags */
--r-md:   8px;   /* Buttons, inputs */
--r-lg:   12px;  /* Cards */
--r-xl:   16px;  /* Score card, large cards, modals */
--r-full: 9999px; /* Pills: nav CTA, tags, status badges */
```

Do not apply uniform radius to everything. Cards are `xl`, buttons are `md`, badges are `sm` or `full`. Hierarchy matters.

---

## Motion

- **Approach:** Intentional-minimal — every animation communicates something. No ornamental motion.

```css
/* Easing */
--ease-out:   cubic-bezier(0.0, 0.0, 0.2, 1);   /* Elements entering */
--ease-in:    cubic-bezier(0.4, 0.0, 1, 1);      /* Elements exiting */
--ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1);   /* Elements moving */

/* Duration */
--dur-micro:  75ms;   /* Instant feedback: button active state */
--dur-short:  200ms;  /* Hover states, color transitions */
--dur-medium: 350ms;  /* Entrance animations, card hovers */
--dur-long:   500ms;  /* Score card count-up, page transitions */
```

**Planned animations:**
- Hero entrance: H1 fade-in + `translateY(-8px)` at 350ms ease-out, staggered 100ms after eyebrow.
- Score card: fade-in + `translateX(12px)` at 400ms ease-out, delayed 200ms after hero text.
- ALR score count-up: `0 → 603` in 500ms ease-out on first viewport entry.
- Card hover: `translateY(-2px)` + box-shadow increase at 200ms ease-out.

**Rules:**
- Only animate `transform` and `opacity`. Never animate `height`, `width`, `top`, `left`.
- No `transition: all` — list properties explicitly.
- `prefers-reduced-motion`: all animations must degrade to instant state change.
- Nav items: `color` transition 200ms only. No slide-in menus without product need.

---

## Component Conventions

**Buttons:**
- Primary: terra background, white text, `r-md` radius, 700 weight.
- Secondary: transparent, rule2 border, `r-md` radius.
- Pill/CTA (nav): terra or navy, `r-full` radius.
- Ghost: no border, mid text, bg change on hover.
- Hover: always defined. `background: var(--terra2)` for primary.

**Forms:**
- Label always visible above the input — never placeholder-as-label.
- Focus ring: `border-color: var(--terra)` + `box-shadow: 0 0 0 3px rgba(201,106,61,0.12)`.
- Error state: `border-color: var(--danger)` + error text below, 13px, danger color.

**Section eyebrows:**
- DM Mono, 10px, `--terra` color, 0.1em letter-spacing, uppercase.
- Always have a horizontal line rule before the text (`::before` pseudo-element, 18px wide, terra color).

**Score card / data widgets:**
- Always on white background.
- Header section uses `var(--bg)` (parchment), not white.
- Footer uses `var(--bg)` for the timestamp/ID row.
- Live indicators use `--spark` against dark, `--emerald2` against light.

---

## AI Slop Anti-Patterns (never use)

These are explicitly banned from Akuuva pages:

1. Purple/violet gradients.
2. 3-column feature grid with icons in colored circles.
3. Centered everything (text-align: center on body copy).
4. Uniform bubbly border-radius on all elements.
5. Gradient CTA buttons.
6. Decorative blobs, wavy SVG dividers, floating circles.
7. Emoji as design elements.
8. Colored left-border on cards.
9. Generic hero copy ("Welcome to", "Unlock the power of", "Your all-in-one solution").
10. Cookie-cutter section rhythm where every section is the same visual weight.

---

## Page Templates (for future marketing pages)

**Pricing page:**
- Three tiers: Starter / Professional (featured, navy bg) / Enterprise.
- Terra CTA on light cards. White CTA on navy featured card.
- Stats below fold: turnaround comparison, SLA numbers.
- Quote section at bottom (reuse from homepage pattern).

**How it Works page:**
- Step-by-step flow, not a card grid.
- Each step: large step number (Fraunces italic), heading, body, technical detail.
- Alternating layout (text left/right) — not uniform left-aligned cards.

**About page:**
- Minimal. Advocate panel bios with enrollment numbers.
- Company founding context — why this problem matters.
- No stock photos of teams. Real advocate credentials only.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-16 | Warm parchment background as primary page bg | Deliberate category differentiation — every Indian proptech uses white. Parchment reads as document substrate, evokes land records. |
| 2026-04-16 | Fraunces (serif) for display, IBM Plex Sans for UI | Fraunces evokes legal/document weight; IBM Plex Sans is authoritative without being Inter-generic. |
| 2026-04-16 | Terra (#C96A3D) as sole CTA color | Nobody in Indian proptech/fintech uses this. Distinctive and warm. Tested against navy bg at sufficient contrast. |
| 2026-04-16 | No imagery rule | Score card widget is the product demo. Stock photos of handshaking executives would undermine credibility with the target buyer. |
| 2026-04-16 | Emerald for positive signals (not generic green) | Land title positive outcomes are specific — "clear", "verified", "no encumbrances". Emerald reads more institutional than lime/mint. |
| 2026-04-16 | DM Mono for all data labels | Tabular-nums support, clear data hierarchy, differentiates data content from body copy without looking like code. |
| 2026-04-16 | Link convention: emerald default, terra-dark visited | Establishes a clear visited state (required by WCAG) using palette colors. |
| 2026-04-16 | Initial design system created via /design-consultation | Based on research of Indian proptech, US title search platforms, and institutional fintech design. |

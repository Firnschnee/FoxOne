# FoxOne «grafik» Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the docs/ GitHub-Pages site in the Swiss-catalogue style of the grafik reference, native dark (screenshot palette), amber accent instead of red.

**Architecture:** Static Jekyll site served from `docs/` on `main`. `index.html` is standalone HTML, `installation.md`/`customisation.md`/`action.html` render through `_layouts/default.html`. One shared `style.css` (complete rewrite), one small `js/main.js` (raster overlay + load choreography), Instrument Sans self-hosted in `docs/fonts/`.

**Tech Stack:** Plain HTML/CSS/JS, GitHub Pages Jekyll (kramdown), no build step, no libraries.

**Spec:** `docs/superpowers/specs/2026-08-04-grafik-redesign-design.md`

## Global Constraints

- Palette exactly as in the spec: `--grund #1b1815`, `--creme #d9d3c8`, `--stahl #938d84`, `--silber #6e6961`, `--hair #38332d`, `--amber #d79921`, `--amber-text #fabd2f`. Amber in two steps: surfaces use `--amber`, small colored text uses `--amber-text`.
- 12-column grid, 24px gutter, 24px baseline, `max-width 1360px`. Base type 16.5px/24px.
- One typeface: Instrument Sans (self-hosted woff2, weight range 400 to 700). No italics anywhere (`em` renders upright at weight 600).
- Lowercase styling only for headline, nav, section titles, captions, meta lines. Body prose keeps normal capitalization.
- No em-dash (U+2014) anywhere, in code, copy or commits. Use en-dash (–) or restructure.
- Site copy is English.
- All motion sits behind `html.js` gating and is killed by one `prefers-reduced-motion: reduce` block at the end of style.css.
- Commit after every task. Do NOT push: pushing publishes the live site. The push happens only after Max has seen the screenshots and given the go (Task 6).

---

### Task 1: Self-hosted Instrument Sans

**Files:**
- Create: `docs/fonts/InstrumentSans-01.woff2` (download)
- Create: `docs/fonts/InstrumentSans-02.woff2` (download)
- Create: `docs/fonts/InstrumentSans.css`
- Create: `docs/fonts/OFL.txt` (download)

**Interfaces:**
- Produces: `fonts/InstrumentSans.css` defining `font-family: 'Instrument Sans'` (weights 400 to 700, latin + latin-ext). Later tasks link it via `<link rel="stylesheet" href="fonts/InstrumentSans.css">` and preload `fonts/InstrumentSans-02.woff2`.

- [ ] **Step 1: Download the two woff2 files and the OFL license**

```bash
cd C:/Dev/FoxOne/docs
mkdir -p fonts
curl -sL https://guywithtwocats.github.io/TheGallery/sites/grafik/fonts/InstrumentSans-01.woff2 -o fonts/InstrumentSans-01.woff2
curl -sL https://guywithtwocats.github.io/TheGallery/sites/grafik/fonts/InstrumentSans-02.woff2 -o fonts/InstrumentSans-02.woff2
curl -sL https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt -o fonts/OFL.txt
```

- [ ] **Step 2: Verify the downloads are real woff2, not error pages**

Run: `file fonts/InstrumentSans-01.woff2 fonts/InstrumentSans-02.woff2 && head -3 fonts/OFL.txt`
Expected: both report `Web Open Font Format (Version 2)` (or at minimum sizes of roughly 15 to 40 KB each via `wc -c`), OFL.txt starts with `Copyright 2022 The Instrument Sans Project Authors`.

- [ ] **Step 3: Write `docs/fonts/InstrumentSans.css`**

```css
/* Instrument Sans – variable weight 400-700, SIL OFL 1.1 (see OFL.txt) */
/* latin-ext */
@font-face {
  font-family: 'Instrument Sans';
  font-style: normal;
  font-weight: 400 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(./InstrumentSans-01.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Instrument Sans';
  font-style: normal;
  font-weight: 400 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(./InstrumentSans-02.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

- [ ] **Step 4: Commit**

```bash
git add docs/fonts
git commit -m "Site: self-host Instrument Sans (OFL)"
```

---

### Task 2: style.css complete rewrite

**Files:**
- Rewrite: `docs/style.css` (full replacement, old content discarded)

**Interfaces:**
- Consumes: `'Instrument Sans'` from Task 1.
- Produces: every class the HTML tasks use. Layout primitives `.wrap`, `.g`. Topbar `.top`, `.top-in`, `.brand`, `.topnav`, `.raster-btn`. Masthead `.mast`, `.rule`, `.m-title`, `.dot`, `.m-clip`, `.m-line`, `.m-sub`, `.m-langs` (`.l-1/.l-2/.l-3`), `.m-meta`, `.m-lead`, `.m-dim`, `.m-cta`, `.btn`, `.btn--ghost`. Media `.frame`, `.grain-overlay`, `.preview`. Essay `.essay`, `.essay-g`, `.col-a`, `.col-b`, `.invite`, `.kbd-g`. Wall `.wall`, `.wall-intro`, `.wand`, `.werk`, `.werk-thumb`, `.cap` (`.cat/.ttl/.who`). Footer `.foot`, `.f-mark`, `.f-sep`, `.f-col`, `.f-fine`. Doc pages `.doc-main`, `.doc`. Raster `.raster`, `.raster-chip`, `.bund-24`, `.bund-16`. State hooks: `html.js`, `html.js.loaded`, `html[data-raster="on"]`.

- [ ] **Step 1: Replace `docs/style.css` with the following, in full**

```css
/* ============================================================
   FoxOne site – swiss catalogue style, native dark
   Warm near-black · cream · amber
   One grotesque. Twelve columns. 24px baseline.
   ============================================================ */

:root {
  --grund:   #1b1815;  /* page ground, warm near-black */
  --flaeche: #211d19;  /* raised band: wall section, inline code */
  --tief:    #141110;  /* sunk: footer, code blocks */
  --creme:   #d9d3c8;  /* body text, headline */
  --stahl:   #938d84;  /* secondary text */
  --silber:  #6e6961;  /* tertiary, fine print */
  --hair:    #38332d;  /* hairlines, borders */
  --amber:      #d79921;  /* accent surfaces: rule, dot, raster, buttons */
  --amber-text: #fabd2f;  /* accent for small text, lighter step */

  --gutter: 24px;
  --marg: clamp(20px, 4.5vw, 72px);
  --maxw: 1360px;
  --sect: clamp(72px, 9vw, 136px);

  --sans: 'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --mono: ui-monospace, 'Cascadia Code', Consolas, monospace;
  --ease: cubic-bezier(0.32, 0, 0.06, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scrollbar-gutter: stable; scrollbar-color: var(--silber) var(--grund); }

/* sticky bar must never cover a section's first line */
section[id], main[id], h1[id], h2[id], h3[id] { scroll-margin-top: 81px; }

body {
  position: relative;
  font-family: var(--sans);
  font-size: 16.5px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: -0.006em;
  color: var(--creme);
  background: var(--grund);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection { background: var(--amber); color: var(--grund); }

a { color: inherit; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
kbd { font-family: var(--sans); }
/* the style never slanted a letter in its life */
em { font-style: normal; font-weight: 600; }
img { display: block; width: 100%; height: auto; }
code, pre { font-family: var(--mono); font-size: 0.92em; }
:not(pre) > code { background: var(--flaeche); border: 1px solid var(--hair); padding: 1px 5px; }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--grund); }
::-webkit-scrollbar-thumb { background: var(--silber); border: 2px solid var(--grund); }
::-webkit-scrollbar-thumb:hover { background: var(--amber); }

:focus-visible { outline: 2px solid var(--amber); outline-offset: 4px; }

.svgdefs { position: absolute; width: 0; height: 0; overflow: hidden; }

/* ---------- grid primitives ---------- */
.wrap { max-width: var(--maxw); margin-inline: auto; padding-inline: var(--marg); }
.g { display: grid; grid-template-columns: repeat(12, 1fr); column-gap: var(--gutter); }

/* ---------- top bar ---------- */
.top {
  position: sticky; top: 0; z-index: 100;
  background: var(--grund);
  border-bottom: 1px solid var(--hair);
}
.top-in { display: flex; align-items: center; gap: 32px; height: 56px; }
.brand { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; text-decoration: none; }
.topnav { display: flex; gap: 26px; margin-left: auto; }
.topnav a { font-size: 14px; color: var(--stahl); text-decoration: none; padding: 4px 0; }
.topnav a:hover { color: var(--creme); box-shadow: 0 2px 0 0 var(--amber); }

.raster-btn {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--amber); color: var(--amber-text);
  font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
  padding: 7px 12px;
  transition: background 120ms linear, color 120ms linear;
}
.raster-btn kbd {
  font-size: 11px; font-weight: 600; line-height: 1;
  border: 1px solid currentColor; padding: 2px 5px 3px;
}
.raster-btn:hover, .raster-btn[aria-pressed="true"] { background: var(--amber); color: var(--grund); }
html:not(.js) .raster-btn { display: none; }

/* ---------- masthead ---------- */
.mast { padding-top: clamp(36px, 5vw, 72px); padding-bottom: var(--sect); }

.rule { height: 8px; background: var(--amber); margin-bottom: clamp(28px, 3.5vw, 56px); }

.m-title {
  font-size: clamp(80px, 16.5vw, 240px);
  line-height: 0.92;
  font-weight: 700;
  letter-spacing: -0.045em;
  margin-left: -0.05em; /* optical flush left */
}
.m-title .dot {
  display: inline-block;
  width: 0.13em; height: 0.13em;
  background: var(--amber);
  margin-left: 0.05em;
}

.m-clip { display: block; overflow: hidden; }
.m-line { display: block; }

.m-sub { margin-top: clamp(32px, 4vw, 64px); row-gap: 24px; }
.m-langs { grid-column: 1 / 8; }
.m-langs p { font-size: clamp(19px, 2.2vw, 29px); line-height: 1.31; letter-spacing: -0.02em; }
.m-langs .l-1 { font-weight: 600; }
.m-langs .l-2, .m-langs .l-3 { color: var(--stahl); }

.m-meta { grid-column: 9 / 13; font-size: 16.5px; line-height: 24px; }
.m-lead { color: var(--amber-text); font-weight: 700; font-size: 22px; line-height: 24px; margin-bottom: 8px; letter-spacing: -0.01em; }
.m-dim { color: var(--stahl); margin-top: 6px; }

.m-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: clamp(28px, 3.5vw, 48px); }
.btn {
  display: inline-block;
  border: 1px solid var(--amber); color: var(--amber-text);
  font-size: 14px; font-weight: 600;
  padding: 10px 18px; text-decoration: none;
  transition: background 120ms linear, color 120ms linear, border-color 120ms linear;
}
.btn:hover { background: var(--amber); color: var(--grund); }
.btn--ghost { border-color: var(--hair); color: var(--stahl); }
.btn--ghost:hover { background: none; border-color: var(--stahl); color: var(--creme); }

/* load choreography (gated behind .js so no-JS users see everything) */
.js .rule { transform: scaleX(0); transform-origin: 0 50%; }
.js .m-line { transform: translateY(110%); }
.js .m-meta, .js .m-cta { opacity: 0; }
.js.loaded .rule { transform: scaleX(1); transition: transform 620ms var(--ease); }
.js.loaded .m-line { transform: none; transition: transform 560ms var(--ease); }
.js.loaded .m-title .m-line { transition-delay: 100ms; }
.js.loaded .m-langs p:nth-child(1) .m-line { transition-delay: 220ms; }
.js.loaded .m-langs p:nth-child(2) .m-line { transition-delay: 280ms; }
.js.loaded .m-langs p:nth-child(3) .m-line { transition-delay: 340ms; }
.js.loaded .m-meta, .js.loaded .m-cta { opacity: 1; transition: opacity 480ms var(--ease) 520ms; }
/* the amber full stop lands last – the sentence ends */
.js .m-title .dot { transform: scale(0); transform-origin: 0 100%; }
.js.loaded .m-title .dot { transform: scale(1); transition: transform 200ms var(--ease) 680ms; }

/* ---------- section headings ---------- */
h2 {
  font-size: clamp(30px, 3.4vw, 46px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: clamp(36px, 4vw, 64px);
}
h2 .en { color: var(--stahl); font-weight: 400; }

/* ---------- framed media + grain ---------- */
.frame { position: relative; border: 1px solid var(--hair); }
.grain-overlay {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  opacity: 0.35;
  pointer-events: none;
}

.preview { padding-bottom: var(--sect); }

/* ---------- essay ---------- */
.essay { padding-bottom: var(--sect); }
.essay-g { row-gap: 24px; }
.col-a { grid-column: 1 / 7; }
.col-b { grid-column: 7 / 13; }
.essay p + p { margin-top: 24px; }
.essay .col-a p, .essay .col-b p { max-width: 62ch; }

.invite { grid-column: 1 / 8; margin-top: clamp(48px, 6vw, 96px); max-width: 62ch; color: var(--stahl); }
.kbd-g {
  display: inline-block;
  font-size: 13px; font-weight: 700; line-height: 1;
  color: var(--amber-text);
  border: 1px solid var(--amber);
  padding: 3px 7px 4px;
  transform: translateY(-1px);
  transition: background 120ms linear, color 120ms linear;
}
button.kbd-g:hover, button.kbd-g[aria-pressed="true"] { background: var(--amber); color: var(--grund); }

/* ---------- the wall (in action) ---------- */
.wall { background: var(--flaeche); padding-block: var(--sect); }
.wall-intro { grid-column: 1 / 8; max-width: 62ch; margin-bottom: clamp(48px, 5vw, 80px); }

.wand { row-gap: clamp(48px, 5vw, 72px); }
.werk { grid-column: span 4; }

.werk-thumb {
  display: block; width: 100%;
  text-decoration: none;
  outline: 1px solid transparent;
  outline-offset: 6px;
  transition: outline-color 120ms linear;
}
.werk-thumb:hover { outline-color: var(--amber); }
.werk-thumb:focus-visible { outline: 2px solid var(--amber); outline-offset: 6px; }

.cap { margin-top: 14px; display: grid; gap: 1px; }
.cap .cat {
  color: var(--amber-text); font-size: 11.5px; font-weight: 600;
  letter-spacing: 0.04em; font-variant-numeric: tabular-nums;
}
.cap .ttl { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.cap .who { font-size: 13px; color: var(--stahl); }

/* ---------- footer ---------- */
.foot {
  background: var(--tief); color: var(--stahl);
  border-top: 1px solid var(--hair);
  padding-block: clamp(64px, 7vw, 104px);
}
.foot .g { row-gap: 40px; }
.f-mark {
  grid-column: 1 / 13;
  color: var(--creme); font-size: clamp(20px, 2.2vw, 28px);
  font-weight: 600; letter-spacing: -0.02em;
}
.f-sep { color: var(--amber); }
.f-col { grid-column: span 5; font-size: 14.5px; line-height: 22px; }
.f-col:last-child { grid-column: span 6; }
.f-col p + p { margin-top: 16px; }
.f-col a { color: var(--amber-text); text-decoration: none; }
.f-col a:hover { text-decoration: underline; }
.f-fine { color: var(--silber); }

/* ---------- doc pages (markdown + action) ---------- */
.doc-main { padding-block: clamp(36px, 5vw, 72px) var(--sect); }
.doc { grid-column: 1 / 9; }
.doc h1 {
  font-size: clamp(44px, 6vw, 84px);
  line-height: 1; font-weight: 700; letter-spacing: -0.04em;
  margin-bottom: clamp(28px, 4vw, 56px);
}
.doc h2 {
  font-size: clamp(24px, 2.6vw, 34px);
  margin-top: clamp(40px, 5vw, 64px); margin-bottom: 20px;
}
.doc h3 {
  color: var(--amber-text);
  font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
  margin-top: 40px; margin-bottom: 12px;
}
.doc p { max-width: 68ch; }
.doc p + p, .doc p + ul, .doc ul + p { margin-top: 16px; }
.doc ul, .doc ol { padding-left: 22px; margin-top: 12px; max-width: 68ch; }
.doc li + li { margin-top: 6px; }
.doc a { color: var(--amber-text); text-decoration: none; }
.doc a:hover { text-decoration: underline; }
.doc strong { font-weight: 600; }
.doc pre {
  background: var(--tief); border: 1px solid var(--hair);
  padding: 16px 20px; overflow-x: auto; margin-block: 16px;
}
.doc blockquote {
  border-left: 2px solid var(--amber);
  padding: 4px 0 4px 20px;
  color: var(--stahl);
  margin-block: 24px;
}
.doc blockquote p { max-width: 60ch; }
.doc hr { border: 0; border-top: 1px solid var(--hair); margin-block: 32px; }
.doc .frame { margin-top: 32px; }
.doc .cap { margin-bottom: clamp(40px, 5vw, 64px); }

/* ============================================================
   THE GRID – amber hairlines, toggled with G
   ============================================================ */
.raster {
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 140;
  opacity: 0; visibility: hidden;
  transition: opacity 120ms linear, visibility 0s linear 120ms;
}
html[data-raster="on"] .raster {
  opacity: 1; visibility: visible;
  transition: opacity 120ms linear;
}
.raster .lines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(215, 153, 33, 0.13) 0 1px,
    transparent 1px 24px
  );
  opacity: 0;
}
.raster .wrap { height: 100%; }
.raster .g { height: 100%; }
.raster i {
  display: block; height: 100%;
  border-inline: 1px solid rgba(215, 153, 33, 0.5);
  background: rgba(215, 153, 33, 0.04);
  opacity: 0;
  transform: scaleY(0);
  transform-origin: 50% 0;
}
/* ON: twelve columns rule down in sequence, then the baseline settles */
html[data-raster="on"] .raster i {
  opacity: 1; transform: none;
  transition: transform 300ms var(--ease), opacity 160ms var(--ease);
}
html[data-raster="on"] .raster i:nth-child(1)  { transition-delay: 0ms; }
html[data-raster="on"] .raster i:nth-child(2)  { transition-delay: 22ms; }
html[data-raster="on"] .raster i:nth-child(3)  { transition-delay: 44ms; }
html[data-raster="on"] .raster i:nth-child(4)  { transition-delay: 66ms; }
html[data-raster="on"] .raster i:nth-child(5)  { transition-delay: 88ms; }
html[data-raster="on"] .raster i:nth-child(6)  { transition-delay: 110ms; }
html[data-raster="on"] .raster i:nth-child(7)  { transition-delay: 132ms; }
html[data-raster="on"] .raster i:nth-child(8)  { transition-delay: 154ms; }
html[data-raster="on"] .raster i:nth-child(9)  { transition-delay: 176ms; }
html[data-raster="on"] .raster i:nth-child(10) { transition-delay: 198ms; }
html[data-raster="on"] .raster i:nth-child(11) { transition-delay: 220ms; }
html[data-raster="on"] .raster i:nth-child(12) { transition-delay: 242ms; }
html[data-raster="on"] .raster .lines {
  opacity: 1;
  transition: opacity 240ms var(--ease) 330ms;
}
/* the columns are counted, like any honest system */
.raster i::before {
  position: sticky; top: 64px;
  display: block;
  padding: 3px 0 0 5px;
  font-size: 10px; font-weight: 600; line-height: 1;
  color: var(--amber-text);
  font-variant-numeric: tabular-nums;
}
.raster i:nth-child(1)::before  { content: "01"; }
.raster i:nth-child(2)::before  { content: "02"; }
.raster i:nth-child(3)::before  { content: "03"; }
.raster i:nth-child(4)::before  { content: "04"; }
.raster i:nth-child(5)::before  { content: "05"; }
.raster i:nth-child(6)::before  { content: "06"; }
.raster i:nth-child(7)::before  { content: "07"; }
.raster i:nth-child(8)::before  { content: "08"; }
.raster i:nth-child(9)::before  { content: "09"; }
.raster i:nth-child(10)::before { content: "10"; }
.raster i:nth-child(11)::before { content: "11"; }
.raster i:nth-child(12)::before { content: "12"; }

.raster-chip {
  position: fixed; left: 16px; bottom: 16px; z-index: 150;
  background: var(--grund);
  border: 1px solid var(--amber);
  color: var(--amber-text);
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.01em;
  padding: 8px 12px;
  font-variant-numeric: tabular-nums;
  opacity: 0; visibility: hidden;
  transform: translateY(6px);
  transition: opacity 120ms linear, transform 120ms var(--ease), visibility 0s linear 120ms;
}
html[data-raster="on"] .raster-chip {
  opacity: 1; visibility: visible; transform: none;
  transition: opacity 140ms linear 420ms, transform 160ms var(--ease) 420ms;
}
.bund-16 { display: none; }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1080px) {
  .werk { grid-column: span 6; }
  .m-langs { grid-column: 1 / 13; }
  .m-meta { grid-column: 1 / 13; }
}

@media (max-width: 900px) {
  .col-a, .col-b { grid-column: 1 / 13; }
  .invite { grid-column: 1 / 13; }
  .wall-intro { grid-column: 1 / 13; }
  .werk { grid-column: 1 / 13; }
  .doc { grid-column: 1 / 13; }
  .f-col, .f-col:last-child { grid-column: 1 / 13; }
}

@media (max-width: 640px) {
  :root { --gutter: 16px; }
  .raster i::before { content: none !important; }
  .topnav { display: none; }
  .top-in { justify-content: space-between; }
  .bund-24 { display: none; }
  .bund-16 { display: inline; }
}

/* ============================================================
   REDUCED MOTION – everything appears, nothing flies
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
    animation-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "amber" docs/style.css` (expect > 20) and `grep -n $'\u2014' docs/style.css` (expect no hits: no em-dash).

- [ ] **Step 3: Commit**

```bash
git add docs/style.css
git commit -m "Site: rewrite style.css in the swiss-catalogue dark/amber style"
```

---

### Task 3: index.html + js/main.js

**Files:**
- Rewrite: `docs/index.html` (full replacement)
- Create: `docs/js/main.js`

**Interfaces:**
- Consumes: all classes from Task 2, `fonts/InstrumentSans.css` from Task 1.
- Produces: `js/main.js` expects `#rasterBtn` and any `[data-raster-toggle]` buttons, sets `html.loaded` and `html[data-raster]`. The layout task reuses the same script and markup patterns (topbar, raster overlay, chip, grain defs).

- [ ] **Step 1: Write `docs/js/main.js`**

```js
/* FoxOne site – raster toggle + load choreography. No libraries. */
(function () {
  'use strict';

  var html = document.documentElement;

  function loaded() { html.classList.add('loaded'); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(loaded); }
  setTimeout(loaded, 900);

  var toggles = Array.prototype.slice.call(
    document.querySelectorAll('#rasterBtn, [data-raster-toggle]')
  );
  function setRaster(on) {
    if (on) { html.setAttribute('data-raster', 'on'); }
    else { html.removeAttribute('data-raster'); }
    toggles.forEach(function (b) { b.setAttribute('aria-pressed', String(on)); });
  }
  function toggleRaster() { setRaster(!html.hasAttribute('data-raster')); }
  toggles.forEach(function (b) { b.addEventListener('click', toggleRaster); });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'g' && e.key !== 'G') { return; }
    if (e.metaKey || e.ctrlKey || e.altKey) { return; }
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) { return; }
    toggleRaster();
  });
}());
```

- [ ] **Step 2: Replace `docs/index.html` with the following, in full**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FoxOne – minimalistic one-line userChrome.css theme for Firefox</title>
<meta name="description" content="FoxOne collapses the Firefox toolbar and tab bar into a single line. A minimalistic userChrome.css theme with Gruvbox colors, no extensions required.">
<link rel="canonical" href="https://firnschnee.github.io/FoxOne/">
<meta property="og:title" content="FoxOne – one-line userChrome.css theme for Firefox">
<meta property="og:description" content="Firefox toolbar and tabs in a single line. Gruvbox colors, ready for Nova.">
<meta property="og:image" content="https://firnschnee.github.io/FoxOne/assets/preview_cropped.png">
<meta property="og:url" content="https://firnschnee.github.io/FoxOne/">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1b1815">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="preload" as="font" type="font/woff2" href="fonts/InstrumentSans-02.woff2" crossorigin>
<link rel="stylesheet" href="fonts/InstrumentSans.css">
<link rel="stylesheet" href="style.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>

<!-- shared SVG defs (grain) -->
<svg class="svgdefs" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.82  0 0 0 0 0.78  0 0 0 0.5 0"/>
    </filter>
  </defs>
</svg>

<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="./">foxone</a>
    <nav class="topnav" aria-label="Pages">
      <a href="installation.html">installation</a>
      <a href="customisation.html">customisation</a>
      <a href="action.html">in action</a>
      <a href="https://github.com/Firnschnee/FoxOne">github</a>
    </nav>
    <button class="raster-btn" id="rasterBtn" aria-pressed="false" aria-label="Toggle the amber 12-column grid overlay (keyboard: G)">raster <kbd>g</kbd></button>
  </div>
</header>

<main id="main">

  <!-- ============ MASTHEAD ============ -->
  <section class="mast wrap" aria-label="FoxOne masthead">
    <div class="rule" aria-hidden="true"></div>
    <h1 class="m-title"><span class="m-clip"><span class="m-line">foxone<i class="dot" aria-hidden="true"></i></span></span></h1>
    <div class="m-sub g">
      <div class="m-langs">
        <p class="m-clip"><span class="m-line l-1">one line for everything</span></p>
        <p class="m-clip"><span class="m-line l-2">tabs, url bar and navigation in a single row</span></p>
        <p class="m-clip"><span class="m-line l-3">gruvbox colors · no extensions · nothing phoning home</span></p>
      </div>
      <div class="m-meta">
        <p class="m-lead">userchrome.css</p>
        <p>firefox 152+ · nova ui</p>
        <p>windows · macos · linux</p>
        <p class="m-dim">mit license · free and open source</p>
      </div>
    </div>
    <div class="m-cta">
      <a class="btn" href="installation.html">installation</a>
      <a class="btn btn--ghost" href="https://github.com/Firnschnee/FoxOne">github repo</a>
      <a class="btn btn--ghost" href="https://firnschnee.github.io/BirdOne/">thunderbird? birdone</a>
    </div>
  </section>

  <!-- ============ PREVIEW ============ -->
  <div class="preview wrap">
    <figure class="frame">
      <img src="assets/preview_cropped.png" width="1560" height="340" alt="FoxOne preview: Firefox with a single combined toolbar and tab line">
      <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
    </figure>
  </div>

  <!-- ============ THE THEME ============ -->
  <section class="essay wrap" id="theme" aria-labelledby="h-theme">
    <h2 id="h-theme"><span>the theme</span> <span class="en">– one line for everything</span></h2>
    <div class="g essay-g">
      <div class="col-a">
        <p>FoxOne merges the Firefox tab bar, URL bar and navigation buttons into a single toolbar row. The browser chrome shrinks to one line, and every website gets back the vertical space that a second and a third bar would normally take.</p>
        <p>The address bar shows only the page address by default and reveals its icons when you hover or type. What is usually a row of permanent buttons becomes a clean line that expands on demand.</p>
      </div>
      <div class="col-b">
        <p>The whole theme is one <code>userChrome.css</code> stylesheet plus an optional <code>userContent.css</code> for Firefox's internal pages – no extension, no background process, nothing phoning home. Toggles switch individual features on and off without touching the rest of the stylesheet.</p>
        <p>Every surface uses the warm Gruvbox palette, tuned for readability on Windows. All colors sit in CSS variables at the top of one file, so swapping in your own scheme is a small edit in one place.</p>
      </div>
    </div>
    <div class="g">
      <p class="invite">This page practises what the theme preaches: twelve columns, a 24-pixel baseline, one grotesque. Press <button type="button" class="kbd-g" data-raster-toggle aria-pressed="false" aria-label="Toggle the amber grid overlay">G</button>, or the raster button above, to see the skeleton drawn in amber.</p>
    </div>
  </section>

  <!-- ============ IN ACTION ============ -->
  <section class="wall" id="action" aria-labelledby="h-action">
    <div class="wrap">
      <h2 id="h-action"><span>in action</span> <span class="en">– the moving parts</span></h2>
      <div class="g">
        <p class="wall-intro">Three details, recorded in motion. Select any entry to open the full catalogue page.</p>
      </div>
      <div class="wand g">

        <article class="werk">
          <a class="werk-thumb" href="action.html" aria-label="Open the in-action page: dynamic URL bar">
            <span class="frame">
              <img src="assets/dynamic_url.gif" alt="URL bar expanding on focus with hover-reveal icons" loading="lazy">
              <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
            </span>
          </a>
          <p class="cap"><span class="cat">fx-01</span><span class="ttl">«dynamic url bar»</span><span class="who">clean by default · icons reveal on hover</span></p>
        </article>

        <article class="werk">
          <a class="werk-thumb" href="action.html" aria-label="Open the in-action page: dynamic tabs">
            <span class="frame">
              <img src="assets/dynamic_toolbar.gif" alt="Tab bar and toolbar icons revealing on hover" loading="lazy">
              <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
            </span>
          </a>
          <p class="cap"><span class="cat">fx-02</span><span class="ttl">«dynamic tabs»</span><span class="who">tucked by the hamburger · revealed on hover</span></p>
        </article>

        <article class="werk">
          <a class="werk-thumb" href="action.html" aria-label="Open the in-action page: floating find bar">
            <span class="frame">
              <img src="assets/findbar.gif" alt="Floating find bar in the top right corner" loading="lazy">
              <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
            </span>
          </a>
          <p class="cap"><span class="cat">fx-03</span><span class="ttl">«floating find bar»</span><span class="who">adapted from littlefox</span></p>
        </article>

      </div>
    </div>
  </section>

</main>

<footer class="foot">
  <div class="wrap g">
    <p class="f-mark">foxone <span class="f-sep">·</span> one line <span class="f-sep">·</span> firefox</p>
    <div class="f-col">
      <p>FoxOne is released under the <a href="https://github.com/Firnschnee/FoxOne/blob/main/LICENSE">MIT License</a>. Inspired by <a href="https://github.com/andreasgrafen/cascade">Cascade</a> and <a href="https://github.com/biglavis/LittleFox">LittleFox</a>.</p>
      <p>Also themed for Thunderbird: <a href="https://firnschnee.github.io/BirdOne/">BirdOne</a>.</p>
    </div>
    <div class="f-col">
      <p>This site is set in a single grotesque on twelve columns and a 24-pixel baseline. Press <button type="button" class="kbd-g" data-raster-toggle aria-pressed="false" aria-label="Toggle the amber grid overlay">G</button> to check our work.</p>
      <p class="f-fine">© 2026 firnschnee · foxone</p>
    </div>
  </div>
</footer>

<!-- ============ THE GRID ============ -->
<div class="raster" id="raster" aria-hidden="true">
  <div class="lines"></div>
  <div class="wrap g">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
</div>
<div class="raster-chip" aria-hidden="true">grid 12 columns · gutter <span class="bund-24">24</span><span class="bund-16">16</span> px · baseline 24 px · key g</div>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Serve locally and screenshot**

Start a static server on `docs/` (e.g. `python -m http.server 8123` in `C:/Dev/FoxOne/docs`, in the background or via the browser pane's launch config). Open `http://localhost:8123/` in the browser pane at 1280px width.
Check, with screenshots:
- headline «foxone.» fills the width without horizontal overflow (no page x-scrollbar)
- masthead animation runs once, dot lands last
- raster button and key G toggle the amber grid, chip appears bottom left
- grain is visible but subtle on the preview and the three cards
- footer band is darker than the page ground
Then resize to 375px (mobile): topnav hidden, CTA buttons wrap, cards stack full-width.
Fix what fails, re-check.

- [ ] **Step 4: Commit**

```bash
git add docs/index.html docs/js/main.js
git commit -m "Site: rebuild landing page as swiss catalogue masthead"
```

---

### Task 4: _layouts/default.html

**Files:**
- Rewrite: `docs/_layouts/default.html` (full replacement)

**Interfaces:**
- Consumes: `.top`/`.topnav`/`.raster-btn`, `.doc-main`/`.doc`, `.foot`, `.raster`, `.raster-chip` from Task 2, `js/main.js` from Task 3.
- Produces: layout wrapper for `installation.md`, `customisation.md`, `action.html`. Markdown content lands inside `<article class="doc">`.

- [ ] **Step 1: Replace `docs/_layouts/default.html` with the following, in full**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ page.title }} – FoxOne</title>
<meta name="description" content="{{ site.description }}">
<link rel="canonical" href="{{ page.url | absolute_url }}">
<meta name="theme-color" content="#1b1815">
<link rel="icon" type="image/svg+xml" href="{{ '/favicon.svg' | relative_url }}">
<link rel="preload" as="font" type="font/woff2" href="{{ '/fonts/InstrumentSans-02.woff2' | relative_url }}" crossorigin>
<link rel="stylesheet" href="{{ '/fonts/InstrumentSans.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/style.css' | relative_url }}">
<script>document.documentElement.classList.add('js');</script>
</head>
<body>

<svg class="svgdefs" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.82  0 0 0 0 0.78  0 0 0 0.5 0"/>
    </filter>
  </defs>
</svg>

<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="{{ '/' | relative_url }}">foxone</a>
    <nav class="topnav" aria-label="Pages">
      <a href="{{ '/installation.html' | relative_url }}">installation</a>
      <a href="{{ '/customisation.html' | relative_url }}">customisation</a>
      <a href="{{ '/action.html' | relative_url }}">in action</a>
      <a href="https://github.com/Firnschnee/FoxOne">github</a>
    </nav>
    <button class="raster-btn" id="rasterBtn" aria-pressed="false" aria-label="Toggle the amber 12-column grid overlay (keyboard: G)">raster <kbd>g</kbd></button>
  </div>
</header>

<main class="doc-main wrap" id="main">
  <div class="g">
    <article class="doc">
{{ content }}
    </article>
  </div>
</main>

<footer class="foot">
  <div class="wrap g">
    <p class="f-mark">foxone <span class="f-sep">·</span> one line <span class="f-sep">·</span> firefox</p>
    <div class="f-col">
      <p>FoxOne is released under the <a href="https://github.com/Firnschnee/FoxOne/blob/main/LICENSE">MIT License</a>. Inspired by <a href="https://github.com/andreasgrafen/cascade">Cascade</a> and <a href="https://github.com/biglavis/LittleFox">LittleFox</a>.</p>
      <p>Also themed for Thunderbird: <a href="https://firnschnee.github.io/BirdOne/">BirdOne</a>.</p>
    </div>
    <div class="f-col">
      <p>This site is set in a single grotesque on twelve columns and a 24-pixel baseline. Press <button type="button" class="kbd-g" data-raster-toggle aria-pressed="false" aria-label="Toggle the amber grid overlay">G</button> to check our work.</p>
      <p class="f-fine">© 2026 firnschnee · foxone</p>
    </div>
  </div>
</footer>

<div class="raster" id="raster" aria-hidden="true">
  <div class="lines"></div>
  <div class="wrap g">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
</div>
<div class="raster-chip" aria-hidden="true">grid 12 columns · gutter <span class="bund-24">24</span><span class="bund-16">16</span> px · baseline 24 px · key g</div>

<script src="{{ '/js/main.js' | relative_url }}"></script>
</body>
</html>
```

- [ ] **Step 2: Verify Liquid stayed intact**

Run: `grep -c "relative_url" docs/_layouts/default.html`
Expected: 9 (favicon, font preload, two stylesheets, brand, three page links, script). Also confirm `page.title`, `site.description` and `{{ content }}` are present.

- [ ] **Step 3: Commit**

```bash
git add docs/_layouts/default.html
git commit -m "Site: rebuild default layout with catalogue topbar and footer"
```

---

### Task 5: action.html rewrite

**Files:**
- Rewrite: `docs/action.html` (full replacement, keeps Jekyll front matter)

**Interfaces:**
- Consumes: `.doc` context from the layout (content sits in `article.doc`), `.frame`/`.grain-overlay`/`.cap` from Task 2.

- [ ] **Step 1: Replace `docs/action.html` with the following, in full**

```html
---
layout: default
title: See it in action
---

<h1>in action<i class="dot" aria-hidden="true" style="display:inline-block;width:0.13em;height:0.13em;background:var(--amber);margin-left:0.05em;"></i></h1>

<p>The three moving parts of FoxOne, recorded as they behave in daily use. All of it is CSS: there is no script running in the browser chrome.</p>

<figure class="frame">
  <img src="assets/dynamic_url.gif" alt="URL bar expanding on focus with hover-reveal icons" loading="lazy">
  <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
</figure>
<p class="cap"><span class="cat">fx-01</span><span class="ttl">«dynamic url bar»</span><span class="who">clean by default · icons reveal on hover or focus</span></p>

<figure class="frame">
  <img src="assets/dynamic_toolbar.gif" alt="Tab bar and toolbar icons revealing on hover" loading="lazy">
  <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
</figure>
<p class="cap"><span class="cat">fx-02</span><span class="ttl">«dynamic tabs»</span><span class="who">tabs and pinned addons revealed on hover · tucked by the hamburger</span></p>

<figure class="frame">
  <img src="assets/findbar.gif" alt="Floating find bar in the top right corner" loading="lazy">
  <svg class="grain-overlay" aria-hidden="true" focusable="false"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
</figure>
<p class="cap"><span class="cat">fx-03</span><span class="ttl">«floating find bar»</span><span class="who">adapted from <a href="https://github.com/biglavis/LittleFox">littlefox</a></span></p>
```

Note: the inline style on the `.dot` is deliberate – `.m-title .dot` is masthead-scoped and this h1 sits in `.doc`. If it looks wrong in verification, drop the dot from the h1 instead of restyling.

- [ ] **Step 2: Commit**

```bash
git add docs/action.html
git commit -m "Site: rebuild action page as catalogue entries"
```

---

### Task 6: Verification, review gate, push

**Files:**
- Possibly modify: any file from Tasks 1 to 5 (fixes)

- [ ] **Step 1: Full local pass on index.html**

Serve `docs/` statically (as in Task 3). Screenshot desktop (1280) and mobile (375), light on the checks already done, plus:
- keyboard: Tab reaches brand, nav, raster button, CTA buttons, card links, G buttons. Focus ring is amber.
- `prefers-reduced-motion`: emulate via devtools or resize check only – at minimum confirm the reduce block is last in style.css.
- no console errors.

- [ ] **Step 2: Structural check of the Jekyll pages**

The Liquid pages cannot render without Jekyll. Verify structurally instead: front matter intact (`layout: default`, `title:`) in `installation.md`, `customisation.md`, `action.html`, and every class used in `action.html`/layout exists in `style.css`:

```bash
cd C:/Dev/FoxOne
for c in doc-main doc frame grain-overlay cap cat ttl who raster-chip; do grep -q "\.$c" docs/style.css && echo "ok .$c" || echo "MISSING .$c"; done
```

Expected: nine lines of `ok`.

- [ ] **Step 3: Present screenshots to Max, wait for go**

Show the desktop and mobile screenshots. This is the review gate: do not push until Max approves. If he wants tweaks (amber tone, headline size, copy), apply, re-screenshot, re-commit.

- [ ] **Step 4: Push (after the go)**

```bash
git push
```

Then verify live: `https://firnschnee.github.io/FoxOne/` plus `/installation.html`, `/customisation.html`, `/action.html` render with the new layout (GitHub Pages build takes a minute or two). Check the two md pages specifically: headings, code blocks, the blockquote callout on installation.

---

## Self-Review Notes

- Spec coverage: palette (T2 tokens), typography (T1+T2), masthead/preview/essay/wand/footer (T3), sub-pages (T4), action (T5), raster/grain/load-choreography (T2+T3), reduced motion (T2 final block), no-push-before-review (T6). The spec's «essay» copy is adapted from the existing feature text as required.
- The `.dot` reuse in action.html is inline-styled on purpose (documented in Task 5).
- `customisation.md` is not touched: front matter already present, rendering restyles itself through layout + `.doc` rules.
- Types/classes cross-checked: every class in T3/T4/T5 markup exists in T2 CSS.

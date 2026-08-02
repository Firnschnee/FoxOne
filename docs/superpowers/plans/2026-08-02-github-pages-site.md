# FoxOne GitHub Pages Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GitHub-Pages-Seite unter https://firnschnee.github.io/FoxOne/ mit Gruvbox-Landing-Page und den zwei bestehenden Doku-Dateien als Unterseiten im selben Look.

**Architecture:** GitHub Pages' eingebautes Jekyll serviert aus `docs/` auf `main`. `index.html` ist eigenständiges statisches HTML, die zwei Markdown-Dateien laufen durch ein gemeinsames Layout (`_layouts/default.html`). Ein `style.css` für alles.

**Tech Stack:** Statisches HTML/CSS, Jekyll (nur GitHub-Pages-seitig, keine lokale Installation).

## Global Constraints

- Farbpalette exakt aus dem Spec: base `#282828`, surface `#3c3836`, accent `#fabd2f`, text `#ffffff`, hover `#7c6f64`.
- Kein Light-Mode, kein Theme-Toggle, keine Suche, keine interaktive Demo.
- `docs/superpowers/` wird via `exclude` in `_config.yml` nicht publiziert.
- Unterseiten-URLs mit `.html`-Endung (Jekyll-Default, keine pretty permalinks).
- Kein Em-Dash in Inhalten und Commits.
- Inhalt von `installation.md` / `customisation.md` bleibt unverändert, es kommt nur Front Matter dazu.

---

### Task 1: Assets und Stylesheet

**Files:**
- Create: `docs/assets/preview_cropped.png`, `docs/assets/dynamic_url.gif`, `docs/assets/dynamic_toolbar.gif`, `docs/assets/findbar.gif` (Kopien aus `assets/`)
- Create: `docs/style.css`

**Interfaces:**
- Produces: `style.css` mit den Klassen `site-header`, `nav-links`, `hero`, `tagline`, `buttons`, `btn`, `btn-primary`, `preview`, `feature`, `site-footer`, `content` (von Task 2 und 3 konsumiert). Bilder unter `docs/assets/` mit den oben genannten Dateinamen.

- [ ] **Step 1: Bilder kopieren**

```powershell
New-Item -ItemType Directory -Force docs/assets
Copy-Item assets/preview_cropped.png, assets/dynamic_url.gif, assets/dynamic_toolbar.gif, assets/findbar.gif docs/assets/
```

- [ ] **Step 2: style.css anlegen**

```css
:root {
  --base: #282828;
  --surface: #3c3836;
  --accent: #fabd2f;
  --text: #ffffff;
  --hover: #7c6f64;
  --muted: #bdae93;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--base);
  color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

img { max-width: 100%; height: auto; border-radius: 8px; }

/* Header / Navigation */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 16px 24px;
}

.site-header .brand {
  font-weight: 700;
  color: var(--text);
}

.nav-links { display: flex; gap: 20px; }
.nav-links a { color: var(--muted); }
.nav-links a:hover { color: var(--accent); text-decoration: none; }

/* Hero */
.hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 64px 24px 32px;
  text-align: center;
}

.hero h1 {
  font-size: 64px;
  margin: 0;
  color: var(--accent);
}

.tagline {
  font-size: 20px;
  color: var(--muted);
  margin: 12px auto 32px;
  max-width: 640px;
}

.buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.btn {
  display: inline-block;
  padding: 10px 28px;
  border-radius: 8px;
  border: 1px solid var(--surface);
  color: var(--text);
  background: var(--surface);
}

.btn:hover { border-color: var(--hover); text-decoration: none; }

.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--base);
  font-weight: 600;
}

.btn-primary:hover { filter: brightness(1.08); }

/* Preview + Features */
.preview {
  max-width: 900px;
  margin: 32px auto;
  padding: 0 24px;
  text-align: center;
}

.feature {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 24px;
  text-align: center;
}

.feature h2 { color: var(--accent); margin-bottom: 4px; }
.feature p { color: var(--muted); margin-top: 0; }

/* Doku-Seiten */
.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 24px 64px;
}

.content h1, .content h2, .content h3 { color: var(--accent); }

.content code {
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}

.content pre {
  background: var(--surface);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.content pre code { background: none; padding: 0; }

.content table {
  border-collapse: collapse;
  width: 100%;
  display: block;
  overflow-x: auto;
}

.content th, .content td {
  border: 1px solid var(--surface);
  padding: 8px 12px;
  text-align: left;
}

.content th { background: var(--surface); }

.content blockquote {
  border-left: 3px solid var(--accent);
  margin-left: 0;
  padding-left: 16px;
  color: var(--muted);
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--surface);
  margin-top: 64px;
  padding: 24px;
  text-align: center;
  color: var(--muted);
  font-size: 14px;
}
```

- [ ] **Step 3: Commit**

```bash
git add docs/assets docs/style.css
git commit -m "Pages: add assets and Gruvbox stylesheet"
```

### Task 2: Landing Page

**Files:**
- Create: `docs/index.html`

**Interfaces:**
- Consumes: Klassen und Assets aus Task 1.
- Produces: Landing Page mit Links auf `installation.html`, `customisation.html` (von Task 3 erzeugt).

- [ ] **Step 1: index.html anlegen**

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
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
  <a class="brand" href="./">FoxOne</a>
  <nav class="nav-links">
    <a href="installation.html">Installation</a>
    <a href="customisation.html">Customisation</a>
    <a href="https://github.com/Firnschnee/FoxOne">GitHub</a>
  </nav>
</header>

<section class="hero">
  <h1>FoxOne</h1>
  <p class="tagline">One-line layout, clean URL bar, hover-reveal icons, floating Findbar, Gruvbox colors – ready for Nova</p>
  <div class="buttons">
    <a class="btn btn-primary" href="installation.html">Installation</a>
    <a class="btn" href="https://github.com/Firnschnee/FoxOne">GitHub</a>
  </div>
</section>

<div class="preview">
  <img src="assets/preview_cropped.png" alt="FoxOne preview: Firefox with a single combined toolbar and tab line">
</div>

<section class="feature">
  <h2>Dynamic URL bar</h2>
  <p>Clean by default, icons reveal on hover</p>
  <img src="assets/dynamic_url.gif" alt="URL bar expanding on focus with hover-reveal icons">
</section>

<section class="feature">
  <h2>Dynamic tabs</h2>
  <p>Tabs and pinned addons revealed on hover, tucked by the hamburger</p>
  <img src="assets/dynamic_toolbar.gif" alt="Tab bar and toolbar icons revealing on hover">
</section>

<section class="feature">
  <h2>Floating Find Bar</h2>
  <p>Adapted from <a href="https://github.com/biglavis/LittleFox">LittleFox</a></p>
  <img src="assets/findbar.gif" alt="Floating find bar in the top right corner">
</section>

<footer class="site-footer">
  <p>Released under the <a href="https://github.com/Firnschnee/FoxOne/blob/main/LICENSE">MIT License</a>.
  Inspired by <a href="https://github.com/andreasgrafen/cascade">Cascade</a> and <a href="https://github.com/biglavis/LittleFox">LittleFox</a>.</p>
  <p>Works with <a href="https://addons.mozilla.org/firefox/addon/adaptive-tab-bar-colour/">Adaptive Tab Bar Colour</a>.
  Thunderbird? You are looking for <a href="https://github.com/Firnschnee/BirdOne">BirdOne</a>.</p>
</footer>

</body>
</html>
```

- [ ] **Step 2: Lokal prüfen**

`docs/index.html` im Browser öffnen (file:// reicht, alle Pfade sind relativ). Erwartung: Gruvbox-Hintergrund, Hero, Preview-Bild und drei GIFs sichtbar, keine broken images.

- [ ] **Step 3: Commit**

```bash
git add docs/index.html
git commit -m "Pages: add landing page"
```

### Task 3: Jekyll-Unterbau und Doku-Seiten

**Files:**
- Create: `docs/_config.yml`
- Create: `docs/_layouts/default.html`
- Modify: `docs/installation.md` (nur Front Matter oben anfügen)
- Modify: `docs/customisation.md` (nur Front Matter oben anfügen)

**Interfaces:**
- Consumes: `style.css`-Klassen aus Task 1, Link-Ziele aus Task 2.
- Produces: `/FoxOne/installation.html` und `/FoxOne/customisation.html` im Site-Look.

- [ ] **Step 1: _config.yml anlegen**

```yaml
title: FoxOne
description: Minimalistic one-line userChrome.css theme for Firefox
url: https://firnschnee.github.io
baseurl: /FoxOne
exclude:
  - superpowers/
```

- [ ] **Step 2: _layouts/default.html anlegen**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ page.title }} – FoxOne</title>
<meta name="description" content="{{ site.description }}">
<link rel="canonical" href="{{ page.url | absolute_url }}">
<link rel="stylesheet" href="{{ '/style.css' | relative_url }}">
</head>
<body>

<header class="site-header">
  <a class="brand" href="{{ '/' | relative_url }}">FoxOne</a>
  <nav class="nav-links">
    <a href="{{ '/installation.html' | relative_url }}">Installation</a>
    <a href="{{ '/customisation.html' | relative_url }}">Customisation</a>
    <a href="https://github.com/Firnschnee/FoxOne">GitHub</a>
  </nav>
</header>

<main class="content">
{{ content }}
</main>

<footer class="site-footer">
  <p>Released under the <a href="https://github.com/Firnschnee/FoxOne/blob/main/LICENSE">MIT License</a>.
  Inspired by <a href="https://github.com/andreasgrafen/cascade">Cascade</a> and <a href="https://github.com/biglavis/LittleFox">LittleFox</a>.</p>
</footer>

</body>
</html>
```

- [ ] **Step 3: Front Matter anfügen**

An den Anfang von `docs/installation.md`:

```yaml
---
layout: default
title: Installation
---
```

An den Anfang von `docs/customisation.md`:

```yaml
---
layout: default
title: Customisation
---
```

Restlicher Inhalt beider Dateien bleibt byte-identisch.

- [ ] **Step 4: Commit**

```bash
git add docs/_config.yml docs/_layouts/default.html docs/installation.md docs/customisation.md
git commit -m "Pages: add Jekyll layout and front matter for docs pages"
```

### Task 4: Deployment und Verifikation

**Files:** keine neuen.

**Interfaces:**
- Consumes: alle Commits aus Task 1 bis 3 auf `main`.

- [ ] **Step 1: Push**

```bash
git push
```

- [ ] **Step 2: Pages aktivieren (manuell, Max)**

Repo Settings → Pages → Source "Deploy from a branch" → Branch `main`, Ordner `/docs` → Save.

- [ ] **Step 3: Live-Verifikation**

Nach dem ersten Pages-Build (1 bis 2 Minuten, sichtbar im Actions-Tab) prüfen:

- `https://firnschnee.github.io/FoxOne/` zeigt die Landing Page, Bilder laden.
- `https://firnschnee.github.io/FoxOne/installation.html` und `.../customisation.html` erscheinen im Gruvbox-Look mit Navigation.
- `https://firnschnee.github.io/FoxOne/superpowers/specs/2026-08-02-github-pages-design.md` liefert 404 (exclude greift).

- [ ] **Step 4: README-Verweis (optional, nach Sichtprüfung)**

Wenn die Seite steht: Link auf die Pages-URL im README ergänzen. Eigener Commit, nur nach Freigabe durch Max.

# FoxOne GitHub Pages Site – Design

Datum: 2026-08-02
Ziel-URL: https://firnschnee.github.io/FoxOne/

## Ziel

Eine gestaltete Projektseite für FoxOne: Landing Page im Gruvbox-Look plus die
beiden bestehenden Doku-Dateien als Unterseiten im selben Look. Gebaut mit
GitHub Pages' eingebautem Jekyll, serviert aus `docs/` auf `main`.
Referenz-Ästhetik: https://cascadefox.github.io/ (Hero, Buttons, Feature-Karten,
Screenshot, Footer), nachgebaut in purem HTML/CSS ohne VitePress.

## Seiten

- `/` – Landing Page (`docs/index.html`, eigenständiges HTML ohne Layout)
- `/installation` – aus `docs/installation.md` via Layout gerendert
- `/customisation` – aus `docs/customisation.md` via Layout gerendert

## Landing Page (index.html)

README-Dramaturgie:

1. **Hero**: Titel "FoxOne", Tagline "One-line layout, clean URL bar,
   hover-reveal icons, floating Findbar, Gruvbox colors – ready for Nova",
   Buttons "Installation" (→ installation) und "GitHub" (→ Repo).
2. **Preview**: `preview_cropped.png` groß.
3. **Features**: drei Blöcke, je GIF + eine Zeile Text:
   Dynamic URL bar (`dynamic_url.gif`), Dynamic tabs & hover-reveal icons
   (`dynamic_toolbar.gif`), Floating Find Bar (`findbar.gif`).
4. **Footer**: MIT-Lizenz, Credits (Cascade, LittleFox), BirdOne-Link,
   Hinweis auf Adaptive Tab Bar Colour.

Head enthält Meta-Description, canonical, Open-Graph-Tags (og:image =
Preview-PNG unter der Pages-URL), twitter:card.

## Styling (style.css)

Gruvbox Dark, Variablen aus der dokumentierten FoxOne-Palette:
base `#282828`, surface `#3c3836`, accent `#fabd2f`, text `#ffffff`,
hover `#7c6f64`. Eine Spalte, max-width ~900px, System-Font-Stack,
responsive (Bilder max-width 100%). Kein Light-Mode, kein Toggle:
die Seite zeigt FoxOnes Identität.

## Jekyll-Unterbau

- `docs/_config.yml`: title, description, url/baseurl, kein Theme,
  `exclude: [superpowers/]` (Spec-Ordner nicht publizieren).
- `docs/_layouts/default.html`: gleicher Head + style.css, Top-Navigation
  (FoxOne/Home, Installation, Customisation, GitHub), `{{ content }}`,
  gleicher Footer.
- `installation.md` / `customisation.md`: bekommen Front Matter
  (`layout: default`, `title`), Inhalt bleibt unverändert.

## Assets

`preview_cropped.png`, `dynamic_url.gif`, `dynamic_toolbar.gif`,
`findbar.gif` werden von `assets/` nach `docs/assets/` kopiert
(Duplikat bewusst: README und Seite bleiben unabhängig).
Die beiden md-Dateien referenzieren aktuell keine Bilder, dort ist
nichts umzubiegen.

## Deployment

Commit auf `main`. Danach manuell (Max): Repo Settings → Pages →
Source "Deploy from a branch", Branch `main`, Ordner `/docs`.

## Nicht in diesem Wurf

- Interaktive Demo
- Light-Mode / Theme-Toggle
- Suche
- Custom Domain

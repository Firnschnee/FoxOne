# FoxOne Site Redesign «grafik» – Design

Datum: 2026-08-04
Ziel-URL: https://firnschnee.github.io/FoxOne/

## Ziel

Kompletter Neuaufbau des Looks der docs/-Site nach dem Vorbild von
https://guywithtwocats.github.io/TheGallery/sites/grafik/index.html
(Swiss-International-Style-Katalogseite), aber nativ dunkel: Farbbasis
ist das Dark-Reader-Rendering aus Max' Screenshot, der rote Akzent der
Referenz wird testweise durch Amber ersetzt. Der Stil wird nachgebaut,
nicht kopiert: eigenes Markup, eigenes CSS, gleiche Prinzipien
(12-Spalten-Grid, 24px-Baseline, eine Grotesk, ein Akzent).

Alle vier Seiten wechseln zusammen, kein Stilbruch zwischen Landing
und Unterseiten.

## Palette

Variablenblock am Kopf von style.css, aus dem Screenshot abgelesen:

```css
:root {
  --grund:  #1b1815;   /* warmes Fast-Schwarz, Seitengrund */
  --creme:  #d9d3c8;   /* Fließtext, Headline */
  --stahl:  #938d84;   /* Sekundärtext */
  --silber: #6e6961;   /* Tertiär, Captions */
  --hair:   #38332d;   /* Haarlinien, Borders */
  --amber:      #d79921;  /* Flächen: Rule, Punkt, Raster, Buttons */
  --amber-text: #fabd2f;  /* kleiner Text in Amber, hellere Stufe */
}
```

Zwei Akzentstufen wie in der Referenz (`--rot`/`--rot-text`), nur
invertiert: kleiner Akzenttext auf dunklem Grund nutzt die hellere
Stufe. Rückwechsel auf Rot wäre ein Zwei-Zeilen-Edit im Variablenblock.
`::selection` in Amber auf Dunkel, Scrollbar in Palette.

## Typografie

- Instrument Sans, selbst gehostet in `docs/fonts/` (zwei woff2,
  variable Stärke 400–700, latin + latin-ext, SIL OFL, Lizenztext
  liegt als OFL.txt bei). Fallback Helvetica Neue/Arial.
- Grundschrift 16.5px auf 24px-Baseline, Letter-Spacing -0.006em.
- Headline `clamp(88px, 17.5vw, 252px)`, Weight 700,
  Letter-Spacing -0.045em, optisch bündig nach links gezogen.
- Kleinschreibung als Stilmittel nur für Headline, Navigation,
  Sektionstitel und Captions. Fließtext bleibt normal
  groß-/kleingeschrieben.
- Kein Kursiv (`em` wird 600 aufrecht, wie die Referenz).

## Struktur index.html

1. **Sticky-Topbar**: Brand «foxone», rechts Links
   installation · customisation · in action · github,
   ganz rechts Raster-Button in Amber (Border-Stil, invertiert
   bei Hover/aktiv). Opaker Grund, Haarlinie unten.
2. **Masthead**: 8px-Amber-Rule, riesig «foxone» mit Amber-Punkt.
   Links drei Zeilen: fett «one line for everything», darunter grau
   «tabs, url bar and navigation in a single row» und
   «gruvbox colors · no extensions · nothing phoning home».
   Rechts Meta-Spalte im «halle 10»-Stil: «userchrome.css» in
   Amber-Text (keine Versionsnummer, die veraltet), dann
   «firefox 152+ · nova», «windows · macos · linux», «mit license».
3. **Preview**: `preview_cropped.png` volle Grid-Breite, dezenter
   Grain darüber.
4. **Essay «the theme»**: bestehender Feature-Text (One line for
   everything / URL bar that stays out of the way / Pure
   userChrome.css) umgegossen in die Zweispalten-Form der Referenz.
5. **«in action»-Wand**: die drei GIFs (dynamic_url, dynamic_toolbar,
   findbar) als Katalog-Karten mit Nummern-Captions (fx-01 …),
   Grain auf den Karten, Link auf die ausführliche action.html.
6. **Footer**: dunkler abgesetzt, MIT-Lizenz, Credits Cascade und
   LittleFox, BirdOne-Link.

Head behält Meta-Description, canonical, Open-Graph, twitter:card.
favicon.svg bleibt unverändert.

## Unterseiten

- `_layouts/default.html`: gleiche Topbar (inkl. Raster-Button)
  und gleicher Footer wie index. Markdown-Inhalt läuft in einer
  Textspalte im Grid (ca. Spalte 1–8), Überschriften in Creme,
  Code-Blöcke auf leicht abgesetztem Grund (#211d19-Umfeld),
  Links in Amber-Text.
- `installation.md` / `customisation.md`: Inhalt unverändert,
  nur Rendering ändert sich.
- `action.html`: gleiche Struktur, GIFs als Katalog-Karten im Grid
  mit Captions statt der bisherigen Blöcke.

## Extras

- **Raster-Overlay**: Taste G und Topbar-Button togglen ein
  12-Spalten-Overlay in transparentem Amber plus Baseline-Chip.
  Einziges JS der Site, ~30 Zeilen in `docs/js/main.js`,
  progressive enhancement (ohne JS kein Button, Seite voll nutzbar).
- **Grain**: ein geteilter SVG-Turbulence-Filter (inline defs),
  auf Preview und GIF-Karten, Werte für dunklen Grund angepasst.
- **Load-Animation**: Headline- und Sprachzeilen schieben sich aus
  `overflow: hidden`-Masken hoch. Komplett CSS, gated hinter
  `html.js` und `@media (prefers-reduced-motion: no-preference)`,
  gleiche Linie wie im Theme selbst.

## Nicht in diesem Wurf

- Light-Mode / Theme-Toggle
- Detail-Dialog der Referenz (Lightbox für die Karten)
- Änderungen an README, Screenshots oder dem Theme selbst
- Custom Domain, Suche

## Deployment

Commit auf `main`, GitHub Pages baut aus `docs/` wie bisher.
Verifikation lokal per Jekyll-freiem Direktaufruf der index.html
plus Screenshot der gerenderten Seite (Landing-Page-Screenshots
sind ausdrücklich erlaubt).

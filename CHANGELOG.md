# Changelog

All notable changes to FoxOne since release **2.0** (2026-05-09), up to and
including **3.5** (2026-08-04).

Versions are listed newest first. Dates are the release dates on GitHub.
Issue and PR numbers refer to [Firnschnee/FoxOne](https://github.com/Firnschnee/FoxOne).

---

## Overview: what changed between 2.0 and 3.5

- **Firefox Nova migration (3.0).** The single largest change. Firefox 152+
  rebuilt the chrome (`browser.nova.enabled`), renaming and retiring most of the
  tokens and IDs FoxOne relied on. The whole theme was ported: urlbar internals,
  tabs, toolbox framing, splitters, bookmarks bar, split view. Everything after
  3.0 targets the Nova configuration.
- **One visual language for hover and selection.** Background chips and
  highlight blocks were replaced by colour-as-signal — white at rest, light
  yellow on hover, amber when active — across toolbar icons, tab titles,
  bookmarks bar, popup rows, urlbar results, sidebar panels and the Library.
- **Full-surface theming.** Popups, context menus, the Library window, window
  controls, sidebar panels and all `about:` pages were brought into the palette;
  Nova's violet accent family was removed at the token source.
- **New configuration.** `--uc-rounded` (opt-in rounded corners),
  `--uc-dynamic-bookmarks` (overlay bookmarks bar, on by default since 3.5),
  `--uc-container-line-top`, `--uc-hide-nav-buttons`, `--uc-autohide-nav-buttons`,
  `--uc-hide-urlbar-buttons`, `--uc-hide-extension-icons`, `--uc-urlbar-background`,
  `--uc-tab-min-width`, `--uc-tab-hover-text`, `--uc-show-loading-progress`.
- **Accessibility.** `prefers-reduced-motion` support (3.1.11).
- **Compatibility.** Dynamic theme extensions such as Adaptive Tab Bar Colour
  (3.1, hardened in 3.3.7 and 3.4.11), Windows 11 Mica popups (3.3.6),
  taskbar-tab windows, macOS traffic lights, ultrawide/4K displays.
- **Project infrastructure.** CI with consistency checks and stylelint (3.3),
  version stamps in both CSS files, a GitHub Pages site (3.4.10) and a
  redesigned documentation site (3.5).
- **First external contributions.** PRs from @ctrl-maus, @acaprino,
  @NeroWolfe75 and @atrehhoff, plus numerous reports from `NeroWolfe_` on Reddit.

Diff summary `2.0..3.5`: 287 commits, 37 files changed,
+4901 / −246 lines (`userChrome.css` alone +2316).

---

## 3.5 — 2026-08-04

### Added
- **Dynamic bookmarks bar.** The bookmarks toolbar leaves the layout and hangs
  below the chrome as an overlay: hidden at rest, fading in when you reach for
  the URL bar, staying open while the pointer is on it. The page keeps its line
  either way. Adapted from LittleFox (MIT), credit to @biglavis.
- Timing knobs `--uc-dynamic-bookmarks-hover-delay` (450ms) and
  `--uc-dynamic-bookmarks-hide-delay` (50ms).

### Changed
- The dynamic bookmarks bar is **on by default** (`--uc-dynamic-bookmarks: 1`);
  set it to `0` for the permanent row as before.
- Nova clips `#navigator-toolbox` to its own box, which erased the overlay —
  FoxOne lifts that clip while the feature is on and hands it back at `0`.
- The reveal is guarded on the results list rather than on urlbar focus.

### Docs / Site
- Documentation site rebuilt in a "swiss catalogue" dark/amber style: new
  landing page, rebuilt *In Action* page as catalogue entries, new default
  layout with topbar and footer, self-hosted Instrument Sans (OFL), styled
  doc tables.
- Landing GIFs replaced with still posters (GIF dithering blotched when
  downscaled); toolbar, urlbar and findbar GIFs re-recorded.
- README refreshed; Windows 11 corner information added to `customisation.md`.
- Installation note: new installs must switch the bookmarks toolbar on
  (right-click toolbar → *Bookmarks Toolbar* → *Always Show*).

---

## 3.4.11 — 2026-08-03

### Fixed
- **The URL bar no longer reads as a box bolted onto the toolbar.** With any
  theme active, Nova lays a translucent 5% wash over the toolbox, past every
  token FoxOne pins, so the URL field sat one shade off the bar. The toolbox is
  now repainted with the frame tone directly (#38, #40).
- Private windows were the same bug in disguise — Nova applies a built-in
  private-window theme through the same machinery. One fix, both symptoms.
- Restores Adaptive Tab Bar Colour compatibility on FoxOne's side (#38).

### Changed
- With rounded corners enabled, the open urlbar dropdown rounds only its bottom
  corners — square on top, so it merges into the toolbar row.
  Second contribution by @NeroWolfe75 (#42).

---

## 3.4.10 — 2026-08-03

### Added
- `#ipprotection-button` (Firefox's new IP Protection / VPN button) joins all
  five nav-button selector lists: permanent hide, auto-hide, hover reveal, focus
  reveal and the reduced-motion block. First contribution by @atrehhoff (#41).

### Added (project)
- **FoxOne now has a website**: [firnschnee.github.io/FoxOne](https://firnschnee.github.io/FoxOne)
  — Jekyll layout, landing page, *In Action* subpage with the GIFs, Gruvbox
  stylesheet, favicon, SEO copy.
- `.gitignore` restored; local tools folder kept untracked.

---

## 3.4.9 — 2026-08-01

### Fixed
- The urlbar breakout box regains its **top edge**. Nova grows the box past the
  toolbar row on every side; 3.x pulled back only the bottom overhang, leaving
  the top eight pixels hanging past the window edge. The same density-tracking
  pull is now mirrored to the top. First pull request on the repository by
  @NeroWolfe75 (#39).
- Urlbar height calculation simplified; a dead legacy ID selector dropped.

---

## 3.4.8 — 2026-07-24

### Added
- **`--uc-rounded` — opt-in rounded corners.** `0` keeps FoxOne square
  (default, byte-identical to before); `1` applies `--uc-border-radius` to every
  surface FoxOne squares, and half of it to the rows inside them: arrow panels,
  context menus and their rows, the URL field and its breakout box, tabs, find
  bar, status panel and split-view footer. The resulting 8px/4px pair matches
  Firefox's own panel design tokens.

### Fixed
- The URL field's painted box hung a pixel below the toolbar row at rest —
  present since the Nova megabar fix, invisible while everything was square.
  The pull is now scoped to the breakout state and derived from field height
  instead of hand-tuned per UI density, which retires the separate touch-density
  rule.
- `userContent.css` was still stamped 3.4.6 and is back in sync.

### Notes
- Layout stays square in both modes: the content area and the frames around
  toolbox, sidebar and browser keep their edges, since FoxOne runs edge-to-edge.
- Popups keep FoxOne's own drawing path in both modes, which is what keeps them
  Gruvbox rather than system-tinted.

---

## 3.4.7 — 2026-07-24

### Fixed
- Bookmark-star and pinned-search badges on urlbar results render in Gruvbox
  amber again. The `context-fill` channel is dead on Nova's extended result
  list, so the glyph's own SVG is now reused as a mask with the colour painted
  underneath — immune to whatever Nova does with fill plumbing.

---

## 3.4.6 — 2026-07-22

### Added
- **`--uc-container-line-top`** (#36, by @ctrl-maus — first external feature PR):
  `1` keeps the container line at the top of the tab (Firefox 153 layout,
  default), `0` pins it to the bottom edge — the classic pre-153 FoxOne look,
  with the glow pointing up so nothing is clipped.

### Changed
- The context-line glow offset is scoped to horizontal tabs; vertical tabs get
  a direction-neutral glow.
- The new toggle is documented in `docs/customisation.md`.

---

## 3.4.5 — 2026-07-21

### Fixed
- The container indicator left a small coloured box in the URL bar while hidden:
  Firefox 153 wraps it in a padded, tinted pill and FoxOne collapsed only the
  contents. The shell now collapses too.
- **Container colours went pastel** under Nova's muted design tokens. The
  saturated pre-Nova palette is restored, with indicator and context-line lifted
  a step in brightness and a soft glow on the icon.
- The tab context-line sat 6px too high (Nova offsets its own 4px stripe
  upward), clipping most of its glow. Pinned back into place.

---

## 3.4.4 — 2026-07-21

### Fixed
- The translations icon lost the right edge of its "A" at fractional display
  scaling — Mozilla draws 17px of artwork into a 16px box and compensates with a
  −1px margin. FoxOne now ships the identical artwork in a proper 17×16 viewBox,
  so it scales into the box; `context-fill` recolouring stays intact. Reveal-icon
  padding recalibrated to 8px on 153 stable.
- Hovering the urlbar revealed the container's full text label — up to 200px of
  text sliding over the URL you were about to click (#34). Hover now reveals only
  the coloured dot; the text label waits for a focused urlbar.
  Reported with a line-precise diagnosis and delivered as a PR by @acaprino (#35).

---

## 3.4.3 — 2026-07-20

### Fixed
- Reveal icons (reader mode, translations, add-on page actions) sat 1px too
  tight on Firefox 153; the 7px padding now applies globally (153 is the new
  ESR base, so no version split).
- Trust icon (shield) recalibrated to net zero: the 153b12 release fixed the
  native offset, which turned FoxOne's counter-nudges into the bug. The separate
  breakout-state rule from #31 is retired entirely.
- The extensions (puzzle) button sat 1px too high in the nav bar.

---

## 3.4.2 — 2026-07-17

### Fixed
- **The faint light line framing dark pages.** Nova draws a full 1px border
  around the content area, not just a top separator; painting the rest
  transparent only camouflaged it (a transparent border is a 1px window onto the
  chrome background), which is why it depended on page colour and DPI rounding.
  The border is now removed whole.
- The sidebar splitter sat 1px inside the page — a strip of web content shone
  through beside the panel — and stopped short of the bottom edge. Nova seats it
  in the 4px chrome-window gap that FoxOne removes; margins zeroed for a flush
  2px line at full height.

### Changed
- Sidebar launcher: no selection or hover background blocks. Icons stay white at
  rest and on the selected tool (only the ring marks selection); hover recolours
  the glyph to the accent.
- Panel search boxes (history, synced tabs, bookmarks) sit on the compiled-in
  field dark `#1f1f1f`, styled inside the widget's shadow root.
- Row selection in sidebar panels follows the FoxOne model — amber text, no
  highlight block — replacing the OS-accent cyan. Covers the Lit panels and the
  bookmarks panel (still an old XUL tree, given the Library treatment).

---

## 3.4.1 — 2026-07-15

### Fixed
- The sidebar panel still showed Firefox's dark blue-grey default
  (`rgb(28, 27, 34)`). The revamped sidebar reads `--sidebar-background-color`
  directly rather than the `--lwt-sidebar-*` tokens FoxOne pinned; that token is
  now pinned to `--uc-color-base`, with `--sidebar-text-color` following the
  palette. Dynamic-theme hand-off stays intact.

---

## 3.4 — 2026-07-14

### Added
- **Library window theming.** The last major surface still wearing stock Firefox
  (cyan Windows-accent selection, two-tone greys, violet separators) is now in
  the theme: amber text instead of a highlight block, a 1px accent frame on
  hover, no dashed keyboard-cursor ring. Both panes are XUL trees reachable only
  through `::-moz-tree-*` pseudo-elements, which cannot read CSS variables —
  the one block where palette values are hardcoded (documented in place).
- One tone for the whole Library: toolbar, both panes, details pane and column
  headers on `--uc-color-base`, with surface hairlines as the only separators.
- Toolbar buttons (Manage / Views / Import and Backup) get accent-text hover.
- Search box and details-pane fields follow the urlbar model; the native focus
  ring drawn in the Windows accent colour is replaced with amber.
- Tag selector checkboxes redrawn flat — amber fill with a dark check.
- **Window controls, FoxOne-ified.** No hover block; the glyph takes the colour,
  amber for minimize and maximize, close keeps the Windows red.
- **In-content:** every `about:` page now runs on the FoxOne accent through one
  central token block in `userContent.css`; settings widgets included via
  shadow DOM.

### Changed
- Bookmarks-bar chevron: dimmed amber at rest, full accent on hover, no chip.

### Notes
- `userContent.css` must be a real copy in the profile's `chrome/` folder, not a
  symlink — the content-process sandbox blocks the symlink target and the sheet
  silently fails on websites.

---

## 3.3.9 — 2026-07-14

### Fixed
- **Nova violet purge.** Nova maps the semantic accent family
  (`--color-accent-primary`, `-hover`, `-active`, `-selected`) to its violet
  palette, from which links, focus rings, toggles, primary buttons and selected
  borders all derive. All four are now pinned to `--uc-color-accent`, recolouring
  the protections-panel toggle, "Privacy settings" link and permission chips at
  once.
- Tokens referencing the violet palette directly are repointed individually:
  info-message card background, info icons, generic chrome-button hover/active
  blocks, the base chrome text (drifted to a lilac-tinted white), and the
  violet-leading toolbox gradient.
- Extension-panel gear buttons showed a violet hover block: their `--uei-button-*`
  tokens are defined at `:root` by toolkit, so they are now re-declared on the
  button itself.

### Removed
- The gradient separator under the account/profiles section in the app menu (the
  "proton-zap"). Its line is a gradient `border-image` that beats any colour
  override; no line beats a violet gradient in a Gruvbox menu.

### Notes
- `about:blank` stays at Firefox's `#1C1B22` — a compile-time constant no pref
  or CSS reaches without forcing colours onto every website. Documented as a
  dead end.

---

## 3.3.8 — 2026-07-14

### Fixed
- The middle-click autoscroll indicator is round again with its double-arrow
  glyph. `.autoscroller` is itself a `panel` built entirely out of the
  `--panel-*` tokens FoxOne overrides, so all three popup blocks (colours, square
  corners, Mica opt-out) flattened it. It is now excluded from all three,
  alongside `#DateTimePickerPanel`.

---

## 3.3.7 — 2026-07-13

### Fixed
- **Square popup corners survive dynamic theme extensions.** The radius tokens
  and the 3.3.6 Mica opt-out lived inside the `:root:not([lwtheme])` scope that
  exists to yield FoxOne's *colours* to a running theme — so any theme extension
  silently switched the corners back off. Shape is FoxOne identity, not colour:
  both now apply unconditionally, while frame, toolbar, URL bar and popup
  surfaces keep following the theme.
- Context menus no longer render see-through under a dynamic theme: the Mica
  opt-out now restores the background from the root, with FoxOne's base as
  fallback.
- The accent-text hover (#16) now works in context menus and panels regardless of
  an active theme.

---

## 3.3.6 — 2026-07-12

### Fixed
- **Square popup corners hold on Windows 11 with Mica.** Nova enables
  `widget.windows.mica` by default, making Firefox render context menus and
  panels natively — the rounded corners come from Windows clipping the popup
  window, one level below anything CSS can reach. Popups are now opted out of
  the Mica backdrop under `@media (-moz-windows-mica-popups)`, dropping them back
  onto the CSS-drawn path. The soft popup shadow Mica provides is restored via
  toolkit tokens so both system types look identical.

---

## 3.3.5 — 2026-07-12

### Changed
- Taskbar-tab windows (`html[id^="taskbartab"]`) now strip the address bar, menu
  button and unified-extensions button for a proper app-like frame; previously
  only the address bar was hidden.

### Fixed
- No more white flash between page loads: the content container
  (`--tabpanel-background-color`) paints the palette base instead of Firefox's
  default white. Chrome surface only — website content untouched, and
  `about:newtab` keeps its own canvas.

*(Both contributed by `NeroWolfe_` on Reddit.)*

---

## 3.3.4 — 2026-07-11

### Fixed
- Findbar option toggles (`[ab]`, `Aa`, `aá`, `ab`) show their state again. Their
  checked highlight relied on `--toolbarbutton-active-background`, which produced
  nothing visible after 3.3.3. They now use colour-as-signal: hover dims to
  `#ffda85`, a checked option holds the amber accent, no background chip.
- Disabled context-menu rows no longer paint a hover block.

### Changed
- A disabled navigation arrow in the context menu answers hover with the hover
  yellow at 40% strength, matching the native disabled-button opacity.

---

## 3.3.3 — 2026-07-11

### Changed
- **Hover and selection unified as accent text everywhere.** Popup rows
  (hamburger menu, extensions panel, context menus) mark hover and active with
  `--uc-color-accent` text on a transparent background — the same language as
  toolbar icons and tab hover (#16). Covers both button token families so
  clicking no longer flashes the native grey.
- Popup row highlights are square: `--menuitem-border-radius` and
  `--panel-menuitem-border-radius` pinned to 0.
- URL bar results follow suit. Nova renamed the row-hover token to
  `--urlbarview-background-color-hover`, so the old camelCase override no longer
  caught it; hover and keyboard selection now both read as accent text alone.

### Docs
- `customisation.md` notes that accent-text cues read best on dark surfaces —
  under Adaptive Tab Bar Colour a light page colour can make them look off.

---

## 3.3.2 — 2026-07-11

### Fixed
- Popup corners are square again. Toolkit's `popup.css` defaults
  `--panel-border-radius` to 6px for arrow panels (hamburger menu, extensions
  popup, shield/permissions popup) while context menus sit at 0 via their own
  code path. Both now pin to 0.

---

## 3.3.1 — 2026-07-10

### Fixed
- **Popup surfaces are one theme again.** Nova retired the `--arrowpanel-*`
  token family, leaving FoxOne's panel styling dead: arrow panels fell back to
  Nova's `rgb(66,65,77)` while context menus used the darker `Menu` system
  colour. Both now share the palette — base `#282828`, `#3c3836` borders and
  separators, `--uc-color-hover` highlight.

### Changed
- `--uc-color-surface` is now documented as the secondary tone (borders,
  separators, focused URL field) rather than "panel background". Same default.

---

## 3.3 — 2026-07-08

Maintenance release from a full-repo audit.

### Fixed
- Pinned tabs no longer lose their active-tab glow while a page loads: the
  loading progress bar shared the pinned indicator's pseudo-element and blanked
  it for the whole load. Pinned tabs are now excluded.
- Removed rules that silently did nothing: an undefined-variable box-shadow on
  the bookmarks bar, an invalid `padding: 0 inherit`, two duplicate declarations.

### Changed
- `--uc-show-context-splitview` and `--uc-show-all-tabs-button` take `0`/`1`
  instead of `none`/`-moz-box` (Firefox removed `-moz-box` long ago, so the old
  "visible" value had been broken). Stale configs fall back safely to hidden.
- Content scrollbars (`userContent.css`) default to `thin`, and the option has
  real semantics: `thin` and `none` apply everywhere, `auto` genuinely leaves
  pages alone instead of forcing the OS default onto sites that style their own.

### Docs / Housekeeping
- `customisation.md` defaults resynced with the code (four had drifted).
- Dropped the claim that FoxOne "won't interfere" with light mode (#19, wontfix).
- Both CSS files carry a version stamp in the header.
- **New CI:** consistency check (variable usage, docs defaults table, version
  stamps) plus stylelint on every push; release tags verified against the stamps.

---

## 3.2.4 — 2026-07-05

### Fixed
- Breakout box sits flush at touch density (#31). The overhang correction is a
  fixed pixel offset and touch makes the toolbar row taller, so ~1px stayed
  visible after the first Esc. Only `uidensity="touch"` gets the tighter pull.

---

## 3.2.3 — 2026-07-03

### Fixed
- Trust icon aligned in the resting urlbar, not only in the focus/breakout state
  (#31); the focus state re-tuned separately, since Nova pushes the icon further
  up on focus than at rest.

---

## 3.2.2 — 2026-07-03

### Fixed
- Megabar breakout no longer overhangs its container when the urlbar is focused
  under Nova (#31).
- Trust icon holds its position instead of drifting during the breakout.
- Urlbar text tint corrected under Nova.
- Tab close button aligned under Nova.

*Reported by NothingNA.*

---

## 3.2.1 — 2026-07-02

### Fixed
- The loading progress bar is opt-in again — the 3.2 config cleanup hard-wired
  it off with no way back. Set `--uc-show-loading-progress: 1`.

*Reported by `NeroWolfe_` on Reddit.*

---

## 3.2 — 2026-06-30

Refinement release, manually verified across Windows, macOS and Linux
(GNOME & KDE).

### Fixed
- Bookmark star no longer renders 1px too low in the urlbar.
- Tab close button reveals reliably on hover.
- Tab close button aligned and sized to the label line.
- Urlbar text size matched to the tab labels.

### Changed
- Status panel: squared corners, 8px inset matching the findbar.
- Split view: active-pane outline dropped (it could not close cleanly on every
  platform); the inactive-pane URL footer is squared and floats like the status
  panel, without border or shadow.

### Housekeeping
- Removed untested layout and highlight config options.
- Docs and README overhauled; `docs/action.md` retired and previews now ship
  from a local `assets/` folder (preview screenshot, dynamic URL/toolbar and
  findbar GIFs).

---

## 3.1.11 — 2026-06-27

### Added
- **`prefers-reduced-motion` support.** When animations are turned off at the
  system level, FoxOne's own transitions go quiet: the address bar resizes
  instantly, hover-revealed icons and the find bar appear without a fade, and the
  active-tab loading indicator rests as a static stroke. Firefox's native chrome
  animations are untouched, and there is no toggle — the preference is read from
  the system.

---

## 3.1.10 — 2026-06-25

### Changed
- `--uc-hide-urlbar-buttons` now also clears the picture-in-picture button, which
  had slipped past the toggle. At default settings PiP is untouched.

---

## 3.1.9 — 2026-06-25

### Changed
- Bookmarks toolbar items signal hover and active state by colour instead of a
  background box: white at rest, light yellow on hover, accent while pressed or
  while the folder menu is open. Favicons keep their own colours.

---

## 3.1.8 — 2026-06-25

### Changed
- Toolbar and address-bar icons signal hover and active state by colour instead
  of a background box, matching the tab-title model. Bookmark star and window
  controls keep their native behaviour.

### Fixed
- On Firefox 153 the hover-revealed address-bar icons (reader mode, translations,
  add-on buttons) sat 1px lower than the always-visible ones.

---

## 3.1.7 — 2026-06-24

### Fixed
- Tab group labels sat 1px lower than the normal tab titles beside them. The
  label text is nudged back into line; the coloured group chip stays put.

---

## 3.1.6 — 2026-06-24

### Fixed
- On Firefox 153 the amber active-pane outline in split view stopped closing
  along its bottom edge — 153 moved each pane's footer inside the content area,
  which with FoxOne's edge-to-edge content clipped the outline. A small bottom
  inset per pane restores it.

---

## 3.1.5 — 2026-06-21

### Fixed
- On ultrawide and 4K monitors the URL bar expanded to a disproportionate width,
  because its size used viewport-relative units. It is now capped at a fixed
  pixel ceiling (~630px at rest, 900px on focus) while keeping proportional
  sizing on smaller screens (#6).

*Reported by Metalwell.*

---

## 3.1.4 — 2026-06-21

### Fixed
- Extension icons in the URL bar auto-hide again. The reveal-on-hover rule listed
  each add-on icon by individual ID, so newly installed extensions stayed
  permanently visible. All add-on urlbar icons are now targeted by their shared
  class.

---

## 3.1.3 — 2026-06-21

### Fixed
- In split view the active-pane outline could render as a full-width amber bar
  across the top of the window: it targeted the deck tab behind the split rather
  than the visible panes. The outline now follows the focused pane and clears
  when you switch away.

---

## 3.1.2 — 2026-06-18

### Fixed
- `--uc-urlbar-background` was fed into the whole toolbox fill, so any non-default
  value tinted the entire top bar instead of just the URL field (#28). It now
  lands on the URL field only, and still steps aside for dynamic-theme extensions.

---

## 3.1.1 — 2026-06-17

### Fixed
- The DRM-content indicator (`#eme-notification-icon`) rendered ~2px too high;
  aligned with the same nudge as the security icon.

---

## 3.1 — 2026-06-17

### Added
- **Adaptive Tab Bar Colour compatibility (#5).** With a dynamic theme extension
  active, FoxOne yields the frame, toolbar, URL field, popups and sidebar to it
  and collapses the per-page tones onto one flat colour, so the bar adapts per
  page without losing the seamless one-line look. Accent and layout stay FoxOne's.

### Fixed
- Migrated all `:-moz-lwtheme` selectors to the `[lwtheme]` attribute. The
  pseudo-class was removed in current Firefox, which had silently disabled
  several rules (no-theme toolbox background, multiselect tab outline, dark-mode
  surface scoping).

---

## 3.0.1 — 2026-06-16

### Changed
- The Firefox 152 tab group label is replaced with a compact filled chip.

---

## 3.0 — 2026-06-15

**The Firefox Nova migration.** Firefox 152+ (`browser.nova.enabled=true`)
rebuilt the browser chrome, renaming and retiring most of the IDs and tokens
FoxOne relied on. This release ports the theme onto it; everything after 3.0
targets the Nova configuration.

### Changed — Nova port
- Urlbar internals adapted (ID → class migration).
- Active-tab and tab-hover styling adapted for Nova.
- Nova toolbox corners squared, web-content inset removed, toolbox frame margin
  removed (realigning the hamburger button).
- Nova bookmarks bar background matched to the navbar.
- Nova trust icon aligned vertically in the urlbar.
- Urlbar dropdown outline restored under Nova.
- Nova search-mode switcher frame recoloured to the FoxOne accent.
- Nova chrome-block framing flattened; AI sidebar layout fixed.
- Sidebar and split-view splitters made theme-adaptive.
- One-line layout is now unconditional — the 1000px breakpoint is gone.

### Added
- `--uc-hide-extension-icons` opt-in with hamburger hover-reveal (#13).
- `--uc-hide-urlbar-buttons` opt-in to hide URL-bar clutter icons (#21).
- Nova regression checklist (internal).

### Fixed
- Urlbar icon reveals scoped to `#urlbar:hover`, and the hover-reveal dead zone
  closed via padding clearance (#13).
- Extension-icon reveal no longer fires on tab hover.
- The hamburger is anchored to the real window-control box (#9).
- Wide tab ceilings restored above ~1710 physical px, scale-aware.
- Inactive tab max-width lowered and the active-tab ceiling set to 190px, so the
  active tab stays visibly larger with a subtler size gap.
- TabsToolbar extension buttons grouped, drag space trimmed.

### Changed — split view & in-content
- Split-view active-pane outline restyled to Gruvbox yellow and thinned to 1px
  (#25).
- `about:preferences` and `about:addons` pinned to Gruvbox dark with the yellow
  accent.

### Docs
- README and `installation.md` overhauled: Firefox version compatibility, Nova
  configuration details, classic-Firefox support notes, macOS support and
  maintainer link, development-branch note.
- `customisation.md` resynced with the current CSS variables.

---

## 2.3 — 2026-06-04

### Added
- **Navigation buttons can be hidden in three modes** — permanently hidden,
  auto-hidden with reveal on nav-bar hover, or auto-hidden with reveal on urlbar
  focus (`--uc-hide-nav-buttons`, `--uc-autohide-nav-buttons`, default off).

### Fixed
- Auto-hide nav button geometry and disabled state corrected.
- Tab min-width guarded against collapsed groups and closing tabs.

---

## 2.2.4 — 2026-06-03

### Changed
- Tab min-width is opt-in and defaults to the Firefox minimum
  (`--uc-tab-min-width`, #20).

---

## 2.2.3 — 2026-06-02

### Added
- Inactive tab titles get their own hover colour (`--uc-tab-hover-text`, #16) —
  the first step of the colour-as-signal model later applied everywhere.

---

## 2.2.2 — 2026-05-27

### Reverted
- The nav-button auto-hide CSS and the 2.2.1 position fix, restoring native
  button sizing.

---

## 2.2.1 — 2026-05-26

### Fixed
- Nav button position and disabled-state regression *(reverted in 2.2.2)*.

---

## 2.2 — 2026-05-26

### Fixed
- macOS traffic-light positioning in the one-line layout.

---

## 2.1.5 — 2026-05-25

### Changed
- Hardcoded colours refactored into CSS custom properties — the origin of the
  `--uc-color-base` / `-surface` / `-accent` / `-text` / `-hover` palette block.

---

## 2.1.4 — 2026-05-25

### Added
- Configurable active-tab highlight (background + underline).

---

## 2.1.3 — 2026-05-25

### Added
- **Auto-hide navigation buttons with hover reveal** (#12). Back, forward and
  reload collapse to zero width; hovering the nav bar or focusing the URL bar
  slides them in. The forward button stays hidden when there is no forward
  history. `--uc-autohide-nav-buttons` (default `0`).

---

## 2.1.2 — 2026-05-23

### Fixed
- 1px toolbar artifact with vivid background colours (#3, reported by
  @user451421541757324).

### Changed
- The tab loading progress bar is hidden by default.

---

## 2.1.1 — 2026-05-22

### Added
- Configurable border-radius toggle for the URL bar and findbar, with new
  default values.

---

## 2.1 — 2026-05-22

### Added
- **Tab loading progress bar with glow indicator**
  (`--uc-show-loading-progress`).
- **Configurable URL bar background colour** (`--uc-urlbar-background`):
  `#282828` blends with the toolbar, `#3c3836` is distinct, `#252829` is the
  older darker style.

### Docs
- `customisation.md` updated with all previously undocumented config variables,
  including the scrollbar setting.

---

## 2.0.4 — 2026-05-19

### Fixed
- Vertical tabs not filling the sidebar width (#2, reported by @ggroupas).

### Added
- Configurable toggle to hide the split-view context-menu entry.

---

## 2.0.3 — 2026-05-15

### Changed
- The split-view splitter is styled to match the sidebar splitter: default border
  and appearance removed, eliminating the two visible lines in Firefox's split
  view.
- "Open Link in Split View" is hidden from the link context menu by default
  (`--uc-show-context-splitview`).

---

## 2.0.2 — 2026-05-11

### Changed
- Border-radius removed from URL bar, findbar and findbar textbox (sharp corners).
- Container name and icon hidden by default, revealed on nav-bar hover/focus.
- URL bar result menu dots coloured `#fabd2f` on hover.
- Default URL bar background lightened to `#282828`.

---

## 2.0.1 — 2026-05-10

### Added
- Configurable scrollbar hiding for web content in `userContent.css`
  (default `none`).
- Pinned tab indicator *(pointed out by Dalik98)*.

### Fixed
- Bookmark star colour.

---

## 2.0 — 2026-05-09 *(baseline)*

The starting point of this changelog: tab-strip layout with extension buttons
beside the hamburger, drag-space fix for the compact two-line layout, Gruvbox
Dark migrated from a standalone `.xpi` into `userChrome.css` plus a new
`userContent.css`, Gruvbox urlbar selection highlight, the LittleFox-based
floating findbar, and taskbar-tab support.

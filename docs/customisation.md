---
layout: default
title: Customisation
---

# Customisation
---
> Running classic (pre-Nova) Firefox?
>
> From release 3.0 onward, FoxOne targets the Nova UI. The stylesheet is dual-written (Proton & Nova) and should still work, but it is no longer tested. For a known-good classic build, use the [2.3](https://github.com/Firnschnee/FoxOne/releases/tag/2.3) release.

> Looking for the **squared corners** look on windows 11? [This way!](https://github.com/rich-ayr/win11-toggle-rounded-corners)

> Want FoxOne with genuine Windows 11 Mica transparency? Take a look at Wintego's fork – [Firefox-transparent-theme](https://github.com/Wintego/Firefox-transparent-theme). 


---
All configuration lives in the `:root` block at the top of `userChrome.css`.

### Color Palette

| Variable | Default | Description |
|---|---|---|
| `--uc-color-base` | `#282828` | Main background (toolbar, frame, panels, context menus) |
| `--uc-color-surface` | `#3c3836` | Secondary tone (borders, separators, focused URL field) |
| `--uc-color-accent` | `#fabd2f` | Accent color (active tab, focus ring) |
| `--uc-color-text` | `#FFFFFF` | Primary text |
| `--uc-color-hover` | `#7c6f64` | Hover / highlight backgrounds |

### Layout

| Variable | Default | Description |
|---|---|---|
| `--uc-border-radius` | `8px` | Corner radius for the surfaces FoxOne owns, and the value the rounded-corners toggle hands to every surface it rounds |
| `--uc-rounded` | `0` | Rounded corners (`0` = FoxOne's square edges, `1` = every squared surface takes `--uc-border-radius`). See [Rounded corners](#rounded-corners) |
| `--uc-status-panel-spacing` | `8px` | Statuspanel distance from window border (`0` = corner); matches the findbar's `8px` inset |
| `--uc-urlbar-min-width` | `min(35vw, 630px)` | URL bar default width (px ceiling caps growth on ultrawide/4K) |
| `--uc-urlbar-max-width` | `min(50vw, 900px)` | URL bar width on focus (px ceiling caps growth on ultrawide/4K) |

### Rounded corners

FoxOne is square by default. Set `--uc-rounded: 1` if you want FoxOne's layout with the corners the rest of Windows 11 (and stock Firefox) has:

```css
--uc-rounded: 1;
```

Every surface FoxOne squares then takes `--uc-border-radius` (`8px`), and the rows inside those surfaces take half of it (`4px`). That is the same pair Firefox ships in its own design tokens, so the result reads like stock Firefox rather than like a theme with one radius painted over everything: arrow panels, context menus and their rows, the URL field and its breakout box, tabs, find bar, status panel and split-view footer.

Change the radius itself with `--uc-border-radius`; `--uc-rounded` only decides whether it is applied or zeroed.

What it deliberately does not touch:

* **Layout.** The content area and the frames around toolbox, sidebar and browser stay square. Firefox only rounds those because it insets them by 4px first; FoxOne is edge-to-edge, and rounding them without the inset cuts notches into the page and alongside the sidebar. That is a layout change, not a corner.
* **The URL bar's internals.** Row hover, icon chips and result buttons stay square, and are invisible either way since FoxOne draws them without a background. Only the painted shell rounds.
* **How popups are drawn.** FoxOne draws its popups itself rather than using the Windows 11 Mica backdrop, which is what keeps the palette Gruvbox instead of system-tinted. That path also gives the corners proper antialiasing, so no radius here renders as a staircase.

### Tabs

| Variable | Default | Description |
|---|---|---|
| `--uc-active-tab-width` | `clamp(100px, 30vw, 190px)` | Active tab width (narrow-window default; widened to `…250px` once the window reaches ~1710 *physical* px, i.e. ~2/3 of WQHD; the threshold is tiered by `resolution`/dppx so it fires at the same physical pixel count under DPI scaling) |
| `--uc-inactive-tab-width` | `clamp(100px, 20vw, 120px)` | Inactive tab width (ceiling kept below the active one so the active tab stays visibly larger; widened to `…200px` at the same ~1710 physical-px threshold) |
| `--uc-tab-min-width` | `76px` | Tab minimum width (Firefox default: `76px`, lower e.g. `36px` to fit more before overflow) |
| `--uc-tab-hover-text` | `#ffda85` | Inactive tab title color on hover |

### Window Controls

| Variable | Default | Description |
|---|---|---|
| `--uc-window-buttons-width` | `138px` | Window control button width. Fallback only: on non-macOS the hamburger auto-tracks the real control box via CSS anchor positioning; used on macOS and on Firefox builds without anchor support (auto `0px` on macOS) |
| `--uc-hamburger-width` | `44px` | Hamburger menu reserved width |
| `--uc-toolbar-button-width` | `36px` | Extension button width (per button) |
| `--uc-newtab-width` | `36px` | Standalone new-tab button width (`0` if removed) |
| `--uc-drag-space` | `20px` | Grab zone after the tabs for moving the window (functional space, don't set to `0`) |

### Visibility Toggles

| Variable | Default | Description |
|---|---|---|
| `--uc-show-context-splitview` | `0` | Context menu "Open Link in Split View" (`0` = hidden, `1` = visible) |
| `--uc-show-all-tabs-button` | `0` | All-tabs button (`0` = hidden, `1` = visible) |
| `--uc-autohide-nav-buttons` | `0` | Navigation buttons auto-hide (`0` = always visible, `1` = reveal on hover and focus, `2` = reveal on hover only) |
| `--uc-hide-nav-buttons` | `0` | Remove navigation buttons entirely (`1` = hide, `0` = show) |
| `--uc-hide-urlbar-buttons` | `0` | Hide URL-bar clutter icons — shield (tracking protection), reader mode, translations, bookmark star, add-to-taskbar (`1` = hide all, `0` = default reveal) |
| `--uc-hide-extension-icons` | `1` | Hide pinned toolbar extension icons, reveal them on hamburger hover (`1` = hide + hover-reveal, `0` = always show) |
| `--uc-show-loading-progress` | `0` | Loading progress bar on the active tab while a page loads (`1` = show, `0` = hide) |
| `--uc-container-line-top` | `1` | Container tab indicator line position (`1` = top of the tab, the Firefox 153 layout, `0` = bottom edge, the classic pre-153 look) |
| `--uc-dynamic-bookmarks` | `1` | Bookmarks bar as an overlay that reveals on URL-bar hover instead of a permanent row (`1` = dynamic, `0` = static row on its own line). Needs Firefox' bookmarks toolbar set to "Always show" |
| `--uc-dynamic-bookmarks-hover-delay` | `450ms` | Delay before the URL-bar hover reveals the bar |
| `--uc-dynamic-bookmarks-hide-delay` | `50ms` | Grace period before the bar collapses again, for travelling from the URL bar onto it |

The dynamic bookmarks bar is adapted from [LittleFox](https://github.com/biglavis/LittleFox) (MIT).

Since 3.5 it is on by default. Set Firefox' bookmarks toolbar to **Always show** (right-click the toolbar area → *Bookmarks Toolbar* → *Always Show*) and it hides itself until you reach for the URL bar, giving the line back to the page. Set `--uc-dynamic-bookmarks: 0` for the previous behaviour, a permanent row below the toolbar.

### Adaptive Tab Bar Colour

FoxOne is compatible with the [Adaptive Tab Bar Colour](https://addons.mozilla.org/firefox/addon/adaptive-tab-bar-colour/) extension out of the box, with no configuration needed. When the extension is active it retints the frame, toolbar, URL field, popups and sidebar to match each page, and FoxOne yields those surfaces to it, collapsing the extension's separate tones onto one flat colour so the one-line bar stays seamless. FoxOne's structural layout and its accent cues (selected-tab line and title, focus ring, container glow) stay in place, so the one-line look survives the recolour.

The hand-off keys off the `lwtheme` attribute Firefox sets on the root element whenever a theme extension is active: FoxOne sets no lightweight theme of its own, so with no such extension installed it keeps painting its own Gruvbox palette exactly as before. The same mechanism applies to any dynamic-theme extension that uses Firefox's standard colour variables.

> The selected tab's title stays in the accent colour by design. On a near-white page colour that is lower contrast than the rest of the chrome; it is a deliberate identity trade-off, not a bug.

> FoxOne's hover and selection cues use accent-coloured text rather than background blocks, which reads best on dark surfaces. Under Adaptive Tab Bar Colour a light page colour can make them look off; for the best result pair FoxOne with dark mode and [Dark Reader](https://addons.mozilla.org/firefox/addon/darkreader/) instead.

### Scrollbar (`userContent.css`)

| Variable | Default | Description |
|---|---|---|
| `--uc-content-scrollbar` | `thin` | Scrollbar in web content (`thin` = slim everywhere, `none` = hidden everywhere, `auto` = hands off, pages keep control of their own scrollbars) |

### Find Bar

| Variable | Default | Description |
|---|---|---|
| `--findbar-top` | `8px` | Distance from top edge |
| `--findbar-right` | `8px` | Distance from right edge |
| `--findbar-width` | `360px` | Preferred width |
| `--show-highlight-all` | `1` | Show highlight-all button (`1` / `0`) |
| `--show-match-case` | `1` | Show match-case button (`1` / `0`) |
| `--show-match-diacritics` | `1` | Show match-diacritics button (`1` / `0`) |
| `--show-whole-words` | `1` | Show whole-words button (`1` / `0`) |
| `--highlight-all-position` | `0` | Button order position |
| `--match-case-position` | `1` | Button order position |
| `--match-diacritics-position` | `2` | Button order position |
| `--whole-words-position` | `3` | Button order position |

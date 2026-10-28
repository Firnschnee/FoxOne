---
layout: default
title: Installation
---

# Installation

---
> Running classic (pre-Nova) Firefox?
>
> From release 3.0 onward, FoxOne targets the Nova UI. The stylesheet is dual-written (Proton & Nova) and should still work, but it is no longer tested. For a known-good classic build, use the [2.3](https://github.com/Firnschnee/FoxOne/releases/tag/2.3) release.

---

### 1. Download

Download [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) and [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css)

### 2. Enable custom stylesheets

In Firefox, go to `about:config` and set:

```
toolkit.legacyUserProfileCustomizations.stylesheets = true
```

### 3. Find your profile folder

In Firefox, go to `about:support` and click **Open Profile Folder**.

### 4. Copy the files

Create a `chrome` folder inside your profile folder if it doesn't exist, then copy these files into it:

- [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) – browser UI styling
- [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css) – new tab / home page colors

### 5. Restart Firefox

The theme applies on restart.

### 6. Color Theme

FoxOne includes a built-in Gruvbox color theme that follows Firefox' colour scheme: Gruvbox Dark in dark mode, Gruvbox Light in light mode. No separate extension needed.

### 7. Bookmarks toolbar

Right-click an empty spot on the toolbar and pick **Bookmarks Toolbar → Always Show**.

Sounds backwards for a one-line theme, but that is what hands the bar to FoxOne: since 3.5 it no longer sits on a row of its own. It hangs below the toolbar, out of sight, and fades in when you reach for the URL bar – move the pointer down onto it and it stays open until you leave. The page keeps the line. Since 3.5.2 a fresh tab shows the bar outright, no hover needed, until you navigate somewhere.

Leave the setting alone and nothing changes; Firefox keeps the bar collapsed and there is nothing to reveal. If you would rather have the classic permanent row, set `--uc-dynamic-bookmarks: 0` in `userChrome.css` – see [Customisation](customisation.html).

## Keeping your settings across updates

If you change more than a setting or two, you can keep FoxOne's files in a folder of their own and import them. An update then only replaces the files in that folder, and your settings stay where they are.

```text
chrome/
├─ userChrome.css    # your settings
├─ userContent.css   # your settings
└─ FoxOne/
   ├─ userChrome.css
   ├─ userContent.css
   └─ ...
```

Your own `userChrome.css` starts with the import, followed by only the settings you change:

```css
@import "FoxOne/userChrome.css";

:root {
  --uc-rounded: 1;
  --uc-hide-urlbar-buttons: 1;
  --uc-light-color-accent: #8f3f71;
}

@media (prefers-color-scheme: dark) {
  :root {
    --uc-color-accent: #d3869b;
  }
}
```

The import has to come before any other rule, otherwise Firefox ignores it. Do the same in your own `userContent.css` with `@import "FoxOne/userContent.css";`. Its settings are listed in its own CONFIG block.

A few things behave differently from editing FoxOne's CONFIG block directly, because your settings now come last:

- Put overrides of the dark palette (`--uc-color-*`, `--uc-tab-hover-text`) in a `prefers-color-scheme: dark` block as above. Otherwise they also apply in light mode. `userContent.css` has no `--uc-light-*` settings, so set the light colours there in a `prefers-color-scheme: light` block.
- Tab widths you set here apply at every window width. FoxOne normally widens tabs on wide windows.
- On macOS, leave `--uc-window-buttons-width` alone. FoxOne sets it to `0px` there.

When an update removes or renames a setting, that setting simply stops doing anything. The release notes list every such change.

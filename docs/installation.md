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

- [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) — browser UI styling
- [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css) — new tab / home page colors

### 5. Restart Firefox

The theme applies on restart.

### 6. Color Theme

FoxOne now includes a built-in Gruvbox inspired Dark color theme that activates automatically in dark mode. No separate extension needed.

### 7. Bookmarks toolbar

Right-click an empty spot on the toolbar and pick **Bookmarks Toolbar → Always Show**.

Sounds backwards for a one-line theme, but that is what hands the bar to FoxOne: since 3.5 it no longer sits on a row of its own. It hangs below the toolbar, out of sight, and fades in when you reach for the URL bar — move the pointer down onto it and it stays open until you leave. The page keeps the line.

Leave the setting alone and nothing changes; Firefox keeps the bar collapsed and there is nothing to reveal. If you would rather have the classic permanent row, set `--uc-dynamic-bookmarks: 0` in `userChrome.css` — see [Customisation](customisation.html).

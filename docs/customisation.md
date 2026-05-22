# Customisation

All configuration lives in the `:root` block at the top of `userChrome.css`.

### Layout

| Variable | Default | Description |
|---|---|---|
| `--uc-border-radius` | `8px` | Global corner radius |
| `--uc-status-panel-spacing` | `12px` | Statuspanel distance from window border (`0` = corner) |
| `--uc-urlbar-background` | `#282828` | URL bar background (`#282828` = blends with toolbar, `#3c3836` = distinct) |
| `--uc-urlbar-min-width` | `35vw` | URL bar default width |
| `--uc-urlbar-max-width` | `50vw` | URL bar width on focus |
| `--uc-urlbar-position` | `1` | URL bar position (`1` = tabs right, `3` = tabs left) |
| `--uc-urlbar-top-spacing` | `1px` | Vertical URL bar spacing adjustment |
| `--uc-toolbar-position` | `4` | Bookmarks bar position (`0` = top, `4` = bottom) |

### Tabs

| Variable | Default | Description |
|---|---|---|
| `--uc-active-tab-width` | `clamp(100px, 30vw, 250px)` | Active tab width |
| `--uc-inactive-tab-width` | `clamp(100px, 20vw, 200px)` | Inactive tab width |
| `--show-tab-close-button` | `none` | Tab close button (`none` = hidden, `-moz-inline-block` = visible) |
| `--show-tab-close-button-hover` | `-moz-inline-block` | Tab close button on hover |
| `--uc-show-loading-progress` | `1` | Tab loading progress bar (`1` = show, `0` = hide) |

### Container Tabs

| Variable | Default | Description |
|---|---|---|
| `--container-tabs-indicator-margin` | `10px` | Container indicator inset from tab edges |
| `--uc-identity-glow` | `0 1px 10px 1px` | Container indicator glow (box-shadow spread) |

### Window Controls

| Variable | Default | Description |
|---|---|---|
| `--uc-window-buttons-width` | `138px` | Windows control button width |
| `--uc-hamburger-width` | `44px` | Hamburger menu reserved width |
| `--uc-toolbar-button-width` | `36px` | Extension button width (per button) |
| `--uc-newtab-width` | `36px` | Standalone new-tab button width (`0` if removed) |
| `--uc-drag-space` | `40px` | Gap for window dragging |

### Visibility Toggles

| Variable | Default | Description |
|---|---|---|
| `--uc-show-context-splitview` | `none` | Context menu "Open Link in Split View" (`none` = hidden, `-moz-box` = visible) |
| `--uc-show-all-tabs-button` | `none` | All-tabs button (`none` = hidden, `-moz-box` = visible) |

### Scrollbar (`userContent.css`)

| Variable | Default | Description |
|---|---|---|
| `--uc-content-scrollbar` | `none` | Scrollbar in web content (`none` = hidden, `thin` = slim, `auto` = OS default) |

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

## FoxOne

A minimalist one-line `userChrome.css` theme for Firefox.

Based on [Cascade](https://github.com/andreasgrafen/cascade) by Andreas Grafen, inspired by [LittleFox](https://github.com/biglavis/LittleFox).

### Features

- One-line layout — URL bar and tabs share a single row
- Cascade's colour system with dark/light mode support
- Hamburger menu repositioned next to window controls
- Tab close button visible on active tab and on hover
- Speaker/mute icons always visible on playing tabs
- Container tab indicators with glow effect
- Tab group label styling
- Configurable via CSS variables at the top of the file

### Installation

1. Download [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css).
2. In Firefox, go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
3. In Firefox, go to `about:support` and open your Profile Folder. Create a `chrome` folder if it doesn't exist.
4. Copy `userChrome.css` into the `chrome` folder and restart Firefox.

### Customization

All configuration lives in the `:root` block at the top of the file. Key variables:

| Variable | Default | Description |
|---|---|---|
| `--uc-border-radius` | `8px` | Global corner radius |
| `--uc-urlbar-min-width` | `35vw` | URL bar width |
| `--uc-urlbar-position` | `1` | URL bar position (1 = left, 3 = right) |
| `--uc-active-tab-width` | `clamp(100px, 30vw, 300px)` | Active tab width |
| `--uc-inactive-tab-width` | `clamp(100px, 20vw, 200px)` | Inactive tab width |
| `--uc-window-buttons-width` | `138px` | Windows control button width |
| `--uc-toolbar-position` | `4` | Bookmarks bar position (0 = top, 4 = bottom) |

Works well with [LittleFox-ColorTheme](https://github.com/Firnschnee/LittleFox-ColorTheme).

### Credits

- [Cascade](https://github.com/andreasgrafen/cascade) by Andreas Grafen — the foundation
- [LittleFox](https://github.com/biglavis/LittleFox) — design inspiration

### License

MIT License — see [LICENSE](LICENSE)

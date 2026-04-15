# FoxOne

A minimalistic one-line `userChrome.css` theme for Firefox.

<img width="1390" height="772" alt="Screenshot 2026-04-15 110213" src="https://github.com/user-attachments/assets/b36683c7-c392-47ac-9625-b39ebf9a4869" />

### Features

- One-line layout – URL bar and tabs share a single row
- Clean URL bar – non-essential icons hidden by default
- Hover reveal – non-essential icons slide in with animated transitions on hover/focus
- Hamburger menu repositioned next to window controls
- Tab close button visible on hover
- Configurable via CSS variables at the top of the file

<img width="800" height="47" alt="new-2cb39d8d5755c6dc" src="https://github.com/user-attachments/assets/42abe0a1-3622-4ead-901b-1cdd71d85159" />

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
| `--uc-active-tab-width` | `clamp(100px, 30vw, 250px)` | Active tab width |
| `--uc-inactive-tab-width` | `clamp(100px, 20vw, 200px)` | Inactive tab width |
| `--uc-window-buttons-width` | `138px` | Windows control button width |
| `--uc-toolbar-position` | `4` | Bookmarks bar position (0 = top, 4 = bottom) |

Works well with [LittleFox-ColorTheme](https://github.com/Firnschnee/LittleFox-ColorTheme).

### Credits

Based on [Cascade](https://github.com/andreasgrafen/cascade), inspired by [LittleFox](https://github.com/biglavis/LittleFox).

### License

MIT License – see [LICENSE](LICENSE)

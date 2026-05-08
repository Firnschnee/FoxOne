# Installation

### 1. Download

Download [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) and [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css)
No need for the ColorTheme.xpi anymore. 

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

### Color Theme

FoxOne includes a built-in Gruvbox inspired Dark color theme that activates automatically in dark mode. No separate extension needed.

If you use a different system theme or want light mode, the color theme section in `userChrome.css` only applies inside `@media (prefers-color-scheme: dark)` and won't interfere.

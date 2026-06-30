# FoxOne

**A minimalistic one-line Firefox theme**
> Ready for **Nova**. Tested and stable on Firefox 152+ with `browser.nova.enabled`
>
> 
![urlbar](assets/preview_cropped.png)


> **Running classic (pre-Nova) Firefox?**
> 
> From release 3.0 onward, FoxOne targets the Nova UI. The stylesheet is dual-written (Proton & Nova) and should still work, but it is no longer tested. For a known-good classic build, use the 2.3 release.



### Features

>Dynamic URL bar with hover-reveal Icons
>
![urlbar](assets/dynamic_url.gif)

<br>


>Dynamic tabs and two addons pinned by the hamburger, revealed on hover.
>
![toolbar](assets/dynamic_toolbar.gif)


<br>



>Floating Find Bar. Adapted from [LittleFox](https://github.com/biglavis/LittleFox)
>
![findbar](assets/findbar.gif)



### Installation
>
>1. Download [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) and [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css)
>
>2. Go to **`about:config`** in FireFox. Search for **`toolkit.legacyUserProfileCustomizations.stylesheets`** and set it to **`true`**.
>
>3. Find your profile folder: In Firefox, go to `about:support` and click **Open Profile Folder**.
>
>4. Create a `chrome` folder inside your profile folder if it doesn't exist, then copy these files into it:
>
>- [`userChrome.css`](https://github.com/Firnschnee/FoxOne/blob/main/userChrome.css) - browser UI styling
>- [`userContent.css`](https://github.com/Firnschnee/FoxOne/blob/main/userContent.css) - new tab / home page colors
>
>5. Restart Firefox - The theme applies on restart.
>   
>6. FoxOne includes a built-in Gruvbox inspired Dark color theme that activates automatically in dark mode. No separate extension needed.


### Customisation
> FoxOne is fully configurable through CSS variables. See all options → [docs/customisation.md](docs/customisation.md)
> 
> If you use a different system theme or want light mode, the color theme section in userChrome.css only applies inside @media (prefers-color-scheme: dark) and won't interfere.
---
 
**[Installation](docs/installation.md) and [Customisation](https://github.com/Firnschnee/FoxOne/blob/main/docs/customisation.md)** |
Inspired by [Cascade](https://github.com/andreasgrafen/cascade) & [LittleFox](https://github.com/biglavis/LittleFox) | It works with [Adaptive Tab Bar Colour](https://addons.mozilla.org/de/firefox/addon/adaptive-tab-bar-colour/)! | License: [MIT](LICENSE) 

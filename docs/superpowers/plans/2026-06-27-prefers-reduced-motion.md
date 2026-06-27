# prefers-reduced-motion Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Silence FoxOne's own decorative transitions and animations when the OS "reduce motion" preference is set.

**Architecture:** A single consolidated `@media (prefers-reduced-motion: reduce){ … }` block appended to the end of `userChrome.css`. It re-targets each selector that FoxOne animates and sets `transition: none !important` (and, for the loading bar, `animation: none` + a resting `scaleX(1)`). End-of-file placement is load-bearing: media queries add no specificity, so the override wins over the `!important` originals purely by later source order.

**Tech Stack:** Plain CSS (Firefox userChrome.css). No build, no test runner.

## Global Constraints

- Stays in the 3.1.x version line; no version bump in this change.
- Override FoxOne's own motion ONLY. Do not touch Firefox-native chrome animations. No blanket `*` selector.
- No `--uc-` toggle variable. Trigger is the native media query exclusively.
- Em-dash (U+2014) is forbidden anywhere, including CSS comments. En-dash, hyphen, colon only.
- No automated tests exist for userChrome.css. Verification is manual via `ui.prefersReducedMotion` in about:config.

---

### Task 1: Add the reduced-motion override block

**Files:**
- Modify: `userChrome.css` (append after current final line 1710)

**Interfaces:**
- Consumes: existing selectors and their `!important` transitions/animations defined earlier in the file (lines referenced below).
- Produces: nothing other tasks depend on. This is the only task.

The selectors being overridden, with their source locations for cross-check:

| Selector | Original motion | Line |
|----------|-----------------|------|
| `#nav-bar` | `transition: width 0.25s` | 457 |
| `#titlebar` | `transition: width 0.25s` | 470 |
| `#reload-button, #stop-reload-button` | `transition: all 0.2s` | 1028 |
| `#identity-permission-box` | reveal transition | 1088 |
| `#userContext-label, #userContext-indicator` | reveal transition | 1125 |
| `#reader-mode-button, #taskbar-tabs-button, #translations-button, .urlbar-addon-page-action` | reveal transition | 1156 |
| `#TabsToolbar-customization-target > toolbaritem` | reveal transition | 1280 |
| `findbar`, `findbar[hidden]` | slide + scaleY | 1537, 1542 |
| `.tabbrowser-tab .tab-background::before` | `transition: opacity 0.3s` | 872 |
| `.tabbrowser-tab[busy] .tab-background::before/::after` | `animation: uc-progress` | 880, 902 |

- [ ] **Step 1: Define the expected behaviour (verification criteria)**

After this change, with `ui.prefersReducedMotion = 1` (about:config), reloading the chrome should show:
- Focusing the urlbar resizes it instantly (no 0.25s width slide).
- Hover-reveal icons (page actions, container label, extension icons) snap in/out with no fade or width animation.
- Opening the findbar (Ctrl+F) shows it instantly with no slide/scale.
- If `--uc-show-loading-progress` is `1`, a busy tab shows a static full stroke, not a growing one.
- With `ui.prefersReducedMotion = 0`, all animations behave exactly as before (no regression).

- [ ] **Step 2: Append the override block to `userChrome.css`**

Append the following at the end of the file (after the current final `html[id^="taskbartab"] #urlbar-container` block):

```css


/* ==========================================================================
   REDUCED MOTION - honour the OS "reduce motion" preference.
   Overrides FoxOne's OWN decorative transitions/animations only; Firefox's
   native chrome animations are left untouched. Placed at end-of-file on
   purpose: media queries add no specificity, so these rules win over the
   !important originals through later source order alone.
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {

  /* Urlbar / titlebar width animation */
  #nav-bar  { transition: none !important; }
  #titlebar { transition: none !important; }

  /* Auto-hide nav buttons reveal */
  #reload-button,
  #stop-reload-button { transition: none !important; }

  /* Urlbar hover-reveal groups */
  #identity-permission-box { transition: none !important; }

  #userContext-label,
  #userContext-indicator { transition: none !important; }

  #reader-mode-button,
  #taskbar-tabs-button,
  #translations-button,
  .urlbar-addon-page-action { transition: none !important; }

  /* Tabstrip extension-icon reveal */
  #TabsToolbar-customization-target > toolbaritem { transition: none !important; }

  /* Findbar slide / scale */
  findbar,
  findbar[hidden] { transition: none !important; }

  /* Loading progress bar - resting full stroke instead of growth.
     Visibility stays bound to --uc-show-loading-progress, so the feature
     remains opt-in exactly as before. */
  .tabbrowser-tab .tab-background::before { transition: none !important; }

  .tabbrowser-tab[busy] .tab-background::before,
  .tabbrowser-tab[busy] .tab-background::after {
    animation: none !important;
    transform: scaleX(1) !important;
  }
}
```

- [ ] **Step 3: Verify reduced-motion ON behaviour**

1. Open `about:config`, set `ui.prefersReducedMotion` to `1`.
2. Reload chrome: `Ctrl+Shift+J` (Browser Console) or restart Firefox; or toggle a userChrome reload if configured.
3. Focus the urlbar: it must resize instantly, no slide.
4. Press `Ctrl+F`: findbar must appear instantly, no slide/scale.
5. Hover the urlbar so page-action / container icons reveal: they snap, no fade.

Expected: no FoxOne animation plays. All end states still reachable.

- [ ] **Step 4: Verify reduced-motion OFF behaviour (no regression)**

1. Set `ui.prefersReducedMotion` back to `0` (or remove the pref).
2. Reload chrome.
3. Repeat the urlbar-focus and findbar checks.

Expected: animations behave exactly as before this change.

- [ ] **Step 5: Commit**

```bash
git add userChrome.css
git commit -m "Add prefers-reduced-motion support for FoxOne animations"
```

---

## Self-Review

**Spec coverage:**
- Trigger = native media query, no toggle: covered (block is `@media (prefers-reduced-motion: reduce)`, no `--uc-` var). ✓
- Scope = FoxOne's own motion only: covered (explicit selector list, no `*`). ✓
- All 8 transition targets from the spec table: covered in Step 2. ✓
- Loading bar static, not removed: covered (`animation: none` + `scaleX(1)`, opacity stays var-bound). ✓
- End-of-file placement for source-order override: covered. ✓
- Version stays 3.1.x: no version edit in plan. ✓

**Placeholder scan:** No TBD/TODO; full CSS block present; verification steps concrete. ✓

**Type consistency:** Selectors in the override block match the spec table and the source-line cross-check table verbatim. ✓

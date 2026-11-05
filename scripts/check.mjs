#!/usr/bin/env node
/* FoxOne consistency checks.
 *
 * Run from anywhere: node scripts/check.mjs
 * Exit code 0 = clean, 1 = findings (each printed as "FAIL: ...").
 *
 * Checks:
 *   1. Variable consistency: every FoxOne-owned custom property used via
 *      var() or @container style() is defined somewhere, and every defined
 *      FoxOne-owned property is actually used (dead config is drift).
 *   2. Doc drift: the Default column of every table row in
 *      docs/customisation.md matches the first declaration of that variable
 *      in the CSS files, and every variable in the CONFIG :root block is
 *      documented. Values are compared whitespace-normalised.
 *   3. Version stamp: both CSS headers carry the same "FoxOne <version>".
 *      On a tag build (GITHUB_REF_TYPE=tag) the tag must match it too.
 *   4. Structural smoke test: balanced braces and comment markers.
 *
 * No dependencies; stylelint (see the workflow) covers real syntax checking.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CSS_FILES = ["userChrome.css", "userContent.css"];
const DOC_FILE = join("docs", "customisation.md");

// Variable families FoxOne owns. Anything else inside var() is a Firefox
// token and intentionally out of scope.
const OWN_PREFIXES = [
  "--uc-", "--findbar-", "--show-", "--options-", "--textbox-",
  "--highlight-all-", "--match-case-", "--match-diacritics-",
  "--whole-words-",
];

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`FAIL: ${msg}`);
};

const read = (path) => readFileSync(join(ROOT, path), "utf8");
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const isOwn = (name) => OWN_PREFIXES.some((p) => name.startsWith(p));
const normalise = (value) => value.trim().replace(/\s+/g, " ");
const matchAll = (text, re) => [...text.matchAll(re)].map((m) => m[1]);

/** Body of the first :root block (the CONFIG block). */
function firstRootBlock(css) {
  const open = css.search(/:root\s*\{/);
  if (open === -1) return "";
  const start = css.indexOf("{", open) + 1;
  let depth = 1;
  for (let i = start; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(start, i);
  }
  return "";
}

/** name -> whitespace-normalised value, first declaration wins. */
function declarations(block) {
  const out = new Map();
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
    if (!out.has(m[1])) out.set(m[1], normalise(m[2]));
  }
  return out;
}

// ------------------------------------------------------------- load files
const cssRaw = new Map(CSS_FILES.map((p) => [p, read(p)]));
const cssClean = new Map(
  [...cssRaw].map(([p, raw]) => [p, stripComments(raw)]),
);
const doc = read(DOC_FILE);

// ------------------------------------------------ 1. variable consistency
const defined = new Set();
const used = new Set();
for (const clean of cssClean.values()) {
  // @container style(--x: 1) is a usage; drop it before scanning for
  // declarations, otherwise its colon reads as a definition.
  matchAll(clean, /style\(\s*(--[\w-]+)/g).forEach((n) => used.add(n));
  const noQueries = clean.replace(/style\(\s*--[\w-]+\s*:[^)]*\)/g, "");
  matchAll(noQueries, /(--[\w-]+)\s*:/g).forEach((n) => defined.add(n));
  matchAll(clean, /var\(\s*(--[\w-]+)/g).forEach((n) => used.add(n));
}

for (const name of [...used].filter((n) => isOwn(n) && !defined.has(n)).sort())
  fail(`${name} is used but never defined`);
for (const name of [...defined].filter((n) => isOwn(n) && !used.has(n)).sort())
  fail(`${name} is defined but never used`);

// -------------------------------------------------------------- 2. doc drift
// First declaration of each variable across both files (userChrome first,
// matching the docs' "all configuration lives in the :root block" contract).
const cssFirst = new Map();
for (const p of CSS_FILES) {
  for (const [name, value] of declarations(cssClean.get(p))) {
    if (!cssFirst.has(name)) cssFirst.set(name, value);
  }
}

// A default in backticks is compared with the CSS. A default in plain text
// ("derived (about 33 / 39 / 45px)") marks a value worked out from Firefox's
// tokens: the row still counts as documented, but there is no literal to
// compare (#93).
const docVars = new Map();
for (const m of doc.matchAll(/^\|\s*`(--[\w-]+)`\s*\|\s*(?:`([^`]*)`)?/gm)) {
  docVars.set(m[1], m[2] === undefined ? null : normalise(m[2]));
}

for (const [name, docValue] of [...docVars].sort()) {
  if (!cssFirst.has(name)) {
    fail(`${name} is documented in customisation.md but not defined in CSS`);
  } else if (docValue !== null && cssFirst.get(name) !== docValue) {
    fail(
      `${name}: customisation.md says \`${docValue}\`, ` +
        `CSS says \`${cssFirst.get(name)}\``,
    );
  }
}

const configVars = new Set();
for (const p of CSS_FILES) {
  for (const name of declarations(firstRootBlock(cssClean.get(p))).keys()) {
    configVars.add(name);
  }
}
for (const name of [...configVars].filter((n) => !docVars.has(n)).sort())
  fail(`${name} is in the CONFIG :root block but missing from customisation.md`);

// ---------------------------------------------------------- 3. version stamp
const versions = new Map();
for (const p of CSS_FILES) {
  const m = cssRaw.get(p).match(/FoxOne\s+(\d+(?:\.\d+)+)/);
  if (!m) fail(`${p} has no 'FoxOne <version>' stamp in its header`);
  else versions.set(p, m[1]);
}

if (new Set(versions.values()).size > 1)
  fail(`version stamps differ: ${JSON.stringify(Object.fromEntries(versions))}`);

if (process.env.GITHUB_REF_TYPE === "tag" && versions.size > 0) {
  const tag = (process.env.GITHUB_REF_NAME ?? "").replace(/^v/, "");
  const stamp = versions.values().next().value;
  if (tag !== stamp)
    fail(`git tag '${tag}' does not match the file version stamp '${stamp}'`);
}

// ------------------------------------------------------ 4. structural smoke
const count = (text, needle) => text.split(needle).length - 1;
for (const p of CSS_FILES) {
  const raw = cssRaw.get(p);
  if (count(raw, "/*") !== count(raw, "*/"))
    fail(`${p}: unbalanced comment markers`);
  const clean = cssClean.get(p);
  if (count(clean, "{") !== count(clean, "}"))
    fail(`${p}: unbalanced braces`);
}

// ----------------------------------------------------------------- result
if (failures.length > 0) {
  console.log(`\n${failures.length} finding(s).`);
  process.exit(1);
}
console.log("All checks passed.");

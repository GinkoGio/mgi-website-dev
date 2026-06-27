# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate website for Maverick Global Investments S.r.l. (Milan, Italy) — an independent investment firm in renewable energy, real estate, and alternative finance.

**Stack:** Eleventy (11ty) SSG with Nunjucks templates and centralized i18n JSON. Output is plain static HTML in `_site/`.

## Commands

```bash
npm start                  # dev server with live reload → http://localhost:8080
npm run build             # production build → _site/ (compatible with GitHub Pages and direct disk open)
npm run preview           # local build (pathPrefix /) + serve → http://localhost:3000
npm run sync:from-main    # Sync content from main → restyling/solar-white
npm run sync:to-main      # Sync content from restyling/solar-white → main
```

The build now also includes sitemap generation via `scripts/generate-sitemap.js`, and the GitHub Actions deploy workflow is configured to run for both `main` and `restyling/solar-white`.

> ✅ The generated `_site/` output now uses relative asset and page links. You can open `_site/index.html` or `_site/it/index.html` directly from disk, while `npm run preview` remains useful for local server testing.

## Architecture

7 Nunjucks templates in `src/` each generate two HTML files (EN + IT) via Eleventy Pagination over `src/_data/languages.json`. The build produces 14 pages in `_site/`.

**Pages:** `index`, `about`, `what-we-do`, `investment-sectors`, `philosophy`, `portfolio`, `contact` — output at `/_site/page.html` and `/_site/it/page.html`.

**Data flow:**

- `src/_data/languages.json` — pagination source (`[{code:"en",urlPrefix:""},{code:"it",urlPrefix:"/it"}]`)
- `src/_data/i18n.json` — all bilingual text, keyed by page slug then field name
- `src/_includes/base.njk` — shared `<head>`, `<nav>`, `<footer>`; injects child content via `{{ content | safe }}`
- Each `.njk` uses front matter `pageSlug` and `permalink: "{{ lang.urlPrefix }}/slug.html"`

**i18n pattern** — in every template:

```njk
{% set t = i18n[pageSlug] | localize(lang.code) %}
```

The `localize` filter (defined in `.eleventy.js`) resolves `{"en":"...","it":"..."}` objects to the plain string for the current locale. Use `{{ t.key | safe }}` when the value contains HTML.

**Static assets** (`hitech.css`, `hitech.js`, `images/`, `pv_portfolio_map.html`) are copied to `_site/` via passthrough in `.eleventy.js`.

**Sitemap generation:** `npm run build` invokes `scripts/generate-sitemap.js` after Eleventy to write `sitemap.xml` from all canonical URLs in `src/_data/i18n.json`.

**CSS (`hitech.css`, ~1680 lines):** Single stylesheet — custom properties, layout, responsive breakpoints, component styles. No preprocessor.

**JS (`hitech.js`, ~183 lines):** IIFE-wrapped vanilla JS:

- Animated canvas network (hero, desktop only — skipped on `max-width: 960px`)
- Nav scroll state (`scrolled` class, triggers at `scrollY > 44`)
- Mobile hamburger menu (`nav-open` class on `#main-nav`)
- Stat counter animation via `IntersectionObserver` on `.stat-num[data-target]` and `.metric-num[data-target]`
- Scroll-reveal fade-ins on `.reveal` → adds `.visible`
- Hero parallax on `.hero-image img` (throttled via `requestAnimationFrame`)

**Note:** The canvas stroke color is hardcoded in `hitech.js` line 46 — `#e0285a` on `main`, `#e8700a` on `restyling/solar-white`. It is not read from the CSS custom property; update it manually when switching palette.

**Note:** Legacy files (`animations.css`, `animations.js`, `fancy.css`, `fancy.js`) have been removed — they were unused reference copies of older code.

## Adding or Editing Content

To change any text: edit `src/_data/i18n.json`, then rebuild. The structure is:

```json
{ "pageSlug": { "field_key": { "en": "...", "it": "..." } } }
```

To change page structure: edit the relevant `.njk` in `src/` — the change applies to both languages automatically.

To add a new text field: add it to `i18n.json` under the correct page key, then reference it in the template with `{{ t.field_key }}`.

## Branches

| Branch                  | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `main`                  | Production — original dark design (rose/purple palette) |
| `restyling/solar-white` | Visual restyling experiment — Solar White option C      |

To switch between designs: `git checkout main` or `git checkout restyling/solar-white`, then `npm run build`.

## Branch Synchronization

The two branches are **identical in content** but differ only in **design** (CSS colors, fonts, JavaScript canvas color).

### Automatic Sync Script

Use npm scripts to keep content synchronized between branches:

```bash
npm run sync:from-main     # main → restyling/solar-white
npm run sync:to-main       # restyling/solar-white → main
```

**What syncs:**

- ✅ `src/` (all templates, layouts, data)
- ✅ `CLAUDE.md`, `README.md`, `package.json`

**What stays separate (by design):**

- 🚫 `hitech.css` — color tokens, fonts, responsive rules
- 🚫 `hitech.js` — canvas stroke color (line 45)

**How it works:**

1. Fetches latest from remote
2. Copies shared files from source branch to target
3. Preserves theme-only files on target branch
4. Creates commit: `"sync: content from [branch]"`
5. Auto-pushes to GitHub

This ensures that bug fixes, content updates, and text changes propagate to both designs without creating merge conflicts or overwriting palette customizations.

## Design System

### `main` branch — Dark (original)

Color tokens (CSS custom properties in `hitech.css`):

| Token      | Value     | Usage                                 |
| ---------- | --------- | ------------------------------------- |
| `--bg-0`   | `#06010a` | Page background                       |
| `--bg-1`   | `#0d0315` | Section background                    |
| `--bg-2`   | `#14071e` | Card/form background                  |
| `--bg-3`   | `#1d0b28` | Hero background                       |
| `--rose`   | `#e0285a` | Primary accent (borders, glows, CTAs) |
| `--amber`  | `#ffa040` | Status indicator                      |
| `--text-1` | `#f5e8ed` | Primary text                          |
| `--text-2` | `#b08898` | Secondary/muted text                  |

Fonts: Space Grotesk (headings), Inter (body), Space Mono (monospaced data) — loaded via Google Fonts.

### `restyling/solar-white` branch — Solar White (option C)

Light-mode dominant. Hero, page-hero, CTA banner, and footer stay dark charcoal as bookends.

| Token      | Value     | Usage                                   |
| ---------- | --------- | --------------------------------------- |
| `--bg-0`   | `#faf8f5` | Page background (warm cream)            |
| `--bg-1`   | `#f0ece6` | Section background                      |
| `--bg-2`   | `#e8e2d9` | Card/form background                    |
| `--bg-3`   | `#1a1614` | Dark sections: hero, CTA, footer        |
| `--rose`   | `#e8700a` | Primary accent (terracotta/solar amber) |
| `--amber`  | `#2a7d4f` | Secondary accent (verde prato)          |
| `--text-1` | `#1a1614` | Primary text (dark on light bg)         |
| `--text-2` | `#6b5e54` | Secondary/muted text                    |

Dark sections (`.hero-content`, `.page-hero`, `.section-dark`, `.cta-banner`, `footer`) override `--text-1/2/3` locally to light values via CSS custom property scoping.

Fonts: **Cormorant Garamond** (H1/H2 display), Space Grotesk (UI/cards), Inter (body), Space Mono (data).

## Brand & Copywriting Guidelines

`UPDATES.md` contains brand identity and editorial standards: tone of voice, terminology glossary (IT ↔ EN), approved rewrites for hero sections and sector descriptions, and KPI/ESG metric values. Consult it before writing or revising any copy.

## Images

`images/` holds 8 main site images plus `images/PV plant/` (21 images of solar installations). All images are WebP (originals as JPG/PNG kept alongside). Below-the-fold images use `loading="lazy"`. Favicon and all logo references use `logo.webp`.

## Standalone Map Page

`pv_portfolio_map.html` is a self-contained page (Leaflet.js via CDN, inline CSS/JS, plant data hardcoded as JS array). **Bilingual via `?lang=` query param** (`?lang=it` → Italian, default English) — a single file resolves both languages at runtime from a small `T` i18n dictionary in the inline script; the iframe in `portfolio.njk` passes `?lang={{ lang.code }}`. Not part of the Eleventy build — copied to `_site/` as-is via passthrough. Styled with the site fonts (Space Grotesk / Space Mono / Inter); the file is **not** covered by the sync scripts, so restyle it on each branch separately (accent `#e0285a` on `main`, `#e8700a` on `restyling/solar-white`).

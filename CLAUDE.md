# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate website for Maverick Global Investments S.r.l. (Milan, Italy) — an independent investment firm in renewable energy, real estate, and alternative finance.

**Stack:** Eleventy (11ty) SSG with Nunjucks templates and centralized i18n JSON. Output is plain static HTML in `_site/`.

## Commands

```bash
npm start        # dev server with live reload → http://localhost:8080
npm run build    # production build → _site/
```

To preview the built output as a proper web server (required — opening HTML files directly via `file://` breaks absolute asset paths):
```bash
python -m http.server 8000 --directory _site
```

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

**Static assets** (`hitech.css`, `hitech.js`, `images/`, `pv_portfolio_map_en.html`) are copied to `_site/` via passthrough in `.eleventy.js`.

**CSS (`hitech.css`, ~1370 lines):** Single stylesheet — custom properties, layout, responsive breakpoints, component styles. No preprocessor.

**JS (`hitech.js`, ~183 lines):** IIFE-wrapped vanilla JS:
- Animated canvas network (hero, desktop only — skipped on `max-width: 960px`)
- Nav scroll state (`scrolled` class, triggers at `scrollY > 44`)
- Mobile hamburger menu (`nav-open` class on `#main-nav`)
- Stat counter animation via `IntersectionObserver` on `.stat-num[data-target]` and `.metric-num[data-target]`
- Scroll-reveal fade-ins on `.reveal` → adds `.visible`
- Hero parallax on `.hero-image img` (throttled via `requestAnimationFrame`)

**Note:** The rose accent `#e0285a` is hardcoded in `hitech.js` line 46 (canvas stroke), not read from the CSS custom property.

**Legacy files** (`animations.css`, `animations.js`, `fancy.css`, `fancy.js`) are unused — kept for reference only.

## Adding or Editing Content

To change any text: edit `src/_data/i18n.json`, then rebuild. The structure is:
```json
{ "pageSlug": { "field_key": { "en": "...", "it": "..." } } }
```

To change page structure: edit the relevant `.njk` in `src/` — the change applies to both languages automatically.

To add a new text field: add it to `i18n.json` under the correct page key, then reference it in the template with `{{ t.field_key }}`.

## Design System

Color tokens (CSS custom properties in `hitech.css`):

| Token | Value | Usage |
|---|---|---|
| `--bg-0` | `#06010a` | Page background |
| `--bg-1` | `#0d0315` | Section background |
| `--bg-2` | `#14071e` | Card/form background |
| `--bg-3` | `#1d0b28` | Hero background |
| `--rose` | `#e0285a` | Primary accent (borders, glows, CTAs) |
| `--amber` | `#ffa040` | Status indicator |
| `--text-1` | `#f5e8ed` | Primary text |
| `--text-2` | `#b08898` | Secondary/muted text |

Fonts: Space Grotesk (headings), Inter (body), Space Mono (monospaced data) — loaded via Google Fonts.

## Brand & Copywriting Guidelines

`UPDATES.md` contains brand identity and editorial standards: tone of voice, terminology glossary (IT ↔ EN), approved rewrites for hero sections and sector descriptions, and KPI/ESG metric values. Consult it before writing or revising any copy.

## Images

`images/` holds 8 main site images plus `images/PV plant/` (21 images of solar installations). All images are WebP (originals as JPG/PNG kept alongside). Below-the-fold images use `loading="lazy"`. Favicon and all logo references use `logo.webp`.

## Standalone Map Page

`pv_portfolio_map_en.html` is a self-contained page (Leaflet.js via CDN, inline CSS/JS, plant data hardcoded as JS array). No Italian mirror. Not part of the Eleventy build — copied to `_site/` as-is via passthrough.

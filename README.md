# Maverick Global Investments (MGI) - Corporate Website

Corporate website for **Maverick Global Investments S.r.l.** (Milan, Italy) — an independent investment firm operating in renewable energy, real estate, and alternative finance.

## 🚀 Tech Stack

This project is built as a static site using the **Eleventy (11ty)** Static Site Generator (SSG).

- **Framework:** [Eleventy (11ty)](https://www.11ty.dev/)
- **Templating:** [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Styling:** Vanilla CSS (`hitech.css`) with custom properties and responsive design.
- **Interactivity:** Vanilla JavaScript (`hitech.js`) featuring a custom canvas network animation, scroll reveals, and intersection observers for animated statistics.
- **Architecture:** Centralized i18n JSON data source. Output is pure, fast, static HTML.

## 📁 Project Structure

```text
mgi-website-dev/
├── src/                    # Source files for Eleventy
│   ├── _data/              # Global data files (i18n.json, languages.json)
│   ├── _includes/          # Nunjucks layouts and partials (base.njk)
│   └── *.njk               # Page templates (index, about, portfolio, etc.)
├── hitech.css              # Main stylesheet (custom properties, components)
├── hitech.js               # Main script (animations, nav logic, observers)
├── images/                 # Static images and WebP assets
├── pv_portfolio_map.html   # Standalone Leaflet map page (bilingual via ?lang=)
├── .eleventy.js            # Eleventy configuration and custom filters
└── CLAUDE.md               # Detailed architectural guidance and instructions
```

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GinkoGio/mgi-website-dev.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server with live reload:

```bash
npm start     # dev server with live reload → http://localhost:8080
npm run build # production build → _site/
npm run preview  # local build + serve → http://localhost:3000
```

### Syncing content between branches

When you edit content on one branch, sync it to the other (preserves design-only files):

```bash
npm run sync:from-main        # Copy content from main → restyling/solar-white
npm run sync:to-main         # Copy content from restyling/solar-white → main
```

The script automatically:

- ✅ Syncs: `src/`, `CLAUDE.md`, `README.md`, `package.json`
- 🚫 Preserves: `hitech.css`, `hitech.js` (design-specific)
- 🚀 Commits and pushes to GitHub automatically

This keeps `README.md` and `CLAUDE.md` aligned across both `main` and `restyling/solar-white`.

The site will be available at `http://localhost:8080`.

### Production Build

To build the site for production (with the GitHub Pages path prefix):

```bash
npm run build
```

This generates the static files in the `_site/` directory.

The build also runs `scripts/generate-sitemap.js` to produce `sitemap.xml` from `src/_data/i18n.json`.

The generated `_site/` files use relative asset and page links, so they can be opened directly from disk in a browser via `file://`.

### Local Preview (built output)

To build and preview the static output locally (without the GitHub Pages path prefix):

```bash
npm run preview
```

This builds the site with `pathPrefix=/` and serves it at `http://localhost:3000`.

> ✅ You can also open `_site/index.html` or `_site/it/index.html` directly in your browser after `npm run build`.

## 🌍 Multilingual Architecture (i18n)

The website natively supports two languages: **English (EN)** and **Italian (IT)**.

- The content is driven by a centralized translation file: `src/_data/i18n.json`.
- The build process uses Eleventy Pagination over `src/_data/languages.json` to generate two distinct HTML pages for every `.njk` template (e.g., `/_site/about.html` and `/_site/it/about.html`).
- Templates use a custom `localize` filter defined in `.eleventy.js` to resolve translations at build time.

### Editing Content

To modify textual content, edit `src/_data/i18n.json` and rebuild the site.
Structure format:

```json
{
	"pageSlug": {
		"field_key": {
			"en": "English text",
			"it": "Italian text"
		}
	}
}
```

## 🌿 Branches

| Branch                  | Design                                                            |
| ----------------------- | ----------------------------------------------------------------- |
| `main`                  | Dark — near-black purple/rose palette (production)                |
| `restyling/solar-white` | PE Boutique (light) — warm ivory, burgundy/gold accents, Cormorant Garamond headings |

```bash
git checkout restyling/solar-white   # switch to light-mode redesign
git checkout main                    # back to production
npm run build                        # rebuild after switching
```

## 🎨 Design System & Assets

All colors are CSS custom properties in `hitech.css`. Two palettes exist across branches:

**`main` (dark):** `--bg-0: #06010a`, `--rose: #e0285a`, `--text-1: #f5e8ed`

**`restyling/solar-white` (light, PE boutique):** `--bg-0: #f4f1ea` (warm ivory), `--rose: #8e2f43` (deep burgundy), `--amber: #b08d4f` (muted gold), `--text-1: #1f2733` (dark ink). Light throughout — no dark sections; hero/footer/CTA are subtle warm bands. Colored glows are kept near-zero (raise the `0.03` alphas to re-enable).

- **Typography (`main`)**: Space Grotesk (headings), Inter (body), Space Mono (data).
- **Typography (`solar-white`)**: Cormorant Garamond (H1/H2 display), Space Grotesk (UI), Inter (body), Space Mono (data).
- **Animations**: Interactive canvas network in the hero section (color matches active palette).

For full architectural details, brand guidelines, and branch design docs see `CLAUDE.md`.

## 📄 License

ISC License.

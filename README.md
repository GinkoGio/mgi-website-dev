# Maverick Global Investments (MGI) - Corporate Website

Corporate website for **Maverick Global Investments S.r.l.** (Milan, Italy) — an independent investment firm operating in renewable energy, real estate, and alternative finance.

## 🚀 Tech Stack

This project is built as a static site using the **Eleventy (11ty)** Static Site Generator (SSG).

*   **Framework:** [Eleventy (11ty)](https://www.11ty.dev/)
*   **Templating:** [Nunjucks](https://mozilla.github.io/nunjucks/)
*   **Styling:** Vanilla CSS (`hitech.css`) with custom properties and responsive design.
*   **Interactivity:** Vanilla JavaScript (`hitech.js`) featuring a custom canvas network animation, scroll reveals, and intersection observers for animated statistics.
*   **Architecture:** Centralized i18n JSON data source. Output is pure, fast, static HTML.

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
├── pv_portfolio_map_en.html # Standalone Leaflet map page
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
npm start
```
The site will be available at `http://localhost:8080`.

### Production Build
To build the site for production (with the GitHub Pages path prefix):
```bash
npm run build
```
This generates the static files in the `_site/` directory.

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

*   The content is driven by a centralized translation file: `src/_data/i18n.json`.
*   The build process uses Eleventy Pagination over `src/_data/languages.json` to generate two distinct HTML pages for every `.njk` template (e.g., `/_site/about.html` and `/_site/it/about.html`).
*   Templates use a custom `localize` filter defined in `.eleventy.js` to resolve translations at build time.

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

| Branch | Design |
|---|---|
| `main` | Dark — near-black purple/rose palette (production) |
| `restyling/solar-white` | Solar White — warm cream, terracotta accent, Cormorant Garamond headings |

Ogni branch ha il proprio `deploy.yml` configurato per triggerare solo da sé stesso, in modo che i due design non si sovrascrivano su GitHub Pages.

### Switchare il design su GitHub Pages

**Pubblicare Solar White:**
```bash
git checkout restyling/solar-white && git commit --allow-empty -m "deploy: restore solar  design on GitHub Pages" && git push
```

**Tornare al dark (main):**
```bash
git checkout main && git commit --allow-empty -m "deploy: restore dark design on GitHub Pages" && git push
```

> `git push` triggera il deploy solo se ci sono commit nuovi. Se il branch è già aggiornato, usa `git commit --allow-empty` per forzare il workflow senza modifiche reali.

### Sviluppo locale
```bash
git checkout restyling/solar-white   # o main
npm run build                        # ribuilda dopo il cambio branch
npm run preview                      # serve a http://localhost:3000
```

## 🎨 Design System & Assets

*   **Colors**: Controlled via CSS custom properties in `hitech.css` (e.g., `--bg-0`, `--rose`, `--text-1`). Dark palette on `main`; Solar White palette on `restyling/solar-white`.
*   **Typography**: Space Grotesk (headings), Inter (body), Space Mono (data). The Solar White branch adds Cormorant Garamond for H1/H2 display titles.
*   **Animations**: The hero section features an interactive, dynamic canvas network.

For full architectural details, brand guidelines, and branch design docs see `CLAUDE.md`.

## 📄 License
ISC License.

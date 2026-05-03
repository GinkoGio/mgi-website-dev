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
   git clone https://github.com/GinkoGio/mgi-tech.git
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
To build the site for production:
```bash
npm run build
```
This generates the static files in the `_site/` directory.

To preview the built production output, you need to use a local web server (opening HTML files directly via `file://` will break absolute asset paths). You can use Python's built-in HTTP server:
```bash
python -m http.server 8000 --directory _site
```

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

## 🎨 Design System & Assets

*   **Colors**: Controlled via CSS custom properties in `hitech.css` (e.g., `--bg-0`, `--rose`, `--text-1`).
*   **Typography**: Space Grotesk for headings, Inter for body text, and Space Mono for monospaced data.
*   **Animations**: The hero section features an interactive, dynamic canvas network.

For extensive details regarding the architecture, brand guidelines, and legacy code notes, please refer to the `CLAUDE.md` and `UPDATES.md` (if available) files in the repository.

## 📄 License
ISC License.

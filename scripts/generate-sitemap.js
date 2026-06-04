const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', '_data', 'i18n.json');
const outPath = path.join(__dirname, '..', 'sitemap.xml');

const raw = fs.readFileSync(i18nPath, 'utf8');
const i18n = JSON.parse(raw);

const pages = Object.entries(i18n).filter(([key, val]) => val && val.canonical);

const urls = [];
const now = new Date().toISOString();

pages.forEach(([key, val]) => {
  if (val.canonical && val.canonical.en) urls.push(val.canonical.en);
  if (val.canonical && val.canonical.it) urls.push(val.canonical.it);
});

// Deduplicate
const unique = [...new Set(urls)];

const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
const footer = '</urlset>\n';

const body = unique.map(u => {
  return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
}).join('\n');

fs.writeFileSync(outPath, header + body + '\n' + footer);
console.log(`Sitemap written to ${outPath} (${unique.length} URLs)`);

const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

// Use ELEVENTY_PATH_PREFIX env var if set, otherwise default to GitHub Pages path.
// For local preview: set ELEVENTY_PATH_PREFIX=/
// For GitHub Pages deploy: leave unset (defaults to /mgi-website-dev/)
const pathPrefix = process.env.ELEVENTY_PATH_PREFIX ?? "/mgi-website-dev/";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "hitech.css": "hitech.css" });
  eleventyConfig.addPassthroughCopy({ "hitech.js": "hitech.js" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "pv_portfolio_map.html": "pv_portfolio_map.html" });

  // Usage: {% set t = i18n.pageName | localize(lang.code) %}
  // Returns an object with values already resolved for the current locale.
  // Plain strings (no en/it keys) are returned as-is.
  eleventyConfig.addFilter("localize", function (section, code) {
    const result = {};
    for (const [key, val] of Object.entries(section)) {
      result[key] =
        typeof val === "object" && val !== null && val[code] !== undefined
          ? val[code]
          : val;
    }
    return result;
  });

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};

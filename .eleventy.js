module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "hitech.css": "hitech.css" });
  eleventyConfig.addPassthroughCopy({ "hitech.js": "hitech.js" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "pv_portfolio_map_en.html": "pv_portfolio_map_en.html" });

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
    dir: {
      input: "src",
      output: "_site",
    },
  };
};

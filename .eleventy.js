const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // all posts
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item;
    });
  });

  // only content in the `recipes` directory
  eleventyConfig.addCollection("recipes", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/_src\/recipes\//) !== null;
    });
  });

    // only content in the `articles` directory
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/_src\/articles\//) !== null;
    });
  });

  eleventyConfig.addCollection("subnav", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.data.tags === "subnav";
    });
  });

  eleventyConfig.addCollection("footnav", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.data.tags === "footnav";
    });
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: 'direct',
    permalinkSymbol: ''
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));
  eleventyConfig.addPassthroughCopy("_src/_assets/img");

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

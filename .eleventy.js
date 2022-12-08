const path = require('path');
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginRespimg = require( "eleventy-plugin-respimg" );

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.cloudinaryCloudName = 'wilto';
  eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
  eleventyConfig.fallbackWidth = 640;
  eleventyConfig.fallbackWidth = 640;

  eleventyConfig.addShortcode('cloudrespimg', (filepath, alt, sizes, lazy = false) => {
    const fetchBase = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/upload/`;
    const ext = path.extname( filepath );
    const name = path.basename( filepath, ext );
    const src = `${fetchBase}q_auto,f_auto,w_${eleventyConfig.fallbackWidth}/${name}.jpg`;
    const srcset = eleventyConfig.srcsetWidths.map(w => {
      return `${fetchBase}q_auto,f_auto,w_${w}/${name}.jpg ${w}w`;
    }).join(', ');

    return `<img height="1000" width="1000" src="${src}" srcset="${srcset}" sizes="${sizes ? sizes : '100vw'}" alt="${alt ? alt : ''}"${lazy ? ' loading="lazy"' : ''}>`;
  });

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
      return item.inputPath.match(/^\.\/_src\/recipes\//) !== null && item.data.draft !== true;
    });
  });

  eleventyConfig.addNunjucksFilter( "limit", ( arr, limitend, limitstart = 0 ) => {
    return arr.slice( limitstart, limitend );
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags.map( tag => tag.toLowerCase() );

        tags = tags.filter(function(item) {
          item = item.toLowerCase();
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
            case "tagList":
            case "tag":
            case "subnav":
            case "footnav":
            case "base":
              return false;
          }
          return true;
        });

        for (const tag of tags) {
          tagSet.add( tag );
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet ];
  });

  eleventyConfig.addFilter("searchJSON", ( collection ) => {
    let index = [];
    collection.forEach((page) => {
      let type = page.template.frontMatter.data.type,
        imgPath;
      if( type === "recipe" || type === "article" ) {
        imgPath = ( page.template.frontMatter.data.img && "/img/" + page.template.frontMatter.data.img + "-2.jpg" ) || page.template.frontMatter.data.feat_img && page.template.frontMatter.data.feat_img.img;
        index.push({
          id: page.url,
          title: page.template.frontMatter.data.title,
          lede: page.template.frontMatter.data.lede,
          tags: page.template.frontMatter.data.tags,
          img: imgPath
        });
      }
    });
    return index;
  });

  // only content in the `recipes` directory
  eleventyConfig.addCollection("truncrecipes", function(collection) {
    let ret = [];

    let sortedCollection = collection.getAll().sort( ( a, b ) => {
      return new Date(b.data.page.date) - new Date(a.data.page.date);
    });

    sortedCollection.filter(function(item) {
      if( ( item.data.img != null || item.data.feat_img ) && item.data.feat != true && item.data.subfeat != true && item.inputPath.match(/^\.\/_src\/recipes\//) !== null ) {
          ret.push( item );
      }
    });
    return ret;
  });

    // only content in the `articles` directory
  eleventyConfig.addCollection("articles", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/_src\/articles\//) !== null;
    });
  });

  eleventyConfig.addCollection("truncarticles", function(collection) {
    let sortedCollection = collection.getAll().sort( ( a, b ) => {
      return new Date(b.data.page.date) - new Date(a.data.page.date);
    });

    return sortedCollection.filter(function(item) {
      if( ( item.data.img != null || item.data.feat_img ) && item.data.feat != true && item.data.subfeat != true && item.inputPath.match(/^\.\/_src\/articles\//) !== null ) {
        return item;
      }
    });
  });

  eleventyConfig.addCollection("features", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.data.feat === true;
    });
  });

  eleventyConfig.addFilter("relatedFilter", function(collection, needle) {
    return collection.filter(function(item) {
      return item.data.title == needle;
    });
  });

  eleventyConfig.addCollection("subnav", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.data.tags == "subnav";
    });
  });

  eleventyConfig.addCollection("footnav", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.data.tags == "footnav";
    });
  });

  eleventyConfig.addShortcode("tweet", function( tweet ) {
    return `<blockquote class="tweet-embed">
        <pre>${ tweet.text }</pre>
        <span class="tweet-attr">@<a href="${ tweet.href }">${ tweet.user }</a></span>
    </blockquote>`;
  });

  eleventyConfig.addShortcode("respimg", function( img ) {
    return `<figure class="inline-img ${ img.align == "right" ? `inline-img-right` : `` }${ img.align == "center" ? `inline-img-center` : `` }" ${ img.caption ? `aria-describedby="${ img.src }-capt">` : `>` }
      <img 
        src="/img/${ img.src }-4.jpg" 
        alt="${ img.alt }"
        srcset="/img/${ img.src }-1.jpg 320w, /img/${ img.src }-2.jpg 450w, /img/${ img.src }-3.jpg 640w, /img/${ img.src }-4.jpg 820w, /img/${ img.src }-5.jpg 1024w"
        sizes="(min-width: 1320px) 323px, (min-width: 1040px) calc(8.85vw + 208px), (min-width: 800px) calc(6.36vw + 229px), (min-width: 560px) calc(32.27vw + 28px), 93.33vw" />
      ${ img.caption ? `<figcaption class="caption" id="${ img.src }-capt">${ img.caption }</figcaption></figure>` : `</figure>` }
  `;
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

  const md = require('markdown-it')({
    html: false,
    breaks: true,
    linkify: true,
  });
  eleventyConfig.addNunjucksFilter('markdownify', markdownString =>
    md.render(markdownString),
  );

  eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));
  eleventyConfig.addPassthroughCopy("_src/_assets/img");
  eleventyConfig.addPassthroughCopy("_src/admin");
  eleventyConfig.addPassthroughCopy("_src/img");

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

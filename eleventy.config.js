import { DateTime } from "luxon";

export default function (eleventyConfig) {
  // Static passthrough: images and css get copied as-is
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Posts collection, newest first
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  // Human-readable date, e.g. 30 August 2026
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy");
  });

  // Machine-readable date for <time datetime="">
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // RFC 822 date for the RSS feed
  eleventyConfig.addFilter("rfc822Date", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822();
  });

  // First N words, for auto-excerpts when a post has no explicit "excerpt" field
  eleventyConfig.addFilter("excerpt", (content, wordCount = 40) => {
    const text = String(content).replace(/(<([^>]+)>)/gi, "");
    const words = text.trim().split(/\s+/);
    return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "…" : "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

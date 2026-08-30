export default {
  layout: "post.njk",
  tags: ["post"],
  permalink: "/{{ date | isoDate }}-{{ title | slugify }}/",
};

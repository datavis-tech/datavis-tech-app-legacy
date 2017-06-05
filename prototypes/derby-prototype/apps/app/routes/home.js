// The Home Page.
module.exports = function (app){
  app.get("/", function(page, model){
    model.set("_page.title", "Datavis.tech");
    model.set("_page.hideLogin", true);
    model.set("_page.training", [
      {
        title: "Introduction to Data Visualization",
        description: "An introduction to data visualization. This covers fundamental visualization concepts like data tables, column types, aggregation, and visual encoding using marks and channels.",
        videoURL: "https://www.youtube.com/watch?v=itNlukt5x18&feature=youtu.be",
        sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/introDataVisD3",
        imageURL: "/img/training/introDataVisD3.png"
      },
      {
        title: "Introduction to D3.js",
        description: "This tutorial teaches data visualization with D3.js from the ground up. After watching this, you will know how to make a scatter plot, bar chart, and line chart.",
        videoURL: "https://www.youtube.com/watch?v=8jvoTV54nXw",
        sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/introToD3",
        imageURL: "/img/training/introD3.png"
      },
      {
        title: "Splitting Charts",
        description: "Covers how to add an additional dimension of data to a bar chart. Rectangles are split into stacked bars using d3 nest and d3 stack layout, giving a new view into the breakdown of religions across the largest 5 countries.",
        videoURL: "https://www.youtube.com/watch?v=6Xynj_pBybc",
        sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/splittingCharts",
        imageURL: "/img/training/splittingCharts.png"
      },
      {
        title: "Introduction to Node.js",
        description: "A tutorial on NodeJS for folks who have never used it before. Covers background, module system, non-blocking I/O, reading and writing files, simple HTTP server, and NPM basics.",
        videoURL: "https://www.youtube.com/watch?v=9qE1MNTymU0",
        sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/introToNodeJS",
        imageURL: "/img/training/introNodeJS.png"
      }
      //{
      //  title: "",
      //  description: "",
      //  videoURL: "",
      //  sourceURL: "",
      //  imageURL: ""
      //},
    ]);
    page.render("home");
  });
};

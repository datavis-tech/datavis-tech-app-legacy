var express = require("express");

var jsdom = require("jsdom");
var dom = jsdom.jsdom;
var serializeDocument = jsdom.serializeDocument;

var d3 = require("d3-selection");

var expressApp = express();

function app(url, html, data){
  var head = html.select("head");

  var title = head.selectAll("title").data([null]);
  title = title.merge(title.enter().append("title"));
  title.text(data.title);

  var body = html.select("body");

  var docTitle = body.selectAll(".doc-title").data([null]);
  docTitle = docTitle.merge(docTitle.enter().append("h1")
    .attr("class", "doc-title"));
  docTitle.text(data.title);


}

expressApp.get("/*", function (req, res) {

  var doc = dom("<!DOCTYPE html>");
  var url = req.url;

  var html = d3.select(doc);
  var body = html.select("body");

  var data = {
    title: "Hello"
  };

  app(url, html, data);
  app(url, html, data);

  //res.send(serializeDocument(doc));

  res.send(body.node().outerHTML);
});

expressApp.listen(3000, function () {
  console.log("Example expressApp listening on port 3000!");
});

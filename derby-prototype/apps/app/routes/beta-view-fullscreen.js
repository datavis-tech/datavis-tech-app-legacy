// Shows documents full screen.
module.exports = function (app){
  app.get("/beta/:id/fullscreen", function(page, model, params, next){
    var doc = model.at("beta_documents." + params.id);
    doc.subscribe(function(err) {
      if (err) return next(err);

      // If the document does not exist, render an error page.
      if (!doc.get()){
        model.set("_page.title", "Error");
        model.set("_page.id", params.id);
        page.render("beta-document-error");
      } else {
        model.ref("_page.document", doc); 
        model.ref("_page.title", "_page.document.title");
        page.render("beta-view-fullscreen");
      }
    });
  });
};

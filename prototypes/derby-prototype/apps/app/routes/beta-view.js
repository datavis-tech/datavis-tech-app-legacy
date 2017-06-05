
// The document viewing page.
module.exports = function (app, permissions){
  app.get("/beta/:id", function(page, model, params, next){
    var doc = model.at("beta_documents." + params.id);
    doc.subscribe(function(err) {
      if (err) return next(err);

      // If the document does not exist, render an error page.
      if (!doc.get()){
        model.set("_page.title", "Error");
        model.set("_page.id", params.id);
        page.render("beta-document-error");
      } else {
        doc.increment("views");

        model.ref("_page.document", doc); 
        model.ref("_page.title", "_page.document.title");
        model.set("_page.canEdit", permissions.canEdit(doc.get(), model.get("_session")));
        page.render("beta-view");
      }
    });
  });
};

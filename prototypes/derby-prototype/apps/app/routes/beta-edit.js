// The document editing page.
module.exports = function (app, permissions){

  // Dynamically updates the page title.
  app.on("model", function (model){
    model.fn("beta-edit-title", function (title){
      return "(editing) " + title;
    });
  });

  app.get("/beta/:id/edit", function(page, model, params, next){
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
        model.start("_page.title", "_page.document.title", "beta-edit-title");
        model.set("_page.canDelete", permissions.canDelete(doc.get(), model.get("_session")));
        page.render("beta-edit");
      }
    });
  });
};

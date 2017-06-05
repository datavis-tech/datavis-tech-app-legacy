module.exports = function (app, permissions){
  app.get("/beta", function(page, model){
    model.set("_page.title", "Datavis.tech");
    model.set("_page.canCreate", permissions.canCreate(model.get("_session")));

    var visQuery = model.query("beta_documents_list", {
      type: "vis"
    }).subscribe( function (err){
      if(err) { return next(err); }
      visQuery.ref("_page.visDocuments");

      var dataQuery = model.query("beta_documents_list", {
        type: "data"
      }).subscribe( function (err){
        if(err) { return next(err); }
        dataQuery.ref("_page.dataDocuments");

        page.render("beta-home");
      });
    });
  });
};

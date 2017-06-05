// The route that deletes documents.
module.exports = function (app){
  app.get("/beta/:id/delete", function(page, model, params, next){
    model.del("beta_documents." + params.id, function (err){
      if(err){ console.log(err); }
      page.redirect("/beta");
    });
  });
}

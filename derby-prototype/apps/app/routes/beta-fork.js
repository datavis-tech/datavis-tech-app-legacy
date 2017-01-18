// Forks a document
var timestamp = require("../../../components/timestamp.js");
module.exports = function (app, permissions){
  app.get("/beta/:id/fork", function(page, model, params, next) {

    var doc = model.at("beta_documents." + params.id);

    doc.fetch(function(err) {
      if (err) return next(err);

      // If the document does not exist, render an error page.
      if (!doc.get()){
        model.set("_page.title", "Error");
        model.set("_page.id", params.id);
        page.render("documentError");
      } else {

        var id = generateDocumentId(model);
        model.add("beta_documents", {
          id: id,
          type: doc.get("type"),
          owner: model.get("_session.user.id"),
          title: doc.get("title"),
          createdDate: timestamp(),
          updatedDate: timestamp(),
          views: 0,
          associatedDatasets: doc.get("associatedDatasets"),
          description: [
            doc.get("description") + "\n\nForked from ",
            "[" + doc.get("title") + "]",
            "(/beta/" + params.id + ")."
          ].join(""),
          content: doc.get("content")
        });

        page.redirect("/beta/" + id + "/edit");

      }
    });
  });

};

// Generates a UUID then strips dashes.
// TODO unify with beta-creator/index.js.
function generateDocumentId(model){
  return model.id().replace(/-/g, "");
}

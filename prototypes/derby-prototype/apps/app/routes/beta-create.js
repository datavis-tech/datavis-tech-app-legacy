// The "Create a new document" page.
module.exports = function (app, permissions){

  // Displays a form where the user enters data,
  // stored temporarily under _page.docTitle and _page.docDescription.
  app.get("/beta/create/:type", function(page, model, params){
    var type = params.type;
    if(permissions.canCreate(model.get("_session"))){
      if(type === "data" || type === "vis"){

        model.set("_page.tempDoc", {
          type: type,
          owner: model.get("_session.user.id")
        });

        var typeLabel = {
          data: "dataset",
          vis: "visualization"
        }[type];

        model.set("_page.title", "Create a new " + typeLabel);
        model.set("_page.typeLabel", typeLabel);
        page.render("beta-create");
      } else {
        model.set("_page.title", "Error");
        model.set("_page.message", "Invalid type \"" + params.type + "\". The type must be either \"data\" or \"vis\"");
        page.render("beta-create-error");
      }
    } else {
      model.set("_page.title", "Error");
      page.render("beta-create-error");
    }
  });
};


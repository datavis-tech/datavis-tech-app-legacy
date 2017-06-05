// The Request for Proposal Page (rfp) and rfp-submitted.
// Form post route defined in /server/routes.js
module.exports = function (app){

  app.get("/rfp", function (page, model){
    model.set("_page.title", "Request for Proposal - Datavis.tech");
    model.set("_page.hideLogin", true);
    page.render("rfp");
  });

  app.get("/rfp-submitted", function (page, model){
    model.set("_page.title", "Request for Proposal Submitted");
    model.set("_page.hideLogin", true);
    page.render("rfp-submitted");
  });

};

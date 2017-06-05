// Sets up projections
module.exports = function (store){

  // Add a projection that only includes certain fields.
  // This is for the document list page, so that the entire content
  // of each document is not transferred to the browser.
  store.addProjection("beta_documents_list", "beta_documents", {
    id: true,
    title: true,
    type: true
  });

};

// Sets up access control rules.
var shareDbAccess = require("sharedb-access");
var permissions = require("../apps/app/permissions");

module.exports = function (store){

  // Initialize sharedb-access on our store.
  shareDbAccess(store);

  store.allowCreate("beta_documents", function(docId, doc, session){
    return permissions.canCreate(session);
  });

  store.allowRead("beta_documents", function(docId, doc, session){
    return true;
  });

  store.allowUpdate("beta_documents", function(docId, oldDoc, newDoc, ops, session){
    return permissions.canEdit(oldDoc, session);
  });

  store.allowDelete("beta_documents", function(docId, doc, session){
    return permissions.canDelete(doc, session);
  });
};

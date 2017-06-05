// This module defines the permissions rules for documents.
// It is used both in routes to inform the user interface,
// and also in the server access control module under server/accessControl.
module.exports = {

  canCreate: function (session){
    var loggedIn;

    if("loggedIn" in session){

      // Client side
      loggedIn = session.loggedIn;

    } else {

      // Server side
      loggedIn = session.passport && (session.passport.user ? true : false);

    }
    return loggedIn;
  },

  canEdit: function (doc, session){
    return doc.owner === session.userId;
  },

  canDelete: function (doc, session){
    return doc.owner === session.userId;
  }
}

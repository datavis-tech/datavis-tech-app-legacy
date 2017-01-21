// This module provides a route that is responsible for
// reading documents (the R in CRUD).
//
// Draws from https://github.com/share/sharedb/blob/master/examples/textarea/server.js
//
// Curran Kelleher January 2017

module.exports = function (connection){
  return function(req, res, next) {
    var doc = connection.get('documents', req.params.id);
    doc.fetch(function(err) {
      if(err || doc.type === null) return next(err);
      res.render('read', {
        title: doc.data.title,
        description: doc.data.description,
        id: doc.id
      });
    });
  };
};

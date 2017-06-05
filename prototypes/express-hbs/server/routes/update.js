// This module provides a route that is responsible for
// updating documents (the U in CRUD).
//
// Curran Kelleher January 2017

var bundle = require('../utils/bundle');
var snapshot = require('../utils/snapshot');

module.exports = function (connection){
  return function(req, res, next) {

    var doc = connection.get('documents', req.params.id);
    doc.fetch(function(err) {
      if(err || doc.type === null) return next(err);

      var dataBundle = bundle({
        route: 'update',
        snapshot: snapshot(doc)
      });

      res.render('update', {
        id: doc.id,
        title: doc.data.title,
        dataBundle: dataBundle
      });

    });
  };
};

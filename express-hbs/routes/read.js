// This module provides a route that is responsible for
// reading documents (the R in CRUD).
//
// Draws from https://github.com/share/sharedb/blob/master/examples/textarea/server.js
//
// Curran Kelleher January 2017

var express = require('express');

module.exports = function (connection){
  var router = express.Router();

  router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var doc = connection.get('documents', id);
    doc.fetch(function(err) {
      if(err){
        next(err);
      } else if(doc.type === null) {
        res.status(404).render('404');
      } else {
        res.render('read', doc.data);
      }
    });
  });

  return router;
};

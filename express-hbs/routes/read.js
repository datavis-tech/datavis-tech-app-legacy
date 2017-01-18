// This module provides a route that is responsible for
// reading documents (the R in CRUD).

var express = require('express');

module.exports = function (connection){
  var router = express.Router();

  router.get('/:id', function(req, res, next) {
    var id = req.params.id
    var doc = connection.get('documents', id);

    // Draws from https://github.com/share/sharedb/blob/master/examples/textarea/server.js
    doc.fetch(function(err) {
      if(err) return next(err);
      if(doc.type === null) {
        res.send("No such document");
      } else {
        res.send(JSON.stringify(doc.data));
      }
    });
  });

  return router;
};

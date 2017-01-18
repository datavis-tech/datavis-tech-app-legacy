// This module provides a route that is responsible for
// creating new documents.

var express = require('express');
var uuid = require('uuid');

module.exports = function (connection){
  var router = express.Router();

  router.post('/', function(req, res, next) {
    var id = uuid.v4();
    var doc = connection.get('documents', id);

    var data = {
      title: req.body.title,
      description:req.body.description
    };

    doc.create(data, function(err) {
      if(err) return next(err);
      res.send("Created document " + id + " \n" + JSON.stringify(req.body, null, 2));
    });
  });

  return router;
};

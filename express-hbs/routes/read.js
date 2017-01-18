// This module provides a route that is responsible for
// reading documents (the R in CRUD).

var express = require('express');

module.exports = function (connection){
  var router = express.Router();

  router.get('/:id', function(req, res, next) {
    var id = req.params.id
    //var doc = connection.get('documents', id);

    //var data = {
    //  title: req.body.title,
    //  description:req.body.description
    //};

    //doc.create(data, function(err) {
    //  if(err) return next(err);
    //});
    res.send(JSON.stringify(req.params));
  });

  return router;
};

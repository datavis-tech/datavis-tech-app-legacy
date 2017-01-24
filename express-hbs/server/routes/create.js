// This module implements a route that is responsible for
// creating new documents (the C in CRUD).

var uuid = require('uuid');
var createDocument = require('../utils/createDocument');

module.exports = function (connection){

  return function(req, res, next) {
    var id = uuid.v4();

    var data = {
      title: req.body.title,
      description:req.body.description,
    };

    createDocument(connection, id, data, function(err) {
      if(err) return next(err);
      res.redirect(id + '/edit');
    });
  };
};

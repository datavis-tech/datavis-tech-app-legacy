// This module implements a route that is responsible for
// creating new documents (the C in CRUD).

var uuid = require('uuid');
module.exports = function (connection){
  return function(req, res, next) {
    var id = uuid.v4();
    var doc = connection.get('documents', id);

    var data = {
      title: req.body.title,
      description:req.body.description
    };

    doc.create(data, function(err) {
      if(err) return next(err);
      res.redirect(id);
    });
  };
};

var express = require('express');
var uuid = require('uuid');

module.exports = function (share){
  var router = express.Router();
  var connection = share.connect();

  router.post('/', function(req, res, next) {
    var id = uuid.v4();
    var doc = connection.get('documents', id);

    var data = {
      title: req.body.title,
      description:req.body.description
    };

    doc.create(data, function(err) {
      if(err) {
        next(err);
      } else {
        res.send("Created document " + id + " \n" + JSON.stringify(req.body, null, 2));
      }
    });
  });

  return router;
};

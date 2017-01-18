var express = require('express');

var home = require('./home');
var libs = require('./libs');
var create = require('./create');
var read = require('./read');

module.exports = function (connection){
  var router = express.Router();

  router.get('/', home);
  router.use('/libs', libs);
  router.post('/create', create(connection));
  router.get('/:id', read(connection));

  return router;
};

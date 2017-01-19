var express = require('express');

var home = require('./home');
var libs = require('./libs');
var create = require('./create');
var read = require('./read');
var update = require('./update');

module.exports = function (connection){
  var router = express.Router();

  router.get('/', home);
  router.use('/libs', libs);
  router.post('/create', create(connection));
  router.get('/:id', read(connection));
  router.get('/:id/edit', update(connection));

  return router;
};

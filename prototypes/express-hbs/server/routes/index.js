var express = require('express');

var home = require('./home');
var libs = require('./libs');
var create = require('./create');
var read = require('./read');
var update = require('./update');
var del = require('./delete');

module.exports = function (connection){
  var router = express.Router();

  router.get('/', home(connection));
  router.post('/create', create(connection));
  router.get('/:id', read(connection));
  router.get('/:id/edit', update(connection));
  router.post('/:id/delete', del(connection));

  router.use('/libs', libs);

  return router;
};
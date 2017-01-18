var express = require('express');

var home = require('./home');
var users = require('./users');
var libs = require('./libs');
var create = require('./create');
var read = require('./read');

module.exports = function (connection){
  var router = express.Router();

  router.use('/', home);
  router.use('/users', users);
  router.use('/libs', libs);
  router.use('/create', create(connection));
  router.use('/', read(connection));

  return router;
};

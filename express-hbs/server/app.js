// This module initializes the Express app.
// Generated using express-generator.

var express = require('express');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var backend = require('./backend');
var routes = require('./routes');

var app = express();
app.share = backend.initShareDB();

// View engine setup.
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Middleware.
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Set up routes.
app.use(routes(app.share.connection));

// If no matching route, render 404 (Not Found) page.
app.use(function(req, res, next) {
  res.status(404).render('404');
});

// Handle the case that an internal error was encountered.
app.use(function(err, req, res, next) {

  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

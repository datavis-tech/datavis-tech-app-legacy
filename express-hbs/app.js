// This is the entry point for the application.
// Generated using express-generator.
//
// Curran Kelleher January 2017

var express = require('express');
var hbs = require('hbs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ShareDB = require('sharedb');
var ShareDBMingoMemory = require('sharedb-mingo-memory');

var routes = require('./routes');

var app = express();

// Start ShareDB.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/server/index.js
var share = ShareDB({db: new ShareDBMingoMemory()});

// Create a persistent ShareDB connection used by multiple routes.
var connection = share.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

// Set up routes.
app.use(routes(connection));

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

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

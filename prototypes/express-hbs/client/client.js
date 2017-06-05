// Draws from https://github.com/share/sharedb/blob/master/examples/textarea/client.js
var sharedb = require('sharedb/lib/client');
var d3 = require('d3-selection');

var routes = require('./routes');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

var route = dataBundle.route;

routes.start(route, connection, dataBundle);
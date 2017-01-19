var http = require('http');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

var app = require('./app');

function start(){
  var port = process.env.PORT || '3000';
  app.set('port', port);

  var server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  // Draws from https://github.com/share/sharedb/blob/master/examples/counter/server.js
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    app.share.listen(stream);
  });

  server.listen(port);
  server.on('listening', function (){
    console.log('Listening at http://localhost:' + port);
  });
}

module.exports = { start: start };

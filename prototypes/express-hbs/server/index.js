var http = require('http');

var app = require('./app');
var backend = require('./backend');
var config = require('../server.config');

function start(){
  var server = http.createServer(app);
  backend.setupWebSockets(server, app.share);
  server.listen(config.port);
  server.on('listening', function (){
    console.log('Listening at http://localhost:' + config.port);
  });
}

module.exports = { start: start };

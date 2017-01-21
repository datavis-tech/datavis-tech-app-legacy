var http = require('http');

var app = require('./app');
var backend = require('./backend');

function start(){
  var port = process.env.PORT || '3000';
  app.set('port', port);

  var server = http.createServer(app);
  backend.setupWebSockets(server, app.share);
  server.listen(port);
  server.on('listening', function (){
    console.log('Listening at http://localhost:' + port);
  });
}

module.exports = { start: start };

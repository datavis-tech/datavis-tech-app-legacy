// This module sets up ShareDB.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/server/index.js

var ShareDB = require('sharedb');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

module.exports = {
  initShareDB: function (){

    var share = ShareDB({
      db: new ShareDBMingoMemory()
    });

    // Create a persistent ShareDB connection used by routes.
    share.connection = share.connect();

    // TODO if(NODE_ENV === development)
    createSampleDoc(share.connection);

    return share;
  },

  // Connect any incoming WebSocket connection to ShareDB
  // Draws from https://github.com/share/sharedb/blob/master/examples/counter/server.js
  setupWebSockets: function (server, share){
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws, req) {
      var stream = new WebSocketJSONStream(ws);
      share.listen(stream);
    });
  }
};

function createSampleDoc(connection){
  var id = 'db945bee-b0d6-44cd-bc01-e4976f5b3f99';
  var doc = connection.get('documents', id);

  var data = {
    title: 'Title of an Awesome Document',
    description: 'This document is the best document that ever existed. It is so awesome you will just not be able to handle it. Its awesomeness transcends everything that ever existed. It is able to help developers test the application manually with ease, as it has a fixed ID and gets created automatically in development mode'
  };

  doc.create(data, function(err) {
    if(err) throw err;
  });
}

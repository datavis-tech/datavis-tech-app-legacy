// Draws from https://github.com/share/sharedb/blob/master/examples/counter/client.js
var sharedb = require('sharedb/lib/client');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

// Parse the server-rendered JSON data bundle.
var dataBundle = JSON.parse(document.getElementById('data-bundle').textContent);
var id = dataBundle.id;

var doc = connection.get('documents', id);
doc.subscribe(function (){
  console.log(doc.data);
});

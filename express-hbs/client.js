// Draws from https://github.com/share/sharedb/blob/master/examples/counter/client.js
var sharedb = require('sharedb/lib/client');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

// Parse the server-rendered JSON data bundle.
var dataBundle = document.getElementById('data-bundle').textContent;
var snapshot = JSON.parse(dataBundle);
var id = snapshot.id;

var doc = connection.get('documents', id);
doc.ingestSnapshot(snapshot, function (err){
  if(err) throw err;

  console.log("snapshot ingested");
  console.log(doc.data);

  doc.subscribe(function (err){
    if(err) throw err;
    console.log("subscribed");
    console.log(doc.data);
  });
});

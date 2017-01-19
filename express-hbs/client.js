// Draws from https://github.com/share/sharedb/blob/master/examples/textarea/client.js
var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

// Parse the server-rendered JSON data bundle.
var dataBundle = document.getElementById('data-bundle').textContent;
var snapshot = JSON.parse(dataBundle);
var id = snapshot.id;

var doc = connection.get('documents', id);

function bindInput(id, property){
  var element = document.getElementById(id);
  var binding = new StringBinding(element, doc, [property]);
  binding.setup();
}

doc.ingestSnapshot(snapshot, function (err){
  if(err) throw err;

  bindInput('title-input', 'title');
  bindInput('description-input', 'description');

  doc.subscribe(function (err){
    if(err) throw err;
  });
});

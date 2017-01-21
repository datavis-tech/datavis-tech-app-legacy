var StringBinding = require('sharedb-string-binding');
var d3 = require('d3-selection');
var get = require('lodash.get');

module.exports = function (connection, dataBundle){

  var snapshot = dataBundle.snapshot;
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
      sync(doc);
    });
  });
}

// Syncs the HTML <title> to the doc "title" property as changes occur.
function sync(doc){
  doc.on('op', function (op){
    if(get(op, '[0].p[0]') === 'title'){
      d3.select('title').text(doc.data.title);
    }
  });
}

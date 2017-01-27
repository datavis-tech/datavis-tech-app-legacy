var StringBinding = require('sharedb-string-binding');
var d3 = require('d3-selection');
var changed = require('../utils/changed');

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
    bindInput('content-input', 'content');

    doc.subscribe(function (err){
      if(err) throw err;
      sync(doc);
    });
  });
}

// Syncs the HTML <title> to the doc "title" property as changes occur.
function sync(doc){
  doc.on('op', function (op){
    if(changed(op, 'title')){
      d3.select('title').text(doc.data.title);
    }
  });
}

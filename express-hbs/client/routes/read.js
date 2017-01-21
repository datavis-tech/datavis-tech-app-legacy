var d3 = require('d3-selection');
var get = require('lodash.get');

module.exports = function (connection, dataBundle){
  var id = dataBundle.id;
  var doc = connection.get('documents', id);
  doc.subscribe(function (err){
    if(err) throw err;
    sync(doc);
  });
}

function sync(doc){
  doc.on('op', function (op){
    if(get(op, '[0].p[0]') === 'title'){

      // Syncs the HTML <title> to the doc "title" property as changes occur.
      d3.select('title').text(doc.data.title);
      
      // Syncs the displayed title.
      d3.select('#doc-title').text(doc.data.title);
    }
    if(get(op, '[0].p[0]') === 'description'){

      // Syncs the displayed title.
      d3.select('#doc-description').text(doc.data.description);
    }
  });
}

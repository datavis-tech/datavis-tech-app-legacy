var d3 = require('d3-selection');
var changed = require('../utils/changed');

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

    if(changed(op, 'title')){
      d3.select('title').text(doc.data.title);
      d3.select('#doc-title').text(doc.data.title);
    }

    if(changed(op, 'description')){
      d3.select('#doc-description')
          .text(doc.data.description);
    }

    if(changed(op, 'content')){
      d3.select('#doc-content-iframe')
          .attr('srcdoc', doc.data.content);
    }
  });
}

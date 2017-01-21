var d3 = require('d3-selection');
var listen = require('../utils/listen');

module.exports = function (connection, dataBundle){
  var id = dataBundle.id;
  var doc = connection.get('documents', id);
  doc.subscribe(function (err){
    if(err) throw err;
    sync(doc);
  });
}

function sync(doc){

  listen(doc, 'title', function (title){
    d3.select('title').text(title);
    d3.select('#doc-title').text(title);
  });

  listen(doc, 'description', function (description){
    d3.select('#doc-description').text(description);
  });

}

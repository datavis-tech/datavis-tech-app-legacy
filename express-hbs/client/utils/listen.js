var get = require('lodash.get');

// Listens for changes in the given ShareDB document
// on a specific property.
function listen(doc, property, callback){
  doc.on('op', function (op){
    if(get(op, '[0].p[0]') === property){
      callback(doc.data[property]);
    }
  });
}

module.exports = listen;

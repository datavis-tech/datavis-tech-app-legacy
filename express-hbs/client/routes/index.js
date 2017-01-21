var update = require('./update');
var read = require('./read');

var routes = {
  'update': update,
  'read': read
};

function start(route, connection, dataBundle){
  routes[route](connection, dataBundle);
}

module.exports = { start: start };

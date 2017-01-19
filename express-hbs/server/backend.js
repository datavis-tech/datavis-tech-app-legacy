// This module sets up ShareDB.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/server/index.js

var ShareDB = require('sharedb');
var ShareDBMingoMemory = require('sharedb-mingo-memory');

module.exports = function (){

  var share = ShareDB({
    db: new ShareDBMingoMemory()
  });

  // Create a persistent ShareDB connection used by routes.
  share.connection = share.connect();

  return share;
};

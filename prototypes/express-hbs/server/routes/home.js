module.exports = function (connection){
  return function(req, res, next) {

    // Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/server/index.js
    connection.createFetchQuery('documents', {}, {}, function(err, results) {
      if (err) return next(err);

      var documents = results.map(function (doc){
        return {
          id: doc.id,
          title: doc.data.title
        };
      });

      res.render('home', {
        title: 'Datavis Tech',
        documents: documents
      });
    });
  };
}

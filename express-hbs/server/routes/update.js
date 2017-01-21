// This module provides a route that is responsible for
// updating documents (the U in CRUD).
//
// Curran Kelleher January 2017

module.exports = function (connection){
  return function(req, res, next) {

    var doc = connection.get('documents', req.params.id);
    doc.fetch(function(err) {
      if(err || doc.type === null) return next(err);

      var dataBundle = {

        // Tell the client which route it's on.
        route: 'update',

        // Construct the ShareDB snapshot for client side ingestion.
        snapshot: {
          id: doc.id,
          v: doc.version,
          data: doc.data
        }
      };

      res.render('update', {
        id: doc.id,
        title: doc.data.title,
        dataBundleJSON: JSON.stringify(dataBundle, null, 2)
      });

    });
  };
};

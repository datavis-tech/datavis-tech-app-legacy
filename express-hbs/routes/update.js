// This module provides a route that is responsible for
// updating documents (the U in CRUD).
//
// Curran Kelleher January 2017

module.exports = function (connection){
  return function(req, res, next) {

    var doc = connection.get('documents', req.params.id);
    doc.fetch(function(err) {
      if(err || doc.type === null) return next(err);

      // Construct the snapshot for client side ingestion.
      var snapshot = {
        id: doc.id,
        v: doc.version,
        data: doc.data
      };

      res.render('update', {
        id: doc.id,
        title: doc.data.title,
        dataBundle: JSON.stringify(snapshot, null, 2)
      });

    });
  };
};

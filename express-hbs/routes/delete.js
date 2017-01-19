// This module implements a route that is responsible for
// deleting documents (the D in CRUD).

module.exports = function (connection){
  return function(req, res, next) {
    var doc = connection.get('documents', req.params.id);
    doc.fetch(function(err) {
      if(err || doc.type === null) return next(err);
      doc.del(function(err) {
        if(err) return next(err);
        res.redirect('/');
      });
    });
  };
};

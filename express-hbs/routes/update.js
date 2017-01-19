// This module provides a route that is responsible for
// updating documents (the U in CRUD).
//
// Curran Kelleher January 2017

module.exports = function (connection){
  return function(req, res, next) {

    var dataBundle = {
      id: req.params.id
    };

    res.render('update', { dataBundle: JSON.stringify(dataBundle, null, 2) });
  };
};

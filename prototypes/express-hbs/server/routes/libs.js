// Serve library CSS and JS files from node_modules.
// This is mainly to support development with no Internet access,
// and to be able to run in production independently of CDNs.
//
// Curran Kelleher January 2017

var express = require('express');
var router = express.Router();

// Encourage browsers to cache the libraries.
var options = {
  maxAge: '2d'
};

router.use('/bootstrap', express.static('node_modules/bootstrap/dist', options));
router.use('/jquery', express.static('node_modules/jquery/dist', options));
router.use('/tether', express.static('node_modules/tether/dist', options));

module.exports = router;

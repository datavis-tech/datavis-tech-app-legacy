var express = require('express');
var router = express.Router();

// Serve Bootstrap CSS and JS files from node_modules.
router.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

module.exports = router;

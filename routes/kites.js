var express = require('express');
var router = express.Router();

/* GET kites page */
router.get('/', function(req, res, next) {
  // Define the results array with kite information
  var results = [
    { kite_color: "Red", material: "Nylon", length: 1.5 },
    { kite_color: "Blue", material: "Silk", length: 2.0 },
    { kite_color: "Green", material: "Plastic", length: 1.8 }
  ];

  // Render the kites.pug template and pass the results array to it
  res.render('kites', { title: 'Search Results - Kites', results: results });
});

module.exports = router;

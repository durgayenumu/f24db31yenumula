// var express = require('express');
// var router = express.Router();

// /* GET kites page */
// router.get('/', function(req, res, next) {
//   // Define the results array with kite information
//   var results = [
//     { kite_color: "Red", material: "Nylon", length: 1.5 },
//     { kite_color: "Blue", material: "Silk", length: 2.0 },
//     { kite_color: "Green", material: "Plastic", length: 1.8 }
//   ];

//   // Render the kites.pug template and pass the results array to it
//   res.render('kites', { title: 'Search Results - Kites', results: results });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var kite_controller = require('../controllers/kites');

router.get('/', kite_controller.kite_list);

router.post('/create', kite_controller.kite_create_post);

router.get('/:id', kite_controller.kite_detail);

// router.get('/:id/update', kite_controller.kite_update_get);

// router.get('/:id/delete', kite_controller.kite_delete_get);

// router.post('/:id/update', kite_controller.kite_update_post);

// router.post('/:id/delete', kite_controller.kite_delete_post);

module.exports = router;
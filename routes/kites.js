// var express = require('express');
// var router = express.Router();
// var kite_controller = require('../controllers/kites');

// router.get('/', kite_controller.kite_list);

// router.post('/', kite_controller.kite_create_post);

// router.get('/:id', kite_controller.kite_detail);

// router.get('/:id', kite_controller.kite_update_get);

// router.put('/:id', kite_controller.kite_update_put);

// router.delete('/:id', kite_controller.kite_delete);


// // router.get('/:id/delete', kite_controller.kite_delete_get);

// // router.post('/:id/update', kite_controller.kite_update_post);

// // router.post('/:id/delete', kite_controller.kite_delete_post);

// module.exports = router;

var express = require('express');
var router = express.Router();
var kite_controller = require('../controllers/kites');
// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}

router.get('/', kite_controller.kite_list);

router.post('/', kite_controller.kite_create_post);

//router.get('/:id', kite_controller.kite_update_get);

//router.get('/:id', kite_controller.kite_delete_get);

router.put('/kites:id', kite_controller.kite_update_put);

router.delete('/kites:id', kite_controller.kite_delete);

router.get('/kites:id', kite_controller.kite_detail);

router.get('/detail', kite_controller.kite_view_one_Page);

router.get('/create', kite_controller.kite_create_Page);

router.get('/update',secured, kite_controller.kite_update_Page);

router.get('/delete', kite_controller.kite_delete_Page);

module.exports = router;
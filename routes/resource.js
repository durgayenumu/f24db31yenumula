var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var kite_controller = require('../controllers/kites');

router.get('/', api_controller.api);

router.post('/kites', kite_controller.kite_create_post);

router.delete('/kites/:id', kite_controller.kite_delete);

router.put('/kites/:id', kite_controller.kite_update_put);

router.get('/kites/:id', kite_controller.kite_detail);

router.get('/kites', kite_controller.kite_list);

module.exports = router;

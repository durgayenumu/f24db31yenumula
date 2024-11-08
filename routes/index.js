var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /index route */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Search Results - Mukund Sai Rathod' });
});

module.exports = router;
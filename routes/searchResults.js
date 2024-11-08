var express = require('express');
var router = express.Router();
 
// Example search results
const results = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' },
  { id: 4, name: 'Item D' },
  { id: 5, name: 'Item E' }
];
 
// GET search results page
router.get('/', function(req, res, next) {
  res.render('searchResults', { title: 'Search Results', results: results });
});
 
module.exports = router;  // Ensure this line exists
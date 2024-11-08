const express = require('express');
const router = express.Router();

router.get('/grid', (req, res) => {
  res.render('grid', { title: 'Grid Display', query: req.query });
});

module.exports = router;
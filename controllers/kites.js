const Kite = require('../models/kites');

exports.kite_list = async function(req, res) {
  try {
      const kites = await Kite.find();
      res.render('kites', { results: kites });
  } catch (err) {
      res.status(500).send(`Error: ${err}`);
  }
};
  
exports.kite_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: Kite detail: ' + req.params.id);
};

exports.kite_create_post = async function(req, res) {
  let document = new Kite();
  document.kite_color = req.body.kite_color;
  document.material = req.body.material;
  document.length = req.body.length;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};


exports.kite_delete = function(req, res) {
  res.send('NOT IMPLEMENTED: Kite delete DELETE ' + req.params.id);
};

exports.kite_update_put = function(req, res) {
  res.send('NOT IMPLEMENTED: Kite update PUT ' + req.params.id);
};
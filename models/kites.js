const mongoose = require("mongoose");

const kiteSchema = mongoose.Schema({
  kite_color: String,
  material: String,
  length: Number
});

module.exports = mongoose.model("Kite", kiteSchema);
const mongoose = require("mongoose");

const kiteSchema = mongoose.Schema({
  kite_color: { type: String, required: true },
  material: { type: String, required: true },
  length: { type: Number,  required: true, 
    min: [1, 'Length must be at least 1 meter'], 
    max: [200, 'Length cannot exceed 200 meters'] 
  }
});

module.exports = mongoose.model("Kite", kiteSchema);

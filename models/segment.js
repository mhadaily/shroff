const mongoose = require("mongoose");

const segmentSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, trim: true},
  category: {type: String, required: true, unique: true, trim: true},
  currencies: [String],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date}
});

const Segment = mongoose.model("Segment", segmentSchema);

module.exports = Segment;
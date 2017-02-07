const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true, trim: true},
  symbol: {type: String, required: true, trim: true},
  thumbnail: {type: String, trim: true},
  createdAt: {type: Date, default: Date.now}
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

const exchangeSchema = mongoose.Schema({
  segment: {type: ObjectId, required: true, ref: 'Segment'},
  currencyList: [Mixed],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date}
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;

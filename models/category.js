const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  thumbnail: String,
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

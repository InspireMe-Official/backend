const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
});
const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;

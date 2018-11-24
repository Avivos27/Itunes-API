// server/models/SearchQuery.js
const mongoose = require("mongoose");
let SearchQuerySchema = new mongoose.Schema({
  query: String,
  count: Number
});
SearchQuerySchema.methods.addToCount = function() {
  this.count++;
  return this.save();
};

module.exports = mongoose.model("SearchQuery", SearchQuerySchema);

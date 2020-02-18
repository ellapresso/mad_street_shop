const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({
  tags: String,
  icon: String
});

const Tags = mongoose.model("Tags", TagsSchema);

module.exports = Tags;

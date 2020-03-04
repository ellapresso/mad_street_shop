const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  title: String,
  item: Array
});

module.exports = mongoose.model("Tags", UsersSchema, "Tags");

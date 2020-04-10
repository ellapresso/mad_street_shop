const mongoose = require("mongoose");
const moment = require("moment");
const currentTime = moment().format("YYYY-MM-DD h:mm:ssa");

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userTags: { type: Array, default: [] },
  userPasswords: String,
  favoriteShops: { type: Array, default: [] },
  kakao: { type: Object, default: {} },
  owner: { type: Boolean, default: false },
  isUser: { type: Boolean, default: false },
  deleted: { type: Boolean, default: null },
  createdAt: { type: String, default: currentTime },
});

const Users = mongoose.model("Users", UsersSchema, "Users");
module.exports = Users;

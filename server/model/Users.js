const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  nickName: String,
  userId: { type: String, required: true },
  userTags: { type: Array, default: [] },
  userPasswords: String,
  favoriteShops: { type: Array, default: [] },
  kakao: { type: Object, default: {} },
  owner: { type: Boolean, default: false },
  isUser: { type: Boolean, default: false },
  deleted: { type: Boolean, default: null }
});

const Users = mongoose.model("Users", UsersSchema, "Users");
module.exports = Users;
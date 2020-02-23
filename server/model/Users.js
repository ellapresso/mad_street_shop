const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  nickName: String,
  userId: { type: String, required: true },
  userTags: { type: Array, default: [] },
  userPasswords: String,
  favoriteShops: { type: Array, default: [] },
  useProfile: { type: Boolean, default: false },
  kakao: { type: Object, default: {} },
  owner: { type: Boolean, default: false },
  isUser: { type: Boolean, default: false }, 
  deleted: { type: Boolean, default: null }
});

global.Users = global.Users || mongoose.model("users", UsersSchema);
const Users = mongoose.model("users", UsersSchema);
module.exports = Users;

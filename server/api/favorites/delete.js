const Users = require("../../model/Users");
const Shops = require("../../model/Shops");
const { tokenCheck, isUser } = require("../../module/oAuth");
const mongoose = require("mongoose");

async function deleted(req, res) {
  const token = req.headers.authorization;
  const { userId, shopId } = req.body;
  const isShop = await Shops.findOne({
    _id: mongoose.Types.ObjectId(`${shopId}`)
  });
  if (!isShop) return res.sendStatus(302);

  const isUserToken = await tokenCheck(token); //kakao 유저인지 확인
  if (isUserToken !== 200 || !userId) return res.sendStatus(403);
  const user = await isUser(userId); //가입된 유저인지 확인
  if (!user) return res.status(400);

  user.favoriteShops = user.favoriteShops.filter(e => (e = !shopId));

  user.save(function(err) {
    res.send(err);
  });
  return res.sendStatus(200);
}

module.exports = deleted;

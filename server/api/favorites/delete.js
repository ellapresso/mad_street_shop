const Shops = require("../../model/Shops");
const { checkAll } = require("../../module/oAuth");
const mongoose = require("mongoose");
const { logger } = require("../../module/logger");

async function deleted(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const { shopId } = req.body;
  const isShop = await Shops.findOne({
    _id: mongoose.Types.ObjectId(`${shopId}`),
  });
  if (!isShop) return res.sendStatus(302);
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);
  user.favoriteShops = user.favoriteShops.filter((e) => (e = !shopId));
  logger.log(`before delete likeScore : ${isShop.likeScore}`);
  if (isShop.likeScore > 0) {
    await Shops.findOneAndUpdate(
      { _id: shopId },
      { likeScore: isShop.likeScore - 1 }
    ).then(logger.log(`${userId}님이 ${isShop.shopName}을 좋하지않습니다..`));
  }
  user.save();
  return res.sendStatus(200);
}

module.exports = deleted;

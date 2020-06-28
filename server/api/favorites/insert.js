const Shops = require("../../model/Shops");
const { checkAll } = require("../../module/oAuth");
const { logger } = require("../../module/logger");

async function insert(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const { shopId } = req.body;

  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);
  const isShop = await Shops.findOne({ _id: shopId, deleted: false });
  if (!isShop) return res.sendStatus(404);

  const findShop = user.favoriteShops.indexOf(shopId);
  if (findShop !== -1) return res.sendStatus(302);

  if (user.favoriteShops.length < 4) {
    const arr = user.favoriteShops;
    arr.push(shopId);
    user.favoriteShops = arr;
    user.save();
    //shop 의 likescore ++
    logger.log(`before add likeScore : ${isShop.likeScore}`);
    await Shops.findOneAndUpdate(
      { _id: shopId },
      { likeScore: isShop.likeScore + 1 }
    ).then(
      logger.console.log(`${userId}님이 ${isShop.shopName}을 좋아합니다.`)
    );
    return res.sendStatus(200);
  } else {
    return res.sendStatus(402);
  }
}

module.exports = insert;

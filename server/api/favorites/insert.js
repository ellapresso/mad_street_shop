const Shops = require("../../model/Shops");
const { tokenCheck, isUser } = require("../../module/oAuth");

async function insert(req, res) {
  const token = req.headers.authorization;
  const { userId, shopId } = req.body;

  const isUserToken = await tokenCheck(token); //kakao 유저인지 확인
  if (isUserToken !== 200 || !userId) return res.sendStatus(403);
  const user = await isUser(userId); //가입된 유저인지 확인
  if (!user) return res.status(400);

  const isShop = await Shops.findOne({ _id: shopId, deleted: false });
  if (!isShop) return res.sendStatus(404);

  const findShop = user.favoriteShops.indexOf(shopId);
  if (findShop !== -1) return res.sendStatus(302);

  if (user.favoriteShops.length < 4) {
    const arr = user.favoriteShops;
    arr.push(shopId);
    user.favoriteShops = arr;
    user.save();
    return res.sendStatus(200);
  } else {
    return res.sendStatus(402);
  }
}

module.exports = insert;

const Users = require("../../model/Users");
const Shops = require("../../model/Shops");
const _ = require("lodash");

async function insert(req, res) {
  const { userId, shopId } = req.body;
  const isShop = await Shops.findOne({ _id: shopId });
  if (!isShop) return res.sendStatus(302);
  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser) return res.sendStatus(302);
  const result = await Users.updateOne(
    { userId: userId },
    { $addToSet: { favoriteShops: shopId } }
  );
  if (!result) {
    return res.sendStatus(302);
  } else {
    return res.send(isUser.favoriteShops);
  }
}

module.exports = insert;

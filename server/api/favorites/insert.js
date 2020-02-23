const Users = require("../../model/Users");
const Shops = require("../../model/Shops");
const _ = require("lodash");

async function insert(req, res) {
  const { userId, shopId } = req.body;
  const isShop = await Shops.findOne({ _id: shopId });
  if (!isShop) return res.sendStatus(404);

  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser) return res.sendStatus(302);
  //TODO: 이미 등록되어 있는 shop의 경우, 302 반환
  const result = await Users.updateOne(
    { userId: userId },
    { $addToSet: { favoriteShops: shopId } }
  )
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(500).send(err));
  return result;
  //TODO: 추후 논의사항=> 관심등록할 매장 개수
}

module.exports = insert;

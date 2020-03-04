const Users = require("../../model/Users");
const Shops = require("../../model/Shops");

async function insert(req, res) {
  const { userId, shopId } = req.body;
  const isShop = await Shops.findOne({ _id: shopId });
  if (!isShop) return res.sendStatus(404);

  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser) return res.sendStatus(302);

  const findShop = isUser.favoriteShops.indexOf(shopId);
  if(findShop !== -1) return res.sendStatus(302);

  if (isUser.favoriteShops.length < 4){
  const result = await Users.updateOne(
    { userId: userId },
    { $addToSet: { favoriteShops: shopId } }  
  )
    .then(res.sendStatus(200))
    .catch(err => res.sendStatus(500).send(err));
  return result;
  } else {
    return res.sendStatus(402);
  }
}

module.exports = insert;

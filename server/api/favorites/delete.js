const Users = require("../../model/Users");
const Shops = require("../../model/Shops");

async function deleted(req, res) {
  const { userId, shopId } = req.body;
  const isShop = await Shops.findOne({ _id: shopId });
  if (!isShop) return res.sendStatus(302);

  const isUser = await Users.findOne({ userId, isUser: true });
  if (!isUser) return res.sendStatus(302);
  
  await Users.updateOne(
    { userId: userId },
    { $pull: { favoriteShops: shopId } }
  )
  .then(res.sendStatus(200))
  .catch(err=>res.status(500).send(err));

}

module.exports = deleted;

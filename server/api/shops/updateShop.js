const { findShopID } = require("../../module/shop");
const { checkAll } = require("../../module/oAuth");
const Shops = require("../../model/Shops");

async function updateShop(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  const shopOwner = req.body.userId;
  const { body } = req;

  const user = await checkAll(shopOwner, token);
  if (!user) return res.sendStatus(403);

  const findShopId = await findShopID(shopOwner);
  console.log(findShopId);
  console.log(shopId);
  const a = findShopId.indexOf(shopId);

  console.log(a);

  if (shopId !== findShopId) return res.sendStatus(403);
  delete body.userId;
  // await Shops.findOneAndUpdate({ _id: shopId, shopOwner }, body)
  //   .then(res.sendStatus(200))
  //   .catch((err) => res.send(err));
}

module.exports = updateShop;

const shops = require("../model/shops");

async function shopDetail(req, res) {
  const shopId = req.params.shopId;
  const shopInfo = await shops.findOne({ _id: shopId });
  return res.send(shopInfo);
}

module.exports = shopDetail;

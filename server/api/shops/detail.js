const { shopDetail } = require("../../module/shop");

async function test(req, res) {
  const shopId = req.params.shopId;
  if (!shopId) return res.send(404);

  const shopInfo = await shopDetail(shopId);
  if (!shopInfo) return res.send(302);

  return res.send(shopInfo);
}

module.exports = test;

const { shopDetail } = require("../../module/shop");

async function detail(req, res) {
  const { shopId } = req.params;
  if (!shopId) return res.send(404);
  const shopInfo = await shopDetail(shopId);
  if (!shopInfo) return res.send(302);
  return res.send(shopInfo);
}

module.exports = detail;

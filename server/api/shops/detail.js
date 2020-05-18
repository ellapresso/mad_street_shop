const { shopDetail } = require("../../module/shop");
const { vicinityCalculator } = require("../../module/formula");

async function detail(req, res) {
  const { lat, long } = req.query;
  const { shopId } = req.params;
  if (!lat || !long) {
    return res
      .status(404)
      .send("Can not found your location. please enable your GPS");
  }
  if (!shopId) return res.send(404);
  const shopInfo = await shopDetail(shopId);
  const addVicinity = vicinityCalculator(lat, long, [shopInfo]);
  if (!addVicinity) return res.send(302);
  return res.send(addVicinity);
}

module.exports = detail;

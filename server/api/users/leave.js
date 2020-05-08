const { checkAll } = require("../../module/oAuth");
const { findShopID, shopDetail } = require("../../module/shop");
const moment = require("moment");
const currentTime = moment().format("YYYY-MM-DD h:mm:ssa");

async function leave(req, res) {
  const token = req.headers.authorization;
  const { userId } = req.params;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(404);

  try {
    if (user.owner) {
      const shops = await findShopID(userId);
      shops.forEach(async (e) => {
        const shop = await shopDetail(e);
        shop.deletedAt = currentTime;
        shop.deleted = true;
        shop.save();
      });
    }
    user.deletedAt = currentTime;
    user.deleted = true;
    user.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
}

module.exports = leave;

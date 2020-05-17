const shops = require("../../model/Shops");
const { checkAll } = require("../../module/oAuth");
const { shopUpdate, shopDetail } = require("../../module/shop");
let cron = require("node-cron");

//TODO: subLocation관련 점검 필요
async function operationEdit(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  const { userId, closeTime } = req.body;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);
  const shopInfo = await shopDetail(shopId);
  if (shopInfo.shopOwner != userId) return res.sendStatus(403);
  shopData = shopInfo.now;
  const updateInfo = {
    active: shopData.active,
    location: shopData.location,
    locationComment: shopData.locationComment,
    openTime: shopData.openTime,
    closeTime: closeTime,
  };
  shopUpdate(shopId, userId, updateInfo)
    .then(
      cron.schedule(
        `00 ${updateInfo.closeTime.split(":")[0]} ${
          updateInfo.closeTime.split(":")[1]
        } * * *`,
        shopUpdate(shopId, userId, { active: false })
      )
    )
    .catch((e) => {
      console.error(e);
      return res.sendStatus(500);
    });
  return res.sendStatus(200);
}

module.exports = operationEdit;

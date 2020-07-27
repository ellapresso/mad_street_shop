const shops = require("../../model/Shops");
const { checkAll } = require("../../module/oAuth");
const { shopUpdate, shopDetail, setCron } = require("../../module/shop");
let cron = require("node-cron");

async function operationEdit(req, res) {
  const token = req.headers.authorization;
  const { shopId } = req.params;
  const {
    userId,
    longitude,
    latitude,
    subLocation,
    locationComment,
    closeTime,
  } = req.body;
  const user = await checkAll(userId, token);
  if (!user) return res.sendStatus(403);
  const shopInfo = await shopDetail(shopId);
  if (shopInfo.shopOwner != userId) return res.sendStatus(403);
  shopData = shopInfo.now;
  const updateInfo = {
    active: shopData.active,
    location: { longitude, latitude, subLocation },
    locationComment,
    openTime: shopData.openTime,
    closeTime,
  };
  shopUpdate(shopId, userId, updateInfo)
    .then(
      setCron(
        `00 ${updateInfo.closeTime.split(":")[1]} ${
          updateInfo.closeTime.split(":")[0]
        } * * *`,
        updateInfo
      )
    )
    .catch((e) => {
      console.error(e);
      return res.sendStatus(500);
    });
  return res.send(updateInfo);
}

module.exports = operationEdit;
